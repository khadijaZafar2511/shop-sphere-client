import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/authcontext"; // adjust path to your context
import { toast } from "sonner";
const ProtectedRoute = ({ children }) => {
  const { userdata, loading } = useContext(AuthContext);
    if (!userdata) {
      // alert("You have not login yet !"
      toast.dismiss();
      toast("You have ot login yet!")
    return <Navigate to="/login" replace />;
  }

  // 3. If logged in, show the protected page (Home, Cart, etc.)
  return children;
};

export default ProtectedRoute;