import React from 'react';

export const ClassicTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Georgia, serif' };
  const primaryTextColor = { color: primaryColor };
  const primaryBorderColor = { borderColor: primaryColor };

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
        <div className="text-center pb-4 mb-4 border-b-2" style={primaryBorderColor}>
          <h1 className="font-bold tracking-tight mb-1" style={{ ...primaryTextColor, fontSize: headingSize === 'small' ? '22px' : headingSize === 'large' ? '30px' : '26px' }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="font-medium text-slate-600 uppercase tracking-widest text-xs mb-2">
              {personal.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.location && <span>• {personal.location}</span>}
            {personal.linkedin && <span>• {personal.linkedin}</span>}
            {personal.github && <span>• {personal.github}</span>}
            {personal.website && <span>• {personal.website}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {!hiddenSections.summary && summary && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-sm uppercase tracking-wider mb-1.5 border-b pb-1" style={{ ...primaryTextColor, ...primaryBorderColor }}>
            Professional Summary
          </h2>
          <p className="text-justify text-slate-700 whitespace-pre-line">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {!hiddenSections.experience && experience && experience.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-sm uppercase tracking-wider mb-2 border-b pb-1" style={{ ...primaryTextColor, ...primaryBorderColor }}>
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.jobTitle} — <span className="font-semibold text-slate-700">{exp.company}</span></span>
                  <span className="text-xs text-slate-500 font-medium">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <p className="text-xs text-slate-500 italic mb-1">{exp.location}</p>}
                {exp.description && <p className="text-slate-700 whitespace-pre-line text-sm">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {!hiddenSections.education && education && education.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-sm uppercase tracking-wider mb-2 border-b pb-1" style={{ ...primaryTextColor, ...primaryBorderColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{edu.degree} — <span className="font-semibold text-slate-700">{edu.institution}</span></span>
                  <span className="text-xs text-slate-500 font-medium">{edu.startDate} - {edu.endDate}</span>
                </div>
                {edu.gpa && <p className="text-xs text-slate-600 font-medium">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-slate-700 text-sm mt-0.5">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {!hiddenSections.projects && projects && projects.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-sm uppercase tracking-wider mb-2 border-b pb-1" style={{ ...primaryTextColor, ...primaryBorderColor }}>
            Key Projects
          </h2>
          <div className="space-y-2">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{proj.name} {proj.technologies && <span className="text-xs font-normal text-slate-500">({proj.technologies})</span>}</span>
                  <span className="text-xs text-slate-500 font-medium">{proj.startDate} - {proj.endDate}</span>
                </div>
                {proj.description && <p className="text-slate-700 text-sm">{proj.description}</p>}
                {proj.projectUrl && <p className="text-xs text-blue-600 underline mt-0.5">{proj.projectUrl}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {!hiddenSections.skills && skills && skills.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-sm uppercase tracking-wider mb-1.5 border-b pb-1" style={{ ...primaryTextColor, ...primaryBorderColor }}>
            Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-800">
            {skills.map(skill => (
              <span key={skill.id} className="font-medium">
                • {skill.name} {skill.level && skill.level !== 'None' && <span className="text-xs text-slate-500">({skill.level})</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {!hiddenSections.certifications && certifications && certifications.length > 0 && (
        <div style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-sm uppercase tracking-wider mb-1.5 border-b pb-1" style={{ ...primaryTextColor, ...primaryBorderColor }}>
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map(cert => (
              <div key={cert.id} className="text-sm">
                <span className="font-bold">{cert.name}</span> — <span className="text-slate-700">{cert.organization}</span> ({cert.date})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages & Interests */}
      <div className="grid grid-cols-2 gap-4">
        {!hiddenSections.languages && languages && languages.length > 0 && (
          <div style={{ marginBottom: `${sectionSpacing}px` }}>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-1 border-b pb-1" style={{ ...primaryTextColor, ...primaryBorderColor }}>
              Languages
            </h2>
            <div className="text-xs space-y-0.5 text-slate-700">
              {languages.map(l => (
                <div key={l.id}><span className="font-semibold">{l.name}:</span> {l.proficiency}</div>
              ))}
            </div>
          </div>
        )}

        {!hiddenSections.interests && interests && interests.length > 0 && (
          <div style={{ marginBottom: `${sectionSpacing}px` }}>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-1 border-b pb-1" style={{ ...primaryTextColor, ...primaryBorderColor }}>
              Interests
            </h2>
            <p className="text-xs text-slate-700">{interests.map(i => i.name).join(' • ')}</p>
          </div>
        )}
      </div>

      {/* Custom Sections */}
      {!hiddenSections.custom && customSections && customSections.map(cs => (
        <div key={cs.id} style={{ marginBottom: `${sectionSpacing}px` }}>
          <h2 className="font-bold text-sm uppercase tracking-wider mb-2 border-b pb-1" style={{ ...primaryTextColor, ...primaryBorderColor }}>
            {cs.title}
          </h2>
          <div className="space-y-2">
            {cs.entries.map(e => (
              <div key={e.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{e.title} {e.subtitle && <span className="font-semibold text-slate-600">({e.subtitle})</span>}</span>
                  <span className="text-xs text-slate-500 font-medium">{e.date}</span>
                </div>
                {e.description && <p className="text-slate-700 text-sm">{e.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
