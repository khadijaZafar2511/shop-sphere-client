

export default function PaymentFail() {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-2">
        <div className="  flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-xl border border-gray-100 max-w-md w-full  space-y-2 ">
          {/* Simple Red Circle with X */}
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Payment Failed</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Your transaction could not be processed
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-black transition-colors"
          >
            Try Again
          </button>

          <button
            onClick={() => window.history.back()}
            className="  bg-blue-500 text-gray-100 w-full py-3 rounded-md font-medium hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}
