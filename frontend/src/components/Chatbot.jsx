import { useState } from "react";
import api from "../services/api";

function Chatbot() {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 Upload your room image and I will suggest furniture." }
  ]);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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

      setMessages((prev) => [
        ...prev,
        { sender: "user", text: "Uploaded a room image 🖼️" },
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

  return (
    <>

      {/* Floating Chat Bubble */}
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
                </p>

                {/* Product Suggestions */}
                {msg.products && (
                  <div className="grid grid-cols-2 gap-2 mt-2">

                    {msg.products.map((p) => (
                      <div
                        key={p.id}
                        className="border rounded p-1 text-center"
                      >

                        <img
                          src={
                            p.image?.startsWith("http")
                              ? p.image
                              : `/products/${p.image}`
                          }
                          alt={p.name}
                          className="w-full h-24 object-cover rounded"
                          onError={(e) => {
                            e.target.src = "/products/default.jpg";
                          }}
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

          {/* Upload */}
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

        </div>
      )}

    </>
  );
}

export default Chatbot;