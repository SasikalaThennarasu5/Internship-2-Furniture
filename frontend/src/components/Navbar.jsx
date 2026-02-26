import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="bg-gray-200 px-12 py-5 flex justify-between items-center">
      
      {/* Logo */}
      <div className="text-3xl font-bold italic text-orange-500">
        <Link to="/">Furniture</Link>
      </div>

      {/* Menu */}
      <ul className="flex gap-10 text-lg font-semibold text-gray-600">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-orange-500 pb-1"
                : "hover:text-black"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/shopfurniture"
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-orange-500 pb-1"
                : "hover:text-black"
            }
          >
            Furniture
          </NavLink>
        </li>

        <li>
          <NavLink to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-orange-500 pb-1"
                : "hover:text-black"
            }
          >
            Shop
          </NavLink>
        </li>

        <li>
          <NavLink to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-orange-500 pb-1"
                : "hover:text-black"
            }
          >
            About Us
          </NavLink>
        </li>

        <li>
          <NavLink to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-orange-500 pb-1"
                : "hover:text-black"
            }
          >
            Services
          </NavLink>
        </li>

        <li>
          <NavLink to="/blog"
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-orange-500 pb-1"
                : "hover:text-black"
            }
          >
            Blog
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-orange-500 pb-1"
                : "hover:text-black"
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-8 text-2xl text-black">
        
        {/* User Icon */}
        <Link to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-orange-500 pb-1"
                : "hover:text-black"
            }
          >
          <FaUser className="cursor-pointer" />
        </Link>

        {/* Cart Icon */}
        <Link to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-black border-b-2 border-orange-500 pb-1"
                : "hover:text-black"
            }
          >
          <FaShoppingCart className="cursor-pointer" />
          
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;