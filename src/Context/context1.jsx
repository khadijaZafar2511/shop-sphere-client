import { createContext,useContext, useReducer, useEffect, useState } from "react";
import { fetchurl } from "../Services/Productservice";

export const GlobalContext = createContext();

    function reducer(state, action) {
      switch (action.type) {
        case "setcount":
          return { ...state, count: state.count + 1 };

        case "setloading":
          return { ...state, loading: false };
        case "setdata":
          return { ...state, data: action.payload };
        case "setquery":
          return {
            ...state , query:action.payload
          }
        default:
          return { ...state };
      }
    }
  
export default function GlobalProvider({ children }) {
      const initialState = {
          data: "",
          loading: true,
        value: {
          id: 0,
          count1: 1,
          prev:1
        },
        query:""
       
    };
    

      const [state, dispatch] = useReducer(reducer, initialState);
  const [datac, setDatac] = useState("")
  
 
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include"
    };
 
  
  useEffect(() => {
    const fetchdata = async () => {
    
        const data1 = await fetchurl("/ecomerence", "", options);
        setDatac(data1);
        if (data1) {
          dispatch({ type: "setdata", payload: data1 });
          dispatch({ type: "setloading" });
        }
     
     
    };
    fetchdata();
  }, [state.query]);

    return (
      <>
      
        <GlobalContext.Provider value={{ state, dispatch, initialState }}>
          {children}
        </GlobalContext.Provider>
      </>
    );

}