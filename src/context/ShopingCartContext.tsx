import { createContext, useContext, useEffect, useState } from "react";
import { UseLocalStorage } from "../hooks/UseLocalStorage";
import { getProductsByIds, saveCart } from "../services/api";
import { useLoginContext } from "./LoginContext";
import { cartItem, Product } from "../types/Server";
import { useNavigate } from "react-router-dom";

interface IShopingCartContext {
  cartItems: cartItem[];
  products: Product[];
  cartQty: number;
  totalQty: number;
  totalPrice: number;
  handlerIncreaseProductQty: (id: number) => void;
  handlerDecreaseProductQty: (id: number) => void;
  handlerRemoveProduct: (id: number) => void;
  handlerAddProductToCart: (id: number) => void;
  getProductQty: (id: number) => number;
}

const ShopingCartContext = createContext<IShopingCartContext | null>(null);

export const useShopingCartContext = () => {
  const context = useContext(ShopingCartContext);
  if (!context) {
    throw new Error("useShopingCartContext must be used within a CartProvider");
  }
  return context;
};

export function ShopingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin, userId } = useLoginContext();
  const [cartItems, setCartItems] = UseLocalStorage<cartItem[]>(
    "cartItems",
    [],
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [cartQty, setCartQty] = useState<number>(0);
  const [totalQty, setTotalQty] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length > 0) {
      const productIds = cartItems.map((item) => item.id.toString());
      getProductsByIds(productIds)
        .then((result) => {
          setProducts(result);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      setProducts([]);
    }
  }, [cartItems]);

  useEffect(() => {
    if (isLogin) {
      const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);
      setCartQty(totalQty);
    } else {
      setCartQty(0);
    }
  }, [cartItems, isLogin]);

  useEffect(() => {
    const calculatedTotalQty = cartItems.reduce(
      (total, item) => total + item.qty,
      0,
    );
    const calculatedTotalPrice = cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id.toString());
      return total + (product?.price || 0) * item.qty;
    }, 0);

    setTotalQty(calculatedTotalQty);
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems, products]);

  const handlerAddProductToCart = (id: number) => {
    setCartItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === id,
      );

      if (existingItemIndex !== -1) {
        return currentItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      } else {
        return [...currentItems, { id, qty: 1 }];
      }
    });
  };

  const handlerIncreaseProductQty = (id: number) => {
    if (!isLogin) {
      alert("please go and login then do this");
      navigate("/login");
      return;
    }
    setCartItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === id,
      );

      if (existingItemIndex !== -1) {
        return currentItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      } else {
        return [...currentItems, { id, qty: 1 }];
      }
    });
  };

  const handlerDecreaseProductQty = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.reduce(
        (updatedItems, item) => {
          if (item.id === id) {
            if (item.qty > 1) {
              updatedItems.push({ ...item, qty: item.qty - 1 });
            }
          } else {
            updatedItems.push(item);
          }
          return updatedItems;
        },
        [] as typeof currentItems,
      ),
    );
  };

  const handlerRemoveProduct = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  const getProductQty = (id: number): number => {
    if (!isLogin) {
      return 0;
    }
    const item = cartItems.find((item) => item.id === id);
    return item ? item.qty : 0;
  };
  useEffect(() => {
    const saveCartToAPI = async () => {
      if (isLogin && userId && cartItems) {
        try {
          await saveCart(userId.toString(), cartItems);
          console.log("Cart saved to API successfully.");
        } catch (error) {
          console.error("Failed to save cart to API:", error);
        }
      }
    };

    saveCartToAPI();
  }, [cartItems, isLogin, userId]);

  return (
    <ShopingCartContext.Provider
      value={{
        cartItems,
        products,
        cartQty,
        totalQty,
        totalPrice,
        handlerIncreaseProductQty,
        handlerDecreaseProductQty,
        handlerRemoveProduct,
        handlerAddProductToCart,
        getProductQty,
      }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
}
