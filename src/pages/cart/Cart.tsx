import { useEffect, useState } from "react";
import CartItem from "../../components/cartItem/CartItem";
import Container from "../../components/container/Container";
import { useShopingCartContext } from "../../context/ShopingCartContext";
import { useLoginContext } from "../../context/LoginContext";

const Cart = () => {
  const { cartItems, products, totalQty, totalPrice } = useShopingCartContext();
  const { isLogin } = useLoginContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  if (isLoading) {
    return <h2 className="text-center text-xl mt-10">empty...</h2>;
  }

  return (
    <Container>
      <div className="overflow-x-hidden">
        {isLogin ? (
          cartItems.length > 0 ? (
            <>
              <div className="flex flex-col md:flex-row md:justify-between justify-center flex-wrap mt-6">
                {cartItems.map((item) => {
                  const product = products.find(
                    (p) => p.id === item.id.toString(),
                  );

                  if (!product) return null;
                  const qty = isLogin ? item.qty : 0;
                  return (
                    <div key={item.id} className={`w-full`}>
                      <CartItem
                        key={item.id}
                        id={item.id}
                        qty={qty}
                        product={product}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="bg-gray-100 border-gray-300 rounded-md p-4 my-3">
                <p className="text-gray-800 font-medium">
                  Total items in cart:{" "}
                  <span className="font-bold">{totalQty}</span>
                </p>
                <p className="text-gray-800 font-medium">
                  Total price:{" "}
                  <span className="font-bold">
                    {totalPrice.toLocaleString()} $
                  </span>
                </p>
              </div>

              <div className="flex justify-end mb-3">
                <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-200">
                  Check out
                </button>
              </div>
            </>
          ) : (
            <p className="text-center">Your shopping cart is empty.</p>
          )
        ) : (
          <p className="text-center">
            Please log in first to view your shopping cart.
          </p>
        )}
      </div>
    </Container>
  );
};

export default Cart;
