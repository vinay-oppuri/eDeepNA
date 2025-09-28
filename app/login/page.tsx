'use client';

import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">EDeepNA</h1>
          <p className="text-gray-600 mt-2">Deep-Sea eDNA Analysis Platform</p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 EDeepNA Project. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}