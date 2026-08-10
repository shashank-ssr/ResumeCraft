import React from 'react';

export const ModernTemplate = ({ data, design, hiddenSections = {} }) => {
  const { personal, summary, experience, education, projects, skills, certifications, achievements, languages, interests, volunteer, references, customSections } = data;
  const { primaryColor, textColor, fontFamily, fontSize, headingSize, sectionSpacing, lineHeight, pageMargins } = design;

  const fontStyle = { fontFamily: fontFamily || 'Inter, sans-serif' };
  const sidebarBg = { backgroundColor: primaryColor || '#1e40af' };

  return (
    <div 
      className="w-full bg-white antialiased min-h-full flex"
      style={{
        ...fontStyle,
        fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '15px' : '13.5px',
        lineHeight: lineHeight || 1.5
      }}
    >
      {/* Left Sidebar */}
      <div 
        className="w-1/3 text-white p-6 space-y-6 shrink-0"
        style={sidebarBg}
      >
        {/* Profile Photo if present */}
        {!hiddenSections.personal && personal?.photo && (
          <div className="flex justify-center mb-4">
            <img 
              src={personal.photo} 
              alt={personal.fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-md"
            />
          </div>
        )}

        {/* Contact Info */}
        {!hiddenSections.personal && personal && (
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest border-b border-white/20 pb-1 mb-2 text-white/90">
              Contact
            </h3>
            <div className="space-y-1.5 text-xs text-white/80 break-words">
              {personal.email && <div><p className="font-semibold text-white">Email</p><p>{personal.email}</p></div>}
              {personal.phone && <div><p className="font-semibold text-white">Phone</p><p>{personal.phone}</p></div>}
              {personal.location && <div><p className="font-semibold text-white">Location</p><p>{personal.location}</p></div>}
              {personal.linkedin && <div><p className="font-semibold text-white">LinkedIn</p><p className="truncate">{personal.linkedin}</p></div>}
              {personal.github && <div><p className="font-semibold text-white">GitHub</p><p className="truncate">{personal.github}</p></div>}
              {personal.website && <div><p className="font-semibold text-white">Website</p><p className="truncate">{personal.website}</p></div>}
            </div>
          </div>
        )}

        {/* Skills */}
        {!hiddenSections.skills && skills && skills.length > 0 && (
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest border-b border-white/20 pb-1 mb-2 text-white/90">
              Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(sk => (
                <span key={sk.id} className="bg-white/15 px-2 py-0.5 rounded text-xs font-medium text-white">
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {!hiddenSections.languages && languages && languages.length > 0 && (
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest border-b border-white/20 pb-1 mb-2 text-white/90">
              Languages
            </h3>
            <div className="space-y-1 text-xs text-white/80">
              {languages.map(l => (
                <div key={l.id} className="flex justify-between">
                  <span>{l.name}</span>
                  <span className="text-white/60">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {!hiddenSections.certifications && certifications && certifications.length > 0 && (
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest border-b border-white/20 pb-1 mb-2 text-white/90">
              Certifications
            </h3>
            <div className="space-y-2 text-xs text-white/80">
              {certifications.map(c => (
                <div key={c.id}>
                  <p className="font-semibold text-white">{c.name}</p>
                  <p className="text-white/60">{c.organization} ({c.date})</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="w-2/3 p-6 space-y-6 bg-white text-slate-800">
        {/* Name Header */}
        {!hiddenSections.personal && personal && (
          <div className="border-b pb-4 border-slate-200">
            <h1 className="font-extrabold tracking-tight text-slate-900" style={{ fontSize: headingSize === 'small' ? '24px' : headingSize === 'large' ? '32px' : '28px' }}>
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="font-semibold text-base" style={{ color: primaryColor }}>
                {personal.jobTitle}
              </p>
            )}
          </div>
        )}

        {/* Summary */}
        {!hiddenSections.summary && summary && (
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-1.5 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-2 h-2 rounded-full" style={sidebarBg}></span>
              About Me
            </h2>
            <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {!hiddenSections.experience && experience && experience.length > 0 && (
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-2 h-2 rounded-full" style={sidebarBg}></span>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-3 border-l-2 border-slate-200">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900">{exp.jobTitle}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  {exp.description && <p className="text-slate-600 text-sm whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {!hiddenSections.education && education && education.length > 0 && (
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-2 h-2 rounded-full" style={sidebarBg}></span>
              Education
            </h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{edu.degree}</span>
                    <span className="text-xs text-slate-500">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {!hiddenSections.projects && projects && projects.length > 0 && (
          <div>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-2 h-2 rounded-full" style={sidebarBg}></span>
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map(p => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{p.name}</span>
                    <span className="text-xs text-slate-500">{p.startDate} - {p.endDate}</span>
                  </div>
                  {p.technologies && <p className="text-xs font-medium text-slate-500 mb-0.5">Tech: {p.technologies}</p>}
                  {p.description && <p className="text-slate-600 text-sm">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {!hiddenSections.custom && customSections && customSections.map(cs => (
          <div key={cs.id}>
            <h2 className="font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-2 h-2 rounded-full" style={sidebarBg}></span>
              {cs.title}
            </h2>
            <div className="space-y-2">
              {cs.entries.map(e => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{e.title}</span>
                    <span className="text-xs text-slate-500">{e.date}</span>
                  </div>
                  {e.subtitle && <p className="text-xs text-slate-500 font-medium">{e.subtitle}</p>}
                  {e.description && <p className="text-slate-600 text-sm">{e.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
