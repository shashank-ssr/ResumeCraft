import React from 'react';

export const PhotoCreativeTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Poppins, sans-serif' };
  const primaryBg = { backgroundColor: primaryColor || '#d97706' };
  const primaryText = { color: primaryColor || '#d97706' };

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
      {/* Creative Header */}
      {!hiddenSections.personal && personal && (
        <div className="flex flex-col items-center text-center pb-6 mb-6 border-b-2 border-slate-100">
          {personal.photo && (
            <img 
              src={personal.photo} 
              alt={personal.fullName}
              className="w-28 h-28 rounded-full object-cover mb-3 shadow-lg ring-4 ring-amber-500/30"
            />
          )}
          <h1 className="font-extrabold text-3xl tracking-tight text-slate-900" style={primaryText}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="font-semibold text-xs uppercase tracking-widest text-slate-500 mb-2">
              {personal.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.location && <span>• {personal.location}</span>}
            {personal.website && <span>• {personal.website}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-1.5" style={primaryText}>
            About Me
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-3" style={primaryText}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id} className="border-l-2 pl-3 border-amber-500">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.jobTitle} — <span className="font-normal text-slate-600">{exp.company}</span></span>
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
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2" style={primaryText}>
            Creative Stack
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {skills.map(s => (
              <span key={s.id} className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
