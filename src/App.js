import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./component/core/auth/signup";
import Login from "./component/core/auth/login";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col  font-inte">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
