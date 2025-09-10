'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  // Simulate loading and redirect to React app
  setTimeout(() => {
    setIsLoading(false);
    window.location.href = 'http://localhost:8080'; // 👈 React app ka port
  }, 1500);
};

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Ultra-modern gradient mesh background - CHANGED TO DARK BLUE/GREEN */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, 
              rgb(4, 10, 81) 0%,
              rgba(30, 27, 75, 1) 25%,
              rgb(8, 70, 48) 50%,
              rgba(15, 23, 42, 1) 75%,
              rgba(6, 8, 23, 1) 100%
            )
          `
        }}
      ></div>

      {/* Advanced geometric background patterns - CHANGED COLORS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="w-full h-full bg-gradient-conic from-emerald-900/20 via-transparent to-blue-900/20 rotate-slowly"></div>
        </div>
        
        {/* Floating geometric shapes - CHANGED TO GREEN/BLUE */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-px h-px ${i % 3 === 0 ? 'bg-emerald-400/60' : i % 3 === 1 ? 'bg-blue-400/60' : 'bg-teal-400/60'} rounded-full animate-float-complex shadow-lg shadow-emerald-500/20`}
            style={{
              left: `${5 + (i * 6)}%`,
              top: `${15 + (i * 5)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3) * 2}s`,
              transform: `scale(${0.5 + (i % 4) * 0.3})`,
            }}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-sm animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Ultra-advanced grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Holographic overlay effects - CHANGED TO GREEN/BLUE */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-emerald-500/8 via-teal-500/4 to-transparent rounded-full animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-blue-500/8 via-cyan-500/4 to-transparent rounded-full animate-pulse-slow-reverse blur-3xl"></div>
      </div>

      {/* Back to Home Button - CHANGED HOVER COLOR */}
      <div className="absolute top-8 left-8 z-30">
        <Link href="/">
          <button className="group relative px-6 py-3 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 text-white font-medium hover:border-emerald-400/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="tracking-wider">Back to Home</span>
            </div>
          </button>
        </Link>
      </div>

      {/* Main content container */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-6">
        <div className={`w-full max-w-sm transition-all duration-2000 ease-out ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          
          {/* Ultra-modern glass container */}
          <div className="relative group">
            {/* Animated gradient border - CHANGED TO GREEN/BLUE */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-blue-500/50 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500 animate-gradient-shift"></div>
            
            <div className="relative bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Floating particles inside container - CHANGED COLOR */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-particle-float"
                    style={{
                      left: `${10 + (i * 10)}%`,
                      top: `${20 + (i * 8)}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: `${4 + (i % 3)}s`
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative p-6">
                {/* Header Section */}
                <div className={`text-center mb-6 transition-all duration-1500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                  {/* Logo/Icon with advanced animation - CHANGED GRADIENT */}
                  <div className="relative mb-4 flex justify-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-3xl blur-xl animate-pulse-glow"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                        <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Headline with neural network theme - CHANGED GRADIENT */}
                  <h1 className="text-3xl font-black mb-2">
                    <span className="bg-gradient-to-r from-white via-emerald-200 to-blue-300 bg-clip-text text-transparent animate-gradient-shift bg-size-200">
                        MINDSPACE
                    </span>
                    <span className="block text-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent font-light tracking-widest">
                      ACCESS PORTAL
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-slate-300/80 text-xs leading-relaxed">
                    Re-establish your connection to the MindSpace neural network. 
                    <span className="block text-slate-400/60 mt-1">Your AI companion awaits your return.</span>
                  </p>
                </div>

                {/* Sign-In Form with ultra-modern styling */}
                <form onSubmit={handleSubmit} className={`space-y-5 transition-all duration-1500 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  
                  {/* Email Field - CHANGED FOCUS BORDER */}
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wider">
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <span>Username</span>
                      </span>
                    </label>
                    <div className="relative">
                      {/* Input field with holographic effect */}
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-5 py-3 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-slate-400/60 focus:outline-none focus:border-emerald-400/50 transition-all duration-500 font-medium tracking-wide text-sm"
                        placeholder="Enter your username"
                      />
                      {/* Animated focus border - CHANGED COLORS */}
                      <div className={`absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-emerald-400/50 via-teal-400/50 to-blue-400/50 transition-all duration-500 ${focusedField === 'email' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}></div>
                      {/* Floating particles on focus - CHANGED COLOR */}
                      {focusedField === 'email' && (
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-particle-float opacity-60"
                              style={{
                                left: `${20 + (i * 15)}%`,
                                top: `${30 + (i * 10)}%`,
                                animationDelay: `${i * 0.2}s`
                              }}
                            ></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Password Field - CHANGED FOCUS BORDER */}
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-slate-300 mb-2 tracking-wider">
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Password</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-5 py-3 pr-12 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-slate-400/60 focus:outline-none focus:border-blue-400/50 transition-all duration-500 font-medium tracking-wide text-sm"
                        placeholder="Enter your password"
                      />
                      {/* Password toggle button - CHANGED HOVER COLOR */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showPassword ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 00-3-3M21 12c-1.27 4.057-5.022 7-9.543 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          )}
                        </svg>
                      </button>
                      {/* Animated focus border - CHANGED COLORS */}
                      <div className={`absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-blue-400/50 via-teal-400/50 to-emerald-400/50 transition-all duration-500 ${focusedField === 'password' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}></div>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password - CHANGED CHECKBOX COLOR */}
                  <div className="flex items-center justify-between text-xs pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 border-2 border-white/20 rounded bg-black/30 backdrop-blur-xl transition-all duration-300 ${formData.rememberMe ? 'border-emerald-400 bg-gradient-to-br from-emerald-400 to-blue-500' : 'group-hover:border-white/40'}`}>
                          {formData.rememberMe && (
                            <svg className="w-2.5 h-2.5 text-white m-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-slate-300 group-hover:text-white transition-colors duration-300 tracking-wide">Remember Login</span>
                    </label>
                    <Link 
                      href="/forgot-password" 
                      className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 tracking-wide hover:underline"
                    >
                      Forget Password
                    </Link>
                  </div>

                  
{/* Simple Transparent Neural Login Button - CHANGED GRADIENT */}
<button
  type="submit"
  disabled={isLoading}
  className="relative w-full mt-6 group"
>
  {/* Simple border glow - CHANGED COLORS */}
  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/40 to-blue-500/40 rounded-xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
  
  {/* Button content */}
  <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-3 px-5 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
    {isLoading ? (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin"></div>
        <span className="text-white font-medium tracking-wide text-sm">Connecting to MindSpace...</span>
      </div>
    ) : (
      <div className="flex items-center justify-center space-x-2">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        <span className="text-white font-medium tracking-wide text-sm">Login</span>
      </div>
    )}
  </div>
</button>
                </form>

                {/* Sign Up Link - CHANGED LINK COLOR */}
                <div className={`mt-6 text-center transition-all duration-1500 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  <p className="text-slate-400 text-xs tracking-wide">
                    Don't have an Account?{' '}
                    <Link 
                      href="/auth/signup" 
                      className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors duration-300 hover:underline tracking-wider"
                    >
                      Register 
                    </Link>
                  </p>
                </div>

                {/* Bottom decoration - CHANGED GRADIENT */}
                <div className={`mt-6 flex justify-center transition-all duration-1500 delay-900 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-full animate-gradient-shift"></div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}