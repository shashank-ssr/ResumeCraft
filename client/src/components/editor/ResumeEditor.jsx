import React, { useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { PersonalInfoSection } from './PersonalInfoSection';
import { SummarySection } from './SummarySection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { ProjectsSection } from './ProjectsSection';
import { SkillsSection } from './SkillsSection';
import { CertificationsSection } from './CertificationsSection';
import { CustomSectionsSection } from './CustomSectionsSection';
import { DesignControls } from './DesignControls';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { AIAssistantModal } from './AIAssistantModal';
import { SectionOrganizerModal } from './SectionOrganizerModal';

import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Tag,
  Award,
  Layers,
  Palette,
  Sparkles,
  Download,
  RotateCcw,
  Upload,
  Eye,
  SlidersHorizontal,
  CheckCircle2,
  LayoutGrid,
  ChevronDown,
  MoreHorizontal,
  Smartphone,
  Monitor,
  Save,
  FileJson,
  Trash2
} from 'lucide-react';

export const ResumeEditor = ({ onNavigateToTemplates }) => {
  const {
    data,
    design,
    templateId,
    setTemplateId,
    setData,
    resetToSampleData,
    clearAllData,
    importResumeJSON,
    exportResumeJSON,
    printPDF
  } = useResume();

  const [activeTab, setActiveTab] = useState('personal');

  const [showAiModal, setShowAiModal] = useState(false);
  const [aiModalMode, setAiModalMode] = useState('summary');
  const [aiInitialText, setAiInitialText] = useState('');
  const [aiCallback, setAiCallback] = useState(null);

  const [showSectionOrganizer, setShowSectionOrganizer] = useState(false);

  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const [showMoreActions, setShowMoreActions] = useState(false);

  const [previewMode, setPreviewMode] = useState('desktop');

  const fileInputRef = useRef(null);

  const tabs = [
    {
      id: 'personal',
      label: 'Personal',
      shortLabel: 'Info',
      icon: User
    },
    {
      id: 'summary',
      label: 'Summary',
      shortLabel: 'Summary',
      icon: FileText
    },
    {
      id: 'experience',
      label: 'Experience',
      shortLabel: 'Work',
      icon: Briefcase
    },
    {
      id: 'education',
      label: 'Education',
      shortLabel: 'Education',
      icon: GraduationCap
    },
    {
      id: 'projects',
      label: 'Projects',
      shortLabel: 'Projects',
      icon: FolderGit2
    },
    {
      id: 'skills',
      label: 'Skills',
      shortLabel: 'Skills',
      icon: Tag
    },
    {
      id: 'certifications',
      label: 'Certifications',
      shortLabel: 'Certs',
      icon: Award
    },
    {
      id: 'custom',
      label: 'Custom',
      shortLabel: 'Custom',
      icon: Layers
    },
    {
      id: 'design',
      label: 'Design',
      shortLabel: 'Design',
      icon: Palette
    }
  ];

  const calculateCompletion = () => {
    const personal = data.personal || {};

    const checks = [
      personal.fullName,
      personal.email,
      personal.phone,
      personal.jobTitle,
      data.summary,
      data.experience?.length,
      data.education?.length,
      data.projects?.length,
      data.skills?.length
    ];

    const completed = checks.filter(Boolean).length;

    return Math.round((completed / checks.length) * 100);
  };

  const completion = calculateCompletion();

  const handleOpenAIBullets = (
    currentText,
    jobTitle,
    callback
  ) => {
    setAiModalMode('bullets');
    setAiInitialText(currentText || '');
    setAiCallback(() => callback);
    setShowAiModal(true);
  };

  const handleOpenAISummary = (callback) => {
    setAiModalMode('summary');
    setAiInitialText('');
    setAiCallback(() => callback);
    setShowAiModal(true);
  };

  const handleApplyAIText = (enhancedText) => {
    if (aiCallback) {
      aiCallback(enhancedText);
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);

        importResumeJSON(json);

        setShowMoreActions(false);

        alert('Resume imported successfully.');
      } catch (error) {
        console.error(error);
        alert('Invalid ResumeCraft JSON file.');
      }
    };

    reader.readAsText(file);

    e.target.value = '';
  };

  const handleClearResume = () => {
    const confirmed = window.confirm(
      'Clear your entire resume?\n\nThis will remove all resume information.'
    );

    if (!confirmed) return;

    clearAllData();
    setActiveTab('personal');
    setShowMoreActions(false);
  };

  const handleSampleData = () => {
    const confirmed = window.confirm(
      'Load sample resume data?\n\nYour current resume data may be replaced.'
    );

    if (!confirmed) return;

    resetToSampleData();
    setShowMoreActions(false);
  };

  const openSummaryAI = () => {
    handleOpenAISummary((summary) => {
      setData((prev) => ({
        ...prev,
        personal: {
          ...(prev.personal || {}),
          summary
        }
      }));
    });
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">

        <div className="max-w-[1600px] mx-auto px-4">

          <div className="h-14 flex items-center justify-between gap-3">

            <div className="flex items-center gap-3 min-w-0">

              <div className="hidden sm:flex w-9 h-9 rounded-xl bg-blue-600 items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                    ResumeCraft
                  </h1>

                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <Save className="w-3 h-3" />
                    Saved
                  </span>
                </div>

                <p className="hidden sm:block text-[10px] text-slate-500">
                  Build your professional resume
                </p>
              </div>

            </div>

            <div className="hidden md:flex items-center gap-2">

              <button
                type="button"
                onClick={onNavigateToTemplates}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                {templateId || 'Template'}
              </button>

              <button
                type="button"
                onClick={() => setShowSectionOrganizer(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                Sections
              </button>

              <button
                type="button"
                onClick={openSummaryAI}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-100 rounded-lg transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Assistant
              </button>

            </div>

            <div className="flex items-center gap-1.5">

              <div className="hidden lg:flex items-center gap-2 mr-2">

                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${completion}%` }}
                  />
                </div>

                <span className="text-[10px] font-semibold text-slate-500">
                  {completion}%
                </span>

              </div>

              <div className="relative">

                <button
                  type="button"
                  onClick={() => setShowMoreActions((prev) => !prev)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                  title="More actions"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {showMoreActions && (
                  <div className="absolute right-0 top-10 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50">

                    <button
                      onClick={handleSampleData}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Load Sample Resume
                    </button>

                    <button
                      onClick={exportResumeJSON}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      <FileJson className="w-3.5 h-3.5" />
                      Export Resume Data
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Import Resume Data
                    </button>

                    <div className="h-px bg-slate-100 my-1" />

                    <button
                      onClick={handleClearResume}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear Resume
                    </button>

                  </div>
                )}

              </div>

              <button
                type="button"
                onClick={() => setShowMobilePreview((prev) => !prev)}
                className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {showMobilePreview ? 'Edit' : 'Preview'}
                </span>
              </button>

              <button
                type="button"
                onClick={printPDF}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">
                  Download PDF
                </span>
              </button>

            </div>

          </div>

        </div>

      </header>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileImport}
        className="hidden"
      />

      <div className="lg:hidden sticky top-14 z-30 bg-white border-b border-slate-200">

        <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto no-scrollbar">

          {tabs.map((tab) => {

            const Icon = tab.icon;

            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMobilePreview(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap text-[11px] font-semibold transition ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.shortLabel}
              </button>
            );

          })}

        </div>

      </div>

      <main className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-4 lg:p-5">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">

          <section
            className={`lg:col-span-6 xl:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden ${
              showMobilePreview
                ? 'hidden lg:flex'
                : 'flex'
            } flex-col`}
          >
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-wider font-bold text-blue-600">
                  Resume Editor
                </p>

                <h2 className="text-sm font-bold text-slate-900">
                  {currentTab?.label}
                </h2>

              </div>

              <div className="flex items-center gap-1.5">

                {completion >= 80 && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Looking good
                  </span>
                )}

              </div>

            </div>

            <div className="hidden lg:flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1 overflow-x-auto no-scrollbar">

              {tabs.map((tab) => {

                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    title={tab.label}
                    className={`flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-semibold rounded-lg whitespace-nowrap transition ${
                      active
                        ? 'bg-white text-blue-600 border border-slate-200 shadow-sm'
                        : 'text-slate-500 hover:bg-white hover:text-slate-800'
                    }`}
                  >

                    <Icon className="w-3.5 h-3.5" />

                    {tab.shortLabel}

                  </button>
                );

              })}

            </div>

            <div className="p-4 sm:p-5 flex-1 overflow-y-auto lg:max-h-[calc(100vh-145px)]">

              {activeTab === 'personal' && (
                <PersonalInfoSection />
              )}

              {activeTab === 'summary' && (
                <SummarySection
                  onOpenAI={openSummaryAI}
                />
              )}

              {activeTab === 'experience' && (
                <ExperienceSection
                  onOpenAIBullets={handleOpenAIBullets}
                />
              )}

              {activeTab === 'education' && (
                <EducationSection />
              )}

              {activeTab === 'projects' && (
                <ProjectsSection
                  onOpenAIBullets={handleOpenAIBullets}
                />
              )}

              {activeTab === 'skills' && (
                <SkillsSection />
              )}

              {activeTab === 'certifications' && (
                <CertificationsSection />
              )}

              {activeTab === 'custom' && (
                <CustomSectionsSection />
              )}

              {activeTab === 'design' && (
                <DesignControls />
              )}

            </div>

          </section>

          <section
            className={`lg:col-span-6 xl:col-span-7 ${
              showMobilePreview
                ? 'block'
                : 'hidden lg:block'
            }`}
          >

            <div className="lg:sticky lg:top-20">

              <div className="bg-slate-900 text-white px-3 sm:px-4 py-2.5 rounded-t-xl flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
                  </span>

                  <span className="text-[11px] font-bold tracking-wide">
                    LIVE PREVIEW
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <span className="hidden sm:inline text-[10px] text-slate-400">
                    {design.paperFormat || 'A4'}
                  </span>

                  <div className="hidden sm:flex bg-slate-800 rounded-lg p-0.5">

                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-1.5 rounded ${
                        previewMode === 'desktop'
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-400'
                      }`}
                      title="Desktop preview"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-1.5 rounded ${
                        previewMode === 'mobile'
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-400'
                      }`}
                      title="Mobile preview"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>

              </div>

              <div className="bg-slate-300 p-3 sm:p-5 rounded-b-xl min-h-[calc(100vh-130px)] overflow-auto">

                <div
                  className={`mx-auto transition-all duration-300 ${
                    previewMode === 'mobile'
                      ? 'max-w-[390px]'
                      : 'max-w-[794px]'
                  }`}
                >

                  <div className="bg-white shadow-2xl">

                    <TemplateRenderer
                      templateId={templateId}
                      data={data}
                      design={design}
                      hiddenSections={data.hiddenSections || {}}
                    />

                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

      <AIAssistantModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        mode={aiModalMode}
        initialText={aiInitialText}
        jobTitle={data.personal?.jobTitle}
        onApplyText={handleApplyAIText}
      />

      <SectionOrganizerModal
        isOpen={showSectionOrganizer}
        onClose={() => setShowSectionOrganizer(false)}
      />

    </div>
  );
};