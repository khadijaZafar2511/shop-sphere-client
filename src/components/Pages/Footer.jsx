


const footerNavigation = [
  {
    title: "Customer Service",
    links: [
      { name: "Track Order", path: "/orders" },
      { name: "Shipping Policy", path: "/shipping" },
      { name: "Returns & Exchanges", path: "/returns" },
      { name: "FAQs", path: "/faq" },
    ],
  },
  {
    title: "Shop Categories",
    links: [
      { name: "Men's Fashion", path: "/category/men" },
      { name: "Women's Fashion", path: "/category/women" },
      { name: "Accessories", path: "/category/accessories" },
      { name: "New Arrivals", path: "/new-arrivals" },
    ],
  },
  {
    title: "Our Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Store Locator", path: "/stores" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
  },
];

import React from 'react'

export default function Footer() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8  bg-gray-700 text-white px-5 py-7 mt-15">
        <div>
          <p className="font-semibold lg:text-3xl md:text-3xl text-xl text-blue-400 p-1">
            Ecommerence
          </p>
        </div>
        {footerNavigation.map((section) => (
          <div key={section.title}>
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Add your Newsletter or Brand column here to make it 4 columns */}
      </div>
      ;
    </>
  );
}





