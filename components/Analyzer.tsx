
import React, { useState, useRef } from 'react';
import { analyzeResume } from '../services/geminiService';
import { AnalysisResult } from '../types';

const Analyzer: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setResumeText(text);
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide both a resume and a job description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeResume(resumeText, jobDescription);
      setResult(data);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze resume. Please ensure you provided valid text content.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setResumeText('');
    setJobDescription('');
    setError(null);
  };

  return (
    <section id="analyzer" className="py-20 px-4 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">AI Resume & Job Fit Analyzer</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Upload your resume and paste the job description to see how your skills align with the role.
          </p>
        </div>

        {!result ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Your Resume
              </label>
              <div 
                className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
                    : 'border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".txt,.md,.rtf,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-blue-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-slate-800 font-bold">Upload Resume File</p>
                <p className="text-slate-400 text-sm mt-1">Drag and drop or click to select</p>
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Or paste your resume text here..."
                className="w-full h-64 p-5 bg-white text-slate-900 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none resize-none transition-all shadow-sm"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job requirements and description here..."
                className="w-full h-full min-h-[400px] p-5 bg-white text-slate-900 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none resize-none transition-all shadow-sm"
              />
            </div>

            <div className="lg:col-span-2 flex flex-col items-center gap-4 mt-8">
              {error && <p className="text-red-500 font-bold bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
              <button
                disabled={isLoading}
                onClick={handleAnalyze}
                className={`px-16 py-5 bg-blue-600 text-white font-black rounded-2xl text-xl shadow-xl hover:bg-blue-700 transition-all flex items-center gap-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1'}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : 'Analyze Match'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
              {/* Match score section - Centered content */}
              <div className="w-full md:w-1/3 bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                
                <h3 className="text-xl font-bold mb-8 uppercase tracking-widest text-blue-400">Match score</h3>

                <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                  {/* Fixed circular SVG to prevent clipping */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="85" fill="none" stroke="#1e293b" strokeWidth="16" />
                    <circle 
                      cx="100" cy="100" r="85" fill="none" stroke="#3b82f6" strokeWidth="16" 
                      strokeDasharray={`${2 * Math.PI * 85}`}
                      strokeDashoffset={`${2 * Math.PI * 85 * (1 - result.score / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-6xl font-black">{result.score}%</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed max-w-xs">{result.overview}</p>
                
                <button 
                  onClick={reset}
                  className="mt-10 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10"
                >
                  New Analysis
                </button>
              </div>

              <div className="w-full md:w-2/3 space-y-8">
                {/* Missing skills section */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-lg shadow-slate-200/50">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-2 h-10 bg-amber-400 rounded-full"></span>
                    Missing skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {result.missingSkills.length > 0 ? result.missingSkills.map((skill, idx) => (
                      <span key={idx} className="px-5 py-3 bg-amber-50 text-amber-700 rounded-2xl text-sm font-bold border border-amber-100">
                        {skill}
                      </span>
                    )) : (
                      <p className="text-emerald-600 font-bold p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Your resume matches all key skill requirements!
                      </p>
                    )}
                  </div>
                </div>

                {/* Resume suggestions section */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-lg shadow-slate-200/50">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
                    Resume suggestions
                  </h3>
                  <div className="space-y-6">
                    {result.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="flex gap-5 items-start p-5 bg-blue-50/30 rounded-3xl border border-blue-50 hover:bg-blue-50 transition-colors group">
                        <div className="p-3 bg-white text-blue-600 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-black text-blue-900 mb-1 uppercase text-xs tracking-widest">{suggestion.category}</div>
                          <p className="text-slate-700 leading-relaxed font-medium">{suggestion.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Analyzer;
