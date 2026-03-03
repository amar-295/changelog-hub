import React from 'react';
import Logo from '../../components/Logo';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import { Eye, EyeOff, Lock, Mail, Loader2, Github } from 'lucide-react';
import toast from 'react-hot-toast';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error) {
      toast.error(error);
      // Clean the URL so the error doesn't stay there
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await login(formData);
      toast.success('Signed in successfully');
      navigate('/');
    } catch (error) {
      // The authService throws the error object directly from the response
      toast.error(error.message || 'Invalid credentials');
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

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5000/api/v1/auth/github';
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
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Log in to your account
              </h2>
              <p className="text-text-secondary text-[14px] mt-2 font-normal">
                Enter your credentials to access your dashboard
              </p>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                icon={Mail}
                error={errors.email}
              />

              {/* Password Field */}
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={Lock}
                error={errors.password}
                rightLabel={
                  <a className="link" href="#">
                    Forgot password?
                  </a>
                }
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
              {/* Primary Button */}
              <button
                className="btn btn-primary btn-lg w-full mt-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Log in'
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
                <span className="bg-bg-card px-3 text-text-muted font-bold">
                  OR
                </span>
              </div>
            </div>

            <button
              onClick={handleGitHubLogin}
              className="btn btn-secondary btn-lg w-full"
            >
              <Github className="w-[18px] h-[18px]" />
              <span>Continue with GitHub</span>
            </button>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-[14px] text-text-secondary">
                Don't have an account?{' '}
                <Link className="link-animated" to="/signup">
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
