
import { useContext, useState,  useEffect } from "react";
import {  Link,useNavigate,useLocation } from "react-router-dom";
import { fetchurl } from "../../Services/Productservice";
import { CartContext } from "../../Context/cartcontext";
import { AuthContext } from "../../Context/authcontext";
import { PopupContext } from "../../Context/popupcontext";
import Popupmodel from "../Popupmodel";
import { toast } from "sonner";
export default function Cardinfochild({ p }) {
  const { userdata } = useContext(AuthContext) 
  const {state ,dispatch2}=useContext(PopupContext)
const [qnty, setQnty] = useState(1);
  const myvar = useContext(CartContext)
  const { dispatch } = myvar;
  const navigate = useNavigate();
  const location = useLocation()
  const redirectpath = location.pathname;
  const [form, setForm] = useState({
    productid: null,
      quantity: 1,
    billing:0
  });
       const options = {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         credentials: "include",
         body: JSON.stringify(form),
       };
  const carthandler = () => {
    if (userdata) {
            const fetchdata = async () => {
              const datac = await fetchurl("/cart", "", options);
            };

            fetchdata();

            (dispatch({ type: "setcount" }),
              dispatch({
                type: "addcart",
                payload: { product: p, quantity: qnty },
                id: p._id,
                qnty1: qnty,
              }));
                toast.dismiss();
    toast("Product added successfully!");
    }
    else {
      // alert("You have not login yet")
      toast("You have not login yet!")
      dispatch2({ type: "setOpen", payload: true })
        dispatch2({ type: "setLogin", payload: true });
    }
        
  };
  
  const buynowHandler = () => {
   if (!userdata)
   {
      // dispatch2({ type: "setOpen", payload: true });
      // dispatch2({ type: "setLogin", payload: true });
   }
 }
    
     useEffect(() => {
         setForm({
             productid: p._id, quantity: qnty,
           billing:p.price
       });
     }, [qnty]);
  return (
    <>
      {state.open && <Popupmodel prop={ redirectpath} />}
      <div
        id="main"
        key={p._id}
        className="flex lg:flex-row md:flex-row sm:flex-row flex-col lg:gap-3   w-full h-screen "
      >
        <div className="lg:h-full lg:w-1/2 md:h-full md:w-1/2  sm:h-full sm:w-1/2 h-4/7 w-full flex  justify-center  lg:mt-13 md:mt-13 sm:mt-10   mt-2">
          <div className=" h-full lg:grid lg:grid-cols-1 lg:*:w-30  lg:*:h-40 *:mt-1 md:hidden sm:hidden  *:bg-radial *:from-[#c7c1B4] *:via-[#C4BEB0] *:to-[#9F9888] overflow-y-scroll  [&::-webkit-scrollbar]:w-1    [&::-webkit-scrollbar-track]:bg-gray-100  [&::-webkit-scrollbar-thumb]:bg-gray-500  [&::-webkit-scrollbar-thumb]:rounded-none  overflow-x-hidden">
            <div className="h-full w-full mr-1">
              <img
                src={p.images[2] ? p.images[2] : p.images[1]}
                className="h-full  w-full"
              />
            </div>
            <div>
              <img
                src={p.images[0] ? p.images[0] : p.images[1]}
                className="h-full  w-full"
              />
            </div>
            <div>
              <img
                src={p.images[1] ? p.images[1] : p.images[0]}
                className="h-full  w-full"
              />
            </div>
            <div>
              <img
                src={p.images[2] ? p.images[2] : p.images[1]}
                className="h-full  w-full"
              />
            </div>
          </div>
          <div className="hidden lg:block md:block sm:block lg:h-9/10 lg:w-7/10 md:h-5/6 md:w-9/10 sm:h-full sm:w-9/10 h-full w-full  bg-radial from-[#c7c1B4] via-[#C4BEB0] to-[#9F9888] lg:ml-4 ">
            <img
              src={p.images[0] ? p.images[0] : p.images[1]}
              className="h-full  w-full "
            />
          </div>
        </div>
        <div className="  lg:h-full lg:w-1/2  md:h-full md:w-1/2  w-full flex lg:mt-13 md:mt-13 sm:mt-10  justify-center ">
          <div className="w-full lg:h-9/10 md:h-8/10 h-full bg-white flex flex-col ">
            <p className=" px-1 mt-2 text-sm text-gray-500">{`${p.tags[0] ? p.tags[0] : p.title} | ${p.tags[1] ? p.tags[1] : p.title}`}</p>
            <h1 className=" px-1  text-2xl text-gray-700 font-bold font-sans">
              {p.title}
            </h1>
            <p className="mt-2  px-1 text-xl text-gray-700 font-semibold ">
              PKR {p.price}
            </p>
            <p className=" px-1 mt-1 text-[13px] text-gray-700 ">
              SKU: 1-26-130-A-E
            </p>
            <div className=" flex flex-col md:w-2/3 w-full gap-2 border-t border-gray-200 md:border-none md:shadow-none shadow shadow-gray-300  md:ml-7  md:static fixed z-50 left-0 bottom-0 bg-white">
              <button
                onClick={carthandler}
                className=" border rounded-4xl md:px-12 px-5 py-3  text-[15px] text-white bg-gray-800 hover:bg-gray-900 transform active:scale-95 transition-all shadow-md mt-7  "
              >
                ADD TO CART
              </button>

              <Link
                to="/order"
                state={{
                  products: [
                    {
                      product: p,
                      quantity: qnty,
                    },
                  ],
                }}
                className=" border rounded-4xl px-12 py-3 mb-2 text-[15px] text-white bg-blue-500 hover:bg-blue-600 transform active:scale-95 transition-all shadow-md text-center"
              >
                <button onClick={buynowHandler}>BUY NOW</button>
              </Link>
            </div>
            <div className="  lg:w-3/4 lg:h-4/5 md:w-5/6 md:h-4/5 sm:w-4/5 sm:h-1/3 w-full h-2/3 lg:ml-3 md:ml-3 sm:ml-3 px-2 border-t border-t-gray-400 mt-7 text-sm  flex flex-col gap-3 overflow-y-scroll  [&::-webkit-scrollbar]:w-1    [&::-webkit-scrollbar-track]:bg-gray-100  [&::-webkit-scrollbar-thumb]:bg-gray-500  [&::-webkit-scrollbar-thumb]:rounded-none ">
              <h1 className="text-gray-800 font-bold text-xl ml-2 mt-2">
                Details
              </h1>
              <p>
                <span className="text-gray-800 font-bold text-[15px] mr-1">
                  Description :
                </span>
                <span className="text-[13px]">{p.description}</span>
              </p>
              <div>
                <span className="text-gray-800 font-bold text-[15px]">
                  Attributes
                </span>
                <p>
                  <span className="text-gray-800 font-bold text-[12px] mr-1">
                    Brand :
                  </span>
                  {p.brand}
                </p>
                <p>
                  <span className="text-gray-800 font-bold text-[12px] mr-1">
                    Rating :
                  </span>
                  {p.rating}
                </p>
                <p>
                  <span className="text-gray-800 font-bold text-[12px] mr-1">
                    Stock :
                  </span>
                  {p.stock}
                </p>
                <p>
                  <span className="text-gray-800 font-bold text-[12px] mr-1">
                    Warranty :
                  </span>
                  {p.warrantyInformation}
                </p>
              </div>

              <div className="h-20/21 w-full border-t border-t-gray-400 mt-4 flex">
                <div className="h-full  w-1/3 flex items-center justify-center">
                  <img
                    className=" h-6/7 w-9/10 bg-radial  from-[#c7c1B4] via-[#C4BEB0] to-[#9F9888]"
                    src={p.images[0] ? p.images[0] : p.images[1]}
                  />
                </div>
                <div className=" w-2/3">
                  <div className="h-full  w-full flex flex-col  px-4  gap-2">
                    <p className="text-[15px] font-semibold   mt-2 text-gray-900 flex">
                      {p.title}
                    </p>
                    <p className="text-sm  text-gray-700 font-semibold">
                      {/* PKR {Math.round(p.price * p.qty)} */}
                      PKR {Math.round(p.price * qnty)}
                    </p>
                    <p className="text-gray-500 text-[10px] lg:text-sm md:text-sm">
                      Quantity
                    </p>
                    <div className="flex gap-5 lg:p-5">
                      <div className=" flex w-70 h-7 ">
                        <button
                          onClick={() => setQnty(qnty - 1)}
                          className="w-1/4 h-7 border border-gray-300 bg-gray-300   flex items-center justify-center  rounded-l"
                        >
                          <span className="text-4xl mb-2">-</span>
                        </button>
                        <input
                          type="text"
                          disabled
                          value={qnty}
                          className="w-1/4  h-7 border border-gray-300 text-center "
                        />
                        <button
                          onClick={() => setQnty(qnty + 1)}
                          className="w-1/4 h-7 border border-gray-300 rounded-r flex items-center justify-center"
                        >
                          <span className="text-2xl mb-2">+</span>
                        </button>
                      </div>
                      <p className="w-40 text-gray-500">Stock : {p.stock}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
