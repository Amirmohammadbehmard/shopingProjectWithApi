import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useShopingCartContext } from "../../context/ShopingCartContext";

export default function CartButton() {
  const { cartQty } = useShopingCartContext();
  return (
    <Link className="relative" to={"/cart"}>
      <SlBasket size={"35px"} />
      {cartQty > 0 && (
        <span className="absolute -top-2 -right-7 p-2 w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full">
          {cartQty}
        </span>
      )}
    </Link>
  );
}
