import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  username: "",
  email: "",
  password1: "",
  password2: "",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/registration/", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* LEFT IMAGE SECTION */}
      <div style={styles.leftSection}>
        <div style={styles.overlay}>
          <h1 style={styles.bannerTitle}>Join With Us</h1>
          <h1 style={styles.bannerBig}>CREATE ACCOUNT</h1>
          <p style={styles.bannerSub}>Start Shopping Today</p>
        </div>
      </div>

      {/* RIGHT REGISTER SECTION */}
      <div style={styles.rightSection}>
        <div style={styles.card}>
          <h2 style={styles.title}>Register</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              style={styles.input}
            />

            

            <input
              type="password"
              name="password1"
              placeholder="Password"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>

          <p style={{ marginTop: "20px", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={styles.linkText}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  leftSection: {
    flex: 1,
    backgroundImage:
      "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },

  overlay: {
    background: "rgba(0,0,0,0.4)",
    color: "white",
    height: "100%",
    padding: "80px",
  },

  bannerTitle: {
    fontSize: "28px",
    marginBottom: "10px",
  },

  bannerBig: {
    fontSize: "42px",
    fontWeight: "bold",
  },

  bannerSub: {
    fontSize: "22px",
    marginTop: "20px",
  },

  rightSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    width: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#c94f4f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },

  linkText: {
    color: "#c94f4f",
    fontWeight: "bold",
  },
};