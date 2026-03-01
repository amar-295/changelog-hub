import React from "react";
import Logo from "../../components/Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await login(formData);
      toast.success("Signed in successfully");
      navigate("/");
    } catch (error) {
      // The authService throws the error object directly from the response
      toast.error(error.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center p-4 bg-bg-page text-text-primary transition-colors duration-300">
        <div className="w-full max-w-[420px] flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <div className="w-[68px] h-[68px] flex items-center justify-center rounded-2xl shadow-sm mb-4 bg-bg-elevated border border-border box-border">
              <Logo />
            </div>
          </div>
          {/* Main Card */}
          <div className="bg-bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="mb-8 text-center">
              <h2
                className="text-text-primary text-xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Log in to your account
              </h2>
              <p className="text-text-secondary text-[14px] mt-2 font-normal">
                Enter your credentials to access your dashboard
              </p>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-text-primary text-[12px] font-semibold tracking-wider uppercase ml-1">
                  Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 text-text-muted w-[18px] h-[18px]" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-[38px] pr-4 py-2.5 bg-[#252525] border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-border focus:border-primary focus:ring-primary hover:border-border-light"} rounded-lg text-[14px] text-text-primary focus:ring-1 outline-none transition-all placeholder-text-muted`}
                    placeholder="name@company.com"
                    type="email"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-[12px] ml-1">
                    {errors.email}
                  </span>
                )}
              </div>
              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-text-primary text-[12px] font-semibold tracking-wider uppercase">
                    Password
                  </label>
                  <a
                    className="text-primary text-[13px] font-semibold hover:text-primary-dark transition-colors"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 text-text-muted w-[18px] h-[18px]" />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-[38px] pr-10 py-2.5 bg-[#252525] border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-border focus:border-primary focus:ring-primary hover:border-border-light"} rounded-lg text-[14px] text-text-primary focus:ring-1 outline-none transition-all placeholder-text-muted`}
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute right-3 text-text-muted hover:text-text-primary transition-colors flex items-center"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-[18px] h-[18px]" />
                    ) : (
                      <Eye className="w-[18px] h-[18px]" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-[12px] ml-1">
                    {errors.password}
                  </span>
                )}
              </div>
              {/* Primary Button */}
              <button
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold flex items-center justify-center h-11 rounded-lg transition-colors mt-3 text-[14px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Log in"
                )}
              </button>
            </form>
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-[14px] text-text-secondary">
                Don't have an account?{" "}
                <Link
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                  to="/signup"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
          {/* Footer Info */}
          <div className="flex justify-center gap-6 text-[12px] text-text-muted font-medium mt-2">
            <a className="hover:text-text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-text-primary transition-colors" href="#">
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
