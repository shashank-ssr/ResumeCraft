import React from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Briefcase,
  Sparkles,
} from 'lucide-react';

export const ExperienceSection = ({ onOpenAIBullets }) => {
  const {
    data,
    addListEntry,
    updateListEntry,
    deleteListEntry,
    moveListEntry,
  } = useResume();

  const experienceList = data.experience || [];

  const handleAddExperience = () => {
    addListEntry('experience', {
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
    });
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />

            <h2 className="text-sm font-semibold text-slate-900">
              Work Experience
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Add your relevant jobs, internships, and professional experience.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5
                     text-xs font-semibold text-blue-600
                     bg-blue-50 border border-blue-100 rounded-lg
                     hover:bg-blue-100 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Empty State */}
      {experienceList.length === 0 && (
        <div className="border border-dashed border-slate-300 rounded-lg
                        p-6 text-center bg-slate-50/70">

          <Briefcase className="w-7 h-7 mx-auto text-slate-300 mb-2" />

          <p className="text-xs font-medium text-slate-600">
            No work experience added yet
          </p>

          <p className="text-[11px] text-slate-400 mt-1">
            Add your latest position or internship.
          </p>

          <button
            type="button"
            onClick={handleAddExperience}
            className="mt-3 text-xs font-semibold text-blue-600
                       hover:text-blue-700"
          >
            + Add experience
          </button>
        </div>
      )}

      {/* Experience Items */}
      {experienceList.length > 0 && (
        <div className="space-y-3">
          {experienceList.map((exp, index) => (
            <div
              key={exp.id}
              className="border border-slate-200 rounded-lg bg-white
                         hover:border-slate-300 transition-colors"
            >
              {/* Entry Header */}
              <div className="flex items-center justify-between gap-3
                              px-3 py-2.5 border-b border-slate-100">

                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="flex items-center justify-center
                               w-6 h-6 rounded-md bg-slate-100
                               text-[11px] font-semibold text-slate-500"
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {exp.jobTitle || 'Position'}
                    </p>

                    <p className="text-[11px] text-slate-400 truncate">
                      {exp.company || 'Add company'}
                    </p>
                  </div>
                </div>

                {/* Entry Controls */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      moveListEntry('experience', index, 'up')
                    }
                    disabled={index === 0}
                    title="Move up"
                    className="p-1.5 rounded-md text-slate-400
                               hover:text-slate-700 hover:bg-slate-100
                               disabled:opacity-30
                               disabled:hover:bg-transparent"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      moveListEntry('experience', index, 'down')
                    }
                    disabled={index === experienceList.length - 1}
                    title="Move down"
                    className="p-1.5 rounded-md text-slate-400
                               hover:text-slate-700 hover:bg-slate-100
                               disabled:opacity-30
                               disabled:hover:bg-transparent"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteListEntry('experience', exp.id)
                    }
                    title="Delete experience"
                    className="p-1.5 rounded-md text-slate-400
                               hover:text-red-600 hover:bg-red-50
                               transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-3 space-y-3">

                {/* Job Title + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="tool-label">
                      Job Title
                    </label>

                    <input
                      type="text"
                      value={exp.jobTitle || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'experience',
                          exp.id,
                          'jobTitle',
                          e.target.value
                        )
                      }
                      placeholder="Software Engineer"
                      className="tool-input"
                    />
                  </div>

                  <div>
                    <label className="tool-label">
                      Company
                    </label>

                    <input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'experience',
                          exp.id,
                          'company',
                          e.target.value
                        )
                      }
                      placeholder="Company Name"
                      className="tool-input"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="tool-label">
                    Location
                    <span className="font-normal text-slate-400">
                      {' '}
                      (optional)
                    </span>
                  </label>

                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) =>
                      updateListEntry(
                        'experience',
                        exp.id,
                        'location',
                        e.target.value
                      )
                    }
                    placeholder="City, Country"
                    className="tool-input"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="tool-label">
                      Start Date
                    </label>

                    <input
                      type="text"
                      value={exp.startDate || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'experience',
                          exp.id,
                          'startDate',
                          e.target.value
                        )
                      }
                      placeholder="Jun 2023"
                      className="tool-input"
                    />
                  </div>

                  <div>
                    <label className="tool-label">
                      End Date
                    </label>

                    <input
                      type="text"
                      disabled={!!exp.currentlyWorking}
                      value={
                        exp.currentlyWorking
                          ? 'Present'
                          : exp.endDate || ''
                      }
                      onChange={(e) =>
                        updateListEntry(
                          'experience',
                          exp.id,
                          'endDate',
                          e.target.value
                        )
                      }
                      placeholder="May 2025"
                      className="tool-input disabled:bg-slate-50
                                 disabled:text-slate-400
                                 disabled:cursor-not-allowed"
                    />

                    <label
                      htmlFor={`current-${exp.id}`}
                      className="flex items-center gap-1.5 mt-2
                                 text-[11px] text-slate-500 cursor-pointer
                                 select-none"
                    >
                      <input
                        id={`current-${exp.id}`}
                        type="checkbox"
                        checked={!!exp.currentlyWorking}
                        onChange={(e) =>
                          updateListEntry(
                            'experience',
                            exp.id,
                            'currentlyWorking',
                            e.target.checked
                          )
                        }
                        className="w-3.5 h-3.5 rounded
                                   border-slate-300 text-blue-600
                                   focus:ring-blue-500"
                      />

                      I currently work here
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <label className="tool-label !mb-0">
                      Description & Bullet Points
                    </label>

                    {onOpenAIBullets && (
                      <button
                        type="button"
                        onClick={() =>
                          onOpenAIBullets(
                            exp.description || '',
                            exp.jobTitle || '',
                            (enhanced) =>
                              updateListEntry(
                                'experience',
                                exp.id,
                                'description',
                                enhanced
                              )
                          )
                        }
                        className="inline-flex items-center gap-1
                                   text-[11px] font-medium
                                   text-purple-600
                                   hover:text-purple-700
                                   transition-colors"
                      >
                        <Sparkles className="w-3 h-3" />
                        Enhance with AI
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={4}
                    value={exp.description || ''}
                    onChange={(e) =>
                      updateListEntry(
                        'experience',
                        exp.id,
                        'description',
                        e.target.value
                      )
                    }
                    placeholder={`• Built and maintained web applications using React
• Improved application performance by 30%
• Collaborated with cross-functional teams`}
                    className="tool-input resize-y leading-relaxed"
                  />

                  <p className="mt-1.5 text-[10px] text-slate-400">
                    Tip: Start bullet points with strong action verbs and
                    include measurable results where possible.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};