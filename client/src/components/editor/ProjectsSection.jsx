import React from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ExternalLink,
  Github,
  FolderGit2
} from 'lucide-react';

export const ProjectsSection = ({ onOpenAIBullets }) => {
  const {
    data,
    addListEntry,
    updateListEntry,
    deleteListEntry,
    moveListEntry
  } = useResume();

  const projectsList = data.projects || [];

  const handleAddProject = () => {
    addListEntry('projects', {
      name: '',
      technologies: '',
      projectUrl: '',
      githubUrl: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const inputClass =
    'w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg ' +
    'outline-none transition-colors ' +
    'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 ' +
    'placeholder:text-slate-400';

  const handleDelete = (id) => {
    deleteListEntry('projects', id);
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Projects
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Add projects that demonstrate your skills and technical experience.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2
                     text-xs font-semibold text-white bg-blue-600
                     hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {projectsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 px-5
                        border border-dashed border-slate-300 rounded-xl
                        bg-slate-50 text-center">

          <div className="w-10 h-10 rounded-lg bg-white border border-slate-200
                          flex items-center justify-center mb-3">
            <FolderGit2 className="w-5 h-5 text-slate-400" />
          </div>

          <p className="text-sm font-medium text-slate-700">
            No projects yet
          </p>

          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Showcase personal projects, academic work, open-source
            contributions, or applications you've built.
          </p>

          <button
            type="button"
            onClick={handleAddProject}
            className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            + Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-3">

          {projectsList.map((project, index) => (

            <div
              key={project.id}
              className="border border-slate-200 rounded-xl bg-white overflow-hidden"
            >

              {/* Project Toolbar */}
              <div className="flex items-center justify-between px-4 py-2.5
                              bg-slate-50 border-b border-slate-200">

                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-blue-50
                                  flex items-center justify-center shrink-0">
                    <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>

                  <span className="text-xs font-semibold text-slate-700 truncate">
                    {project.name || `Project ${index + 1}`}
                  </span>
                </div>

                <div className="flex items-center gap-0.5">

                  <button
                    type="button"
                    onClick={() =>
                      moveListEntry('projects', index, 'up')
                    }
                    disabled={index === 0}
                    title="Move up"
                    className="p-1.5 rounded-md text-slate-400
                               hover:text-slate-700 hover:bg-white
                               disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      moveListEntry('projects', index, 'down')
                    }
                    disabled={index === projectsList.length - 1}
                    title="Move down"
                    className="p-1.5 rounded-md text-slate-400
                               hover:text-slate-700 hover:bg-white
                               disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(project.id)}
                    title="Delete project"
                    className="p-1.5 ml-1 rounded-md text-slate-400
                               hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                </div>
              </div>

              {/* Project Form */}
              <div className="p-4 space-y-4">

                {/* Basic Information */}
                <div className="space-y-3">

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Project Name
                    </label>

                    <input
                      type="text"
                      value={project.name || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'projects',
                          project.id,
                          'name',
                          e.target.value
                        )
                      }
                      placeholder="ResumeCraft — AI Resume Builder"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Technologies
                    </label>

                    <input
                      type="text"
                      value={project.technologies || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'projects',
                          project.id,
                          'technologies',
                          e.target.value
                        )
                      }
                      placeholder="React, Node.js, Express, MongoDB"
                      className={inputClass}
                    />

                    <p className="text-[10px] text-slate-400 mt-1">
                      Separate technologies with commas.
                    </p>
                  </div>

                </div>

                {/* Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium
                                      text-slate-700 mb-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      Live Demo
                      <span className="text-[10px] font-normal text-slate-400">
                        Optional
                      </span>
                    </label>

                    <input
                      type="url"
                      value={project.projectUrl || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'projects',
                          project.id,
                          'projectUrl',
                          e.target.value
                        )
                      }
                      placeholder="https://myproject.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium
                                      text-slate-700 mb-1.5">
                      <Github className="w-3.5 h-3.5 text-slate-400" />
                      GitHub
                      <span className="text-[10px] font-normal text-slate-400">
                        Optional
                      </span>
                    </label>

                    <input
                      type="url"
                      value={project.githubUrl || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'projects',
                          project.id,
                          'githubUrl',
                          e.target.value
                        )
                      }
                      placeholder="https://github.com/username/project"
                      className={inputClass}
                    />
                  </div>

                </div>

                {/* Description */}
                <div>

                  <div className="flex items-center justify-between gap-2 mb-1.5">

                    <label className="text-xs font-medium text-slate-700">
                      Project Description
                    </label>

                    {onOpenAIBullets && (
                      <button
                        type="button"
                        onClick={() =>
                          onOpenAIBullets(
                            project.description,
                            project.name,
                            (enhanced) =>
                              updateListEntry(
                                'projects',
                                project.id,
                                'description',
                                enhanced
                              )
                          )
                        }
                        className="inline-flex items-center gap-1 text-[11px]
                                   font-semibold text-purple-600
                                   hover:text-purple-700"
                      >
                        <Sparkles className="w-3 h-3" />
                        Improve with AI
                      </button>
                    )}

                  </div>

                  <textarea
                    rows={4}
                    value={project.description || ''}
                    onChange={(e) =>
                      updateListEntry(
                        'projects',
                        project.id,
                        'description',
                        e.target.value
                      )
                    }
                    placeholder={`• Built a full-stack resume builder using React and Node.js
• Implemented JWT authentication and MongoDB persistence
• Added AI-powered resume content suggestions`}
                    className={`${inputClass} resize-y leading-relaxed`}
                  />

                  <div className="flex justify-between mt-1">
                    <p className="text-[10px] text-slate-400">
                      Focus on what you built, how you built it, and the impact.
                    </p>

                    <span className="text-[10px] text-slate-400">
                      {(project.description || '').length} characters
                    </span>
                  </div>

                </div>

              </div>
            </div>

          ))}

        </div>
      )}

      {/* Bottom helper */}
      {projectsList.length > 0 && (
        <div className="flex items-center justify-between px-3 py-2.5
                        bg-slate-50 border border-slate-200 rounded-lg">

          <p className="text-[11px] text-slate-500">
            <span className="font-medium text-slate-700">
              Tip:
            </span>{' '}
            Keep your strongest 2–4 projects on your resume.
          </p>

          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1 text-[11px]
                       font-semibold text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-3 h-3" />
            Add another
          </button>

        </div>
      )}

    </div>
  );
};