
import React from 'react';

const About: React.FC = () => {
  const steps = [
    {
      title: "How it Works",
      description: "Our proprietary AI engine analyzes your resume side-by-side with your target job description using Large Language Models to identify critical keyword gaps.",
      icon: "⚡"
    },
    {
      title: "Why Use It?",
      description: "Over 75% of resumes are rejected by ATS before a human even sees them. SmartCheck AI ensures your resume is optimized for both bots and humans.",
      icon: "🎯"
    },
    {
      title: "Real-time Feedback",
      description: "Get immediate insights on formatting, experience presentation, and hard skill alignment to increase your interview callback rate by up to 3x.",
      icon: "📈"
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            Bridging the Gap Between Talent and Opportunity
          </h2>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed">
            SmartCheck AI was built with a simple mission: to democratize the job application process. We believe that talented professionals shouldn't be held back by complicated hiring algorithms.
          </p>
          <div className="grid md:grid-cols-1 gap-8 text-left">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-8 bg-white rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="w-16 h-16 shrink-0 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                  {step.icon}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
