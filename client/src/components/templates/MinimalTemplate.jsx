import React from 'react';

export const MinimalTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Inter, sans-serif' };

  return (
    <div 
      className="w-full bg-white text-slate-800 antialiased max-w-full"
      style={{
        ...fontStyle,
        padding: `${pageMargins || 16}mm`,
        fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '15px' : '13.5px',
        lineHeight: lineHeight || 1.5
      }}
    >
      {/* Header */}
      {!hiddenSections.personal && personal && (
        <div className="mb-6 pb-4 border-b border-slate-100">
          <h1 className="font-extralight tracking-tight text-slate-900 mb-1" style={{ fontSize: headingSize === 'small' ? '28px' : headingSize === 'large' ? '38px' : '32px' }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="font-medium text-xs tracking-widest uppercase text-slate-400 mb-3">
              {personal.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.github && <span>{personal.github}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <p className="text-slate-600 leading-relaxed font-light text-sm">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3" style={{ color: primaryColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-slate-900">{exp.jobTitle} <span className="text-slate-400 font-normal">/ {exp.company}</span></h3>
                  <span className="text-xs text-slate-400 font-mono">{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-slate-600 text-sm mt-1 whitespace-pre-line font-light">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {!hiddenSections.education && education && education.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-medium text-slate-900">{edu.degree}</span>
                  <span className="text-slate-400 text-xs ml-2">{edu.institution}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {!hiddenSections.skills && skills && skills.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2" style={{ color: primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 text-xs text-slate-700">
            {skills.map(s => (
              <span key={s.id} className="bg-slate-50 px-2 py-1 rounded text-slate-600">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {!hiddenSections.projects && projects && projects.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2" style={{ color: primaryColor }}>
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map(p => (
              <div key={p.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-medium text-slate-900">{p.name}</span>
                  <span className="text-xs text-slate-400 font-mono">{p.startDate} – {p.endDate}</span>
                </div>
                {p.description && <p className="text-slate-600 text-sm font-light">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
