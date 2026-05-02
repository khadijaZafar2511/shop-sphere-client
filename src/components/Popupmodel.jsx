import { createPortal } from "react-dom";
import { useContext } from "react";
import { PopupContext } from "../Context/popupcontext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
export default function Popupmodel({prop}) {
  // console.log(props)
  const { state } = useContext(PopupContext);
  if (!state.open) return null;
  return createPortal(
    <>
      <div className="flex fixed z-50 inset-0 bg-black/50  items-center justify-center w-full min-h-screen">
        <div className="w-full min-h-screen">
          {state.islogin ? <Login prop={ prop} /> : <Register />}
        </div>
      </div>
    </>,
    document.body,
  );
}
