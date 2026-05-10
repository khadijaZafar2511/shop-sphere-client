import { createContext, useEffect, useState } from "react";
import { fetchurl } from "../Services/Productservice";
import Cookies from "js-cookie";
 export const AuthContext = createContext();
 

export default function AuthProvider({ children }){
    const [userdata, setUserdata] = useState(null)
  const [loading, setLoading] = useState(true)
const [loggedInFlag ,setLoggedInFlag]=useState(null)
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
  };
// console.log(Cookies.get("isLoggedIn"))

    useEffect(() => { 
        
      const fetchuser = async () => {
        try {


          setLoggedInFlag(Cookies.get("isLoggedIn"));
          // console.log(Cookies.get("isLoggedIn"));
// console.log(loggedInFlag)
             if (!loggedInFlag) {
               // SILENT EXIT: No flag means guest. No 401 error in console!
               setUserdata(null);
               setLoading(false);
               return;
          }
          
          const userd = await fetch(
            "https://ecomerence-backened.onrender.com/me",
            options,
          );
          
          if (userd.ok) {
            const user = await userd.json();
            setUserdata(user);
                 
          } else {
            setUserdata(null);
          }
            
        } catch (err) {
          // console.error(err)
          console.error("Auth fetch failed:", err);
          setUserdata(null);
        } finally {
          setLoading(false);
        }
       
      } 
       fetchuser();
    },[loggedInFlag])
    return (
      <AuthContext.Provider value={{ userdata, setUserdata, loading  , setLoggedInFlag,loggedInFlag}}>
        { children }
        </AuthContext.Provider>
    );
}