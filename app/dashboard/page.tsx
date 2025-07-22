"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User, Mail } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Cohorts Dashboard</h1>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h2>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <p className="text-gray-900 font-mono text-sm">{user.id}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900">{user.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cohorts Joined</h3>
            <p className="text-3xl font-bold text-purple-600">0</p>
            <p className="text-gray-600 text-sm mt-1">Start connecting with others</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Messages Sent</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-gray-600 text-sm mt-1">Begin conversations</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ideas Shared</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-gray-600 text-sm mt-1">Share your thoughts</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Complete your profile</p>
                <p className="text-gray-600 text-sm">Add a photo and bio to help others connect with you</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Join your first cohort</p>
                <p className="text-gray-600 text-sm">Find like-minded people in your area of interest</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Start engaging</p>
                <p className="text-gray-600 text-sm">Share ideas, ask questions, and build connections</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}