import React, { useState } from "react";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Github,
  User,
  Mail,
  AtSign,
  Lock,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Work email is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Optional: shake animation or similar could be added here
      return;
    }

    setErrors({});
    setIsLoading(true);
    try {
      await register(formData);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to create account");
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
      <main className="bg-bg-page text-text-primary min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
        <div className="w-full max-w-[420px] flex flex-col gap-6 items-center">
          <div className="bg-bg-card shadow-xl rounded-2xl w-full p-8 border border-border">
            {/* Header/Logo */}
            <div className="flex flex-col items-center">
              <div className="w-[68px] h-[68px] flex items-center justify-center bg-bg-elevated border border-border rounded-2xl shadow-sm mb-4">
                <Logo />
              </div>
              <div className="text-center mb-2">
                <h2
                  className="text-2xl font-bold tracking-tight text-text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Create your account
                </h2>
                <p className="text-text-secondary text-[14px]">
                  Join ChangelogHub to manage your product updates.
                </p>
              </div>
            </div>
            {/* GitHub Auth */}
            <div className="flex flex-col gap-3">
              <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 border border-border bg-bg-input text-text-primary hover:bg-[#333] hover:border-border-light transition-all gap-2 text-[14px] font-semibold">
                <Github className="w-[18px] h-[18px] mb-px" />
                <span className="truncate">Sign up with GitHub</span>
              </button>
            </div>
            {/* Divider */}
            <div className="relative my-6">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
                <span className="bg-bg-card px-3 text-text-muted font-bold">
                  OR
                </span>
              </div>
            </div>
            {/* Signup Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-text-primary tracking-wider uppercase ml-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 text-text-muted w-[18px] h-[18px]" />
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-[38px] pr-4 py-2.5 bg-bg-input border ${errors.fullName ? "border-red-500 focus:ring-red-500" : "border-border focus:border-primary focus:ring-primary hover:border-border-light"} rounded-lg text-[14px] text-text-primary focus:ring-1 outline-none transition-all placeholder-text-muted`}
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                {errors.fullName && (
                  <span className="text-red-500 text-[12px] ml-1">
                    {errors.fullName}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-text-primary tracking-wider uppercase ml-1">
                  Work Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 text-text-muted w-[18px] h-[18px]" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-[38px] pr-4 py-2.5 bg-bg-input border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-border focus:border-primary focus:ring-primary hover:border-border-light"} rounded-lg text-[14px] text-text-primary focus:ring-1 outline-none transition-all placeholder-text-muted`}
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
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-text-primary tracking-wider uppercase ml-1">
                  Username
                </label>
                <div className="relative flex items-center">
                  <AtSign className="absolute left-3.5 text-text-muted w-[18px] h-[18px]" />
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full pl-[38px] pr-4 py-2.5 bg-bg-input border ${errors.username ? "border-red-500 focus:ring-red-500" : "border-border focus:border-primary focus:ring-primary hover:border-border-light"} rounded-lg text-[14px] text-text-primary focus:ring-1 outline-none transition-all placeholder-text-muted`}
                    placeholder="username"
                    type="text"
                  />
                </div>
                {errors.username && (
                  <span className="text-red-500 text-[12px] ml-1">
                    {errors.username}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-text-primary tracking-wider uppercase ml-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 text-text-muted w-[18px] h-[18px]" />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-[38px] pr-10 py-2.5 bg-bg-input border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-border focus:border-primary focus:ring-primary hover:border-border-light"} rounded-lg text-[14px] text-text-primary focus:ring-1 outline-none transition-all placeholder-text-muted`}
                    placeholder="At least 8 characters"
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
              <div className="pt-2">
                <button
                  className="w-full h-11 rounded-lg bg-primary text-white font-semibold text-[14px] hover:bg-primary-dark transition-colors flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Create account"
                  )}
                </button>
              </div>
            </form>
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-[14px] text-text-secondary">
                Already have an account?{" "}
                <Link
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                  to="/login"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
          {/* Footer Links */}
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

export default Signup;
