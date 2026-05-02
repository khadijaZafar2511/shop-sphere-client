import { useState ,useContext} from "react";
import { PopupContext } from "../../Context/popupcontext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export default function Register() {

  const navigate=useNavigate()
const{state,dispatch2}=useContext(PopupContext)
    const [formdata, setFormdata] = useState({
      firstname: "",
      lastname:"",
        email: "",
      password: "",
      role: "",
        address:""
    });
  
  const handleChange = (e) => {
        setFormdata({ ...formdata,[ e.target.name ]:(e.target.value) })
        console.log(JSON.stringify( formdata ));
 }

 const handlesubmit = async (e) => {
        e.preventDefault()
     const res = await fetch(
        "https://ecomerence-backened.onrender.com/auth/register",
      //  "http://localhost:3000/auth/register",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formdata),
         credentials: "include",
       },
     );
   const data = await res.json()
        if (res.ok) {
           toast("Register successfully!")
          window.location.href="/login"   }
        else toast("Registration failed!")
  }

  const navigateHandler = () => {
   navigate("/login")
 }
  const crossHandler = () => {
    if (state.open) {
      dispatch2({ type: "setOpen", payload: false })
         dispatch2({ type: "setRegister", payload: false });
         dispatch2({ type: "setLogin", payload: false });
     }
  }

  const togglePopup = () => {
    if (state.isregister) {
      dispatch2({ type: "setRegister", payload: false })
      dispatch2({type:"setLogin",payload:true})
    }
  }

  return(
      <>
      
        <div className="flex   items-center justify-center min-h-screen  ">
          <div className="w-full max-w-lg p-8 space-y-6 bg-white mt-20 sm:mt-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold flex justify-between  text-gray-800">
              Create Account
              <span>
              {state.isregister && <img onClick={crossHandler} className="w-9 h-9" src="/cross.png" />}
              </span>
            </h2>

            <form onSubmit={handlesubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    required
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:ring-1  focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    required
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:ring-1  focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={User}
              >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Detailed Address
                </label>
                <textarea
                  name="address"
                  rows="3"
                  required
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:ring-1  focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="House #, Street, City, Province"
                ></textarea>
              </div>
            <div className="w-full flex  md:flex-row flex-col gap-3 ">
              
              {state.isregister && <div className="w-full md:w-2/3 flex ">
                Alredy have an account?
                <button
                  onClick={togglePopup}
                  className="ml-1 text-blue-900 font-medium"
                >
                  login
                </button>
              </div>}
              
              {!state.isregister && <div className="w-full md:w-2/3 flex ">
                Alredy have an account?
                <button
                  onClick={navigateHandler}
                  className="ml-1 text-blue-900 font-medium"
                >
                  login
                </button>
              </div>}
              
                <button
                  type="submit"
                  className="w-full md:w-auto px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600  transform active:scale-95 transition-all shadow-md focus:outline-none"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
      // document.body,
    );
  // }
}


   
