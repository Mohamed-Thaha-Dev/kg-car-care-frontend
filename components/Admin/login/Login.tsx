"use client";

import { use, useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [loading,setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const router = useRouter()
 
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.fromTo(
      logoRef.current,
      {
        opacity: 0,
        y: -30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
      }
    ).fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 50,
        
      },
      {
        opacity: 1,
        y: 0,
    
        duration: 1,
      },
      "-=0.4"
    );
  }, []);

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(email,password)

  try{
    setLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,{
      email:email,
      password:password

    },{
      withCredentials:true
    }
  
  
  )
    console.log("this is Response Message ",response.data)
 localStorage.setItem("token", response.data.accessToken);

      // Save Admin Details
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      

    if(response.data.success){
      router.push("/admin/dashboard")
    }
  }
catch (error: any) {

  if (error.response) {
    setError(error.response.data.message);

  } else if (error.request) {
    setError("Server is currently unavailable. Please try again later.");

  } else {
    setError("Something went wrong");
  }
}
finally{
  setLoading(false)
}

  
};

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/home/homesImg.webp"
          alt="KG Car Care"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          
          {/* Logo */}
         

          {/* Glass Card */}
          <div
            ref={cardRef}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border border-white/20
              bg-white/[0.08]
              p-7
              shadow-[0_25px_80px_rgba(0,0,0,0.5)]
              backdrop-blur-2xl
              sm:p-9
            "
          >
            {/* Glass Highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
     <div
            ref={logoRef}
            className="mb-5 flex justify-center"
          >
            <Link href="/">
              <Image
                src="/logo/logo.png"
                alt="KG Car Care"
                width={170}
                height={70}
                className="h-auto w-auto object-contain drop-shadow-2xl"
                priority
              />
            </Link>
          </div>
            {/* Card Header */}
            <div className="mb-8 text-center">
              <h1 className="text-5xl font-bold font-heading  text-white">
                Welcome <span className="text-primary"> Admin</span>
              </h1>

              <p className="mt-2 text-sm text-white/60">
                Login to your KG Car Care account
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="
                    w-full
                    rounded-xl
                    border border-white/15
                    bg-black/20
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/30
                    transition-all
                    duration-300
                    focus:border-white/40
                    focus:bg-black/30
                    focus:ring-2
                    focus:ring-white/10
                  "
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white/80"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs text-white/50 transition hover:text-white"
                  >
                    Forgot Password?
                  </Link>
                </div>

              <div className="relative">
  <input
    id="password"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    placeholder="Enter your password"
    className="
      w-full
      rounded-xl
      border border-white/15
      bg-black/20
      px-4
      py-3.5
      pr-12
      text-sm
      text-foreground
      outline-none
      placeholder:text-white/30
      transition-all
      duration-300
      focus:border-white/40
      focus:bg-black/30
      focus:ring-2
      focus:ring-white/10
    "
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-muted
      transition-colors
      hover:text-primary
      cursor-pointer
    "
  >
    {showPassword ? (
      <EyeOff size={20} strokeWidth={1.8} />
    ) : (
      <Eye size={20} strokeWidth={1.8} />
    )}
  </button>
</div>
              </div>
              {error && (
  <p className="text-red-500 text-sm">
    {error}
  </p>
)}


            <button
  type="submit"
  disabled={loading}
  className={`
    group
    mt-5
    relative
    flex
    w-full
    items-center
    justify-center
    overflow-hidden
    rounded-xl
    bg-primary/90
    py-3.5
    text-sm
    font-semibold
    text-black
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:bg-primary
    active:scale-[0.98]
    ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
  `}
>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Logging in...
    </>
  ) : (
    <span className="relative z-10">
      Login
    </span>
  )}
</button>
            </form>

            {/* Register */}
            <div className="mt-7 text-center">
              <p className="text-sm text-white/50">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-white transition hover:text-white/70"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="mt-6 text-center text-xs text-white/30">
            © {new Date().getFullYear()} KG Car Care. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}




      