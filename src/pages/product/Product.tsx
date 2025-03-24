import { useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import { getProduct } from "../../services/api";
import { useEffect, useState } from "react";
import { IProduct } from "../../types/Server";
import { useShopingCartContext } from "../../context/ShopingCartContext";
import { FaTrashAlt } from "react-icons/fa";

function Product() {
  const [product, setProduct] = useState<IProduct>();
  const param = useParams<{ id: string }>().id;
  const {
    handlerIncreaseProductQty,
    handlerDecreaseProductQty,
    getProductQty,
    cartItems,
    handlerRemoveProduct,
  } = useShopingCartContext();

  useEffect(() => {
    getProduct(param as string).then((res) => setProduct(res));
  }, [param]);

  console.log(cartItems);
  console.log("Product Quantity:", getProductQty(parseInt(param as string)));
  // در فایل OffCanvasMenu.tsx


  return (
    <div>
      <Container>
        <div className="grid grid-cols-2 h-[430px] md:grid-cols-10 mt-4 md:mx-3 mx-0">
          <div className="col-span-2 flex flex-col justify-start p-4 ">
            <img
              className="h-52 rounded object-contain"
              src={product?.image}
              alt=""
            />
            <div className="flex flex-col mt-4">
              {!product?.isOutOfStock ? (
                <>
                  <div className="flex justify-center space-x-3">
                    {getProductQty(parseInt(param as string)) !== 0 ? (
                      <Button
                        onClick={() =>
                          handlerIncreaseProductQty(parseInt(param as string))
                        }
                        variant="primary"
                      >
                        +
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handlerIncreaseProductQty(parseInt(param as string))
                        }
                        variant="primary"
                      >
                        Add to cart
                      </Button>
                    )}
                    {getProductQty(parseInt(param as string)) !== 0 ? (
                      <span className="rounded-md text-center text-lg my-1 px-8 py-2">
                        {getProductQty(parseInt(param as string))}
                      </span>
                    ) : (
                      ""
                    )}

                    {getProductQty(parseInt(param as string)) !== 0 ? (
                      <Button
                        onClick={() =>
                          handlerDecreaseProductQty(parseInt(param as string))
                        }
                        variant="warning"
                      >
                        <span className="text-white font-bold">-</span>
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-center">
                    {getProductQty(parseInt(param as string)) !== 0 ? (
                      <Button
                        onClick={() =>
                          handlerRemoveProduct(parseInt(param as string))
                        }
                        variant="danger"
                      >
                        <FaTrashAlt className="h-6 w-28" />
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center text-red-500">
                  This product is out of stock.
                </div>
              )}
            </div>
          </div>
          <div className="col-span-8 flex flex-col justify-start">
            <div className="grid grid-cols-12">
              <h1 className="col-span-6 px-8 py-4">{product?.title}</h1>
              <p className="col-span-6 text-right px-8 py-4">
                Price: {product?.price}$
              </p>
            </div>
            <div className="p-4">
              <p className="text-justify">{product?.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Product;
