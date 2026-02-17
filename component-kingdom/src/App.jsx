import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="layout">
      <Header />

      <div className="body">
        <Sidebar />
        <MainContent />
      </div>

      <Footer />
    </div>
  );
}
