import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please accept terms & policy");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        formData
      );

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* LEFT IMAGE SECTION */}
      <div style={styles.leftSection}>
        <div style={styles.overlay}>
          <h1 style={styles.bannerTitle}>Make your Home</h1>
          <h1 style={styles.bannerBig}>FESTIVE READY</h1>
          <p style={styles.bannerSub}>Up to 40% OFF</p>
          <p>Free Delivery Available</p>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div style={styles.rightSection}>
        <div style={styles.card}>
          <h2 style={styles.title}>Sign In</h2>

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
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <span style={{ marginLeft: "8px" }}>
                I understood the <span style={styles.linkText}>terms & policy</span>
              </span>
            </div>

            <button type="submit" style={styles.button}>
              Sign In
            </button>
          </form>

          <div style={styles.divider}>
            <span>OR</span>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      if (!agreed) {
        alert("Please accept terms & policy");
        return;
      }

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/auth/google/",
          {
            access_token: credentialResponse.credential,
          }
        );

        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        alert("Google login successful!");
        navigate("/");
      } catch (error) {
        console.error("Google login error:", error);
        alert("Google login failed");
      }
    }}
    onError={() => {
      alert("Google Sign In Failed");
    }}
  />
</div>
            

          <p style={{ marginTop: "20px", textAlign: "center" }}>
            Don’t have an account?{" "}
            <Link to="/register" style={styles.linkText}>
              Register
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
    fontSize: "48px",
    fontWeight: "bold",
  },

  bannerSub: {
    fontSize: "24px",
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
    padding: "50px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    fontSize: "14px",
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

  divider: {
    textAlign: "center",
    margin: "20px 0",
    color: "#999",
  },

  googleBtn: {
    width: "100%",
    padding: "12px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  linkText: {
    color: "#c94f4f",
    cursor: "pointer",
    fontWeight: "bold",
  },
};