import React from 'react';

export const StudentTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Poppins, sans-serif' };
  const primaryText = { color: primaryColor || '#2563eb' };
  const badgeStyle = { backgroundColor: `${primaryColor}15`, color: primaryColor || '#2563eb' };

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
        <div className="mb-5 pb-3 border-b-2 border-slate-100 flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight text-slate-900" style={primaryText}>
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="font-medium text-xs text-slate-500">
                {personal.jobTitle}
              </p>
            )}
          </div>
          <div className="text-right text-xs text-slate-600 space-y-0.5">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.github && <div className="text-blue-600 font-medium">{personal.github}</div>}
          </div>
        </div>
      )}

      {/* Education First for Students */}
      {!hiddenSections.education && education && education.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2" style={primaryText}>
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Education & Academic Background
          </h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id} className="p-3 bg-slate-50 rounded-xl">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{edu.degree}</span>
                  <span className="text-xs text-slate-500 font-medium">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-xs font-semibold text-slate-600 mb-1">{edu.institution} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                {edu.description && <p className="text-slate-600 text-xs">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {!hiddenSections.skills && skills && skills.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2" style={primaryText}>
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Technical & Soft Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => (
              <span key={s.id} className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={badgeStyle}>
                {s.name} {s.level && s.level !== 'None' && `(${s.level})`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {!hiddenSections.projects && projects && projects.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2" style={primaryText}>
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Academic & Personal Projects
          </h2>
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.id} className="border-l-2 border-blue-500 pl-3">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{p.name}</span>
                  <span className="text-xs text-slate-500">{p.startDate} - {p.endDate}</span>
                </div>
                {p.technologies && <p className="text-xs font-semibold text-blue-600 mb-0.5">{p.technologies}</p>}
                {p.description && <p className="text-slate-600 text-xs">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience / Internships */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2" style={primaryText}>
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Internships & Experience
          </h2>
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.jobTitle} — <span className="text-slate-600 font-normal">{exp.company}</span></span>
                  <span className="text-xs text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-slate-600 text-xs whitespace-pre-line mt-0.5">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
