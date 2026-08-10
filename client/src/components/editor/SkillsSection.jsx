import React, { useMemo, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  Plus,
  Trash2,
  Tag,
  Search,
  Sparkles,
  X,
  Layers,
  Code2,
  Database,
  Cloud,
  Wrench,
  Users,
  Check,
} from 'lucide-react';

export const SkillsSection = () => {
  const {
    data,
    addListEntry,
    updateListEntry,
    deleteListEntry,
  } = useResume();

  const skillsList = data.skills || [];

  const [quickInput, setQuickInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    {
      name: 'General',
      icon: Tag,
    },
    {
      name: 'Frontend',
      icon: Code2,
    },
    {
      name: 'Backend',
      icon: Wrench,
    },
    {
      name: 'Database',
      icon: Database,
    },
    {
      name: 'DevOps',
      icon: Cloud,
    },
    {
      name: 'Soft Skills',
      icon: Users,
    },
  ];

  const suggestedSkills = [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'SQL',
    'MongoDB',
    'Git',
    'Docker',
    'AWS',
    'REST APIs',
    'TypeScript',
  ];

  const handleAddSkill = () => {
    addListEntry('skills', {
      name: '',
      level: 'Advanced',
      category: 'General',
    });
  };

  const handleBatchAdd = () => {
    if (!quickInput.trim()) return;

    const items = quickInput
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    const existingSkills = skillsList.map((skill) =>
      (skill.name || '').trim().toLowerCase()
    );

    items.forEach((skillName) => {
      const normalizedName = skillName.toLowerCase();

      if (!existingSkills.includes(normalizedName)) {
        addListEntry('skills', {
          name: skillName,
          level: 'Advanced',
          category: 'General',
        });

        existingSkills.push(normalizedName);
      }
    });

    setQuickInput('');
  };

  const handleAddSuggestedSkill = (skillName) => {
    const exists = skillsList.some(
      (skill) =>
        (skill.name || '').trim().toLowerCase() ===
        skillName.toLowerCase()
    );

    if (exists) return;

    addListEntry('skills', {
      name: skillName,
      level: 'Advanced',
      category: 'General',
    });
  };

  const handleRemoveSkill = (skillId) => {
    deleteListEntry('skills', skillId);
  };

  const handleClearAll = () => {
    if (!skillsList.length) return;

    const shouldClear = window.confirm(
      'Remove all skills from this resume?'
    );

    if (!shouldClear) return;

    skillsList.forEach((skill) => {
      deleteListEntry('skills', skill.id);
    });
  };

  const filteredSkills = useMemo(() => {
    return skillsList.filter((skill) => {
      const matchesSearch =
        !searchQuery.trim() ||
        (skill.name || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === 'All' ||
        (skill.category || 'General') === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [skillsList, searchQuery, activeCategory]);

  const visibleSkillCount = skillsList.filter(
    (skill) => (skill.name || '').trim()
  ).length;

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Tag className="w-4 h-4 text-blue-600" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Skills & Competencies
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                Highlight technical, professional and domain-specific skills.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
            {visibleSkillCount} Skills
          </span>

          {skillsList.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[11px] font-semibold text-red-500 hover:text-red-700"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Quick Add */}
      <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl space-y-3">

        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 mt-0.5" />

          <div>
            <p className="text-xs font-bold text-blue-900">
              Quick Add Skills
            </p>

            <p className="text-[11px] text-blue-700 mt-0.5">
              Add multiple skills at once by separating them with commas.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleBatchAdd();
              }
            }}
            placeholder="React, Node.js, MongoDB, Docker..."
            className="flex-1 px-3 py-2 text-xs border border-blue-200 rounded-lg outline-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />

          <button
            type="button"
            onClick={handleBatchAdd}
            disabled={!quickInput.trim()}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Skills
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-700">
            Popular Skills
          </p>

          <span className="text-[10px] text-slate-400">
            Click to add
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {suggestedSkills.map((skill) => {
            const alreadyAdded = skillsList.some(
              (item) =>
                (item.name || '').toLowerCase() ===
                skill.toLowerCase()
            );

            return (
              <button
                key={skill}
                type="button"
                disabled={alreadyAdded}
                onClick={() => handleAddSuggestedSkill(skill)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors ${
                  alreadyAdded
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600 cursor-default'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {alreadyAdded ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Plus className="w-3 h-3" />
                )}

                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + Category Filter */}
      <div className="space-y-3">

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your skills..."
            className="w-full pl-9 pr-9 py-2 text-xs border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
              activeCategory === 'All'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>

          {categories.map((category) => {
            const Icon = category.icon;
            const active = activeCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills List */}
      {skillsList.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-xl">

          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-white border border-slate-200 flex items-center justify-center">
            <Tag className="w-5 h-5 text-slate-400" />
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No skills added yet
          </p>

          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Add your technical and professional skills using the quick
            input above or choose from the suggested skills.
          </p>

          <button
            type="button"
            onClick={handleAddSkill}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Skill Manually
          </button>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 border border-slate-200 rounded-xl">
          <Search className="w-6 h-6 mx-auto text-slate-300 mb-2" />

          <p className="text-xs font-semibold text-slate-600">
            No matching skills
          </p>

          <p className="text-[11px] text-slate-400 mt-1">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="space-y-2">

          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id}
              className="group p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all"
            >

              {/* Skill Header */}
              <div className="flex items-center justify-between gap-2 mb-2">

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
                    <Tag className="w-3 h-3 text-blue-600" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Skill #{index + 1}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.id)}
                  title="Remove skill"
                  className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                {/* Skill Name */}
                <div className="sm:col-span-1">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Skill
                  </label>

                  <input
                    type="text"
                    value={skill.name || ''}
                    onChange={(e) =>
                      updateListEntry(
                        'skills',
                        skill.id,
                        'name',
                        e.target.value
                      )
                    }
                    placeholder="React.js"
                    className="w-full px-2.5 py-2 text-xs font-medium border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Category
                  </label>

                  <select
                    value={skill.category || 'General'}
                    onChange={(e) =>
                      updateListEntry(
                        'skills',
                        skill.id,
                        'category',
                        e.target.value
                      )
                    }
                    className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 outline-none focus:border-blue-500"
                  >
                    <option value="General">General</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Proficiency
                  </label>

                  <select
                    value={skill.level || 'Advanced'}
                    onChange={(e) =>
                      updateListEntry(
                        'skills',
                        skill.id,
                        'level',
                        e.target.value
                      )
                    }
                    className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 outline-none focus:border-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                    <option value="None">Hide Level</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* Add another */}
          <button
            type="button"
            onClick={handleAddSkill}
            className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Another Skill
          </button>
        </div>
      )}

      {/* ATS Tip */}
      <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
        <div className="flex items-start gap-2">

          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />

          <div>
            <p className="text-xs font-bold text-emerald-900">
              ATS Optimization Tip
            </p>

            <p className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
              Use the exact terminology found in the job description when
              you genuinely have that skill. Grouping related skills makes
              your resume easier for recruiters and ATS systems to scan.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};