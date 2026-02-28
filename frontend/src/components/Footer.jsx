import { useEffect, useState } from "react";

import api from "../services/api";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
  api
    .get("site-settings/")   // ✅ NO /api/ here
    .then((res) => setSettings(res.data))
    .catch((err) => console.error(err));
}, []);

  if (!settings) return null;

  return (
    <footer className="bg-white text-gray-700 pt-16 pb-6 px-10">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand Section */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              {settings.site_name}
            </h2>

            <p className="text-gray-600 leading-7 mb-6">
              {settings.footer_description}
            </p>

            

            {/* Social Icons */}
            <div className="flex space-x-6 text-black text-xl mt-4">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank">
                  <FaFacebookF />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank">
                  <FaInstagram />
                </a>
              )}
              {settings.twitter && (
                <a href={settings.twitter} target="_blank">
                  <FaTwitter />
                </a>
              )}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank">
                  <FaLinkedinIn />
                </a>
              )}
            </div>
          </div>

          {/* Static Links */}
          <div>
            <ul className="space-y-3">
              <li>About us</li>
              <li>Services</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-3">
              <li>Support</li>
              <li>Knowledge</li>
              <li>Live chat</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-3">
              <li>Nordic Chair</li>
              <li>Kruzo Aero</li>
              <li>Ergonomic</li>
              <li>Lighting and Decor</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-6 flex justify-between text-sm">
          <p>© {new Date().getFullYear()} {settings.site_name}. All rights reserved.</p>
          <div className="space-x-6">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;