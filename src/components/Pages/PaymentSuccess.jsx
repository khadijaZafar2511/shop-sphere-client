import { Link } from "react-router-dom"
export default function PaymentSuccess() {
  return (
    <>
      <div className="min-h-screen w-full p-4 bg-gray-100 items-center justify-center flex flex-col ">
        <div className="max-w-md w-full  border border-gray-100 shadow-2xl rounded-3xl">
        

          <div className="p-8 bg-blue-500 text-white  border border-none rounded-2xl">
            <h2 className="text-2xl font-extrabold text-gray-200 mb-2">
              Payment Successful!
            </h2>
            <p className=" mb-2 text-sm">
              Hooray! Your transaction was completed successfully. A
              confirmation email has been sent to you.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Amount Paid:</span>
              <span className="font-bold text-gray-800">$50.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Payment Status:</span>
              <span className="text-green-600 font-bold uppercase text-xs tracking-wider">
                Confirmed
              </span>
            </div>
          </div>

          <div className="space-y-3 px-8 py-3 mb-3  block">
            <Link
              to="/"
              className=" w-full block text-center bg-gray-900 hover:bg-black text-white font-bold py-3 px-12 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Back to Home
            </Link>
            <button
              onClick={() => window.print()}
              className="block w-full  bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold py-3 rounded-xl transition-all"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
