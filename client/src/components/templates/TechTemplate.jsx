import React from 'react';

export const TechTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || "'Courier New', Courier, monospace" };
  const primaryText = { color: primaryColor || '#0284c7' };

  return (
    <div 
      className="w-full bg-slate-950 text-slate-200 antialiased font-mono p-6 min-h-full"
      style={{
        padding: `${pageMargins || 16}mm`,
        fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '15px' : '13px',
        lineHeight: lineHeight || 1.5
      }}
    >
      {/* Header */}
      {!hiddenSections.personal && personal && (
        <div className="border-b border-slate-800 pb-4 mb-4">
          <p className="text-xs text-sky-400 font-bold mb-0.5">// DEV PROFILE</p>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1" style={primaryText}>
            {personal.fullName || 'Alex Morgan'}
          </h1>
          {personal.jobTitle && (
            <p className="text-xs text-slate-400 mb-2">
              &lt;{personal.jobTitle} /&gt;
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            {personal.email && <span>email: "{personal.email}"</span>}
            {personal.github && <span className="text-emerald-400">github: "{personal.github}"</span>}
            {personal.website && <span>web: "{personal.website}"</span>}
            {personal.location && <span>loc: "{personal.location}"</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <p className="text-xs text-sky-400 font-bold">// ABOUT</p>
          <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">{summary}</p>
        </div>
      )}

      {/* Skills */}
      {!hiddenSections.skills && skills && skills.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <p className="text-xs text-sky-400 font-bold mb-1.5">// STACK & TECH</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(s => (
              <span key={s.id} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-xs text-sky-300 font-medium">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {!hiddenSections.projects && projects && projects.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <p className="text-xs text-sky-400 font-bold mb-2">// FEATURED PROJECTS</p>
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.id} className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <div className="flex justify-between items-baseline font-bold text-white text-xs">
                  <span>{p.name}</span>
                  <span className="text-[10px] text-slate-500">{p.startDate} - {p.endDate}</span>
                </div>
                {p.technologies && <p className="text-[11px] text-emerald-400 my-0.5">[{p.technologies}]</p>}
                {p.description && <p className="text-slate-300 text-xs">{p.description}</p>}
                {p.githubUrl && <p className="text-[11px] text-sky-400 underline mt-1">{p.githubUrl}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <p className="text-xs text-sky-400 font-bold mb-2">// WORK EXPERIENCE</p>
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline text-xs font-bold text-white">
                  <span>{exp.jobTitle} @ <span className="text-emerald-400">{exp.company}</span></span>
                  <span className="text-[10px] text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-slate-300 text-xs whitespace-pre-line mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {!hiddenSections.education && education && education.length > 0 && (
        <div>
          <p className="text-xs text-sky-400 font-bold mb-1">// EDUCATION</p>
          <div className="space-y-1 text-xs">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between text-slate-300">
                <span>{edu.degree} - {edu.institution}</span>
                <span className="text-slate-500">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
