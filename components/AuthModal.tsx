
import React, { useState } from 'react';

interface AuthModalProps {
  type: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (type: 'login' | 'signup', name: string, email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ type, onClose, onSuccess }) => {
  const [currentType, setCurrentType] = useState(type);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate and call an API here
    // For now, we pass the entered details to the app state
    onSuccess(currentType, currentType === 'signup' ? name : (name || email.split('@')[0]), email);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {currentType === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500">
            {currentType === 'login' 
              ? 'Enter your details to access your dashboard' 
              : 'Join thousands of job seekers today'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {currentType === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white text-slate-900 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white text-slate-900 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white text-slate-900 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all mt-4"
          >
            {currentType === 'login' ? 'Sign In' : 'Get Started Free'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-600">
            {currentType === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setCurrentType(currentType === 'login' ? 'signup' : 'login')}
              className="ml-2 text-blue-600 font-bold hover:underline"
            >
              {currentType === 'login' ? 'Register Now' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
