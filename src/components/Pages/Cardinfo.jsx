import {useRef,useContext} from "react";
import Cardlist from "./Cardlist";
import Cardinfochild from "./Cardinfochild";
import { GlobalContext } from "../../Context/context1";
import { useParams } from "react-router-dom";
export default function cardinfo() {

   const myvar = useContext(GlobalContext);
   const { state, dispatch } = myvar;
   const { data } = state;
   const scrollleft = useRef(null);
  const { id } = useParams();
  
 const scrollLeft = () => {
   if (scrollleft.current) {
     scrollleft.current.scrollLeft += 300;
   }
 };
 const scrollRight = () => {
   if (scrollleft.current) {
     scrollleft.current.scrollLeft -= 300;
   }
 };
  return (
    <>
      {data &&
        data.map((p) =>
          p.id != id ? null : (
            <div className="mt-2 overflow-x-hidden" key={p.id}>
              <Cardinfochild p={p} />
            </div>
           
          ),
        )}

      <div className=" mt-8 text-center  text-xl">
        <span>YOU MAY ALSO LIKE</span>
      </div>
      <div className="w-full flex items-center justify-center ">
        <div className="hidden lg:block md:block sm:block mr-4">
         
          {/* Aroow left */}
          <button>
            <svg
              viewBox="0 0 10 17"
              fill="none"
              xmlns="http://www.w3.org"
              className="w-4 h-8.25 transition-colors duration-200 "
            >
              <path
                d="  M8.5 1.5L1.5 8.5L8.5 15.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 hover:text-blue-500"
                onClick={scrollRight}
              />
            </svg>
          </button>
        </div>

        <div
          className=" mt-10  h-full w-10/11 grid    lg:auto-cols-[minmax(220px,1fr)]  grid-flow-col md:auto-cols-[minmax(200px,1fr)]   sm:auto-cols-[minmax(200px,1fr)]  auto-cols-[minmax(185px,1fr)]   p-2  overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
          ref={scrollleft}
        >
          <Cardlist />
        </div>

        <div className="hidden lg:block md:block sm:block ml-4">
          {/* Aroow right */}

          <svg
            viewBox="0 0 10 17"
            fill="none"
            xmlns="http://www.w3.org"
            className="w-4 h-8.25 transition-colors duration-200"
          >
            <path
              d="M1.5 1.5L8.5 8.5L1.5 15.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 hover:text-blue-500"
              onClick={scrollLeft}
            />
          </svg>
        </div>
      </div>
    </>
  );

}
