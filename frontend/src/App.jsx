import React from "react";
import Nav from "./components/Nav";
// import Outlet from "./pages/Outlet";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import { LogIn } from "lucide-react";
import Login from "./pages/Login";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Layout from "./layout/layout";
function App() {
  return (
    <div className="">
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect" element={<div className="min-h-screen flex items-center justify-center text-white text-2xl">Connect Page</div>} />
            <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center text-white text-2xl">Contact Us Page</div>} />
            <Route path="/profile" element={<div className="min-h-screen flex items-center justify-center text-white text-2xl">Profile Page</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/getstarted" element={<GetStarted />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
