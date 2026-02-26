import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-4xl font-bold text-green-600 mb-6">
        🎉 Order Placed Successfully!
      </h1>

      <p className="mb-8 text-gray-600">
        Thank you for shopping with us.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-8 py-3 rounded-md"
      >
        Back to Home
      </button>

    </div>
  );
}

export default Success;