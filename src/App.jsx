import { Elements } from "@stripe/react-stripe-js";
import Navbar from "./components/Navbar";
import Cartlist from "./components/Pages/Cartlist";
import Cardinfo from "./components/Pages/Cardinfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Register from "./components/Pages/Register";
import Login from "./components/Pages/Login";
import Search from "./components/Search";
import Order from "./components/Pages/Order";
import GlobalProvider from "./Context/context1";
import CartProvider from "./Context/cartcontext";
import PopupProvider from "./Context/popupcontext";
import AuthProvider from "./Context/authcontext";
import ProtectedRoute from "./components/Protectedroute";
import Popupmodel from "./components/Popupmodel";
import Orderpage from "./components/Pages/Orderpage";
import Payment from "./components/Pages/Payment";
import PaymentSuccess from "./components/Pages/PaymentSuccess";
import PaymentFail from "./components/Pages/PaymentFail";
import Admin from "./components/Pages/Admin";
// import OrderHistory from "./components/Orderitem"
function App() {
  // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <PopupProvider>
              <GlobalProvider>
                {/* <Elements stripe={stripePromise} > */}
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pop" element={<Popupmodel />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/home/cardinfo/:id" element={<Cardinfo />} />
                  <Route
                    path="/orderpage"
                    element={
                      <ProtectedRoute>
                        <Orderpage />
                      </ProtectedRoute>
                    }
                  />
                  {/* <Route path="/orderh" element={<OrderHistory/>} /> */}
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/paymentSuccess" element={<PaymentSuccess />} />
                  <Route path="/paymentFail" element={<PaymentFail />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route
                    path="/order"
                    element={
                      <ProtectedRoute>
                        <Order />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cartlist />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                {/* </Elements> */}
              </GlobalProvider>
            </PopupProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
