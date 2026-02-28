import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";
import HeroSection from "../components/HeroSection";
import Subscribe from "../components/Subscribe";

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("contact/", formData);
      setSuccess(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <HeroSection
        hero={{
          title: "Contact Us",
          subtitle: "We are here to help you anytime",
          background_image: "/images/shop-banner.png",
          button1_text: "Contact Us",
          button2_text: "Our Services",
        }}
      />

      <div className="bg-gray-100 min-h-screen py-16 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Top Contact Info Row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-16 text-center">

            <div className="flex items-center gap-4">
              <div className="bg-orange-500 text-white p-4 rounded-lg">
                📍
              </div>
              <span className="text-gray-700 font-medium">
                Chidambaram, Cuddalore
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-500 text-white p-4 rounded-lg">
                ✉️
              </div>
              <span className="text-gray-700 font-medium">
                info@mail.com
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-500 text-white p-4 rounded-lg">
                📞
              </div>
              <span className="text-gray-700 font-medium">
                +8352678452
              </span>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-gray-300 p-10 rounded-md">

            {success && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
                Message sent successfully! We’ll contact you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* First & Last Name */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-100 px-4 py-3 rounded-md outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full bg-gray-100 px-4 py-3 rounded-md outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 px-4 py-3 rounded-md outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 px-4 py-3 rounded-md outline-none"
                />
              </div>

              {/* Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
                >
                  {loading ? "Sending..." : "Sent Message"}
                </button>
              </div>

            </form>
          </div>

        </div>
        <Subscribe />
      </div>
    </MainLayout>
  );
};

export default Contact;