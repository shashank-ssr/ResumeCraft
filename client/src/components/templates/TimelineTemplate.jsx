import React from 'react';

export const TimelineTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Inter, sans-serif' };
  const primaryText = { color: primaryColor || '#2563eb' };
  const primaryBg = { backgroundColor: primaryColor || '#2563eb' };

  return (
    <div 
      className="w-full bg-white text-slate-800 antialiased"
      style={{
        ...fontStyle,
        padding: `${pageMargins || 16}mm`,
        fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '15px' : '13.5px',
        lineHeight: lineHeight || 1.5
      }}
    >
      {/* Header */}
      {!hiddenSections.personal && personal && (
        <div className="border-b-2 pb-4 mb-6" style={{ borderColor: `${primaryColor}30` }}>
          <h1 className="font-extrabold text-3xl tracking-tight text-slate-900 mb-1" style={primaryText}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-3">
              {personal.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.location && <span>• {personal.location}</span>}
            {personal.linkedin && <span>• {personal.linkedin}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <p className="text-slate-700 leading-relaxed text-sm">{summary}</p>
        </div>
      )}

      {/* Connected Timeline Experience */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-4" style={primaryText}>
            Career Timeline
          </h2>
          <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
            {experience.map(exp => (
              <div key={exp.id} className="relative">
                {/* Timeline Dot */}
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs" style={primaryBg}></span>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span className="text-sm">{exp.jobTitle} <span className="text-slate-500 font-medium">@ {exp.company}</span></span>
                  <span className="text-xs text-slate-500 font-mono">{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-slate-600 text-xs mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Timeline */}
      {!hiddenSections.education && education && education.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-4" style={primaryText}>
            Education
          </h2>
          <div className="relative pl-6 border-l-2 border-slate-200 space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="relative">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs bg-slate-400"></span>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                  <span>{edu.degree} — {edu.institution}</span>
                  <span className="text-slate-500 font-mono">{edu.startDate} – {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {!hiddenSections.skills && skills && skills.length > 0 && (
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2" style={primaryText}>
            Core Skills
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {skills.map(s => (
              <span key={s.id} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-medium">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
