import { useEffect, useState } from "react";

export function UseLocalStorage<T>(key: string, initialvalue: T) {
  const [value, setValue] = useState<T>(() => {
    const localCart = localStorage.getItem("cartItems");
    if (localCart != null) {
      return JSON.parse(localCart);
    } else {
      return initialvalue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
