import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  LayoutGrid,
  Sparkles,
  Download,
  Zap
} from 'lucide-react';

export const LandingPage = ({
  onStartBuilding,
  onBrowseTemplates
}) => {
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      icon: FileText,
      title: 'Easy Resume Builder',
      description: 'Add your information and build your resume without complicated forms.'
    },
    {
      icon: LayoutGrid,
      title: 'Professional Templates',
      description: 'Choose a clean template and switch designs whenever you want.'
    },
    {
      icon: Sparkles,
      title: 'AI Assistance',
      description: 'Improve summaries and bullet points with simple AI tools.'
    },
    {
      icon: Download,
      title: 'Download as PDF',
      description: 'Export your finished resume as a clean, professional PDF.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Choose a template',
      description: 'Start with a design that fits your style.'
    },
    {
      number: '02',
      title: 'Add your details',
      description: 'Enter your education, experience, skills and projects.'
    },
    {
      number: '03',
      title: 'Customize',
      description: 'Adjust your resume and use AI when you need help.'
    },
    {
      number: '04',
      title: 'Download',
      description: 'Export your finished resume as a PDF.'
    }
  ];

  const faqs = [
    {
      question: 'Is ResumeCraft free?',
      answer:
        'Yes. You can create, customize and download your resume without paying.'
    },
    {
      question: 'Do I need an account?',
      answer:
        'You can start creating a resume without signing up. An account can be used when you want to save resumes online.'
    },
    {
      question: 'Can I change templates later?',
      answer:
        'Yes. You can switch between available templates while working on your resume.'
    },
    {
      question: 'Can I download my resume as a PDF?',
      answer:
        'Yes. Once your resume is ready, you can export it as a PDF.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ================= HERO ================= */}
      <section className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20 sm:py-28">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Simple AI Resume Builder
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Build your resume.
              <br />
              <span className="text-blue-600">
                Get ready to apply.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-500 leading-relaxed">
              Create a professional resume with easy editing, clean templates,
              helpful AI tools and instant PDF export.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">

              <button
                onClick={onStartBuilding}
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Create Resume
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBrowseTemplates}
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
              >
                <LayoutGrid className="w-4 h-4" />
                Browse Templates
              </button>

            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-slate-500">

              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Free to use
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                PDF export
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                No watermark
              </span>

            </div>

          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="mb-10">
            <h2 className="text-2xl font-bold">
              Everything you need
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              A straightforward set of tools for creating your resume.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="p-5 border border-slate-200 rounded-xl hover:border-blue-200 transition-colors"
                >

                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="text-sm font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="mb-10">
            <h2 className="text-2xl font-bold">
              How it works
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create your resume in four simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {steps.map((step) => (
              <div key={step.number}>

                <span className="text-sm font-bold text-blue-600">
                  {step.number}
                </span>

                <h3 className="mt-3 text-sm font-semibold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ================= FAQ ================= */}
      <section className="border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-16">

          <div className="text-center mb-10">

            <h2 className="text-2xl font-bold">
              Frequently asked questions
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              A few things you might want to know.
            </p>

          </div>

          <div className="space-y-3">

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="border border-slate-200 rounded-lg overflow-hidden"
                >

                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50"
                  >

                    <span className="text-sm font-medium">
                      {faq.question}
                    </span>

                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}

                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* ================= FINAL CTA ================= */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8 bg-slate-900 rounded-2xl">

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Ready to create your resume?
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Start building your resume in just a few minutes.
              </p>
            </div>

            <button
              onClick={onStartBuilding}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Start Building
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};