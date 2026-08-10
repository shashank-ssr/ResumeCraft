import React from 'react';

export const ElegantTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Playfair Display, serif' };
  const primaryText = { color: primaryColor || '#9f1239' };

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
      {/* Centered Serif Banner */}
      {!hiddenSections.personal && personal && (
        <div className="text-center pb-6 mb-6 border-b border-t py-4 border-slate-200">
          <h1 className="font-bold text-3xl tracking-tight text-slate-900 mb-1" style={primaryText}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="font-medium text-xs uppercase tracking-widest text-slate-500 mb-3">
              {personal.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-slate-600 italic">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <p className="text-center text-slate-700 italic text-sm max-w-xl mx-auto">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-sm uppercase tracking-wider text-center mb-3 pb-1 border-b" style={primaryText}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.jobTitle} — <span className="font-normal italic text-slate-700">{exp.company}</span></span>
                  <span className="text-xs text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-slate-700 text-xs whitespace-pre-line mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills */}
      <div className="grid grid-cols-2 gap-6">
        {!hiddenSections.education && education && education.length > 0 && (
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wider text-center mb-2 pb-1 border-b" style={primaryText}>
              Education
            </h2>
            {education.map(edu => (
              <div key={edu.id} className="text-xs text-center">
                <p className="font-bold text-slate-900">{edu.degree}</p>
                <p className="text-slate-600 italic">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {!hiddenSections.skills && skills && skills.length > 0 && (
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wider text-center mb-2 pb-1 border-b" style={primaryText}>
              Skills
            </h2>
            <p className="text-xs text-slate-700 text-center italic">
              {skills.map(s => s.name).join(' • ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
