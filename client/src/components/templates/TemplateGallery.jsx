import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { TemplateRenderer } from './TemplateRenderer';
import { Check, Sparkles, Image, ShieldCheck, ArrowRight, Search, Plus } from 'lucide-react';

export const TemplateGallery = ({ onSelectTemplate }) => {
  const { templateId, setTemplateId, data, design, clearAllData } = useResume();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [photoFilter, setPhotoFilter] = useState('all'); // 'all', 'photo', 'no-photo'

  const templatesList = [
    {
      id: 'modern',
      name: 'Modern Executive',
      category: 'modern',
      hasPhoto: false,
      tagline: 'Clean header banner with structured multi-column experience flow.',
      badge: 'Popular'
    },
    {
      id: 'classic',
      name: 'Classic Serif',
      category: 'professional',
      hasPhoto: false,
      tagline: 'Timeless traditional format trusted by top Fortune 500 recruiters.',
      badge: 'Recruiter Favorite'
    },
    {
      id: 'minimal',
      name: 'Minimalist Air',
      category: 'minimal',
      hasPhoto: false,
      tagline: 'Generous whitespace and ultra-clean typography focus.',
      badge: 'ATS Safe'
    },
    {
      id: 'executive',
      name: 'Executive Leadership',
      category: 'professional',
      hasPhoto: false,
      tagline: 'Commanding header with metric highlight layout for senior leaders.',
      badge: 'Senior'
    },
    {
      id: 'student',
      name: 'Fresher & Entry-Level',
      category: 'student',
      hasPhoto: false,
      tagline: 'Puts education, skills, and projects front & center.',
      badge: 'Entry-Level'
    },
    {
      id: 'tech',
      name: 'Full Stack Tech',
      category: 'tech',
      hasPhoto: false,
      tagline: 'Technical skills matrix with repository & demo link integration.',
      badge: 'Developers'
    },
    {
      id: 'creative',
      name: 'Creative Studio',
      category: 'creative',
      hasPhoto: false,
      tagline: 'Bold typography with distinct accent sidebar for designers & marketing.',
      badge: 'Creative'
    },
    {
      id: 'compact',
      name: 'Dense One-Pager',
      category: 'minimal',
      hasPhoto: false,
      tagline: 'Engineered specifically to fit extensive career histories on 1 page.',
      badge: '1-Page Special'
    },
    {
      id: 'timeline',
      name: 'Timeline Journey',
      category: 'modern',
      hasPhoto: false,
      tagline: 'Visual timeline tree tracking career progression chronologically.',
      badge: 'Visual'
    },
    {
      id: 'twocolumn',
      name: 'Split Two-Column',
      category: 'modern',
      hasPhoto: false,
      tagline: 'Side-by-side layout balancing sidebar metadata and core experience.',
      badge: 'Balanced'
    },
    {
      id: 'photoModern',
      name: 'Photo Modern',
      category: 'modern',
      hasPhoto: true,
      tagline: 'Sleek header banner showcasing profile picture with modern accents.',
      badge: 'Profile Photo'
    },
    {
      id: 'photoProfessional',
      name: 'Photo Corporate',
      category: 'professional',
      hasPhoto: true,
      tagline: 'Structured corporate layout with formal avatar presentation.',
      badge: 'Profile Photo'
    },
    {
      id: 'photoCreative',
      name: 'Photo Creative Studio',
      category: 'creative',
      hasPhoto: true,
      tagline: 'Vibrant circular avatar design tailored for portfolios and agency roles.',
      badge: 'Profile Photo'
    },
    {
      id: 'atsClean',
      name: 'ATS Guard Standard',
      category: 'professional',
      hasPhoto: false,
      tagline: '100% compliant single-column layout built to score 99+ on ATS scanners.',
      badge: 'ATS Guaranteed'
    },
    {
      id: 'elegant',
      name: 'Elegant Serif',
      category: 'professional',
      hasPhoto: false,
      tagline: 'Luxurious serif headlines with delicate divider accents.',
      badge: 'Premium'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates (15)' },
    { id: 'modern', label: 'Modern (4)' },
    { id: 'professional', label: 'Professional (5)' },
    { id: 'minimal', label: 'Minimal (2)' },
    { id: 'creative', label: 'Creative (2)' },
    { id: 'student', label: 'Fresher & Student (1)' },
    { id: 'tech', label: 'Tech & Engineer (1)' }
  ];

  const filteredTemplates = templatesList.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPhoto = photoFilter === 'all' ? true : photoFilter === 'photo' ? t.hasPhoto : !t.hasPhoto;
    return matchesCategory && matchesSearch && matchesPhoto;
  });

  const handleChoose = (id) => {
    setTemplateId(id);
    onSelectTemplate(id);
  };

  const handleCreateBlank = () => {
    if (confirm('Start with a blank resume? This will clear all current content fields.')) {
      clearAllData();
      setTemplateId('classic');
      onSelectTemplate('classic');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Header Banner - Matching Image 2 Header Title */}
      <div className="pt-10 pb-8 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> 100% Free • ATS-Friendly • High Resolution PDF Export
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pick a template and build your resume in minutes!
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Select from professionally designed, recruiter-tested resume templates or start from scratch with a blank canvas.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-3.5 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Photo Filter & Search */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
              <button
                onClick={() => setPhotoFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  photoFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPhotoFilter('no-photo')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  photoFilter === 'no-photo' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                No Photo
              </button>
              <button
                onClick={() => setPhotoFilter('photo')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  photoFilter === 'photo' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                With Photo
              </button>
            </div>

            <div className="relative w-40 sm:w-52">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid - Enhancv / Canva Rounded Container Frame Aesthetic */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          
          {/* Create Blank Card - Matching Canva style from Image 3 */}
          {selectedCategory === 'all' && !searchQuery && (
            <div
              onClick={handleCreateBlank}
              className="group bg-[#eef3f8] hover:bg-[#e6edf6] border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-[28px] p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[440px] shadow-2xs hover:shadow-xl text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-md border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">
                <Plus className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                  Create blank
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">
                  Start fresh with an empty template and enter your details manually.
                </p>
              </div>
            </div>
          )}

          {/* Template Cards */}
          {filteredTemplates.map((tmpl) => {
            const isCurrent = templateId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => handleChoose(tmpl.id)}
                className={`group relative flex flex-col justify-between bg-[#eaf0f8] hover:bg-[#e4ebf5] border transition-all duration-300 rounded-[28px] p-5 sm:p-6 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 ${
                  isCurrent
                    ? 'border-blue-600 ring-2 ring-blue-600/30 shadow-md bg-[#e3ebf6]'
                    : 'border-slate-200/80 hover:border-blue-400/80'
                }`}
              >
                {/* Floating Paper Document Frame with Rounded Corners */}
                <div className="relative w-full aspect-[210/297] bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.09)] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden flex justify-center items-start border border-slate-200/60">
                  
                  {/* Scaled Mini Document Preview */}
                  <div className="w-[590px] bg-white transform scale-[0.42] sm:scale-[0.45] origin-top transition-transform duration-300 group-hover:scale-[0.44] sm:group-hover:scale-[0.47] pointer-events-none select-none">
                    <TemplateRenderer
                      templateId={tmpl.id}
                      data={data}
                      design={design}
                      hiddenSections={{}}
                    />
                  </div>

                  {/* Hover Backdrop Action Overlay */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-[1px]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChoose(tmpl.id);
                      }}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Use This Template <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Selected Indicator Pill */}
                  {isCurrent && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 shadow-md z-10">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </div>
                  )}

                  {/* Badge Top Left */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200/80 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs z-10">
                    {tmpl.badge}
                  </div>
                </div>

                {/* Card Bottom Meta Bar */}
                <div className="mt-4 flex items-center justify-between gap-3 px-1">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold text-slate-900 text-base truncate group-hover:text-blue-600 transition-colors">
                      {tmpl.name}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{tmpl.tagline}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChoose(tmpl.id);
                    }}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shrink-0 ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-300/80 shadow-2xs'
                    }`}
                  >
                    {isCurrent ? 'Active' : 'Use Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

