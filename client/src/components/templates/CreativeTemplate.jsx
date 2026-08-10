import React from 'react';

export const CreativeTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Montserrat, sans-serif' };
  const primaryBg = { backgroundColor: primaryColor || '#7c3aed' };
  const primaryText = { color: primaryColor || '#7c3aed' };

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
      {/* Asymmetric Creative Header */}
      {!hiddenSections.personal && personal && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-6 rounded-2xl text-white shadow-sm" style={primaryBg}>
          <div className="flex items-center gap-4">
            {personal.photo && (
              <img 
                src={personal.photo} 
                alt={personal.fullName}
                className="w-20 h-20 rounded-xl object-cover border-2 border-white/30"
              />
            )}
            <div>
              <h1 className="font-black text-2xl tracking-tight">
                {personal.fullName || 'Your Name'}
              </h1>
              {personal.jobTitle && (
                <p className="font-semibold text-xs tracking-wider uppercase text-white/90">
                  {personal.jobTitle}
                </p>
              )}
            </div>
          </div>

          <div className="text-xs space-y-1 text-white/90 text-left md:text-right">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.website && <div>{personal.website}</div>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-black text-xs uppercase tracking-widest mb-2 px-3 py-1 bg-purple-50 rounded-lg inline-block" style={primaryText}>
            Profile Overview
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-black text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-purple-50 rounded-lg inline-block" style={primaryText}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.jobTitle}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white font-semibold text-slate-500 shadow-xs">{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mb-1.5">{exp.company} {exp.location && `• ${exp.location}`}</p>
                {exp.description && <p className="text-slate-700 text-xs whitespace-pre-line leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {!hiddenSections.skills && skills && skills.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-black text-xs uppercase tracking-widest mb-2 px-3 py-1 bg-purple-50 rounded-lg inline-block" style={primaryText}>
            Creative Skills & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => (
              <span key={s.id} className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {!hiddenSections.education && education && education.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-black text-xs uppercase tracking-widest mb-2 px-3 py-1 bg-purple-50 rounded-lg inline-block" style={primaryText}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline font-bold text-slate-900">
                <span>{edu.degree} — <span className="font-medium text-slate-600">{edu.institution}</span></span>
                <span className="text-xs text-slate-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
