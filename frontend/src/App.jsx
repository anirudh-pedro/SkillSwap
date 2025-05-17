import React from "react";
import Nav from "./components/Nav";
import Outlet from "./pages/Outlet";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import { LogIn } from "lucide-react";
import LoginCard from "./components/Login";
function App() {
  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<Outlet />} >
        <Route path="/" element={<Home />} />
        </Route>
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/login" element={<LoginCard/>}/>
      </Routes>
    </div>
  );
}

export default App;
