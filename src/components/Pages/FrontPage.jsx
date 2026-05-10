import React from 'react'
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from './Footer';


export default function FrontPage() {
 
  // const productByCategory=
const ecommerceCategories = [
  {
    id: 1,
    name: "Fashion & Apparel",
    slug: "fashion-apparel",
    image: "/fashion1.jpg",
  },
  {
    id: 2,
    name: "Consumer Electronics",
    slug: "consumer-electronics",
    image: "/furniture.png",
  },
  {
    id: 3,
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    image: "/beauty.jpg",
  },
  {
    id: 4,
    name: "Home & Living",
    slug: "home-living",
    image: "/home.png",
  },
  {
    id: 5,
    name: "Health & Wellness",
    slug: "health-wellness",
    image: "/health.png",
  },
];

  return (
    <>
      <div className="min-h-screen max-w-6xl mx-auto overflow-x-hidden  overscroll-x-none">
        <div className="w-full max-w-6xl mx-auto px-1 sm:px-6 lg:px-8 mt-25 md:mt-5 overflow-hidden  ">
          <div className="overflow-hidden border rounded-xl bg-gray-800 shadow-md relative w-full p-2">
            <div className="h-120 md:h-full md:aspect-21/9 m-auto">
              <img
                className=" h-full absolute  md:right-5 object-contain object-center bg-image m-auto"
                src="./online77.png"
                alt="Store Banner"
              />
              <div className="  absolute top-8 left-5 text-gray-100 text-center text-2xl  font-medium image-text ">
                <h3>Quality You Need, Prices You’ll Love.</h3>
              </div>
              <div className=" absolute bottom-5 left-5 w-full">
                <div className="flex gap-2">
                  <button className="bg-blue-500 p-4 border border-none rounded text-gray-100 ">
                    <Link to="/home"> Shop Now</Link>
                  </button>
                  <ArrowRight className="mt-3" color="white" size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid  md:grid-cols-4 grid-cols-2 gap-2 md:gap-5 p-2 md:py-15  md:px-20">
          {ecommerceCategories.map((category) => (
            <div key={category.id}>
              <div  className="md:h-60 h-45 w-full ">
                <Link to={`/${category.name}` }><  img
                  className="w-full h-full object-cover border border-none rounded-md"
                  src={category.image}
                /></Link>
              </div>
              <p className="text-sm  text-center w-full p-2">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}



// https://dummyjson.com/products?select=title,price,category,price,rating,stock,tags,brand,warrantyInformation,rating,images,description