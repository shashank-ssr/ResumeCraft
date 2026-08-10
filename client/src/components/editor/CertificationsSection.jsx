import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Award } from 'lucide-react';

export const CertificationsSection = () => {
  const {
    data,
    addListEntry,
    updateListEntry,
    deleteListEntry
  } = useResume();

  const certifications = data.certifications || [];
  const handleAddCert = () => {
    addListEntry('certifications', {
      name: '',
      organization: '',
      date: '',
      url: ''
    });
  };

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Certifications
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Add professional certifications, licenses, or credentials.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddCert}
          className="
            inline-flex
            items-center
            gap-1.5
            px-3
            py-1.5
            text-xs
            font-medium
            text-blue-600
            border
            border-blue-200
            bg-blue-50
            hover:bg-blue-100
            rounded-lg
            transition-colors
          "
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>
      {certifications.length === 0 && (
        <div className="
          flex
          flex-col
          items-center
          justify-center
          py-8
          px-4
          border
          border-dashed
          border-slate-300
          rounded-lg
          bg-slate-50
          text-center
        ">
          <Award className="w-6 h-6 text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-700">
            No certifications yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Add certifications that are relevant to the job.
          </p>
          <button
            type="button"
            onClick={handleAddCert}
            className="
              mt-3
              inline-flex
              items-center
              gap-1
              text-xs
              font-medium
              text-blue-600
              hover:text-blue-700
            "
          >
            <Plus className="w-3.5 h-3.5" />
            Add certification
          </button>
        </div>
      )}
      {certifications.length > 0 && (
        <div className="space-y-3">

          {certifications.map((cert, index) => (

            <div
              key={cert.id}
              className="
                border
                border-slate-200
                rounded-lg
                bg-white
                overflow-hidden
              "
            >
              <div className="
                flex
                items-center
                justify-between
                px-4
                py-2.5
                border-b
                border-slate-200
                bg-slate-50
              ">

                <span className="text-xs font-medium text-slate-600">
                  Certification {index + 1}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    deleteListEntry('certifications', cert.id)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1
                    text-xs
                    text-slate-500
                    hover:text-red-600
                    transition-colors
                  "
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>

              </div>


              {/* Fields */}
              <div className="p-4 space-y-3">

                {/* Certification Name */}
                <div>
                  <label className="
                    block
                    mb-1.5
                    text-xs
                    font-medium
                    text-slate-700
                  ">
                    Certification name
                  </label>

                  <input
                    type="text"
                    value={cert.name || ''}
                    onChange={(e) =>
                      updateListEntry(
                        'certifications',
                        cert.id,
                        'name',
                        e.target.value
                      )
                    }
                    placeholder="AWS Certified Solutions Architect"
                    className="
                      w-full
                      px-3
                      py-2
                      text-sm
                      border
                      border-slate-300
                      rounded-lg
                      bg-white
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/10
                    "
                  />
                </div>


                {/* Organization + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <div>
                    <label className="
                      block
                      mb-1.5
                      text-xs
                      font-medium
                      text-slate-700
                    ">
                      Issuing organization
                    </label>

                    <input
                      type="text"
                      value={cert.organization || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'certifications',
                          cert.id,
                          'organization',
                          e.target.value
                        )
                      }
                      placeholder="Amazon Web Services"
                      className="
                        w-full
                        px-3
                        py-2
                        text-sm
                        border
                        border-slate-300
                        rounded-lg
                        bg-white
                        outline-none
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/10
                      "
                    />
                  </div>


                  <div>
                    <label className="
                      block
                      mb-1.5
                      text-xs
                      font-medium
                      text-slate-700
                    ">
                      Date
                    </label>

                    <input
                      type="text"
                      value={cert.date || ''}
                      onChange={(e) =>
                        updateListEntry(
                          'certifications',
                          cert.id,
                          'date',
                          e.target.value
                        )
                      }
                      placeholder="2025"
                      className="
                        w-full
                        px-3
                        py-2
                        text-sm
                        border
                        border-slate-300
                        rounded-lg
                        bg-white
                        outline-none
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/10
                      "
                    />
                  </div>

                </div>


                {/* Credential URL */}
                <div>
                  <label className="
                    block
                    mb-1.5
                    text-xs
                    font-medium
                    text-slate-700
                  ">
                    Credential URL
                    <span className="ml-1 font-normal text-slate-400">
                      optional
                    </span>
                  </label>

                  <input
                    type="url"
                    value={cert.url || ''}
                    onChange={(e) =>
                      updateListEntry(
                        'certifications',
                        cert.id,
                        'url',
                        e.target.value
                      )
                    }
                    placeholder="https://..."
                    className="
                      w-full
                      px-3
                      py-2
                      text-sm
                      border
                      border-slate-300
                      rounded-lg
                      bg-white
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/10
                    "
                  />
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
};