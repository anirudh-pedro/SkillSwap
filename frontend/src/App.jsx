import React from "react";
import Nav from "./components/Nav";
// import Outlet from "./pages/Outlet";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import { LogIn } from "lucide-react";
import Login from "./components/Login";
import About from "./pages/About";
import Signup from "./components/Signup";
function App() {
  return (
    <div className="">
      <Routes>
          <Route index element={
            <div className="flex-col gap-10">
              <Home />
              <About />
            </div>
              } />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/getstarted" element={<GetStarted />} />
      </Routes>
    </div>
  );
}

export default App;
