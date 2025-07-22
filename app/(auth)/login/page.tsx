"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Heart, Lightbulb, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FloatingElement = ({ 
  children, 
  className = "", 
  style = {} 
}: { 
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div 
    className={`absolute ${className}`} 
    style={style}
  >
    {children}
  </div>
);

const ProfileAvatar = ({ 
  src, 
  className = "", 
  style = {} 
}: { 
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div 
    className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-0.5 ${className}`}
    style={style}
  >
    <div 
      className="w-full h-full rounded-full bg-cover bg-center"
      style={{ backgroundImage: `url(${src})` }}
    />
  </div>
);

const EngagementBadge = ({ 
  icon: Icon, 
  count, 
  className = "",
  style = {} 
}: { 
  icon: any;
  count: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div 
    className={`bg-white rounded-full px-3 py-1 shadow-lg flex items-center gap-1 ${className}`}
    style={style}
  >
    <Icon className="w-4 h-4 text-gray-600" />
    <span className="text-sm font-medium">{count}</span>
  </div>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const error = await response.json();
        alert(error.message || 'Login failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Dotted Circular Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {/* Large outer circle */}
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeDasharray="8,8"
          opacity="0.4"
        />
        {/* Medium circle */}
        <circle
          cx="50%"
          cy="50%"
          r="35%"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeDasharray="6,6"
          opacity="0.3"
        />
        {/* Inner circle */}
        <circle
          cx="50%"
          cy="50%"
          r="25%"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="1"
          strokeDasharray="4,4"
          opacity="0.2"
        />
        {/* Additional connecting lines */}
        <line
          x1="20%"
          y1="30%"
          x2="80%"
          y2="70%"
          stroke="#9ca3af"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.15"
        />
        <line
          x1="80%"
          y1="30%"
          x2="20%"
          y2="70%"
          stroke="#9ca3af"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.15"
        />
      </svg>

      {/* Floating Background Elements - Positioned on dotted lines with orbital animation */}
      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ top: '20%', left: '15%', zIndex: 2 }}>
        <ProfileAvatar src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" />
        <EngagementBadge 
          icon={MessageCircle} 
          count={10} 
          className="absolute -bottom-2 -right-2"
        />
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ top: '12%', right: '20%', zIndex: 2 }}>
        <ProfileAvatar src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" />
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ top: '25%', right: '10%', zIndex: 2 }}>
        <ProfileAvatar src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" />
        <EngagementBadge 
          icon={MessageCircle} 
          count={31} 
          className="absolute -bottom-2 -right-2"
        />
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ bottom: '25%', left: '15%', zIndex: 2 }}>
        <ProfileAvatar src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" />
        <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-2 flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          Connected with 4 messages
        </div>
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ bottom: '20%', right: '18%', zIndex: 2 }}>
        <ProfileAvatar src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" />
        <EngagementBadge 
          icon={MessageCircle} 
          count={200} 
          className="absolute -bottom-2 -right-2 bg-purple-100"
        />
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ top: '45%', left: '8%', zIndex: 2 }}>
        <div className="bg-white rounded-full p-4 shadow-lg">
          <Heart className="w-6 h-6 text-red-500" />
        </div>
        <div className="bg-white rounded-full px-3 py-1 shadow-lg absolute -bottom-2 -right-2 text-center">
          <span className="text-sm font-medium">999</span>
        </div>
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ bottom: '35%', left: '10%', zIndex: 2 }}>
        <div className="bg-white rounded-full p-3 shadow-lg">
          <Users className="w-5 h-5 text-purple-600" />
        </div>
        <div className="bg-white rounded-full px-2 py-1 shadow-lg absolute -bottom-2 -right-2 text-center">
          <span className="text-xs font-medium">999</span>
        </div>
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ bottom: '45%', left: '22%', zIndex: 2 }}>
        <EngagementBadge 
          icon={MessageCircle} 
          count={31} 
          className="bg-orange-100"
        />
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ bottom: '30%', right: '25%', zIndex: 2 }}>
        <EngagementBadge 
          icon={Heart} 
          count={31} 
          className="bg-red-100"
        />
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ top: '50%', right: '8%', zIndex: 2 }}>
        <div className="bg-white rounded-full p-4 shadow-lg">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
        </div>
        <div className="bg-white rounded-full px-3 py-1 shadow-lg absolute -bottom-2 -right-2 text-center">
          <span className="text-sm font-medium">8 Cool Ideas</span>
        </div>
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ bottom: '40%', right: '12%', zIndex: 2 }}>
        <div className="bg-white rounded-full p-3 shadow-lg">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ top: '35%', right: '15%', zIndex: 2 }}>
        <ProfileAvatar src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" />
      </FloatingElement>

      <FloatingElement className="transition-transform duration-1000 hover:scale-105" style={{ bottom: '15%', left: '25%', zIndex: 2 }}>
        <ProfileAvatar src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" />
        <EngagementBadge 
          icon={Heart} 
          count={31} 
          className="absolute -bottom-2 -right-2 bg-red-100"
        />
      </FloatingElement>

      {/* Main Login Form */}
      <div className="flex items-center justify-center min-h-screen p-4 relative" style={{ zIndex: 3 }}>
        <div className="p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Login to Cohorts</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? 'Signing In...' : 'Login'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <a 
              href="#" 
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              Forgot Password
            </a>
          </div>

          {/* Social Login */}
          <div className="mt-6 flex justify-center space-x-4">
            <button className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
          </div>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-purple-600 hover:text-purple-800 font-medium">
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}