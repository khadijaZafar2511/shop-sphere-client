
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { fetchurl } from "../Services/Productservice"
import { AuthContext } from "./authcontext"
import { useNavigate } from "react-router-dom";
export const CartContext = createContext();
  
function reducer (state,action) {
    switch (action.type) {
        case "setcart":
            return {
              ...state,
                cart: action.payload.cartitems || [],
              billing:action.payload.billing||0,
              loading: false,
            };
        case "addcart":
            const existing = state.cart.find(p => p.product._id === action.id)
            let updatedcart;
            if (existing)
                updatedcart = state.cart.map(pr => pr.product._id === action.id ? { ...pr, quantity: pr.quantity + (action.qnty1 || 1) } : pr)
             else
               updatedcart=  [...state.cart, action.payload]
             return {
                    ...state,
                    cart: updatedcart || [],
                   billing:updatedcart.reduce((total,item)=>total+(item.product.price*item.quantity),0)
                }
        case "deletecart":
            let filteredcart = state.cart.filter(
              (prd) => prd.product._id != action.id,
            );
            return {
                ...state,
                cart: filteredcart || [],
                billing :filteredcart.reduce((total , item)=>total+(item.product.price*item.quantity),0)
            }
        case "updatevalue":
            let uvcart = state.cart.map((pr) =>
                pr.product._id === action.payload
                    ? { ...pr, quantity: action.payload2 }
                    : pr,
            );
            return {
                ...state,
                cart: uvcart || [],
                quantity: uvcart.reduce((total, item)=>total+(item.product.price*item.quantity),0)
             
            }
    
        default : return state
    }
}


export default function CartProvider({ children }) {
    const { userdata,loading } = useContext(AuthContext)
    const navigate = useNavigate();
    const initialState = {
        cart: [],
        billing: 0,
        loading: false,
        count:0
    }
    const [state, dispatch] = useReducer(reducer, initialState);


    const options = {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        },
        credentials:"include"
    }
    useEffect(() => {
        const fetchcart = async () => {
            if (loading) return null;
            if (userdata) {
                const datac = await fetchurl("/cart", "", options);
               
                if (datac) {
                   
                     dispatch({ type: "setcart", payload: datac });
                }
                // navigate("/home");
           
            }  
        }
        fetchcart()
       
     },[userdata])


    return (
        <CartContext.Provider value={{ state, dispatch, initialState }}>
            {children}
        </CartContext.Provider>
    )
}