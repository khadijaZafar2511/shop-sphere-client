import { createContext, useEffect, useState } from "react";
import { fetchurl } from "../Services/Productservice";
import Cookies from "js-cookie";
 export const AuthContext = createContext();
 

export default function AuthProvider({ children }){
    const [userdata, setUserdata] = useState(null)
    const [loading,setLoading]=useState(true)
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
  };
  

    useEffect(() => { 
        
      const fetchuser = async () => {
        try {


             const loggedInFlag = Cookies.get("isLoggedIn");

             if (!loggedInFlag) {
               // SILENT EXIT: No flag means guest. No 401 error in console!
               setUserdata(null);
               setLoading(false);
               return;
          }
          
          const userd = await fetch(
            "http://localhost:3000/me",
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
    },[])
    return (
      <AuthContext.Provider value={{ userdata, setUserdata, loading }}>
        { children }
        </AuthContext.Provider>
    );
}