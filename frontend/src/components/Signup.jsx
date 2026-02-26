import React, {useState} from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(formData);
      console.log("Success:", response.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.message)
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
        <div className="w-full max-w-[440px] flex flex-col items-center">
          <div className="bg-white dark:bg-slate-900 shadow-xl rounded-xl w-full p-8 border border-slate-200 dark:border-slate-800">
            {/* Header/Logo */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-2">
                <Logo/>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Create your account
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                  Join ChangelogHub to manage your product updates.
                </p>
              </div>
            </div>
            {/* GitHub Auth */}
            <div className="flex flex-col gap-3">
              <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-slate-900 text-white hover:bg-slate-800 transition-colors gap-2 text-base font-semibold">
                <span className="material-symbols-outlined text-[20px]">
                  account_circle
                </span>
                <span className="truncate">Sign up with GitHub</span>
              </button>
            </div>
            {/* Divider */}
            <div className="relative my-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold tracking-widest">
                  OR
                </span>
              </div>
            </div>
            {/* Signup Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base font-normal"
                  placeholder="Full name"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Work Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base font-normal"
                  placeholder="name@company.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Username
                </label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base font-normal"
                  placeholder="username"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Password
                </label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base font-normal"
                  placeholder="At least 8 characters"
                  type="password"
                />
              </div>
              <div className="pt-2">
                <button
                  className="w-full h-12 rounded-lg bg-primary text-white font-bold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  type="submit"
                >
                  Create account
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Already have an account?
                <Link
                  className="text-primary font-semibold hover:underline"
                  to="/login"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
          {/* Footer Links */}
          <div className="mt-8 flex gap-6 text-xs text-slate-400 font-medium">
            <a
              className="hover:text-slate-600 dark:hover:text-slate-200"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="hover:text-slate-600 dark:hover:text-slate-200"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:text-slate-600 dark:hover:text-slate-200"
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

export default Signup;
