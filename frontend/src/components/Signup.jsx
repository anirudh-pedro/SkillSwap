import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, ChevronLeft } from 'lucide-react';
import Aurora from './reactbits/Aurora';
import Orb from './reactbits/Orb';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Account created for: ${email}`);
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
        <div className="p-6 text-center relative">
          <div className="absolute left-4 top-6">
            <button className="text-white hover:text-blue-100 focus:outline-none">
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-sm text-white/80">Sign up to get started</p>
        </div>

        {/* Signup Fields */}
        <div className="space-y-5 p-6 pt-0">
          {/* Full Name Field */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-white">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-white/70" />
              </div>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-white/30 bg-white/10 p-2 pl-10 text-white placeholder-white/50 outline-none focus:border-white focus:ring-2 focus:ring-white/50"
                placeholder="John Doe"
                />
            </div>
          </div>

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

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-white/70" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-white/30 bg-white/10 p-2 pl-10 text-white placeholder-white/50 outline-none focus:border-white focus:ring-2 focus:ring-white/50"
                placeholder="••••••••"
                />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-white/70" />
                ) : (
                    <Eye className="h-5 w-5 text-white/70" />
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500"
                />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-white">
                I agree to the{" "}
                <span className="font-medium text-white hover:text-blue-100 cursor-pointer">Terms of Service</span>
                {" "}and{" "}
                <span className="font-medium text-white hover:text-blue-100 cursor-pointer">Privacy Policy</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !agreedToTerms}
            className="w-full rounded-lg bg-white px-4 py-2 text-center font-medium text-purple-700 shadow-lg hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/50 disabled:opacity-70"
            >
            {isLoading ? (
                <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-purple-700"></div>
                <span className="ml-2">Creating account...</span>
              </div>
            ) : (
                "Create Account"
            )}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-white">
              Already have an account?{" "}
              <span className="font-medium text-white hover:text-blue-100 cursor-pointer">
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}