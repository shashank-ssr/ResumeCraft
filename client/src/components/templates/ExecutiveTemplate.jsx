import React from 'react';

export const ExecutiveTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Times New Roman, serif' };
  const primaryBg = { backgroundColor: primaryColor || '#1e3a8a' };

  return (
    <div 
      className="w-full bg-white text-slate-800 antialiased"
      style={{
        ...fontStyle,
        fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '15px' : '13.5px',
        lineHeight: lineHeight || 1.5
      }}
    >
      {/* Executive Top Banner */}
      {!hiddenSections.personal && personal && (
        <div className="text-white p-6 mb-6" style={primaryBg}>
          <h1 className="font-bold tracking-tight text-3xl mb-1 uppercase text-center">
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="font-semibold text-center uppercase tracking-widest text-xs text-white/90 mb-3">
              {personal.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-white/80">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
          </div>
        </div>
      )}

      <div style={{ padding: `0 ${pageMargins || 16}mm` }}>
        {/* Summary */}
        {!hiddenSections.summary && summary && (
          <div style={{ marginBottom: `${sectionSpacing}px` }}>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-1.5 pb-1 border-b-2 border-slate-900">
              Executive Profile
            </h2>
            <p className="text-justify text-slate-800 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {!hiddenSections.experience && experience && experience.length > 0 && (
          <div style={{ marginBottom: `${sectionSpacing}px` }}>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-2 pb-1 border-b-2 border-slate-900">
              Leadership & Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="text-base">{exp.jobTitle}</span>
                    <span className="text-xs text-slate-600 font-semibold">{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-600 mb-1">{exp.company} {exp.location && `| ${exp.location}`}</p>
                  {exp.description && <p className="text-slate-800 text-sm whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Credentials */}
        {!hiddenSections.education && education && education.length > 0 && (
          <div style={{ marginBottom: `${sectionSpacing}px` }}>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-2 pb-1 border-b-2 border-slate-900">
              Education & Academic Credentials
            </h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline font-bold text-slate-900">
                  <div>
                    <span>{edu.degree}</span> — <span className="font-normal text-slate-700">{edu.institution}</span>
                  </div>
                  <span className="text-xs text-slate-600 font-medium">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {!hiddenSections.skills && skills && skills.length > 0 && (
          <div style={{ marginBottom: `${sectionSpacing}px` }}>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-1.5 pb-1 border-b-2 border-slate-900">
              Core Competencies
            </h2>
            <p className="text-sm font-medium text-slate-800">
              {skills.map(s => s.name).join(' • ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
