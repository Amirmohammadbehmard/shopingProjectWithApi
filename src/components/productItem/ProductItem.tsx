import { IProduct } from "../../types/Server";
import "./productItem.css";

type productItem = IProduct;
function ProductItem({
  title,
  price,
  description,
  image,
  isOutOfStock,
}: productItem) {
  return (
    <div
      className={`${
        isOutOfStock ? "product-out-of-stock opacity-50 relative " : ""
      } bg-white dark:bg-white shadow-xl rounded-md h-72 transition-transform transform hover:scale-105 text-black`}
    >
      <div className="shadow-xl rounded-md h-72 transition-transform transform hover:scale-100">
        <div className="h-1/2 w-full">
          <img
            className="rounded-t-md h-full w-full object-contain"
            src={image}
            alt=""
          />
        </div>
        <div className="h-1/2">
          <div className="flex justify-between pt-2 px-4 ">
            <h3 className="font-bold line-clamp-1 w-36 text-left">{title}</h3>
            <span className="font-bold">{price}$</span>
          </div>
          <div>
            <p className="text-justify pt-6 px-4 line-clamp-3 text-gray-600">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
