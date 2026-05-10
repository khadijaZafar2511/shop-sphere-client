import Cart from "./Cart";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/cartcontext";
import { useNavigate } from "react-router-dom";
import { fetchurl } from "../../Services/Productservice";
export default function Cartlist() {
  const myvar = useContext(CartContext);
  if (!myvar) return null;
  const { state, dispatch } = myvar;
  const { cart } = state;

  const navigate = useNavigate();

  return (
    <>
      
      <div className="md:mt-4 mt-15  w-full grid  gap-1">
        {cart && cart.length != 0 ? (
          <>
            {cart.map((p) => (
              <Cart key={p.product._id} cartc={p} />
            ))}
          </>
        ) : (
          <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center  ">
            <h1 className="lg:text-2xl text-xl font-semibold text-gray-700 mb-10">
              No items in cart yet
            </h1>
            <button
              onClick={() => {
                navigate("/home");
              }}
              className="tracking-wider text-sm font-semibold lg:h-15 lg:w-80 h-13 w-60 border rounded-4xl text-gray-200 bg-blue-500  mb-30"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </>
  );
}
