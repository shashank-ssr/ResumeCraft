import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sparkles, FileText, Lightbulb } from 'lucide-react';

export const SummarySection = ({ onOpenAI }) => {
  const { data, updateSummary } = useResume();

  const summary = data.summary || '';

  const handleChange = (e) => {
    updateSummary(e.target.value);
  };

  const handleAIWriter = () => {
    if (typeof onOpenAI === 'function') {
      onOpenAI();
    }
  };

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />

            <h2 className="text-sm font-bold text-slate-900">
              Professional Summary
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Create a concise introduction that highlights your experience,
            strengths, and career goals.
          </p>
        </div>

        {/* AI Action */}
        <button
          type="button"
          onClick={handleAIWriter}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
                     text-purple-700 bg-purple-50 border border-purple-200
                     hover:bg-purple-100 rounded-lg transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          Write with AI
        </button>
      </div>

      {/* Summary Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="professional-summary"
            className="text-xs font-semibold text-slate-700"
          >
            Your Summary
          </label>

          <span className="text-[11px] text-slate-400">
            {summary.length} characters
          </span>
        </div>

        <textarea
          id="professional-summary"
          rows={7}
          value={summary}
          onChange={handleChange}
          maxLength={1000}
          placeholder="Example: Results-oriented software developer with experience building full-stack web applications using React, Node.js, Python, and MongoDB. Passionate about creating scalable, user-focused products and solving real-world problems through technology."
          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl
                     bg-white text-slate-800 placeholder:text-slate-400
                     focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600
                     outline-none resize-y leading-relaxed transition-colors"
        />

        <div className="flex items-start gap-2 p-3 bg-blue-50/60 border border-blue-100 rounded-xl">
          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />

          <div>
            <p className="text-xs font-semibold text-blue-900">
              ResumeCraft Tip
            </p>

            <p className="mt-0.5 text-[11px] leading-relaxed text-blue-700">
              Keep your summary focused on your experience, technical
              strengths, measurable achievements, and the type of role you
              are targeting. Avoid generic statements like "hardworking"
              or "team player."
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!summary.trim() && (
        <div className="text-center py-4 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs font-medium text-slate-500">
            Your professional summary will appear here.
          </p>

          <p className="text-[11px] text-slate-400 mt-1">
            Start typing or use the AI writer to generate one.
          </p>
        </div>
      )}
    </div>
  );
};