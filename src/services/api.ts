import axios from "axios";

export const client = axios.create({
  baseURL: "https://json-server.liara.run",
});
export async function getProducts() {
  const { data } = await client("/products");
  return data;
}
export async function getProduct(id: number | string) {
  const { data } = await client(`/products/${id}`);
  return data;
}

import { User, LoginResponse, Product, cartItem } from "../types/Server";

export const login = async (
  identifier: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await fetch("https://json-server.liara.run/users");
    if (!response.ok) {
      throw new Error("An error occurred while retrieving user information.");
    }

    const users: User[] = await response.json();

    const user = users.find(
      (u) =>
        (u.username === identifier || u.email === identifier) &&
        u.password === password,
    );

    if (user) {
      return { success: true, data: user };
    } else {
      return {
        success: false,
        message: "The information entered is incorrect.",
      };
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    return { success: false, message: "An error occurred during login." };
  }
};

export const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
  try {
    if (ids.length === 0) {
      console.warn("No product IDs provided.");
      return [];
    }

    const productPromises = ids.map(async (id) => {
      try {
        const response = await client.get(`/products/${id}`);
        if (response.status >= 200 && response.status < 300) {
          return response.data as Product;
        } else {
          console.warn(
            `Failed to fetch product for ID ${id}. Status: ${response.status}`,
          );
          return undefined;
        }
      } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        return undefined;
      }
    });

    const products = await Promise.all(productPromises);
    const validProducts = products.filter(
      (product): product is Product => product !== undefined,
    );

    if (validProducts.length === 0) {
      console.warn("No valid products found.");
    }

    return validProducts;
  } catch (error) {
    console.error("An error occurred while fetching products:", error);
    return [];
  }
};
export const saveCart = async (
  userId: string,
  cartItems: cartItem[],
): Promise<void> => {
  try {
    await client.patch(`/users/${userId}`, {
      cart: cartItems.map((item) => ({
        productId: item.id.toString(),
        quantity: item.qty,
      })),
    });
    console.log(cartItems);

    console.log("Cart saved to API successfully.");
  } catch (error) {
    console.error("Error saving cart to API:", error);
  }
};

export const updateProfile = async (userId: string, data: Partial<User>) => {
  try {
    const response = await client.patch(`/users/${userId}`, data);
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Failed to update profile");
    }

    return response.data;
  } catch (error) {
    console.error("Error in updateProfile:", error);
    throw error;
  }
};
