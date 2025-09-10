
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Welcome() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState('');

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

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Ultra-modern gradient mesh background */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
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

      {/* Advanced geometric background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="w-full h-full bg-gradient-conic from-purple-900/20 via-transparent to-blue-900/20 rotate-slowly"></div>
        </div>
        
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-px h-px ${i % 3 === 0 ? 'bg-purple-400/60' : i % 3 === 1 ? 'bg-blue-400/60' : 'bg-indigo-400/60'} rounded-full animate-float-complex shadow-lg shadow-purple-500/20`}
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i * 6)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + (i % 3) * 2}s`,
              transform: `scale(${1 + (i % 4) * 0.5})`,
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-sm animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Ultra-advanced grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Holographic overlay effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-purple-500/5 to-transparent rounded-full animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-indigo-500/10 via-pink-500/5 to-transparent rounded-full animate-pulse-slow-reverse blur-3xl"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-6">
        <div className={`w-full max-w-6xl mx-auto text-center transition-all duration-2000 ease-out ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          
          {/* Floating status indicator */}
          <div className={`absolute -top-15 left-1/2 transform -translate-x-1/2 transition-all duration-1500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-emerald-400/20 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping delay-150"></div>
                  </div>
                  <span className="text-emerald-200 font-medium tracking-wider text-sm">MINDSPACE NEURAL NETWORK ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main headline with advanced typography */}
          <div className={`mb-8 transition-all duration-2000 delay-500 ${mounted ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-8 rotate-1'}`}>
            <h1 className="relative">
              {/* Glowing text background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-indigo-600/20 blur-3xl animate-pulse-glow"></div>
              
              <div className="relative text-8xl md:text-9xl font-black tracking-tighter leading-none">
                <div className="bg-gradient-to-br from-white via-purple-200 to-blue-300 bg-clip-text text-transparent animate-gradient-shift bg-size-200 mb-2">
                  MINDSPACE
                </div>
                <div className="text-3xl md:text-4xl font-light text-slate-300 tracking-widest opacity-80">
                  <span className="inline-block animate-type-writer">FOR YOUR NEURAL WELLNESS </span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400/60 animate-border-spin"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400/60 animate-border-spin-reverse"></div>
            </h1>
          </div>

          {/* Advanced subtitle with holographic effect */}
          <div
            className={`mb-16 transition-all delay-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDuration: "2000ms" }}
          >
            <div className="relative max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                Experience the{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium animate-gradient-shift bg-size-200">
                    next evolution
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></span>
                </span>
                {' '}of mental wellness technology.
                <span className="text-lg text-slate-400 block mt-4 animate-fade-in-up">
                  Where artificial intelligence meets authentic human care in perfect
                  harmony.
                </span>
              </p>
            </div>
          </div>

          {/* Ultra-premium action buttons */}
          <div className={`mb-16 transition-all duration-2000 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              
              {/* Sign Up Button */}
              <Link href="/auth/signup" className="w-full lg:w-auto">
                <button
                  onMouseEnter={() => setIsHovering('signup')}
                  onMouseLeave={() => setIsHovering('')}
                  className="group relative w-full px-12 py-6 bg-black/40 backdrop-blur-xl rounded-2xl font-bold text-lg text-white overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-gradient"
                >
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="absolute inset-[2px] rounded-xl bg-black/80 backdrop-blur-xl"></div>

                  {/* Glowing particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-particle-float`}
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${30 + i * 8}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      ></div>
                    ))}
                  </div>

                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <div
                      className={`transition-all duration-300 ${
                        isHovering === 'signup' ? 'rotate-180 scale-110' : ''
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span className="tracking-wider">Register</span>
                    <div className="flex space-x-1 ml-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                      <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping delay-100"></div>
                      <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping delay-200"></div>
                    </div>
                  </div>
                </button>
              </Link>

              {/* Sign In Button */}
              <Link href="/auth/signin" className="w-full lg:w-auto">
                <button
                  onMouseEnter={() => setIsHovering('signin')}
                  onMouseLeave={() => setIsHovering('')}
                  className="group relative w-full px-12 py-6 bg-black/40 backdrop-blur-xl rounded-2xl font-bold text-lg text-white overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-gradient"
                >
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="absolute inset-[2px] rounded-xl bg-black/80 backdrop-blur-xl"></div>
                  
                  {/* Glowing particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-particle-float`}
                        style={{
                          left: `${20 + (i * 10)}%`,
                          top: `${30 + (i * 8)}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      ></div>
                    ))}
                  </div>

                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <div className={`transition-all duration-300 ${isHovering === 'signin' ? 'rotate-180 scale-110' : ''}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <span className="tracking-wider">Sign In</span>
                    <div className="flex space-x-1 ml-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                      <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping delay-100"></div>
                      <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping delay-200"></div>
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Advanced trust indicators with holographic styling */}
          <div className={`transition-all duration-2000 delay-1200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: '🛡️', label: 'QUANTUM ENCRYPTION', desc: 'Military-grade security protocols' },
                { icon: '🧠', label: 'AI-POWERED THERAPY', desc: 'Advanced neural processing' },
                { icon: '⚡', label: '24/7 NEURAL LINK', desc: 'Always-on consciousness support' }
              ].map((item, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 group-hover:border-purple-400/30 transition-all duration-500">
                    <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <h3 className="text-white font-bold tracking-wider text-sm mb-2">{item.label}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for ultra-advanced animations */}
      <style jsx>{`
        @keyframes rotate-slowly {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float-complex {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-15px) rotate(90deg) scale(1.1); }
          50% { transform: translateY(-30px) rotate(180deg) scale(0.9); }
          75% { transform: translateY(-15px) rotate(270deg) scale(1.05); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes pulse-slow-reverse {
          0%, 100% { opacity: 0.6; transform: scale(1.05); }
          50% { opacity: 0.3; transform: scale(1); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.02); }
        }
        
        @keyframes type-writer {
          0% { opacity: 0; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        @keyframes border-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes border-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) scale(0); opacity: 0; }
          50% { transform: translateY(-20px) scale(1); opacity: 1; }
        }
        
        .rotate-slowly { animation: rotate-slowly 20s linear infinite; }
        .animate-float-complex { animation: float-complex 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slow-reverse { animation: pulse-slow-reverse 4s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 3s ease infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-type-writer { animation: type-writer 2s ease-in-out; }
        .animate-border-spin { animation: border-spin 8s linear infinite; }
        .animate-border-spin-reverse { animation: border-spin-reverse 8s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out 2s both; }
        .animate-particle-float { animation: particle-float 3s ease-in-out infinite; }
        
        .bg-size-200 { background-size: 200% 200%; }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .bg-gradient-conic {
          background: conic-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}