import React from 'react';

export const PhotoProfessionalTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Georgia, serif' };
  const primaryBg = { backgroundColor: primaryColor || '#0f172a' };
  const primaryText = { color: primaryColor || '#0f172a' };

  return (
    <div 
      className="w-full bg-white text-slate-800 antialiased"
      style={{
        ...fontStyle,
        fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '15px' : '13.5px',
        lineHeight: lineHeight || 1.5
      }}
    >
      {/* Top Professional Header with Photo */}
      {!hiddenSections.personal && personal && (
        <div className="text-white p-6 mb-6 flex items-center justify-between gap-6" style={primaryBg}>
          <div className="space-y-1">
            <h1 className="font-bold text-2xl tracking-tight">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="font-medium text-xs tracking-widest uppercase text-white/80">
                {personal.jobTitle}
              </p>
            )}

            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
            </div>
          </div>

          {personal.photo && (
            <img 
              src={personal.photo} 
              alt={personal.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-white/40 shadow-md shrink-0"
            />
          )}
        </div>
      )}

      <div style={{ padding: `0 ${pageMargins || 16}mm` }}>
        {/* Summary */}
        {!hiddenSections.summary && summary && (
          <div style={{ marginBottom: `${sectionSpacing}px` }}>
            <h2 className="font-bold text-xs uppercase tracking-wider mb-1.5 border-b pb-1" style={primaryText}>
              Executive Summary
            </h2>
            <p className="text-slate-800 text-sm whitespace-pre-line">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {!hiddenSections.experience && experience && experience.length > 0 && (
          <div style={{ marginBottom: `${sectionSpacing}px` }}>
            <h2 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={primaryText}>
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.jobTitle} — <span className="font-normal text-slate-700">{exp.company}</span></span>
                    <span className="text-xs text-slate-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-slate-800 text-xs whitespace-pre-line mt-0.5">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-2 gap-4">
          {!hiddenSections.education && education && education.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={primaryText}>
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} className="text-xs">
                  <p className="font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-slate-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          )}

          {!hiddenSections.skills && skills && skills.length > 0 && (
            <div>
              <h2 className="font-bold text-xs uppercase tracking-wider mb-2 border-b pb-1" style={primaryText}>
                Key Skills
              </h2>
              <p className="text-xs text-slate-800 font-medium">
                {skills.map(s => s.name).join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
