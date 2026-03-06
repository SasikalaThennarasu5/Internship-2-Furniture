import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Full Width Navbar */}
      <Navbar />

      {/* Page Content (No Width Restriction Here) */}
      <main className="flex-grow">
        {children}
      </main>

      

      {/* Full Width Footer */}
      <Footer />

      <Chatbot />

    </div>
  );
}

export default MainLayout;