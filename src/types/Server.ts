export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
  isOutOfStock: boolean;
}

export interface IRating {
  rate: number;
  count: number;
}
export interface IshopingCartProvider {
  children: React.ReactNode;
}
export interface cartItem {
  id: number;
  qty: number;
}
export interface CartItemFromAPI {
  productId: string;
  quantity: number;
}

export interface IShopingCartContext {
  cartItems: cartItem[];
  cartQty: number;
  handlerIncreaseProductQty: (id: number) => void;
  handlerDecreaseProductQty: (id: number) => void;
  getProductQty: (id: number) => number;
  handlerRemoveProduct: (id: number) => void;
  resetCart: () => void;
  products: Product[];
}

export interface ICartItem {
  id: number;
  qty: number;
  product: Product;
}
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  cart: CartItemFromAPI[];
  orders: Order[];
  pic: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartItemFromAPI {
  productId: string;
  quantity: number;
}




export interface Order {
  id: number;
  amount: number;
  status: string;
}
