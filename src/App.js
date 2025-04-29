import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./component/core/auth/signup";
import Login from "./component/core/auth/login";
import Navbar from "./component/common/Navbar";
import Footer from "./component/common/Footer";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col  font-inte">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
