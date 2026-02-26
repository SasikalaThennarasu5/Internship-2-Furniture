import { useState } from "react";

function Subscribe() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    // Later you can connect API here
    console.log("Subscribed:", email);

    setSuccess(true);
    setEmail("");

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-100 px-20 py-16">
      <div className="grid grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Subscribe to get attractive <br />
            offers on our products
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex bg-white rounded-full overflow-hidden w-[400px] shadow-sm"
          >
            <input
              type="email"
              placeholder="E.g. youremail@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 outline-none"
            />

            <button
              type="submit"
              className="bg-orange-500 text-white px-6 hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>

          {success && (
            <p className="text-green-600 mt-4">
              Successfully subscribed!
            </p>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-end">
          <img
            src="/images/sofa.png"
            alt="Sofa"
            className="h-56 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Subscribe;