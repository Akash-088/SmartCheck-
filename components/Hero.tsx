
import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            Optimize Your Resume to <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Land Your Dream Job</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
            <div className="flex-1">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Stop guessing why your resume isn't getting hits. Our AI-powered analyzer checks your resume against job descriptions to provide real-time feedback and matching scores.
              </p>
            </div>
            
            {/* Illustrative image - Reverted to professional woman recruiter */}
            <div className="hidden md:block w-32 h-32 lg:w-48 lg:h-48 relative shrink-0">
              <div className="absolute inset-0 bg-blue-600/10 rounded-3xl rotate-6"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-slate-100 p-2 overflow-hidden transform hover:-translate-y-1 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" 
                  alt="Recruiter verifying resume" 
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-2 right-2 lg:bottom-3 lg:right-3 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-1"
            >
              Scan My Resume Now
            </button>
            <div className="flex items-center gap-4 px-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i + 15}/100/100`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
                ))}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">10,000+ Users</div>
                <div className="text-xs text-slate-500">Trust SmartCheck</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <span className="text-slate-600 text-sm font-medium">Excellent rating on Trustpilot</span>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 group max-w-lg mx-auto lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white transform md:rotate-1 lg:rotate-2 group-hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000" 
                alt="Professional Recruiter" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>

            {/* Verification Percentage Overlay */}
            <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-3 md:gap-4 animate-bounce duration-[4000ms]">
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#2563eb" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="20.1" strokeLinecap="round" />
                </svg>
                <span className="absolute text-blue-600 font-black text-xs md:text-sm">92%</span>
              </div>
              <div>
                <p className="text-slate-900 font-bold text-xs md:text-sm">Resume Verified</p>
                <p className="text-blue-600 text-[8px] md:text-[10px] font-black uppercase tracking-wider">ATS Compatible</p>
              </div>
            </div>

            {/* Recruiter Feedback Tooltip */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl max-w-[220px] hidden md:block border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Recruiter Insights</span>
              </div>
              <p className="text-xs font-medium text-slate-200 leading-relaxed">
                "Strong candidate profile. Skills perfectly align with our requirements."
              </p>
            </div>
          </div>
          
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
