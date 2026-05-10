import React from 'react'
import { useState,useEffect } from 'react';
import { useParams ,Link} from "react-router-dom";
import Cards from "./Cards";
export default function ProductsBYCategory() {
    const { category } = useParams();
    // console.log(category)
    const [productsByCategory, setProductsByCategory] = useState("");
    const[loading ,setLoading]=useState(true)
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
    useEffect(() => {
        const fetchProducts = async () => {
    const encodedCategory = encodeURIComponent(category);
  const res = await fetch(
    `https://ecomerence-backened.onrender.com/ecomerence/prByCategory?category=${encodedCategory}`,
    // `http://localhost:3000/ecomerence/prByCategory?category=${encodedCategory}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
            if (res.ok) {
                const products = await res.json();
                setLoading(false)
  if (products) {
    setProductsByCategory(products);
  }
}
  
};
if (category) {
  fetchProducts();
}
     },[])
    
        
    
 
    
    
    return (
      <>
        {loading ? (
          <div className="  flex  flex-col mt-25 items-center justify-center ">
            <img className="h-10 w-10" src="/loading1.gif" />
            <h1 className="font-semibold text-2xl mt-15">
              Loading Products ......
            </h1>
          </div>
            ) : productsByCategory.length > 0 ? (
                     <div className="w-full h-full lg:px-2 lg:py-20 md:py-20 gap-4  ">
                 <div className=" grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 mt-16 p-1 lg:mt-0 md:mt-0 sm:mt-0 ">
                            {productsByCategory.map((p) => (
                                <Link
                                    to={`/home/cardinfo/${p.id}`}
                                    className="flex items-center mb-3 hover:scale-102 w-25/26"
                                    onClick={scrollTop}
                                    key={p.id}
                                >
                                    <Cards data={p} />
                                </Link>
                            
                            ))}
                        </div>
                    </div>
) : (
  <div className="flex flex-col items-center justify-center w-full py-20 text-gray-700">
    <p className="text-xl font-medium">No products found</p>
    <p className="text-sm">Try adjusting your filters or category selection.</p>
  </div>
)}

     
     
      </>
    );
}
