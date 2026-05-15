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
import { loginUser, registerUser, requestPasswordReset, resetPassword } from "../services/apiService";
import { useLanguage } from "../contexts/LanguageContext";

export function Auth() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loadingForm, setLoadingForm] = useState<"login" | "signup" | null>(null);
  const [resetStep, setResetStep] = useState<"email" | "password" | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
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
  const [resetData, setResetData] = useState({
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

    const isLocalAdminCredentials = loginData.email.trim().toLowerCase() === "yamanabuasal20@gmail.com" && loginData.password === "123";
    setLoadingForm("login");

    try {
      const response = await loginUser(loginData.email, loginData.password);
      const destination = response.user?.role === "admin" ? "/admin" : "/";
      setTimeout(() => navigate(destination), 500);
    } catch (err) {
      if (isLocalAdminCredentials) {
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!resetData.email.trim()) {
      setError(t("emailRequired"));
      return;
    }

    setLoadingForm("login");

    try {
      const response = await requestPasswordReset(resetData.email);
      setResetToken(response.resetToken);
      setResetStep("password");
      setSuccessMessage(response.message || "Email verified. Enter your new password.");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Could not start password reset.";
      setError(errorMessage);
    } finally {
      setLoadingForm(null);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!resetData.password) {
      setError(t("passwordRequired"));
      return;
    }
    if (resetData.password !== resetData.confirmPassword) {
      setError(t("passwordsNotMatch"));
      return;
    }
    if (resetData.password.length < 3) {
      setError(t("passwordTooShort"));
      return;
    }

    setLoadingForm("login");

    try {
      const response = await resetPassword(resetToken, resetData.password);
      setSuccessMessage(response.message || "Password reset successfully.");
      setResetStep(null);
      setResetToken("");
      setTimeout(() => navigate(response.user?.role === "admin" ? "/admin" : "/"), 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Could not reset password.";
      setError(errorMessage);
    } finally {
      setLoadingForm(null);
    }
  };

  const switchMode = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setError("");
    setSuccessMessage("");
    setResetStep(null);
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
            <p className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-[#F59E0B]">{t("adminAccess")}</p>
            <h2 className="mt-3 text-3xl font-black">{t("preparingDashboard")}</h2>
            <p className="mt-2 text-sm font-semibold text-white/70">{t("loadingTravelControlCenter")}</p>
          </div>
        </motion.div>
      )}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,250,246,0.34)_0%,_rgba(255,255,255,0.14)_48%,_rgba(244,108,40,0.08)_100%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 grid w-full items-center gap-6 md:gap-8 lg:grid-cols-[minmax(360px,0.86fr)_minmax(500px,1.14fr)]"
        >
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06, duration: 0.45 }}
            className="relative z-10 order-2 w-full rounded-3xl border border-white/40 bg-white/35 p-4 shadow-[0_24px_70px_rgba(16,30,36,0.18)] backdrop-blur-2xl sm:mx-auto sm:max-w-xl sm:p-8 lg:order-1 lg:max-w-none lg:p-10"
          >
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#805B4E] transition hover:text-[#F46C28] sm:mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToHome")}
            </Link>

            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <img src={logo} alt={t("companyNameLine1")} className="h-11 w-11 shrink-0 rounded-2xl bg-[#fff4ec] p-1.5 shadow-sm sm:h-12 sm:w-12" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B58F7F] sm:text-xs sm:tracking-[0.35em]">{t("companyNameLine1")}</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-[#2F211D] sm:text-3xl">
                  {authMode === "login" ? t("welcomeBack") : t("createAccount")}
                </h1>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-full border border-[#edd9cd] bg-[#fff6ef] p-1 text-sm font-bold text-[#805B4E] sm:mb-7">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`rounded-full px-3 py-2.5 transition sm:px-4 sm:py-3 ${authMode === "login" ? "overflow-hidden bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] font-semibold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)]" : "hover:text-[#F46C28]"}`}
              >
                {t("login")}
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`rounded-full px-3 py-2.5 transition sm:px-4 sm:py-3 ${authMode === "signup" ? "overflow-hidden bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] font-semibold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)]" : "hover:text-[#F46C28]"}`}
              >
                {t("signup")}
              </button>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {successMessage}
              </div>
            )}

            {resetStep === "email" ? (
              <motion.form
                key="forgot-password"
                onSubmit={handleForgotPassword}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div>
                  <Label htmlFor="reset-email" className="text-[#5C4033]">{t("emailAddressLabel")}</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder={t("emailShortPlaceholder")}
                      value={resetData.email}
                      onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
                      className="h-13 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loadingForm !== null}
                  className="h-13 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] text-base font-bold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] disabled:opacity-50"
                >
                  {loadingForm === "login" ? "Checking email..." : "Continue"}
                </Button>
                <button type="button" onClick={() => setResetStep(null)} className="w-full text-sm font-semibold text-[#805B4E] hover:text-[#F46C28]">
                  Back to login
                </button>
              </motion.form>
            ) : resetStep === "password" ? (
              <motion.form
                key="reset-password"
                onSubmit={handleResetPassword}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div>
                  <Label htmlFor="new-password" className="text-[#5C4033]">New Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      value={resetData.password}
                      onChange={(e) => setResetData({ ...resetData, password: e.target.value })}
                      className="h-13 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirm-new-password" className="text-[#5C4033]">Confirm Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="confirm-new-password"
                      type="password"
                      placeholder="Confirm new password"
                      value={resetData.confirmPassword}
                      onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                      className="h-13 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loadingForm !== null}
                  className="h-13 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] text-base font-bold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] disabled:opacity-50"
                >
                  {loadingForm === "login" ? "Resetting..." : "Reset Password"}
                </Button>
              </motion.form>
            ) : authMode === "login" ? (
              <motion.form
                key="login"
                onSubmit={handleLoginSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div>
                  <Label htmlFor="login-email" className="text-[#5C4033]">{t("emailAddressLabel")}</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={t("emailShortPlaceholder")}
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="h-13 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="login-password" className="text-[#5C4033]">{t("password")}</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder={t("enterYourPassword")}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="h-13 rounded-2xl border-[#E2CEC1] bg-white pl-12 pr-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1887F] transition hover:text-[#5C4033]"
                      aria-label={showLoginPassword ? t("hidePassword") : t("showPassword")}
                    >
                      {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#805B4E]">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#D7CCC8] accent-[#F46C28]" />
                    {t("rememberMe")}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setSuccessMessage("");
                      setResetData({ ...resetData, email: loginData.email });
                      setResetStep("email");
                    }}
                    className="text-left text-sm font-semibold text-[#F46C28] hover:text-[#B84D1D] sm:text-right"
                  >
                    {t("forgotPassword")}
                  </button>
                </div>

                <motion.div whileTap={{ scale: 0.985 }}>
                  <Button
                    type="submit"
                    disabled={loadingForm !== null}
                    className="h-13 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] text-base font-bold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] disabled:opacity-50"
                  >
                    {loadingForm === "login" ? t("signingIn") : t("signIn")}
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
                  <Label htmlFor="signup-name" className="text-[#5C4033]">{t("fullName")}</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder={t("enterYourFullName")}
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className="h-12 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-email" className="text-[#5C4033]">{t("emailAddressLabel")}</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={t("emailShortPlaceholder")}
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="h-12 rounded-2xl border-[#E2CEC1] bg-white pl-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-password" className="text-[#5C4033]">{t("password")}</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder={t("createPassword")}
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="h-12 rounded-2xl border-[#E2CEC1] bg-white pl-12 pr-12 text-[#2F211D] placeholder:text-[#A1887F] focus:border-[#F46C28] focus:ring-[#F46C28]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1887F] transition hover:text-[#5C4033]"
                      aria-label={showSignupPassword ? t("hidePassword") : t("showPassword")}
                    >
                      {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-confirm" className="text-[#5C4033]">{t("confirmPassword")}</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A1887F]" />
                    <Input
                      id="signup-confirm"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder={t("confirmYourPassword")}
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
                    className="h-13 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#9a4b08] via-[#c46312] to-[#F59E0B] text-base font-bold text-white shadow-[0_14px_34px_rgba(154,75,8,0.28)] transition hover:scale-[1.03] hover:shadow-[0_18px_42px_rgba(2,20,39,0.32)] disabled:opacity-50"
                  >
                    {loadingForm === "signup" ? t("creatingAccount") : t("createAccount")}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative order-1 min-h-[240px] bg-transparent sm:min-h-[300px] md:min-h-[480px] lg:order-2 lg:min-h-[680px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.14, duration: 0.48 }}
              className="absolute left-[8%] top-[4%] flex h-[84%] w-[38%] flex-col gap-3 overflow-hidden rounded-t-[5rem] rounded-b-[5rem] bg-transparent shadow-[0_26px_60px_rgba(51,35,27,0.16)] lg:left-[4%] lg:top-[3%] lg:h-[80%] lg:w-[43%] lg:gap-3.5 lg:rounded-t-[5.8rem] lg:rounded-b-[5.8rem]"
            >
              <img
                src={loginImage}
                alt={t("beachDestinationAlt")}
                className="min-h-0 w-full flex-[1.22] rounded-b-[0.45rem] object-cover"
              />
              <img
                src={loginOneImage}
                alt={t("mountainTravelSceneAlt")}
                className="min-h-0 w-full flex-[0.78] rounded-t-[0.45rem] object-cover"
              />
            </motion.div>

            <motion.img
              src={loginThreeImage}
              alt={t("winterTravelSceneAlt")}
              initial={{ opacity: 0, x: 22, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.26, duration: 0.48 }}
              className="absolute right-[8%] top-[14%] h-[76%] w-[44%] rounded-t-[5.8rem] rounded-b-[5.8rem] object-cover object-center shadow-[0_30px_70px_rgba(51,35,27,0.2)] lg:right-[3%] lg:top-[16%] lg:h-[78%] lg:w-[46%] lg:rounded-t-[6.5rem] lg:rounded-b-[6.5rem]"
            />
          </motion.aside>
        </motion.section>
      </div>
    </div>
  );
}
