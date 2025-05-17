import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GLOW_COLORS = [
  "#1EAEDB", // Bright Blue
  "#344978", // Cool Blue
  "#0EA5E9", // Ocean Blue
  "#33C3F0", // Sky Blue
  "#0FA0CE", // Neon Blue
  "#24385b", // Original dark blue
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [glowIndex, setGlowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIndex((i) => (i + 1) % GLOW_COLORS.length);
    }, 3600); // Makes the change slower (3.6s per color)
    return () => clearInterval(interval);
  }, []);

  // Smooth transition for the background "moon"/glow
  const glowColor = GLOW_COLORS[glowIndex];
  // Multiple stops: strong at edge, quick drop-off for realistic halo.
  const moonGradient = `radial-gradient(circle at 50% 100%, 
    ${glowColor} 0%, 
    ${glowColor} 28%, 
    ${glowColor}cc 54%, 
    ${glowColor}66 67%, 
    #1b274b 79%, 
    transparent 95%
  )`;

  // Simple submit handler
  const onSubmit = (e) => {
    e.preventDefault();
    // Add login logic here if needed
    alert(`Logged in as: ${email}`);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-[#151d2e] font-sans overflow-hidden"
      style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
    >
      {/* Animated Moon/Glowing Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* BOTTOM CENTER MOON (HALF VISIBLE) */}
        <div
          className="absolute left-1/2 bottom-[-20vw] -translate-x-1/2 w-[115vw] h-[50vw] max-w-[800px] blur-lg rounded-full transition-all duration-3000"
          style={{
            background: moonGradient,
            boxShadow: `0 -40px 160px 72px ${glowColor}66, 0 -2vw 100px 4vw #24385baa`,
            opacity: 1,
            transition: "background 2.6s cubic-bezier(0.55,0,0.1,1)"
          }}
        />
        {/* Fade overlay for more drama, lighter at bottom so glow shows nicely */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #192747bb 23%, #0c1831a6 67%, transparent 100%)"
          }}
        />
        {/* Narrow vertical dark blue beam */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[40vw] max-w-lg blur-3xl opacity-40 animate-glowBeam"
          style={{
            background:
              "linear-gradient(180deg, #1a2662 30%, #171a35cc 85%, transparent 100%)"
          }}
        />
        <style>
          {`
            @keyframes glowBeam {
              0%,100% { opacity: 0.32; }
              50% { opacity: 0.5; }
            }
            .animate-glowBeam {
              animation: glowBeam 3.2s ease-in-out infinite;
            }
          `}
        </style>
      </div>
      {/* Centered Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-md px-8 py-10 rounded-2xl glass-morphic-card border border-white/20 shadow-2xl bg-white/10 backdrop-blur-lg flex flex-col items-center">
        <h2
          className="text-3xl font-bold mb-7 text-white drop-shadow-glow tracking-tight"
          style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
        >
          Welcome Back
        </h2>
        <form className="w-full space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-white/80 font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full bg-white/10 dark:bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder:text-white/50 transition focus:border-[#4c6ad5] focus:ring-2 focus:ring-[#344978] focus:outline-none backdrop-blur-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-white/80 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full bg-white/10 dark:bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder:text-white/50 transition focus:border-[#4c6ad5] focus:ring-2 focus:ring-[#344978] focus:outline-none backdrop-blur-md"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-[#344978] to-[#273a6e] text-[#ebf0ff] font-semibold text-lg rounded-lg shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:shadow-[0_0_18px_4px_#344978BB,0_1px_24px_2px_#273a6e80] focus:outline-none focus:ring-2 focus:ring-[#344978]"
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              textShadow: "0 1px 2px #fff5"
            }}
          >
            Login
          </button>
        </form>
        <div className="mt-8 text-center w-full">
          <span className="text-white/70">Don&apos;t have an account?</span>
          <Link
            to="/"
            className="ml-2 text-[#6b8cff] underline underline-offset-2 hover:text-[#a7bfff] font-semibold transition-colors"
            style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
