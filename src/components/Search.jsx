import {fetchurl} from "../Services/Productservice";
import { useEffect,useState } from "react";
import { Link,useSearchParams} from "react-router-dom";
import Cards from "./Pages/Cards"


export default function search() {
  const [data, setData] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("products")?searchParams.get("products"):""

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  };

  useEffect(() => {
    const fetchdata = async () => {
       const datas = await fetchurl("/ecomerence",query, options);
        setData(datas)
    }
    fetchdata();
}, [query])

    return (
      <>
        <div className="w-full h-full lg:px-2 lg:py-20 md:py-20 gap-4  ">
    
          <div
              
            className=" grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 mt-16 p-1 lg:mt-0 md:mt-0 sm:mt-0 "
          >
            {data &&
              data.map((p) => (
            <Link
              to={`/home/cardinfo/${p.id}`}
              className="flex items-center mb-3  w-25/26"
              onClick={() => {
                scrollToTop();
              }}
              key={p.id}
            >
              <Cards data={p} />
            </Link>
          ))} 
          </div>
        </div>
      </>
    );

}
