
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onUpdate: (updatedUser: UserProfile) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-200 overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {isEditing ? 'Edit Profile' : 'Account Details'}
          </h2>
          <p className="text-slate-500">Manage your personal information and preferences.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                disabled={!isEditing}
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-5 py-4 rounded-2xl border transition-all outline-none ${
                  isEditing 
                    ? 'bg-white border-blue-200 text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-400' 
                    : 'bg-slate-50 border-transparent text-slate-600 cursor-not-allowed'
                }`}
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                disabled={!isEditing}
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-5 py-4 rounded-2xl border transition-all outline-none ${
                  isEditing 
                    ? 'bg-white border-blue-200 text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-400' 
                    : 'bg-slate-50 border-transparent text-slate-600 cursor-not-allowed'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Age</label>
              <input 
                type="number" 
                name="age"
                disabled={!isEditing}
                value={formData.age || ''}
                onChange={handleChange}
                className={`w-full px-5 py-4 rounded-2xl border transition-all outline-none ${
                  isEditing 
                    ? 'bg-white border-blue-200 text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-400' 
                    : 'bg-slate-50 border-transparent text-slate-600 cursor-not-allowed'
                }`}
                placeholder="Not set"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Occupation</label>
              <input 
                type="text" 
                name="occupation"
                disabled={!isEditing}
                value={formData.occupation || ''}
                onChange={handleChange}
                className={`w-full px-5 py-4 rounded-2xl border transition-all outline-none ${
                  isEditing 
                    ? 'bg-white border-blue-200 text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-400' 
                    : 'bg-slate-50 border-transparent text-slate-600 cursor-not-allowed'
                }`}
                placeholder="Not set"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            {isEditing ? (
              <>
                <button 
                  type="button"
                  onClick={() => { setFormData({...user}); setIsEditing(false); }}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
