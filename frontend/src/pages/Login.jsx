import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Aurora from '../components/reactbits/Aurora';
import Orb from '../components/reactbits/Orb';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Login attempted with: ${email}`);
    }, 1500);
  };
  
  return (
    <>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={2.3}
        amplitude={1.0}
        speed={0.5}
      />
      <div style={{ width: '100%', height: '90%', overflow: 'hidden', position: 'absolute'}}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
    <div className="flex h-screen w-full items-center justify-center p-4">
   
      <div className="w-full max-w-md rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
        {/* Header */}
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-white/80">Sign in to your account to continue</p>
        </div>

        {/* Login Fields */}
        <div className="space-y-6 p-6 pt-0">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-white/70" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/30 bg-white/10 p-2 pl-10 text-white placeholder-white/50 outline-none focus:border-white focus:ring-2 focus:ring-white/50"
                placeholder="your@email.com"
                />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-white">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-white/70" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/30 bg-white/10 p-2 pl-10 text-white placeholder-white/50 outline-none focus:border-white focus:ring-2 focus:ring-white/50"
                placeholder="••••••••"
                />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white/70" />
                ) : (
                  <Eye className="h-5 w-5 text-white/70" />
                )}
              </button>
            </div>
          </div>

          {/* Remember and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500"
                />
              <label htmlFor="remember" className="ml-2 text-sm text-white">
                Remember me
              </label>
            </div>
            <div className="text-sm font-medium text-white hover:text-blue-100 cursor-pointer">
              Forgot password?
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full rounded-lg bg-white px-4 py-2 text-center font-medium text-purple-700 shadow-lg hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-70"
            >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-purple-700"></div>
                <span className="ml-2">Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <span className="font-medium text-white hover:text-blue-100 cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}