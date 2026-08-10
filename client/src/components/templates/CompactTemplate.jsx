import React from 'react';

export const CompactTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Inter, sans-serif' };
  const primaryText = { color: primaryColor || '#1e293b' };

  return (
    <div 
      className="w-full bg-white text-slate-800 antialiased"
      style={{
        ...fontStyle,
        padding: `${pageMargins || 10}mm`,
        fontSize: '11.5px',
        lineHeight: 1.35
      }}
    >
      {/* Dense Header */}
      {!hiddenSections.personal && personal && (
        <div className="border-b pb-2 mb-3 border-slate-200 flex justify-between items-end">
          <div>
            <h1 className="font-extrabold text-xl leading-tight text-slate-900" style={primaryText}>
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="font-semibold text-xs text-slate-600">
                {personal.jobTitle}
              </p>
            )}
          </div>
          <div className="text-right text-[11px] text-slate-600 space-x-2">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.location && <span>• {personal.location}</span>}
            {personal.linkedin && <span>• {personal.linkedin}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div className="mb-2.5">
          <p className="text-slate-700 text-[11.5px]">{summary}</p>
        </div>
      )}

      {/* 2-Col Grid for Compact Content */}
      <div className="grid grid-cols-12 gap-3">
        {/* Main Column */}
        <div className="col-span-8 space-y-3">
          {/* Experience */}
          {!hiddenSections.experience && experience && experience.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-0.5 mb-1.5 text-slate-900" style={primaryText}>
                Experience
              </h2>
              <div className="space-y-2">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-bold text-slate-900 text-[11.5px]">
                      <span>{exp.jobTitle} — <span className="font-normal text-slate-700">{exp.company}</span></span>
                      <span className="text-[10px] text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                    </div>
                    {exp.description && <p className="text-slate-700 text-[11px] whitespace-pre-line mt-0.5">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {!hiddenSections.projects && projects && projects.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-0.5 mb-1.5 text-slate-900" style={primaryText}>
                Projects
              </h2>
              <div className="space-y-1.5">
                {projects.map(p => (
                  <div key={p.id}>
                    <div className="flex justify-between font-bold text-slate-900 text-[11.5px]">
                      <span>{p.name}</span>
                      <span className="text-[10px] text-slate-500">{p.startDate} - {p.endDate}</span>
                    </div>
                    {p.description && <p className="text-slate-700 text-[11px]">{p.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side Column */}
        <div className="col-span-4 space-y-3">
          {/* Education */}
          {!hiddenSections.education && education && education.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-0.5 mb-1.5 text-slate-900" style={primaryText}>
                Education
              </h2>
              <div className="space-y-1.5">
                {education.map(edu => (
                  <div key={edu.id} className="text-[11px]">
                    <p className="font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-600">{edu.institution} ({edu.startDate}-{edu.endDate})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {!hiddenSections.skills && skills && skills.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-0.5 mb-1.5 text-slate-900" style={primaryText}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-1 text-[10.5px]">
                {skills.map(s => (
                  <span key={s.id} className="bg-slate-100 px-1.5 py-0.5 rounded font-medium text-slate-800">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {!hiddenSections.certifications && certifications && certifications.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-0.5 mb-1.5 text-slate-900" style={primaryText}>
                Certifications
              </h2>
              <div className="space-y-1 text-[10.5px]">
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
