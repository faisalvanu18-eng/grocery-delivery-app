import { useState } from "react";
import { heroSectionData } from "../assets/assets";
import { Link } from "react-router-dom";
import {
  CheckCircle2Icon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import DastagirLogo from "../components/DastagirLogo";

const Login = () => {
  const [isLoginState, setIsLoginState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLoginState) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-app-cream">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-[54%] bg-app-green relative items-center justify-center overflow-hidden">
        <img
          src={heroSectionData.hero_image}
          alt=""
          className="absolute inset-0 object-cover h-full bg-center opacity-20 mix-blend-luminosity"
        />
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-orange-400/15 blur-3xl" />
        <div className="relative max-w-lg px-12">
          <Link to="/" className="inline-flex items-center gap-2 text-white/90 font-bold mb-18">
            <DastagirLogo className="size-9 text-orange-300" /> Dastagir
          </Link>
          <p className="text-orange-300 text-xs font-extrabold uppercase tracking-[0.18em] mb-5">Fresh starts here</p>
          <h2 className="font-serif text-5xl leading-tight text-white mb-5">
            Your everyday market, made joyful.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-md">
            Fresh groceries and organic produce, delivered to your doorstep.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-10 text-sm text-white/80">
            <span className="flex items-center gap-2"><CheckCircle2Icon className="size-4 text-orange-300" /> Quality checked</span>
            <span className="flex items-center gap-2"><CheckCircle2Icon className="size-4 text-orange-300" /> Delivered with care</span>
          </div>
        </div>
      </div>

      {/* LRight Side */}
      <div className="flex-1 flex-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md surface-card rounded-[2rem] p-7 sm:p-10">
          {/* form header message */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-7 lg:hidden">
              <DastagirLogo className="size-9 text-app-green" />
              <span className="text-2xl font-semibold text-app-green">
                Satinder Dastagir
              </span>
            </Link>

            <h1 className="font-serif text-3xl text-app-green mb-2">
              {isLoginState
                ? "Sign in to your account"
                : "Sign up for an account"}
            </h1>

            <p className="text-sm text-app-text-light">
              {isLoginState
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={() => setIsLoginState(!isLoginState)}
                className="text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors"
              >
                {isLoginState ? "Create one" : "Sign-in"}
              </button>
            </p>
          </div>

          {/* Login / Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLoginState && (
              <label className="text-sm flex flex-col gap-1">
                Name
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                  />
                </div>
              </label>
            )}

            <label className="text-sm flex flex-col gap-1">
              Email Address
              <div className="relative">
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />
              </div>
            </label>

            <label className="text-sm flex flex-col gap-1">
              Password:
              <div className="relative">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="• • • • • • •"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-app-text-light hover:text-app-green transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex-center w-full py-3.5 bg-app-green text-white font-bold rounded-full hover:bg-app-green-light transition-colors disabled:opacity-50 shadow-lg shadow-app-green/15"
            >
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : isLoginState ? (
                "Sign-In"
              ) : (
                "Sign-Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
