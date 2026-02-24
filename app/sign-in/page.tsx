"use client";
import { useThemeStore } from "@/stores/useThemeStore";
import { useUserStore } from "@/stores/useUserStore";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { darkMode, setDarkMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [form, setForm] = useState({name: "", email: "", password: "" });
  const {user,setUser} = useUserStore()
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(form)
    router.push("/")
  }

  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300 relative w-full">
      {/* 1. BACKGROUND HEADER (Desktop & Mobile) */}
      <div className="h-50 sm:h-75 w-full relative">
        <img
          src={darkMode ? "/bg-desktop-dark.png" : "/bg-desktop-light.png"}
          className="w-full h-full object-cover"
          alt="background"
        />
        <div
          className={`absolute inset-0 bg-linear-to-b mix-blend-multiply ${darkMode ? "from-[#3710BD]/90 to-[#A42395]/90" : "from-[#5596FF]/90 to-[#AC2DEB]/90"}`}
        ></div>
      </div>

      {/* 2. MAIN CONTENT AREA (Pusat Kendali) */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center px-6 pt-12 sm:pt-20">
        <div className="w-full max-w-135 flex flex-col gap-5 sm:gap-7">
          {/* HEADER */}
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-[10px] sm:tracking-[15px]">
              TODO
            </h1>
            <button
              onClick={setDarkMode}
              className="btn btn-ghost btn-circle text-white hover:bg-white/10"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          <div
            className={`w-full  ${darkMode ? "bg-zinc-800" : "bg-white"} shadow-2xl rounded-3xl p-8 sm:p-10 border border-zinc-200 ${darkMode ? "border-zinc-700" : ""} transition-colors duration-500`}
          >
            <form className="space-y-1" onSubmit={(e)=> handleSubmit(e)}>
              <div className="text-center space-y-2 mb-8">
                <h2
                  className={`text-2xl font-bold  ${darkMode ? "text-zinc-100" : "text-zinc-800"}`}
                >
                  Sign In
                </h2>
                <p
                  className={`text-sm  ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  Welcome back! Please enter your details.
                </p>
              </div>

              {/* USERNAME */}
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-bold uppercase tracking-wider  ${darkMode ? "text-zinc-400" : "text-zinc-500"} ml-1`}
                >
                  Username
                </label>
                <input
                  type="text"
                  className={`w-full h-12 px-4  ${darkMode ? "bg-zinc-800" : "bg-zinc-100"} border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none  ${darkMode ? "text-zinc-100" : "text-zinc-800"}`}
                  placeholder="johndoe"
                  value={form.name}
                  onChange={(e)=>setForm({...form, name: e.target.value})}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-bold uppercase tracking-wider  ${darkMode ? "text-zinc-400" : "text-zinc-500"} ml-1`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full h-12 px-4  ${darkMode ? "bg-zinc-800" : "bg-zinc-100"} border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none  ${darkMode ? "text-zinc-100" : "text-zinc-800"}`}
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e)=>setForm({...form, email: e.target.value})}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-bold uppercase tracking-wider  ${darkMode ? "text-zinc-400" : "text-zinc-500"} ml-1`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={isShowPassword ? "text" : "password"}
                    className={`w-full h-12 px-4 ${darkMode ? "bg-zinc-800" : "bg-zinc-100"} border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none  ${darkMode ? "text-zinc-100" : "text-zinc-800"}`}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e)=>{setForm({...form, password: e.target.value})}}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-500 transition-colors"
                  >
                    {isShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button className="w-full h-12 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98]"
              type="submit"
              >
                Sign In
              </button>

              <div className="text-center pt-2">
                <span className="text-sm text-zinc-500">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-indigo-500 hover:underline font-medium"
                  >
                    Sign Up
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
