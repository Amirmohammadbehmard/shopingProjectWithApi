import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { login, getProductsByIds, client } from "../services/api";
import {
  LoginResponse,
  User,
  Product,
  CartItem,
  CartItemFromAPI,
  cartItem,
} from "../types/Server";

interface Ichildren {
  children: ReactNode;
}

export interface ILoginContext {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  handlerLogin: (identifier: string, password: string) => Promise<void>;
  handlerLogOut: () => Promise<void>;
  cartItems: cartItem[];
  cartQty: number;
  userId: number | null;
  User: User | null;
  updateuser: (updatedData: Partial<User>) => void;
  updateCart: (updatedCartItems: cartItem[]) => void;
  validateUser: (input: string) => Promise<boolean>;
}

const defaultLoginContext: ILoginContext = {
  isLogin: false,
  setIsLogin: () => {},
  handlerLogin: async () => {},
  handlerLogOut: async () => {},
  cartItems: [],
  cartQty: 0,
  userId: null,
  User: null,
  updateuser: () => {},
  validateUser: async () => false,
  updateCart: () => {},
};

export const LoginContext = createContext<ILoginContext>(defaultLoginContext);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};

function LoginProvider({ children }: Ichildren) {
  const [isLogin, setIsLogin] = useState(false);
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [cartQty, setCartQty] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [User, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const updateCartInLocalStorage = (cartItems: cartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handlerLogin = async (identifier: string, password: string) => {
    try {
      setCartItems([]);
      updateCartInLocalStorage([]);
      setCartQty(0);
      setUserId(null);
      setUser(null);

      const result: LoginResponse = await login(identifier, password);

      let response = await fetch(
        `https://json-server.liara.run/users?username=${identifier}`,
      );
      let users = await response.json();

      if (users.length === 0) {
        response = await fetch(
          `https://json-server.liara.run/users?email=${identifier}`,
        );
        users = await response.json();
      }

      if (users.length === 0) {
        throw new Error("No user with this information was found.");
      }

      const user = users[0];

      if (user.password !== password) {
        throw new Error("The password is incorrect.");
      }

      if (result.success && result.data) {
        const token = "your-token";
        localStorage.setItem("token", token);

        const updatedUser: User = {
          username: result.data.username || "",
          password: result.data.password || "",
          firstName: result.data.firstName || "",
          lastName: result.data.lastName || "",
          email: result.data.email || "",
          phone: result.data.phone || "",
          address: result.data.address || "",
          postalCode: result.data.postalCode || "",
          pic: result.data.pic || "",
          orders: result.data.orders || [],
          id: result.data.id || "",
          cart: result.data.cart || [],
        };

        setUser(updatedUser);
        localStorage.setItem("User", JSON.stringify(updatedUser));

        const parsedUserId = parseInt(result.data.id, 10);
        if (isNaN(parsedUserId)) {
          console.error("Invalid user ID:", result.data.id);
          throw new Error("User ID is not a valid number.");
        }

        setUserId(parsedUserId);

        const userCart = Array.isArray(result.data.cart)
          ? result.data.cart.map((item: CartItemFromAPI) => ({
              id: parseInt(item.productId, 10),
              qty: item.quantity || 1,
            }))
          : [];

        setCartItems(userCart);
        updateCartInLocalStorage(userCart);
        const totalQty = userCart.reduce((total, item) => total + item.qty, 0);
        setCartQty(totalQty);

        navigate("/cart");
        window.location.reload();
      } else {
        alert(result.message || "The information entered is incorrect.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const handlerLogOut = async () => {
    try {
      console.log("Logging out...");
      setIsLogin(false);
      setCartItems([]);
      setCartQty(0);
      setUserId(null);
      setUser(null);

      localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("User");
      localStorage.removeItem("cartItems");

      navigate("/login", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("An error occurred while logging out:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      const storedUser = JSON.parse(
        localStorage.getItem("User") || "{}",
      ) as User;
      const storedCartItems = JSON.parse(
        localStorage.getItem("cartItems") || "[]",
      ) as cartItem[];

      if (storedUser && storedUser.id) {
        const parsedUserId = parseInt(storedUser.id, 10);
        if (!isNaN(parsedUserId)) {
          setUserId(parsedUserId);

          fetchUserCart(parsedUserId.toString()).then((products) => {
            if (products.length > 0) {
              const userCart = products.map((product) => ({
                id: parseInt(product.id, 10),
                qty:
                  storedUser.cart.find((item) => item.productId === product.id)
                    ?.quantity || 1,
              }));
              setCartItems(userCart);
              updateCartInLocalStorage(userCart);
            } else {
              setCartItems(storedCartItems);
              updateCartInLocalStorage(storedCartItems);
            }
          });
        }
      }
    } else {
      setIsLogin(false);
      setCartItems([]);
      setCartQty(0);
      setUserId(null);
      setUser(null);
    }
  }, [navigate]);

  useEffect(() => {
    const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);
    setCartQty(totalQty);
  }, [cartItems]);

  const fetchUserCart = async (userId: string): Promise<Product[]> => {
    try {
      const response = await client.get(`/users/${userId}`);
      if (response.status >= 200 && response.status < 300) {
        const user = response.data as User;

        if (!user.cart || user.cart.length === 0) {
          console.warn(`User with ID ${userId} has an empty cart.`);
          setCartItems([]);
          updateCartInLocalStorage([]);
          return [];
        }

        const productIds = user.cart.map((item: CartItem) => item.productId);
        const products = await getProductsByIds(productIds);

        const updatedCartItems = products.map((product) => ({
          id: parseInt(product.id, 10),
          qty:
            user.cart.find((item) => item.productId === product.id)?.quantity ||
            1,
        }));

        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);

        return products;
      } else {
        throw new Error("Error fetching user data.");
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      setCartItems([]);
      updateCartInLocalStorage([]);
      return [];
    }
  };
  const updateCart = (updatedCartItems: cartItem[]) => {
    setCartItems(updatedCartItems);
    updateCartInLocalStorage(updatedCartItems);

    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = {
        ...prevUser,
        cart: updatedCartItems.map((item) => ({
          productId: item.id.toString(),
          quantity: item.qty,
        })),
      };
      localStorage.setItem("User", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };
  const updateuser = (updatedData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = {
        ...prevUser,
        ...updatedData,
      };
      localStorage.setItem("User", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };
  const validateUser = async (input: string): Promise<boolean> => {
    try {
      const response = await client.get<User[]>(
        "https://json-server.liara.run/users",
      );

      if (response.status === 200) {
        const users = response.data;
        const normalizedInput = input.replace(/-/g, "");
        const user = users.find(
          (u) =>
            u.email === input || u.phone.replace(/-/g, "") === normalizedInput,
        );
        if (!user) {
          alert("No user found with this email or phone number.");
          return false;
        }
        return true;
      } else {
        alert("An error occurred while fetching user data.");
        return false;
      }
    } catch (error) {
      console.error("Error validating user:", error);
      alert("An error occurred while validating the user.");
      return false;
    }
  };
  console.log(
    "Cart Items in localStorage:",
    JSON.parse(localStorage.getItem("cartItems") || "[]"),
  );
  console.log("Cart Items in state:", cartItems);

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        handlerLogin,
        handlerLogOut,
        cartItems,
        cartQty,
        userId,
        updateuser,
        updateCart,
        validateUser,
        User,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
export default LoginProvider;
