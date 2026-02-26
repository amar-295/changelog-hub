import React from "react";
import Logo from "./Logo";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

function Login() {
  const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await authService.login(formData);
        console.log("Success:", response.message);
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error.message)
      }
    };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
    

  return (
    <>
      <main className="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-2">
              <Logo />
            </div>
            <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">
              ChangelogHub
            </h1>
          </div>
          {/* Main Card */}
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">
                Log in to your account
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-normal">
                Enter your credentials to access your dashboard
              </p>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    mail
                  </span>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                    placeholder="name@company.com"
                    type="email"
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                    Password
                  </label>
                  <a
                    className="text-primary text-xs font-semibold hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-stretch">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    lock
                  </span>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    type="password"
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      visibility
                    </span>
                  </button>
                </div>
              </div>
              {/* Primary Button */}
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-lg transition-colors shadow-md shadow-primary/10 mt-2"
                type="submit"
              >
                Log in
              </button>
            </form>
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Don't have an account?
                <Link
                  className="text-primary font-semibold hover:underline"
                  to="/signup"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
          {/* Footer Info */}
          <div className="flex justify-center gap-6 text-slate-400 dark:text-slate-500 text-xs font-medium">
            <a
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              href="#"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;