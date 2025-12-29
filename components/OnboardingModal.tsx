
import React, { useState } from 'react';

interface OnboardingModalProps {
  onComplete: (data: { age: string; occupation: string }) => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ age, occupation });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"></div>
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            👋
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Aboard!</h2>
          <p className="text-slate-500">Tell us a bit more about yourself so we can personalize your experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">How old are you?</label>
            <input 
              type="number" 
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
              placeholder="e.g. 25"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">What are you doing? (Current Role)</label>
            <input 
              type="text" 
              required
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
              placeholder="e.g. Computer Science Student, UX Designer"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all text-lg"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingModal;
