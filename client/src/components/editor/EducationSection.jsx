import React from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';

export const EducationSection = () => {
  const {
    data,
    addListEntry,
    updateListEntry,
    deleteListEntry,
    moveListEntry,
  } = useResume();

  const educationList = data.education || [];

  const handleAddEducation = () => {
    addListEntry('education', {
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    });
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-semibold text-slate-900">
              Education
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Add your degrees, institutions, and academic achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
                     text-blue-600 bg-blue-50 border border-blue-100 rounded-lg
                     hover:bg-blue-100 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Empty State */}
      {educationList.length === 0 && (
        <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50/70">
          <GraduationCap className="w-7 h-7 mx-auto text-slate-300 mb-2" />

          <p className="text-xs font-medium text-slate-600">
            No education added yet
          </p>

          <p className="text-[11px] text-slate-400 mt-1">
            Add your highest qualification or degree.
          </p>

          <button
            type="button"
            onClick={handleAddEducation}
            className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            + Add education
          </button>
        </div>
      )}

      {/* Education Items */}
      {educationList.length > 0 && (
        <div className="space-y-3">
          {educationList.map((edu, index) => (
            <div
              key={edu.id}
              className="border border-slate-200 rounded-lg bg-white
                         hover:border-slate-300 transition-colors"
            >
              {/* Item Header */}
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-500">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {edu.degree || 'Education'}
                    </p>

                    <p className="text-[11px] text-slate-400 truncate">
                      {edu.institution || 'Add institution'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {/* Move Up */}
                  <button
                    type="button"
                    onClick={() =>
                      moveListEntry('education', index, 'up')
                    }
                    disabled={index === 0}
                    title="Move up"
                    className="p-1.5 rounded-md text-slate-400
                               hover:text-slate-700 hover:bg-slate-100
                               disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    onClick={() =>
                      moveListEntry('education', index, 'down')
                    }
                    disabled={index === educationList.length - 1}
                    title="Move down"
                    className="p-1.5 rounded-md text-slate-400
                               hover:text-slate-700 hover:bg-slate-100
                               disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() =>
                      deleteListEntry('education', edu.id)
                    }
                    title="Delete education"
                    className="p-1.5 rounded-md text-slate-400
                               hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-3 space-y-3">
                {/* Degree + Institution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="tool-label">
                      Degree / Qualification
                    </label>

                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'education',
                          edu.id,
                          'degree',
                          e.target.value
                        )
                      }
                      placeholder="B.Sc. Computer Science"
                      className="tool-input"
                    />
                  </div>

                  <div>
                    <label className="tool-label">
                      Institution
                    </label>

                    <input
                      type="text"
                      value={edu.institution || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'education',
                          edu.id,
                          'institution',
                          e.target.value
                        )
                      }
                      placeholder="University Name"
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
                    value={edu.location || ''}
                    onChange={(e) =>
                      updateListEntry(
                        'education',
                        edu.id,
                        'location',
                        e.target.value
                      )
                    }
                    placeholder="City, Country"
                    className="tool-input"
                  />
                </div>

                {/* Dates + GPA */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="tool-label">
                      Start
                    </label>

                    <input
                      type="text"
                      value={edu.startDate || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'education',
                          edu.id,
                          'startDate',
                          e.target.value
                        )
                      }
                      placeholder="2021"
                      className="tool-input"
                    />
                  </div>

                  <div>
                    <label className="tool-label">
                      End
                    </label>

                    <input
                      type="text"
                      value={edu.endDate || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'education',
                          edu.id,
                          'endDate',
                          e.target.value
                        )
                      }
                      placeholder="2025"
                      className="tool-input"
                    />
                  </div>

                  <div>
                    <label className="tool-label">
                      GPA / Score
                      <span className="font-normal text-slate-400">
                        {' '}
                        (optional)
                      </span>
                    </label>

                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'education',
                          edu.id,
                          'gpa',
                          e.target.value
                        )
                      }
                      placeholder="8.2 / 10"
                      className="tool-input"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="tool-label">
                    Additional Details
                    <span className="font-normal text-slate-400">
                      {' '}
                      (optional)
                    </span>
                  </label>

                  <textarea
                    rows={2}
                    value={edu.description || ''}
                    onChange={(e) =>
                      updateListEntry(
                        'education',
                        edu.id,
                        'description',
                        e.target.value
                      )
                    }
                    placeholder="Relevant coursework, achievements, honors..."
                    className="tool-input resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};