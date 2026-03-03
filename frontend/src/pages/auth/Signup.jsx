import React, { useState } from "react";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
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

  const handleGitHubSignup = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/github";
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
              <button
                onClick={handleGitHubSignup}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 border border-border bg-bg-input text-text-primary hover:bg-bg-card-hover hover:border-border-light transition-all gap-2 text-[14px] font-semibold"
              >
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
              <Input
                label="Full Name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                icon={User}
                error={errors.fullName}
              />
              <Input
                label="Work Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                icon={Mail}
                error={errors.email}
              />
              <Input
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                icon={AtSign}
                error={errors.username}
              />
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                icon={Lock}
                error={errors.password}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="w-[18px] h-[18px]" />
                    ) : (
                      <Eye className="w-[18px] h-[18px]" />
                    )}
                  </button>
                }
              />
              <div className="pt-2">
                <button
                  className="btn btn-primary btn-lg w-full mt-2"
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
                <Link className="link-animated" to="/login">
                  Log in
                </Link>
              </p>
            </div>
          </div>
          {/* Footer Links */}
          <div className="flex justify-center gap-6 text-[12px] text-text-muted font-medium mt-2">
            <a className="link-muted" href="#">
              Privacy Policy
            </a>
            <a className="link-muted" href="#">
              Terms of Service
            </a>
            <a className="link-muted" href="#">
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup;
