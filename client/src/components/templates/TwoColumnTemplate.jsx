import React from 'react';

export const TwoColumnTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Inter, sans-serif' };
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
      {/* Header */}
      {!hiddenSections.personal && personal && (
        <div className="border-b-2 border-slate-900 pb-3 mb-5">
          <h1 className="font-extrabold text-3xl tracking-tight text-slate-900">
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="font-semibold text-sm uppercase tracking-wider text-slate-600 mb-2" style={primaryText}>
              {personal.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.location && <span>• {personal.location}</span>}
            {personal.linkedin && <span>• {personal.linkedin}</span>}
            {personal.github && <span>• {personal.github}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div className="mb-5">
          <p className="text-slate-700 text-sm">{summary}</p>
        </div>
      )}

      {/* Balanced 2-Column Split */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Experience */}
          {!hiddenSections.experience && experience && experience.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-2.5 text-slate-900" style={primaryText}>
                Experience
              </h2>
              <div className="space-y-3">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                      <span>{exp.jobTitle}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mb-1">{exp.company}</p>
                    {exp.description && <p className="text-slate-600 text-xs whitespace-pre-line">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {!hiddenSections.projects && projects && projects.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-2 text-slate-900" style={primaryText}>
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map(p => (
                  <div key={p.id}>
                    <p className="font-bold text-slate-900 text-xs">{p.name}</p>
                    {p.description && <p className="text-slate-600 text-xs">{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Education */}
          {!hiddenSections.education && education && education.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-2.5 text-slate-900" style={primaryText}>
                Education
              </h2>
              <div className="space-y-2">
                {education.map(edu => (
                  <div key={edu.id}>
                    <p className="font-bold text-slate-900 text-xs">{edu.degree}</p>
                    <p className="text-xs text-slate-600">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {!hiddenSections.skills && skills && skills.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-2 text-slate-900" style={primaryText}>
                Key Skills
              </h2>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {skills.map(s => (
                  <span key={s.id} className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-medium">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {!hiddenSections.certifications && certifications && certifications.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-2 text-slate-900" style={primaryText}>
                Certifications
              </h2>
              <div className="space-y-1 text-xs">
                {certifications.map(c => (
                  <div key={c.id}>
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-slate-500">{c.organization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
