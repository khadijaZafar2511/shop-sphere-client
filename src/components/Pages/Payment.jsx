

import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
   const stripePromise = loadStripe(
     import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
   );
const Checkout = ({ clientSecrete }) =>
{
 const navigate=useNavigate()
  const elements = useElements();
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState(null);
     
      const [loading, setLoading] = useState(false)
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:5173/paymentSuccess",
          },
        });
           if (error) {
             setErrorMessage(error.message);
               setLoading(false);
               navigate("/paymentFail")
           }
    }

    return <>
     <form onSubmit={handleSubmit}  className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-xl shadow-lg"   >
                <h2 className="text-xl font-bold mb-6 text-gray-800">
                  Secure Payment
                </h2>

                <div className="mb-6">
                  <label className="block text-gray-600 text-sm font-semibold mb-2">
                    Card Information
                  </label>
                  <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                 
                      <PaymentElement  />
                  </div>
                </div>

                <button
                  disabled={!stripe || loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg   "
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </form>
</>;
}

// main component

export default function Payment() {
    const [clientSecrete, setClientSecrete] = useState("");
    const amount = 50;
      const stripeSelect = async () => {
        try {
          // const response = await fetch("http://localhost:3000/payment", {
           const response = await fetch(
             "https://ecomerence-backened.onrender.com/payment",
             {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ amount }),
               credentials: "include",
             },
           );
          const data = await response.json();
          setClientSecrete(data.clientSecrete);
        } catch (err) {
          console.log(err.stack)
          console.log(err)
          alert("Stripe initialization failed");
        }
    };

  const CODSelect = () => {
    toast.success("Order Placed Successfully!", {
      description:
        "Please have the exact amount ready for the rider when your package arrives.",
      duration: 6000, // Keep it on screen longer so they read it
    });
  }
    
    return (
      <>
        <div className="min-h-screen w-full flex flex-col mt-20 items-center">
          <h1 className="font-semibold text-xl mb-10">SELECT PAYMENT METHOD</h1>

          {!clientSecrete ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-70 w-full max-w-2xl place-items-center">
              <div onClick={CODSelect}  className="h-60 w-70 border border-gray-300 p-4 text-center cursor-pointer transform active:scale-95  transition-all">
                <img src="/cash2.png" alt="COD" className="h-40 mx-auto" />
                <p className="font-bold mt-2">Cash On Delivery</p>
              </div>

              <div
                onClick={stripeSelect}
                className="h-60 w-70 border border-gray-300 p-4 text-center cursor-pointer transform active:scale-95 transition-all"
              >
                <img src="/cash3.png" alt="Stripe" className="h-40 mx-auto" />
                <p className="font-bold mt-2">Payment With Stripe</p>
              </div>
            </div>
          ) : (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: clientSecrete }}
            >
              <Checkout clientSecrete={clientSecrete} />
            </Elements>
          )}
        </div>
      </>
    );
 }