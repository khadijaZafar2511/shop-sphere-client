
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/authcontext";
import { useNavigate } from "react-router-dom";
import { PopupContext } from "../../Context/popupcontext";
import { toast } from "sonner";
export default function Login({ prop }) {
  const navigate = useNavigate();
  const { userdata,setUserdata } = useContext(AuthContext);
  const { state, dispatch2 } = useContext(PopupContext);
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLogindata({ ...logindata, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://ecomerence-backened.onrender.com/auth/login",
      // "http://localhost:3000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(logindata),
      },
    );

    if (res.ok) {
      const data = await res.json();
      setUserdata(data);
      if (prop) {
        navigate(prop, { replace: true });
     toast("Login successfully!")
      }
      navigate("/");
 
    } else {
      toast("Login failed!")
    }
  };




  useEffect(() => {
    if (userdata && prop) {
       navigate(prop, { replace: true });
   
    }

  }, [prop, userdata])
  

  const navigateHandler = () => {
    navigate("/register");
  };
  const crossHandle = () => {
    if (state.open) {
      dispatch2({ type: "setOpen", payload: false });
      dispatch2({ type: "setRegister", payload: false });
      dispatch2({ type: "setLogin", payload: false });
    }
  };
  const togglePopup = () => {
    if (state.islogin) {
      dispatch2({ type: "setRegister", payload: true });
      dispatch2({ type: "setLogin", payload: false });
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen   px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-extrabold flex justify-between text-gray-900">
            <span>Sign In</span>
            {state.islogin && (
              <img
                onClick={crossHandle}
                className="h-12 w-12"
                src="/cross.png"
              />
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transform active:scale-95 transition-all shadow-md"
            >
              Login
            </button>
            {state.islogin && (
              <>
                <span>
                  Don't have an account?
                  <button onClick={togglePopup} className="text-blue-600">
                    Register
                  </button>
                </span>
              </>
            )}

            {!state.islogin && (
              <>
                <span>
                  Don't have an account?
                  <button onClick={navigateHandler} className="text-blue-600">
                    Register
                  </button>
                </span>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}