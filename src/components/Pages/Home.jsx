import Cardlist from "./Cardlist";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../Context/context1";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const myvar = useContext(GlobalContext);
  const { state } = myvar;
  const { loading } = state;

  return (
    <>
      {loading ? (
        <div className="  flex  flex-col mt-25 items-center justify-center ">
          <img className="h-10 w-10" src="/loading1.gif" />
          <h1 className="font-semibold text-2xl mt-15">
            Loading Products ......
          </h1>
        </div>
      ) : (
        <div className="w-full h-full lg:px-2 lg:py-20 md:py-20 gap-4  ">
          <div className=" grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 mt-16 p-1 lg:mt-0 md:mt-0 sm:mt-0 ">
            <Cardlist />
          </div>
        </div>
      )}
    </>
  );
}
