
import React, { useState, useRef, useEffect } from 'react';
import { ViewState, UserProfile } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onScrollToAbout: () => void;
  onOpenAuth: (type: 'login' | 'signup') => void;
  isLoggedIn: boolean;
  user?: UserProfile;
  onLogout: () => void;
  onOpenProfile: () => void;
  isAboutActive?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigate, 
  onScrollToAbout, 
  onOpenAuth, 
  isLoggedIn, 
  user, 
  onLogout,
  onOpenProfile,
  isAboutActive
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            SmartCheck
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className={`font-medium transition-colors ${currentView === 'home' && !isAboutActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('analyzer')}
            className={`font-medium transition-colors ${currentView === 'analyzer' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
          >
            Analyzer
          </button>
          <button 
            onClick={onScrollToAbout}
            className={`font-medium transition-colors ${isAboutActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
          >
            About
          </button>
        </nav>

        <div className="flex items-center gap-3 relative" ref={menuRef}>
          {isLoggedIn && user ? (
            <>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-4 rounded-full bg-slate-100 hover:bg-slate-200 transition-all group border border-transparent hover:border-blue-200"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
                  {getInitials(user.name)}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-500 leading-none mt-0.5">Account</p>
                </div>
                <svg className={`w-4 h-4 text-slate-400 ml-1 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 py-4 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">User Profile</p>
                    <p className="text-lg font-black text-slate-900 truncate">{user.name}</p>
                    <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    {user.occupation && (
                      <div className="mt-3 flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black w-fit uppercase">
                        {user.occupation}
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => { onOpenProfile(); setIsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-2xl transition-colors"
                    >
                      <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      Profile Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-2xl transition-colors">
                      <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                      Privacy & Safety
                    </button>
                    <div className="my-2 border-t border-slate-50"></div>
                    <button 
                      onClick={() => { onLogout(); setIsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <button 
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 text-slate-600 font-medium hover:text-blue-600 transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => onOpenAuth('signup')}
                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
