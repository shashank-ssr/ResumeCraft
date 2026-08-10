import React from 'react';

export const PhotoModernTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Inter, sans-serif' };
  const primaryBg = { backgroundColor: primaryColor || '#1e40af' };
  const primaryText = { color: primaryColor || '#1e40af' };

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
      {/* Header card with optional photo */}
      {!hiddenSections.personal && personal && (
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
          {personal.photo && (
            <img 
              src={personal.photo} 
              alt={personal.fullName}
              className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white ring-2 ring-blue-500/20"
            />
          )}
          <div className="text-center sm:text-left flex-1">
            <h1 className="font-extrabold text-2xl tracking-tight text-slate-900 mb-0.5">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={primaryText}>
                {personal.jobTitle}
              </p>
            )}

            <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-slate-600">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.location && <span>• {personal.location}</span>}
              {personal.linkedin && <span>• {personal.linkedin}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-1.5" style={primaryText}>
            About
          </h2>
          <p className="text-slate-700 text-sm whitespace-pre-line leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-3 border-b pb-1" style={primaryText}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.jobTitle} — <span className="text-slate-600 font-medium">{exp.company}</span></span>
                  <span className="text-xs text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-slate-600 text-xs whitespace-pre-line mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {!hiddenSections.skills && skills && skills.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={primaryText}>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {skills.map(s => (
              <div key={s.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                <span className="font-semibold text-slate-800">{s.name}</span>
                {s.level && <span className="text-[10px] text-slate-500">{s.level}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {!hiddenSections.education && education && education.length > 0 && (
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={primaryText}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between text-xs font-bold text-slate-900">
                <span>{edu.degree} — <span className="font-normal text-slate-600">{edu.institution}</span></span>
                <span className="text-slate-500">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
