import { useContext, useState } from "react";
import { useRef } from "react";
import { CartContext } from "../../Context/cartcontext";
import { fetchurl } from "../../Services/Productservice";
import { AuthContext } from "../../Context/authcontext";
import { toast } from "sonner";
export default function Cart({ cartc }) {
  const [qnty, setQnty] = useState(cartc.quantity);
  const { userdata, loading } = useContext(AuthContext);
  const [isDeleting, setIsDeleting] = useState("");
  const [timer, setTimer] = useState(null)
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  // delete handler
  async function deletehandler(productId) {
    if (isDeleting) return;
    setIsDeleting(productId);
    const fetchdata = await fetchurl(`/cart/${cartc.product._id}`, "", options);
    if (fetchdata.message == "success") {
      dispatch({
        type: "deletecart",
        payload: cartc,
        id: cartc.product._id,
      });
      dispatch({ type: "setcart", payload: fetchdata.cart });
        toast.dismiss();
      toast("Product deleted successfully!")
    }
  }


  // update handler
  const updatehandler = async (nextqnty) => {
   
    const options2 = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ quantity: nextqnty }),
    };
    const putdata = await fetchurl(
      `/cart/${cartc.product._id}`,
      "",
      options2,
    );
      
    if (putdata) {
      dispatch({
        type: "updatevalue",
        payload: cartc.product._id,
        payload2: nextqnty,
      });
      dispatch({ type: "setcart", payload: putdata.updatecart });
    }
  }
 

    const myvar = useContext(CartContext);
    const { state, dispatch } = myvar;

    return (
      <>
        {cartc && (
          <div
            key={cartc.product._id}
            className="  w-full h-50 flex flex-col gap-3  px-4 py-2"
          >
            <div className=" shadow-gray-300 shadow  w-full lg:w-2/3  flex items-center   h-55  ">
              <div className="border border-gray-300 w-2/5 md:w-1/5 sm:w-1/5 lg:w-50 h-40">
                <img
                  className="w-full h-full "
                  src={
                    cartc.product.images[0]
                      ? cartc.product.images[0]
                      : cartc.product.images[1]
                  }
                />
              </div>
              <div className="flex w-6/7 lg:w-full flex-col lg:flex-row ">
                <div className="h-full  w-full flex flex-col  px-4  gap-2">
                  <p className="text-[15px] text-gray-500 lg:font-bold md:text-xl lg:text-xl flex">
                    {cartc.product.title}
                  </p>
                  <p className="text-sm  text-gray-700 font-semibold">
                    PKR {Math.round(cartc.product.price * qnty)}
                  </p>
                  <p className="text-gray-500 text-[10px] lg:text-sm md:text-sm">{`${cartc.product.tags[0] ? cartc.product.tags[0] : cartc.product.title} | ${cartc.product.tags[1] ? cartc.product.tags[1] : cartc.product.title}`}</p>
                </div>
                <div className="   flex ml-7 mt-8 lg:p-4 gap-5 lg:ml-10 ">
                  <div className=" flex w-30 h-7 ">
                    <button
                      onClick={() => {
                        let nextqnty =
                          cartc.quantity > 1
                            ? cartc.quantity - 1
                            : cartc.quantity;
                        setQnty(nextqnty);
                        updatehandler(nextqnty);
                      }}
                      className="w-1/4 h-7 border border-gray-300 bg-gray-300   flex items-center justify-center  rounded-l"
                    >
                      <span className="text-4xl mb-2">-</span>
                    </button>
                    <input
                      type="text"
                      disabled
                      value={qnty || 0}
                      className="w-1/4  h-7 border border-gray-300 text-center "
                    />
                    <button
                      onClick={() => {
                        let nextqnty =
                          cartc.quantity < 5
                            ? cartc.quantity + 1
                            : cartc.quantity;
                        setQnty(nextqnty);
                        updatehandler(nextqnty);
                      }}
                      className="w-1/4 h-7 border border-gray-300 rounded-r flex items-center justify-center"
                    >
                      <span className="text-2xl mb-2">+</span>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      deletehandler(cartc.product._id);
                    }}
                    className="w-5 mt-1 h-5"
                  >
                    <img src="/bin.png" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
