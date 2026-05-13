import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import logo from "../../assets/logo.ico";
import signupImage from "../../assets/signup.jpg";
import loginImage from "../../assets/login.jpg";
import log2Image from "../../assets/log2.png";
import { loginUser, registerUser } from "../services/apiService";
import { useLanguage } from "../contexts/LanguageContext";

export function Auth() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate inputs
    if (!loginData.email.trim()) {
      setError(t('emailRequired'));
      return;
    }
    if (!loginData.password) {
      setError(t('passwordRequired'));
      return;
    }
    
    setLoading(true);

    try {
      console.log("🔐 Starting login with:", { email: loginData.email });
      
      const response = await loginUser(loginData.email, loginData.password);
      
      console.log("✅ Login successful:", response);
      
      // Redirect to home on success
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('loginError');
      console.error("❌ Login error:", errorMessage, err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!signupData.name.trim()) {
      setError(t('nameRequired'));
      return;
    }
    if (!signupData.email.trim()) {
      setError(t('emailRequired'));
      return;
    }
    if (!signupData.password) {
      setError(t('passwordRequired'));
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setError(t('passwordsNotMatch'));
      return;
    }
    if (signupData.password.length < 6) {
      setError(t('passwordTooShort'));
      return;
    }

    setLoading(true);

    try {
      console.log("🔐 Starting registration with:", { 
        name: signupData.name, 
        email: signupData.email 
      });
      
      const response = await registerUser(signupData.name, signupData.email, signupData.password);
      
      console.log("✅ Registration successful:", response);
      
      // Show success message briefly before redirecting
      setError(""); // Clear any errors
      
      // Redirect to home on success
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('signupError');
      console.error("❌ Registration error:", errorMessage, err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const heroImage = activeTab === "login" ? loginImage : signupImage;

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.72),_transparent_35%),linear-gradient(135deg,_#e5d4c2_0%,_#f4ede4_45%,_#e6d2be_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[2.25rem] border border-white/60 bg-white/30 shadow-[0_25px_80px_rgba(80,52,31,0.16)] backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(255,255,255,0.82),_transparent_28%),radial-gradient(circle_at_left,_rgba(169,136,117,0.14),_transparent_24%)]" />
          <div className="relative grid items-center gap-8 px-6 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-10">
            <div className="space-y-4 text-[#4A342E]">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Rainbow Travel" className="h-11 w-11 rounded-2xl bg-white/50 p-1 shadow-sm" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8D6E63]">My Account</p>
                  <p className="font-semibold text-[#6D4C41]">Login or Sign Up</p>
                </div>
              </div>

              <div className="max-w-xl space-y-3">
                <h1 className="text-5xl font-black tracking-tight text-[#3E2723] sm:text-6xl">
                  My Account
                </h1>
                <p className="max-w-md text-sm leading-7 text-[#7D655B] sm:text-base">
                  Enter your account area with a calm glass look, warm neutral tones,
                  and a polished travel-branded style.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    activeTab === "login"
                      ? "bg-[#6D4C41] text-white shadow-lg shadow-[#6D4C41]/25"
                      : "bg-white/70 text-[#6D4C41] hover:bg-white"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    activeTab === "signup"
                      ? "bg-[#6D4C41] text-white shadow-lg shadow-[#6D4C41]/25"
                      : "bg-white/70 text-[#6D4C41] hover:bg-white"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="relative min-h-[340px] lg:min-h-[430px]">
              <div className="absolute inset-0 rounded-[2.2rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.62),rgba(255,255,255,0.18))] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md" />
              <div className="absolute inset-3 rounded-[1.95rem] bg-[#f3e9df]/75" />

              <motion.img
                key={activeTab}
                src={heroImage}
                alt={activeTab === "login" ? "Login" : "Sign Up"}
                initial={{ opacity: 0, scale: 0.98, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute left-4 top-5 h-[72%] w-[48%] rounded-[2.1rem] object-cover shadow-2xl ring-1 ring-white/70"
              />

              <motion.img
                src={log2Image}
                alt="Decorative detail"
                initial={{ opacity: 0, y: 16, rotate: 6 }}
                animate={{ opacity: 1, y: 0, rotate: 6 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="absolute right-4 top-12 h-[58%] w-[40%] rounded-[1.6rem] object-cover shadow-2xl ring-1 ring-white/70"
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="absolute bottom-5 left-1/2 w-[82%] -translate-x-1/2 rounded-[1.6rem] border border-white/55 bg-white/45 px-4 py-3 text-center backdrop-blur-md"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#8D6E63]">Travel Account</p>
                <p className="mt-1 text-sm font-semibold text-[#5C4033]">A soft glass hero with layered images and rounded corners</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden rounded-[2rem] border border-white/55 bg-white/35 p-6 shadow-[0_18px_50px_rgba(80,52,31,0.12)] backdrop-blur-2xl lg:block"
          >
            <div className="mb-5 flex items-center gap-3">
              <img src={logo} alt="Rainbow Travel" className="h-10 w-10 rounded-2xl bg-white/60 p-1" />
              <div>
                <p className="text-sm font-semibold text-[#6D4C41]">Rainbow Travel</p>
                <p className="text-xs text-[#8D6E63]">Elegant account access</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.8rem] bg-[#f3e7da] p-4">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
              <img
                src={activeTab === "login" ? signupImage : loginImage}
                alt="Decorative account preview"
                className="h-[340px] w-full rounded-[1.5rem] object-cover shadow-xl"
              />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/55 px-4 py-2 text-xs font-semibold text-[#5C4033] backdrop-blur-md">
                {activeTab === "login" ? "Welcome back" : "Create account"}
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="rounded-[2rem] border border-white/55 bg-white/40 p-6 shadow-[0_18px_50px_rgba(80,52,31,0.12)] backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            {activeTab === "login" ? (
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8D6E63]">Login</p>
                  <h2 className="mt-2 text-3xl font-black text-[#3E2723]">Sign in to your account</h2>
                  <p className="mt-2 text-sm leading-7 text-[#7D655B]">Use the form below to continue your booking experience.</p>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email" className="text-[#5C4033]">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="border-[#D8C9BE] bg-white/80 pl-12 py-3.5 text-[#3E2723] placeholder:text-[#A1887F] focus:border-[#8D6E63] focus:ring-[#8D6E63]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password" className="text-[#5C4033]">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="border-[#D8C9BE] bg-white/80 pl-12 pr-12 py-3.5 text-[#3E2723] placeholder:text-[#A1887F] focus:border-[#8D6E63] focus:ring-[#8D6E63]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1887F] hover:text-[#5C4033]"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-[#8D6E63]">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#D7CCC8] accent-[#8D6E63]" />
                      Remember me
                    </label>
                    <button type="button" className="text-sm font-medium text-[#8D6E63] hover:text-[#5C4033]">Forgot password?</button>
                  </div>

                  <motion.div whileTap={{ scale: 0.985 }}>
                    <Button type="submit" disabled={loading} className="w-full rounded-full bg-gradient-to-r from-[#6D4C41] to-[#A37B67] py-3.5 font-semibold text-white shadow-lg shadow-[#6D4C41]/20 hover:from-[#5C4033] hover:to-[#8D6E63] disabled:opacity-50">
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-[#7D655B]">
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setActiveTab("signup")} className="font-semibold text-[#6D4C41] underline decoration-[#6D4C41]/40 underline-offset-4">
                      Sign Up
                    </button>
                  </p>
                </form>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8D6E63]">Sign Up</p>
                  <h2 className="mt-2 text-3xl font-black text-[#3E2723]">Create your account</h2>
                  <p className="mt-2 text-sm leading-7 text-[#7D655B]">Open your account with the same warm, polished experience.</p>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name" className="text-[#5C4033]">Full Name</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        className="border-[#D8C9BE] bg-white/80 pl-12 py-3.5 text-[#3E2723] placeholder:text-[#A1887F] focus:border-[#8D6E63] focus:ring-[#8D6E63]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email" className="text-[#5C4033]">Email Address</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="border-[#D8C9BE] bg-white/80 pl-12 py-3.5 text-[#3E2723] placeholder:text-[#A1887F] focus:border-[#8D6E63] focus:ring-[#8D6E63]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password" className="text-[#5C4033]">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="border-[#D8C9BE] bg-white/80 pl-12 pr-12 py-3.5 text-[#3E2723] placeholder:text-[#A1887F] focus:border-[#8D6E63] focus:ring-[#8D6E63]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1887F] hover:text-[#5C4033]"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-confirm" className="text-[#5C4033]">Confirm Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                      <Input
                        id="signup-confirm"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className="border-[#D8C9BE] bg-white/80 pl-12 py-3.5 text-[#3E2723] placeholder:text-[#A1887F] focus:border-[#8D6E63] focus:ring-[#8D6E63]"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-[#7D655B]">
                    <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-[#D7CCC8] accent-[#8D6E63]" />
                    <span className="text-sm leading-6">
                      I agree to the{" "}
                      <button className="font-semibold text-[#6D4C41] hover:underline">Terms of Service</button>{" "}
                      and{" "}
                      <button className="font-semibold text-[#6D4C41] hover:underline">Privacy Policy</button>
                    </span>
                  </div>

                  <motion.div whileTap={{ scale: 0.985 }}>
                    <Button type="submit" disabled={loading} className="w-full rounded-full bg-gradient-to-r from-[#6D4C41] to-[#A37B67] py-3.5 font-semibold text-white shadow-lg shadow-[#6D4C41]/20 hover:from-[#5C4033] hover:to-[#8D6E63] disabled:opacity-50">
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-[#7D655B]">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setActiveTab("login")} className="font-semibold text-[#6D4C41] underline decoration-[#6D4C41]/40 underline-offset-4">
                      Sign In
                    </button>
                  </p>
                </form>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-[#8D6E63]">
              <Link to="/" className="hover:text-[#5C4033]">← Back to Home</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}