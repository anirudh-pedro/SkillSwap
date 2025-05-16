import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SparklesPreview from "./components/mage-ui/background/sparkles";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import CanvasCursorEffect from "../../../SkillSwap/frontend/src/components/mage-ui/cursor-effects/canvas-cursor-effect";
function App() {
  return (
      <div className="bg-body">
        <Nav />
        <CanvasCursorEffect />
      </div>
  );
}

export default App;
