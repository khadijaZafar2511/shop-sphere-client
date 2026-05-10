import Cardlist from "./Cardlist";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../Context/context1";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const myvar = useContext(GlobalContext);
  const { state } = myvar;
  const { loading ,data} = state;

  return (
    <>
      {loading ? (
        <div className="  flex  flex-col mt-25 items-center justify-center ">
          <img className="h-10 w-10" src="/loading1.gif" />
          <h1 className="font-semibold text-2xl mt-15">
            Loading Products ......
          </h1>
        </div>
      ) : data.length > 0 ? (
        <div className="w-full h-full lg:px-2 lg:py-20 md:py-20 gap-4  ">
          <div className=" grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 mt-16 p-1 lg:mt-0 md:mt-0 sm:mt-0 ">
            <Cardlist />
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen">
          <div className="  flex flex-col items-center justify-center w-full py-24 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            {/* You can add a Shopping Bag icon here from lucide-react */}
            <h2 className="text-2xl font-semibold text-gray-800">
              Our catalog is coming soon!
            </h2>
            <p className="mt-2 text-gray-500 max-w-sm">
              We are currently updating our collection. Check back soon for the
              latest quality products at prices you’ll love.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
}
