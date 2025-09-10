'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Backend API Functions
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const authAPI = {
    signup: async (userData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Signup failed');
        }
        
        return data;
      } catch (error) {
        throw new Error(error.message || 'Network error occurred');
      }
    }
  };

  const tokenManager = {
    setTokens: (accessToken, refreshToken) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    
    getAccessToken: () => {
      return localStorage.getItem('accessToken');
    },
    
    getRefreshToken: () => {
      return localStorage.getItem('refreshToken');
    },
    
    clearTokens: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    
    isAuthenticated: () => {
      return !!localStorage.getItem('accessToken');
    }
  };

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
    
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call backend API
      const response = await authAPI.signup({
        fullName: formData.fullName,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      
      // Store tokens
      tokenManager.setTokens(
        response.data.tokens.accessToken,
        response.data.tokens.refreshToken
      );
      
      // Success feedback
      setSuccess('Neural profile created successfully! Redirecting to dashboard...');
      console.log('Neural profile created successfully:', response.data.user);
      
      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      console.error('Signup failed:', error.message);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-px h-px ${i % 3 === 0 ? 'bg-purple-400/60' : i % 3 === 1 ? 'bg-blue-400/60' : 'bg-indigo-400/60'} rounded-full animate-float-complex shadow-lg shadow-purple-500/20`}
            style={{
              left: `${5 + (i * 6)}%`,
              top: `${15 + (i * 5)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3) * 2}s`,
              transform: `scale(${0.5 + (i % 4) * 0.3})`,
            }}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-sm animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Ultra-advanced grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Holographic overlay effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/8 via-purple-500/4 to-transparent rounded-full animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-indigo-500/8 via-blue-500/4 to-transparent rounded-full animate-pulse-slow-reverse blur-3xl"></div>
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-8 left-8 z-30">
        <Link href="/">
          <button className="group relative px-6 py-3 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 text-white font-medium hover:border-purple-400/30 transition-all duration-300 hover:scale-105">
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
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-2000 ease-out ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          
          {/* Ultra-modern glass container */}
          <div className="relative group">
            {/* Animated gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500 animate-gradient-shift"></div>
            
            <div className="relative bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Floating particles inside container */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-particle-float"
                    style={{
                      left: `${10 + (i * 10)}%`,
                      top: `${20 + (i * 8)}%`,
                      animationDelay: `${i * 0.8}s`,
                      animationDuration: `${4 + (i % 3)}s`
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative p-5">
                {/* Header Section */}
                <div className={`text-center mb-4 transition-all duration-1500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                  {/* Logo/Icon with advanced animation */}
                  <div className="relative mb-3 flex justify-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-3xl blur-xl animate-pulse-glow"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                        <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Headline with neural network theme */}
                  <h1 className="text-2xl font-black mb-1">
                    <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent animate-gradient-shift bg-size-200">
                        MINDSPACE
                    </span>
                    <span className="block text-lg bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-light tracking-widest">
                      CREATE ACCOUNT
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-slate-300/80 text-xs leading-relaxed">
                    Initialize your neural profile and join the MindSpace network. 
                    <span className="block text-slate-400/60 mt-1">Begin your AI-enhanced journey today.</span>
                  </p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <p className="text-red-400 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-400 text-sm font-medium">{success}</p>
                    </div>
                  </div>
                )}

                {/* Sign-Up Form with ultra-modern styling */}
                <form onSubmit={handleSubmit} className={`space-y-3 transition-all duration-1500 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  
                  {/* Full Name Field */}
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-slate-300 mb-1 tracking-wider">
                      <span className="flex items-center space-x-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Username</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-2.5 bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-slate-400/60 focus:outline-none focus:border-cyan-400/50 transition-all duration-500 font-medium tracking-wide text-sm relative z-10"
                        placeholder="Enter a username"
                        required
                      />
                      {focusedField === 'username' && (
                        <div className="absolute inset-0 rounded-xl border-2 border-gradient-to-r from-cyan-400/50 via-purple-400/50 to-pink-400/50 pointer-events-none animate-pulse"></div>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-slate-300 mb-1 tracking-wider">
                      <span className="flex items-center space-x-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="w-full px-4 py-2.5 pr-10 bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-slate-400/60 focus:outline-none focus:border-purple-400/50 transition-all duration-500 font-medium tracking-wide text-sm relative z-10"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors duration-300 z-20"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showPassword ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 00-3-3M21 12c-1.27 4.057-5.022 7-9.543 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          )}
                        </svg>
                      </button>
                      {focusedField === 'password' && (
                        <div className="absolute inset-0 rounded-xl border-2 border-gradient-to-r from-purple-400/50 via-pink-400/50 to-cyan-400/50 pointer-events-none animate-pulse"></div>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative group">
                    <label className="block text-xs font-semibold text-slate-300 mb-1 tracking-wider">
                      <span className="flex items-center space-x-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Confirm Password</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-2.5 pr-10 bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-slate-400/60 focus:outline-none focus:border-green-400/50 transition-all duration-500 font-medium tracking-wide text-sm relative z-10"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-green-400 transition-colors duration-300 z-20"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showConfirmPassword ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 00-3-3M21 12c-1.27 4.057-5.022 7-9.543 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          )}
                        </svg>
                      </button>
                      {focusedField === 'confirmPassword' && (
                        <div className="absolute inset-0 rounded-xl border-2 border-gradient-to-r from-green-400/50 via-blue-400/50 to-purple-400/50 pointer-events-none animate-pulse"></div>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-3 pt-1">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="sr-only"
                        required
                      />
                      <div 
                        onClick={() => setFormData(prev => ({ ...prev, agreeToTerms: !prev.agreeToTerms }))}
                        className={`w-3 h-3 border-2 border-white/20 rounded bg-black/30 backdrop-blur-xl transition-all duration-300 cursor-pointer ${formData.agreeToTerms ? 'border-cyan-400 bg-gradient-to-br from-cyan-400 to-purple-500' : 'hover:border-white/40'}`}
                      >
                        {formData.agreeToTerms && (
                          <svg className="w-2 h-2 text-white m-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed tracking-wide">
                      I agree to the{' '}
                      <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 hover:underline">
                        Neural Terms
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 hover:underline">
                        Privacy Protocol
                      </Link>
                    </p>
                  </div>

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full mt-4 group"
                  >
                    {/* Simple border glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 rounded-xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Button content */}
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl py-2.5 px-4 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-3 h-3 border-2 border-white/60 border-t-white rounded-full animate-spin"></div>
                          <span className="text-white font-medium tracking-wide text-sm">Creating Neural Profile...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                          <span className="text-white font-medium tracking-wide text-sm">Create Neural ID</span>
                        </div>
                      )}
                    </div>
                  </button>
                </form>

                {/* Sign In Link */}
                <div className={`mt-4 text-center transition-all duration-1500 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  <p className="text-slate-400 text-xs tracking-wide">
                    Already have a Neural ID?{' '}
                    <Link 
                      href="/auth/signin" 
                      className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300 hover:underline tracking-wider"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>

                {/* Bottom decoration */}
                <div className={`mt-4 flex justify-center transition-all duration-1500 delay-900 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-gradient-shift"></div>
                </div>
              </div>
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