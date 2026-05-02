import { createPortal } from "react-dom";

export default function Modal({ props }) {
   
    const infohandler = () => {
      setSaveinfo(true);
  };
  const popuphandler = () => {
    props.setIsopen(false)
  }
    if (!props.isopen) return null;
 

  //  const showpopup = () => {};
    
  return createPortal(
    <div className=" min-h-screen  fixed inset-0 z-50 bg-black/50 backdrop-blur-sm py-4 px-4 lg:px-30 md:px-4 sm:px-4 overflow-x-hidden">
      <div className=" max-h-[95dvh] p-8 rounded-xl shadow-lg space-y-9 text-left bg-white overflow-y-auto ">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
          User Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-600 mb-1">
              First Name
            </div>
            <input
              type="text"
              placeholder="Enter first name"
              className="py-2 px-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-600 mb-1">
              Last Name
            </div>
            <input
              type="text"
              placeholder="Enter last name"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-600 mb-1">
              Email
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-600 mb-1">
              Adress
            </div>
            <input
              type="text"
              placeholder="Enter your adress"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-600 mb-1">City</div>
            <input
              type="text"
              placeholder="Enter your city"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-600 mb-1">
              Select your province
            </div>
            <select className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none ">
              <option>Punjab</option>
              <option>Sindh</option>
              <option>Balochistan</option>
              <option>K.P.K</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex gap-5">
          <button
            onClick={popuphandler}
            type="button"
            className="w-auto bg-blue-500 text-white px-12 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button
            onClick={popuphandler}
            type="button"
            className="px-12 py-2 rounded-md bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );

}

