import { useState } from "react";
import api from "../services/api";

function Chatbot() {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I am your AI Interior Designer!" },
    { sender: "bot", text: "Which room are you designing?" }
  ]);

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOption = (value) => {

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: value }
    ]);

    let nextQuestion = "";

    const updatedAnswers = { ...answers };

    if (step === 1) {
      updatedAnswers.room = value;
      nextQuestion = "What is the size of your room?";
      setStep(2);
    }

    else if (step === 2) {
      updatedAnswers.size = value;
      nextQuestion = "What style do you prefer?";
      setStep(3);
    }

    else if (step === 3) {
      updatedAnswers.style = value;
      nextQuestion = "What color theme do you like?";
      setStep(4);
    }

    else if (step === 4) {
      updatedAnswers.color = value;
      nextQuestion = "What is your budget?";
      setStep(5);
    }

    else if (step === 5) {
      updatedAnswers.budget = value;
      nextQuestion = "What furniture are you looking for?";
      setStep(6);
    }

    else if (step === 6) {
      updatedAnswers.furniture = value;
      nextQuestion = "Great! Now upload your room image 🖼️";
      setStep(7);
    }

    setAnswers(updatedAnswers);

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: nextQuestion }
    ]);
  };


  const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImage(file);
  setImagePreview(URL.createObjectURL(file));
};

  const sendImage = async () => {

    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);

    try {

      const res = await api.post("ai-room/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Products from backend:", res.data.products);

      setMessages((prev) => [
        ...prev,
        {
  sender: "user",
  text: "Uploaded a room image 🖼️",
  image: imagePreview
},
        {
          sender: "bot",
          text: res.data.suggestion,
          products: res.data.products,
        },
      ]);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };


  const getOptions = () => {

    if (step === 1)
      return ["Living Room", "Bedroom", "Dining Room", "Office", "Kitchen"];

    if (step === 2)
      return ["Small", "Medium", "Large"];

    if (step === 3)
      return ["Modern", "Minimalist", "Traditional", "Scandinavian", "Luxury"];

    if (step === 4)
      return ["White / Neutral", "Wooden / Brown", "Dark / Black", "Colorful"];

    if (step === 5)
      return ["Under ₹10,000", "₹10,000 – ₹50,000", "₹50,000+"];

    if (step === 6)
      return ["Sofa", "Chair", "Table", "Bed", "Wardrobe", "TV Unit"];

    return [];
  };


  return (
    <>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-black text-white w-14 h-14 rounded-full shadow-lg text-xl flex items-center justify-center"
      >
        💬
      </button>


      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white shadow-xl rounded-lg p-4">

          <h2 className="font-bold mb-3 text-center">
            AI Interior Designer
          </h2>

          {/* Messages */}
          <div className="h-64 overflow-y-auto border p-2 mb-3 rounded">

            {messages.map((msg, index) => (
              <div key={index} className="mb-3">

                <p
                  className={`text-sm ${
                    msg.sender === "bot"
                      ? "text-blue-600"
                      : "text-gray-800 text-right"
                  }`}
                >
                  {msg.text}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Uploaded Room"
                      className="mt-2 w-full h-32 object-cover rounded"
                    />
                  )}
                </p>

                {/* Product Suggestions */}
                {msg.products && (
  <div className="grid grid-cols-2 gap-2 mt-2">

    {msg.products.map((p) => (
      <div key={p.id} className="border rounded p-1 text-center">

        <img
          src={
            p.images && p.images.length > 0
              ? p.images[0].image
              : "/images/products/default.jpg"
          }
          alt={p.name}
          className="w-full h-24 object-cover rounded"
        />

        <p className="text-xs mt-1 font-medium">
          {p.name}
        </p>

      </div>
    ))}

  </div>
)}

              </div>
            ))}

            {loading && <p className="text-sm">Analyzing room...</p>}

          </div>


          {/* Options */}
          {step <= 6 && (
            <div className="grid grid-cols-2 gap-2 mb-3">

              {getOptions().map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOption(opt)}
                  className="bg-gray-200 text-sm py-1 rounded"
                >
                  {opt}
                </button>
              ))}

            </div>
          )}


          {/* Upload */}
          {step === 7 && (
            <>
              <input
                type="file"
                onChange={handleImageChange}
                className="text-sm"
              />

              <button
                onClick={sendImage}
                className="mt-2 w-full bg-black text-white py-2 rounded"
              >
                Analyze Room
              </button>
            </>
          )}

        </div>
      )}

    </>
  );
}

export default Chatbot;