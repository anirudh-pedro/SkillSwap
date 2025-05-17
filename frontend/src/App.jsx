import React from "react";
import Nav from "./components/Nav";
import Outlet from "./pages/Outlet";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
function App() {
  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<Outlet />} >
          <Route index element={<Home />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
