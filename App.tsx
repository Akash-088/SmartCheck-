
import React, { useState, useEffect } from 'react';
import { ViewState, AuthState, UserProfile } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import About from './components/About';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import ProfileModal from './components/ProfileModal';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false });

  // Handle scroll to track "About" section active state
  useEffect(() => {
    const handleScroll = () => {
      if (view !== 'home') {
        setIsAboutActive(false);
        return;
      }
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // If the About section is mostly in view
        setIsAboutActive(rect.top < 300 && rect.bottom > 300);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const handleSetView = (newView: ViewState) => {
    setView(newView);
    setIsAboutActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (type: 'login' | 'signup', name: string, email: string) => {
    setAuth({ 
      isLoggedIn: true, 
      user: { name: name || 'User', email: email } 
    });
    setAuthModal(null);
    if (type === 'signup') {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = (data: { age: string; occupation: string }) => {
    setAuth(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, age: data.age, occupation: data.occupation } : undefined
    }));
    setShowOnboarding(false);
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setAuth(prev => ({
      ...prev,
      user: updatedUser
    }));
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false });
    handleSetView('home');
  };

  const handleScrollToAbout = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero onGetStarted={() => handleSetView('analyzer')} />
            <About />
          </>
        );
      case 'analyzer':
        return <Analyzer />;
      default:
        return <Hero onGetStarted={() => handleSetView('analyzer')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        currentView={view} 
        onNavigate={handleSetView} 
        onScrollToAbout={handleScrollToAbout}
        onOpenAuth={setAuthModal}
        isLoggedIn={auth.isLoggedIn}
        user={auth.user}
        onLogout={handleLogout}
        onOpenProfile={() => setShowProfile(true)}
        isAboutActive={isAboutActive}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer />

      {authModal && (
        <AuthModal 
          type={authModal} 
          onClose={() => setAuthModal(null)} 
          onSuccess={handleAuthSuccess}
        />
      )}

      {showOnboarding && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}

      {showProfile && auth.user && (
        <ProfileModal 
          user={auth.user} 
          onClose={() => setShowProfile(false)} 
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default App;
