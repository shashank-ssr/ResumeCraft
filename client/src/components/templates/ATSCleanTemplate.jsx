import React from 'react';

export const ATSCleanTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: 'Arial, sans-serif' };

  return (
    <div 
      className="w-full bg-white text-slate-900 antialiased"
      style={{
        ...fontStyle,
        padding: `${pageMargins || 16}mm`,
        fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '15px' : '13.5px',
        lineHeight: lineHeight || 1.5
      }}
    >
      {/* Plain Header */}
      {!hiddenSections.personal && personal && (
        <div className="mb-4">
          <h1 className="font-bold text-2xl uppercase tracking-tight text-black mb-1">
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="font-bold text-sm text-slate-800 uppercase mb-1">
              {personal.jobTitle}
            </p>
          )}

          <div className="text-xs text-slate-800 space-x-2">
            {personal.email && <span>Email: {personal.email}</span>}
            {personal.phone && <span>| Phone: {personal.phone}</span>}
            {personal.location && <span>| Location: {personal.location}</span>}
            {personal.linkedin && <span>| LinkedIn: {personal.linkedin}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div className="mb-4">
          <h2 className="font-bold text-sm uppercase text-black border-b border-black pb-0.5 mb-1">
            Professional Summary
          </h2>
          <p className="text-slate-800 text-sm whitespace-pre-line">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm uppercase text-black border-b border-black pb-0.5 mb-2">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.jobTitle} - {exp.company}</span>
                  <span>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <p className="text-xs text-slate-700 italic">{exp.location}</p>}
                {exp.description && <p className="text-slate-800 text-sm whitespace-pre-line mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {!hiddenSections.education && education && education.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm uppercase text-black border-b border-black pb-0.5 mb-1.5">
            Education
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between text-sm font-bold text-slate-900">
                <span>{edu.degree} - {edu.institution}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {!hiddenSections.skills && skills && skills.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm uppercase text-black border-b border-black pb-0.5 mb-1">
            Skills
          </h2>
          <p className="text-sm text-slate-900 font-medium">
            {skills.map(s => s.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};
