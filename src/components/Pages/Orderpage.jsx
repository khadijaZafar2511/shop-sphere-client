import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    paid: "bg-blue-100 text-blue-700 border-blue-200",
    shipped: "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200", 
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border uppercase  ${colors[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
};

export default function Orderpage() {
  const [orderdata, setOrderdata] = useState([]);

  useEffect(() => {
    const orderfetch = async () => {
      try {
        const res = await fetch(
          // "https://ecomerence-backened.onrender.com/order",
          "http://localhost:3000/order",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );
        const order = await res.json();
        setOrderdata(order);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    orderfetch();
  }, []);

  // NEW: Function to handle order cancellation
  const handleCancel = async (orderId) => {
    try {
      const res = await fetch(
        `https://ecomerence-backened.onrender.com/order/${orderId}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
        toast.dismiss();
  toast.promise(res, {
    loading: 'Requesting cancellation...',
    success: () => {
      return 'Order successfully cancelled!';
    },
        error: () => {
      // Revert your optimistic state here if you stored the previous data!
      return 'Failed to cancel order. It might already be processed.';
    },
  });
      if (res.ok) {
        setOrderdata((prev) =>
          prev.map((ord) =>
            ord._id === orderId ? { ...ord, status: "cancelled" } : ord,
          ),
        );
      
      }
    } catch (err) {
      console.error("Cancel request failed:", err);
    }
  };
  return (
    <>
      {orderdata && orderdata.length != 0 ? (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Order History
          </h1>

          <div className="space-y-6">
            {orderdata.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Header: Order Info & Status */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Order ID
                    </p>
                    <p className="text-sm font-mono font-medium text-gray-700">
                      {order._id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Status
                    </p>
                    <StatusBadge status={order.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-6 p-2">
                  {/* Column 1: Items List */}
                  <div className="md:col-span-2 border-r border-gray-100 md:pr-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Items Summary
                    </h3>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400">
                              {item.quantity}x
                            </div>
                            <div>
                              <p className="text-sm font-semibold flex gap-4 text-gray-800">
                                <span>{item.name}</span>
                                <span className="font-bold hidden md:block">
                                  Rs. {item.price * item.quantity}
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 flex justify-between">
                                <span>Rs. {item.price.toFixed(2)} each</span>
                              </p>
                            </div>
                          </div>
                          <div className="p-1 border border-gray-300">
                            <img
                              className="h-20 w-20"
                              src={item.product.images[1]}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Shipping & Total */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-2">
                        Shipping To
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {order.shippingAdress.address},<br />
                        {order.shippingAdress.city},{" "}
                        {order.shippingAdress.province}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 font-medium">
                          Grand Total
                        </span>
                        <span className="text-xl font-black text-blue-500">
                          Rs. {order.totalAmount.toFixed(2)}
                        </span>
                      </div>

                      {/* CONDITIONAL BUTTONS */}
                      {order.status === "pending" ? (
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="w-full mt-4 bg-white border-2 border-gray-900 text-gray-900 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-900 hover:text-white transition-all"
                        >
                          Cancel Order
                        </button>
                      ) : order.status === "delivered" ? (
                        <button className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors">
                          Buy Again
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full mt-4 bg-gray-200 text-gray-400 py-2.5 rounded-lg text-sm font-bold cursor-not-allowed"
                        >
                          In Progress
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen overflow-hidden flex flex-col items-center justify-center  ">
          <p className=" mr-2 lg:text-2xl text-xl font-semibold text-gray-700 mb-5">
            Move to
            <Link to="/home" className="text-blue-500">
              <span> HOME</span>
            </Link>
          </p>
          <button className="tracking-wider text-sm font-semibold lg:h-15 lg:w-80 h-13 w-60 border rounded-4xl text-white bg-blue-500">
            YOU HAVE NOT ORDER YET
          </button>
        </div>
      )}
    </>
  );
}
