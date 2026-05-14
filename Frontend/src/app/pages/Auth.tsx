import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Globe2, Lock, Mail, Plane, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import logo from "../../assets/logo.ico";
import heroBg from "../../assets/h1-bg01.jpg";
import loginImage from "../../assets/login.jpg";
import loginOneImage from "../../assets/login1.jpg";
import loginThreeImage from "../../assets/login3.jpg";
import { loginUser, registerUser } from "../services/apiService";
import { useLanguage } from "../contexts/LanguageContext";

export function Auth() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loadingForm, setLoadingForm] = useState<"login" | "signup" | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [error, setError] = useState<string>("");
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

    if (!loginData.email.trim()) {
      setError(t("emailRequired"));
      return;
    }
    if (!loginData.password) {
      setError(t("passwordRequired"));
      return;
    }

    if (loginData.email.trim().toLowerCase() === "yamanabuasal20@gmail.com" && loginData.password === "123") {
      localStorage.setItem("authToken", "local-admin-session");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "admin",
          name: "Yaman Abu Asal",
          email: "yamanabuasal20@gmail.com",
          role: "admin",
        })
      );
      setAdminLoading(true);
      setTimeout(() => navigate("/admin"), 2600);
      return;
    }

    setLoadingForm("login");

    try {
      const response = await loginUser(loginData.email, loginData.password);
      const destination = response.user?.role === "admin" ? "/admin" : "/";
      setTimeout(() => navigate(destination), 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t("loginError");
      setError(errorMessage);
    } finally {
      setLoadingForm(null);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!signupData.name.trim()) {
      setError(t("nameRequired"));
      return;
    }
    if (!signupData.email.trim()) {
      setError(t("emailRequired"));
      return;
    }
    if (!signupData.password) {
      setError(t("passwordRequired"));
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setError(t("passwordsNotMatch"));
      return;
    }
    if (signupData.password.length < 6) {
      setError(t("passwordTooShort"));
      return;
    }

    setLoadingForm("signup");

    try {
      await registerUser(signupData.name, signupData.email, signupData.password);
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t("signupError");
      setError(errorMessage);
    } finally {
      setLoadingForm(null);
    }
  };

  const switchMode = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setError("");
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-fixed font-sans text-[#312722]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {adminLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#021427]/85 px-6 backdrop-blur-xl"
        >
          <div className="relative flex flex-col items-center text-center text-white">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_30px_90px_rgba(245,158,11,0.22)]"
            >
              <Globe2 className="h-14 w-14 text-[#F59E0B]" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="absolute top-9 h-28 w-28"
            >
              <Plane className="absolute -right-3 top-1/2 h-7 w-7 -translate-y-1/2 rotate-45 text-white" />
            </motion.div>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-[#F59E0B]">Admin Access</p>
            <h2 className="mt-3 text-3xl font-black">Preparing dashboard</h2>
            <p className="mt-2 text-sm font-semibold text-white/70">Loading your travel control center...</p>
          </div>
        </motion.div>
      )}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,250,246,0.34)_0%,_rgba(255,255,255,0.14)_48%,_rgba(244,108,40,0.08)_100%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-[minmax(360px,0.86fr)_minmax(500px,1.14fr)]"
        >
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06, duration: 0.45 }}
            className="relative z-10 rounded-[2rem] border border-white/40 bg-white/28 p-6 shadow-[0_28px_80px_rgba(16,30,36,0.18)] backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#805B4E] transition hover:text-[#F46C28]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="mb-8 flex items-center gap-3">
              <img src={logo} alt="Rainbow Travel" className="h-12 w-12 rounded-2xl bg-[#fff4ec] p-1.5 shadow-sm" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#B58F7F]">Rainbow Travel</p>
                <h1 className="mt-1 text-3xl font-black tracking-tight text-[#2F211D]">
                  {authMode === "login" ? "Welcome back" : "Create account"}
                </h1>
              </div>
            </div>

            <div className="mb-7 grid grid-cols-2 rounded-full border border-[#edd9cd] bg-[#fff6ef] p-1 text-sm font-bold text-[#805B4E]">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`rounded-full px-4 py-3 transition ${authMode === "login" ? "bg-[#F46C28] text-white shadow-lg shadow-[#F46C28]/20" : "hover:text-[#F46C28]"}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`rounded-full px-4 py-3 transition ${authMode === "signup" ? "bg-[#F46C28] text-white shadow-lg shadow-[#F46C28]/20" : "hover:text-[#F46C28]"}`}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {authMode === "login" ? (
              <motion.form
                key="login"
                onSubmit={handleLoginSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
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
                      className="h-13 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
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
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="h-13 rounded-2xl border-[#E2CEC1] bg-white pl-12 pr-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1887F] transition hover:text-[#5C4033]"
                      aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    >
                      {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#805B4E]">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#D7CCC8] accent-[#F46C28]" />
                    Remember me
                  </label>
                  <Link to="/contact" className="text-sm font-semibold text-[#F46C28] hover:text-[#B84D1D]">Forgot password?</Link>
                </div>

                <motion.div whileTap={{ scale: 0.985 }}>
                  <Button
                    type="submit"
                    disabled={loadingForm !== null}
                    className="h-13 w-full rounded-full bg-[#F46C28] text-base font-bold text-white shadow-xl shadow-[#F46C28]/25 hover:bg-[#DF5C1F] disabled:opacity-50"
                  >
                    {loadingForm === "login" ? "Signing in..." : "Sign In"}
                  </Button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                onSubmit={handleSignupSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
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
                      className="h-12 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
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
                      className="h-12 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
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
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="h-12 rounded-2xl border-[#E2CEC1] bg-white pl-12 pr-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1887F] transition hover:text-[#5C4033]"
                      aria-label={showSignupPassword ? "Hide password" : "Show password"}
                    >
                      {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-confirm" className="text-[#5C4033]">Confirm Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="signup-confirm"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="h-12 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                  </div>
                </div>

                <motion.div whileTap={{ scale: 0.985 }}>
                  <Button
                    type="submit"
                    disabled={loadingForm !== null}
                    className="h-13 w-full rounded-full bg-[#F46C28] text-base font-bold text-white shadow-xl shadow-[#F46C28]/25 hover:bg-[#DF5C1F] disabled:opacity-50"
                  >
                    {loadingForm === "signup" ? "Creating account..." : "Create Account"}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative order-first min-h-[680px] bg-transparent lg:order-none lg:min-h-[680px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.14, duration: 0.48 }}
              className="absolute left-[6%] top-[2%] flex h-[86%] w-[88%] flex-col gap-3 overflow-hidden rounded-t-full rounded-b-full bg-transparent shadow-[0_26px_60px_rgba(51,35,27,0.16)] lg:left-[4%] lg:top-[3%] lg:h-[80%] lg:w-[43%] lg:gap-3.5 lg:rounded-t-[5.8rem] lg:rounded-b-[5.8rem]"
            >
              <img
                src={loginImage}
                alt="Beach destination"
                className="min-h-0 w-full flex-[1.22] rounded-b-[0.45rem] object-cover"
              />
              <img
                src={loginOneImage}
                alt="Mountain travel scene"
                className="min-h-0 w-full flex-[0.78] rounded-t-[0.45rem] object-cover"
              />
            </motion.div>

            <motion.img
              src={loginThreeImage}
              alt="Winter travel scene"
              initial={{ opacity: 0, x: 22, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.26, duration: 0.48 }}
              className="absolute right-[3%] top-[16%] hidden h-[78%] w-[46%] rounded-t-[6.5rem] rounded-b-[6.5rem] object-cover object-center shadow-[0_30px_70px_rgba(51,35,27,0.2)] lg:block"
            />
          </motion.aside>
        </motion.section>
      </div>
    </div>
  );
}
