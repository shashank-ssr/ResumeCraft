import React, { useMemo, useState } from 'react';
import { Modal } from '../common/Modal';
import { useResume } from '../../context/ResumeContext';
import {
  Eye,
  EyeOff,
  Check,
  RotateCcw,
  Search,
  Layers,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Tag,
  Award,
  Languages,
  Heart,
  Settings2,
} from 'lucide-react';

export const SectionOrganizerModal = ({ isOpen, onClose }) => {
  const { data, setData } = useResume();

  const [searchQuery, setSearchQuery] = useState('');

  const hiddenSections = data.hiddenSections || {};

  const sectionsList = [
    {
      key: 'personal',
      label: 'Personal Information',
      description: 'Name, contact details, website and social links',
      icon: User,
      required: true,
    },
    {
      key: 'summary',
      label: 'Professional Summary',
      description: 'Short introduction and career profile',
      icon: FileText,
    },
    {
      key: 'experience',
      label: 'Work Experience',
      description: 'Employment history and accomplishments',
      icon: Briefcase,
    },
    {
      key: 'education',
      label: 'Education',
      description: 'Degrees, institutions and academic details',
      icon: GraduationCap,
    },
    {
      key: 'projects',
      label: 'Projects',
      description: 'Personal, academic and professional projects',
      icon: FolderGit2,
    },
    {
      key: 'skills',
      label: 'Skills',
      description: 'Technical skills, tools and competencies',
      icon: Tag,
    },
    {
      key: 'certifications',
      label: 'Certifications',
      description: 'Professional certifications and licenses',
      icon: Award,
    },
    {
      key: 'languages',
      label: 'Languages',
      description: 'Languages and proficiency levels',
      icon: Languages,
    },
    {
      key: 'interests',
      label: 'Interests & Hobbies',
      description: 'Personal interests and activities',
      icon: Heart,
    },
    {
      key: 'custom',
      label: 'Custom Sections',
      description: 'Your custom resume sections',
      icon: Layers,
    },
  ];

  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return sectionsList;

    return sectionsList.filter(
      (section) =>
        section.label.toLowerCase().includes(query) ||
        section.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const visibleCount = sectionsList.filter(
    (section) => !hiddenSections[section.key]
  ).length;

  const hiddenCount = sectionsList.length - visibleCount;

  const toggleSectionVisibility = (key) => {
    setData((prev) => ({
      ...prev,
      hiddenSections: {
        ...(prev.hiddenSections || {}),
        [key]: !prev.hiddenSections?.[key],
      },
    }));
  };

  const showAllSections = () => {
    setData((prev) => ({
      ...prev,
      hiddenSections: {},
    }));
  };

  const hideAllOptionalSections = () => {
    const hidden = {};

    sectionsList.forEach((section) => {
      if (!section.required) {
        hidden[section.key] = true;
      }
    });

    setData((prev) => ({
      ...prev,
      hiddenSections: hidden,
    }));
  };

  const resetSections = () => {
    setData((prev) => ({
      ...prev,
      hiddenSections: {},
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-blue-600" />
          <span>Manage Resume Sections</span>
        </div>
      }
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">

        {/* Header */}
        <div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Control which sections appear on your resume. Hidden sections
            remain saved and can be restored anytime.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
            <p className="text-lg font-bold text-slate-900">
              {sectionsList.length}
            </p>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
              Total
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
            <p className="text-lg font-bold text-emerald-700">
              {visibleCount}
            </p>
            <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">
              Visible
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
            <p className="text-lg font-bold text-slate-600">
              {hiddenCount}
            </p>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
              Hidden
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={showAllSections}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Show All
          </button>

          <button
            type="button"
            onClick={hideAllOptionalSections}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs font-semibold transition-colors"
          >
            <EyeOff className="w-3.5 h-3.5" />
            Hide Optional
          </button>

          <button
            type="button"
            onClick={resetSections}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resume sections..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Section List */}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {filteredSections.length === 0 ? (
            <div className="text-center py-8">
              <Search className="w-7 h-7 mx-auto text-slate-300 mb-2" />

              <p className="text-xs font-semibold text-slate-600">
                No sections found
              </p>

              <p className="text-[11px] text-slate-400 mt-1">
                Try another search term.
              </p>
            </div>
          ) : (
            filteredSections.map((section) => {
              const Icon = section.icon;
              const isHidden = !!hiddenSections[section.key];
              const isVisible = !isHidden;

              return (
                <div
                  key={section.key}
                  className={`group flex items-center justify-between gap-3 p-3 rounded-xl border transition-all ${
                    isHidden
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-slate-200 hover:border-blue-200 hover:shadow-sm'
                  }`}
                >
                  {/* Section Info */}
                  <div className="flex items-center gap-3 min-w-0">

                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isHidden
                          ? 'bg-slate-200 text-slate-400'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p
                          className={`text-xs font-bold truncate ${
                            isHidden
                              ? 'text-slate-400'
                              : 'text-slate-800'
                          }`}
                        >
                          {section.label}
                        </p>

                        {section.required && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-500 uppercase">
                            Required
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-[10px] mt-0.5 truncate ${
                          isHidden
                            ? 'text-slate-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Visibility Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!section.required) {
                        toggleSectionVisibility(section.key);
                      }
                    }}
                    disabled={section.required}
                    title={
                      section.required
                        ? 'Personal information cannot be hidden'
                        : isVisible
                        ? 'Hide section'
                        : 'Show section'
                    }
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] rounded-lg font-semibold transition-all ${
                      section.required
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : isVisible
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300 border border-slate-300'
                    }`}
                  >
                    {isVisible ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        Visible
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        Hidden
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Resume Tip */}
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-3">
          <div className="flex gap-2">
            <Layers className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />

            <div>
              <p className="text-xs font-bold text-blue-900">
                ResumeCraft Tip
              </p>

              <p className="text-[11px] text-blue-700 mt-0.5 leading-relaxed">
                For most professional resumes, prioritize Experience,
                Projects, Skills and Education. Hide sections that don't
                add value for the specific job you're applying to.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center">

          <p className="text-[10px] text-slate-400">
            Changes are saved automatically
          </p>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 text-white font-semibold text-xs rounded-lg hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </Modal>
  );
};