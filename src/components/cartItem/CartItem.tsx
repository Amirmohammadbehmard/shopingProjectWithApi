import Button from "../button/Button";
import { FaTrashAlt } from "react-icons/fa";
import { ICartItem } from "../../types/Server";
import { useShopingCartContext } from "../../context/ShopingCartContext";
import { Link } from "react-router-dom";
type TVariant = "primary" | "danger" | "warning";
interface ButtonAction {
  label: string | JSX.Element;
  onClick: () => void;
  className?: string;
  variant?: TVariant;
}
function CartItem({ id, qty }: ICartItem) {
  const {
    handlerDecreaseProductQty,
    handlerIncreaseProductQty,
    handlerRemoveProduct,
    products,
  } = useShopingCartContext();

  const product = products.find((p) => p.id === id.toString());

  if (!product) {
    return <div className="px-4 py-4 my-4">empty</div>;
  }

  const buttonActions: ButtonAction[] = [
    {
      label: "+",
      onClick: () => handlerIncreaseProductQty(id),
      variant: "primary",
    },
    {
      label: "-",
      onClick: () => handlerDecreaseProductQty(id),
      variant: "warning",
    },
    {
      label: <FaTrashAlt />,
      onClick: () => handlerRemoveProduct(id),
      variant: "danger",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-4 p-4 w-full dark:bg-white text-black rounded-md">
      <div className="flex-shrink-0">
        <Link to={`/product/${id}`}>
          <img
            className="h-24 w-24 md:h-32 md:w-32 object-contain"
            src={product.image}
            alt={product.title}
          />
        </Link>
      </div>
      <div className="flex-grow text-center md:text-left md:ml-4">
        <h3 className="text-sm md:text-base">{product.title}</h3>
      </div>
      <div className="flex-shrink-0 text-center md:text-right md:mr-8 flex flex-col items-center">
        <h3 className="text-lg md:text-xl font-bold ">{qty}</h3>{" "}
        <span className="text-xs md:flex hidden">Qty</span>
      </div>
      <div className="flex flex-col items-center md:ml-4">
        {buttonActions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            className={`w-9 h-9 my-1 rounded-full flex justify-center items-center`}
            variant={action.variant}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CartItem;
