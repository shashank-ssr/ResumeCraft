import React from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  Plus,
  Trash2,
  FolderPlus
} from 'lucide-react';

export const CustomSectionsSection = () => {
  const { data, setData } = useResume();

  const customSections = data.customSections || [];

  // Create a new custom section
  const handleAddCustomSection = () => {
    const timestamp = Date.now();

    const newSection = {
      id: `custom-${timestamp}`,
      title: 'Additional Achievements',
      entries: [
        {
          id: `entry-${timestamp}`,
          title: '',
          subtitle: '',
          date: '',
          description: ''
        }
      ]
    };

    setData((prev) => ({
      ...prev,
      customSections: [
        ...(prev.customSections || []),
        newSection
      ]
    }));
  };


  // Update section title
  const handleUpdateTitle = (sectionId, title) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((section) =>
        section.id === sectionId
          ? {
              ...section,
              title
            }
          : section
      )
    }));
  };


  // Delete entire section
  const handleDeleteSection = (sectionId) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).filter(
        (section) => section.id !== sectionId
      )
    }));
  };


  // Add entry to a section
  const handleAddEntry = (sectionId) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        return {
          ...section,
          entries: [
            ...(section.entries || []),
            {
              id: `entry-${Date.now()}`,
              title: '',
              subtitle: '',
              date: '',
              description: ''
            }
          ]
        };
      })
    }));
  };


  // Update an entry
  const handleUpdateEntry = (
    sectionId,
    entryId,
    field,
    value
  ) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        return {
          ...section,
          entries: (section.entries || []).map((entry) =>
            entry.id === entryId
              ? {
                  ...entry,
                  [field]: value
                }
              : entry
          )
        };
      })
    }));
  };


  // Delete an entry
  const handleDeleteEntry = (sectionId, entryId) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        return {
          ...section,
          entries: (section.entries || []).filter(
            (entry) => entry.id !== entryId
          )
        };
      })
    }));
  };


  return (
    <section className="space-y-4">

      {/* Section Header */}
      <div className="flex items-center justify-between gap-3">

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Custom Sections
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Add sections such as awards, publications,
            volunteering, or achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddCustomSection}
          className="
            inline-flex
            items-center
            gap-1.5
            px-3
            py-1.5
            text-xs
            font-medium
            text-blue-600
            bg-blue-50
            border
            border-blue-200
            rounded-lg
            hover:bg-blue-100
            transition-colors
          "
        >
          <Plus className="w-3.5 h-3.5" />
          Add Section
        </button>

      </div>


      {/* Empty State */}
      {customSections.length === 0 && (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            py-8
            px-4
            bg-slate-50
            border
            border-dashed
            border-slate-300
            rounded-lg
          "
        >

          <div className="
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-lg
            bg-white
            border
            border-slate-200
            text-slate-400
            mb-3
          ">
            <FolderPlus className="w-4 h-4" />
          </div>

          <p className="text-sm font-medium text-slate-700">
            No custom sections
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Create one when you need a section that isn't
            included above.
          </p>

          <button
            type="button"
            onClick={handleAddCustomSection}
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
            Create section
          </button>

        </div>
      )}


      {/* Custom Sections */}
      {customSections.length > 0 && (
        <div className="space-y-4">

          {customSections.map((section, sectionIndex) => (

            <div
              key={section.id}
              className="
                bg-white
                border
                border-slate-200
                rounded-lg
                overflow-hidden
              "
            >

              {/* Section Header */}
              <div className="
                flex
                items-center
                gap-3
                px-4
                py-3
                bg-slate-50
                border-b
                border-slate-200
              ">

                <div className="flex-1">

                  <label className="
                    block
                    text-[11px]
                    font-medium
                    text-slate-500
                    mb-1
                  ">
                    Section name
                  </label>

                  <input
                    type="text"
                    value={section.title || ''}
                    onChange={(e) =>
                      handleUpdateTitle(
                        section.id,
                        e.target.value
                      )
                    }
                    placeholder="e.g. Volunteer Experience"
                    className="
                      w-full
                      max-w-md
                      px-3
                      py-1.5
                      text-sm
                      font-medium
                      text-slate-900
                      bg-white
                      border
                      border-slate-300
                      rounded-lg
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/10
                    "
                  />

                </div>


                <button
                  type="button"
                  onClick={() =>
                    handleDeleteSection(section.id)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1
                    px-2
                    py-1.5
                    text-xs
                    text-slate-500
                    hover:text-red-600
                    hover:bg-red-50
                    rounded-lg
                    transition-colors
                  "
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>

              </div>


              {/* Entries */}
              <div className="p-4 space-y-3">

                {(section.entries || []).map(
                  (entry, entryIndex) => (

                    <div
                      key={entry.id}
                      className="
                        border
                        border-slate-200
                        rounded-lg
                        overflow-hidden
                      "
                    >

                      {/* Entry Header */}
                      <div className="
                        flex
                        items-center
                        justify-between
                        px-3
                        py-2
                        bg-slate-50
                        border-b
                        border-slate-200
                      ">

                        <span className="
                          text-xs
                          font-medium
                          text-slate-500
                        ">
                          Item {entryIndex + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteEntry(
                              section.id,
                              entry.id
                            )
                          }
                          className="
                            p-1
                            text-slate-400
                            hover:text-red-600
                            rounded
                            transition-colors
                          "
                          title="Delete item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>


                      {/* Entry Fields */}
                      <div className="p-3 space-y-3">

                        <div className="
                          grid
                          grid-cols-1
                          sm:grid-cols-2
                          gap-3
                        ">

                          {/* Title */}
                          <div>
                            <label className="
                              block
                              mb-1.5
                              text-xs
                              font-medium
                              text-slate-700
                            ">
                              Title
                            </label>

                            <input
                              type="text"
                              value={entry.title || ''}
                              onChange={(e) =>
                                handleUpdateEntry(
                                  section.id,
                                  entry.id,
                                  'title',
                                  e.target.value
                                )
                              }
                              placeholder="Award or achievement"
                              className="
                                w-full
                                px-3
                                py-2
                                text-sm
                                border
                                border-slate-300
                                rounded-lg
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/10
                              "
                            />
                          </div>


                          {/* Date */}
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
                              value={entry.date || ''}
                              onChange={(e) =>
                                handleUpdateEntry(
                                  section.id,
                                  entry.id,
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
                                outline-none
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/10
                              "
                            />
                          </div>

                        </div>


                        {/* Organization */}
                        <div>
                          <label className="
                            block
                            mb-1.5
                            text-xs
                            font-medium
                            text-slate-700
                          ">
                            Organization
                            <span className="
                              ml-1
                              font-normal
                              text-slate-400
                            ">
                              optional
                            </span>
                          </label>

                          <input
                            type="text"
                            value={entry.subtitle || ''}
                            onChange={(e) =>
                              handleUpdateEntry(
                                section.id,
                                entry.id,
                                'subtitle',
                                e.target.value
                              )
                            }
                            placeholder="Organization or institution"
                            className="
                              w-full
                              px-3
                              py-2
                              text-sm
                              border
                              border-slate-300
                              rounded-lg
                              outline-none
                              focus:border-blue-500
                              focus:ring-2
                              focus:ring-blue-500/10
                            "
                          />
                        </div>


                        {/* Description */}
                        <div>
                          <label className="
                            block
                            mb-1.5
                            text-xs
                            font-medium
                            text-slate-700
                          ">
                            Description
                            <span className="
                              ml-1
                              font-normal
                              text-slate-400
                            ">
                              optional
                            </span>
                          </label>

                          <textarea
                            rows={3}
                            value={entry.description || ''}
                            onChange={(e) =>
                              handleUpdateEntry(
                                section.id,
                                entry.id,
                                'description',
                                e.target.value
                              )
                            }
                            placeholder="Describe the achievement, contribution, or relevant details..."
                            className="
                              w-full
                              px-3
                              py-2
                              text-sm
                              border
                              border-slate-300
                              rounded-lg
                              outline-none
                              resize-y
                              focus:border-blue-500
                              focus:ring-2
                              focus:ring-blue-500/10
                            "
                          />

                        </div>

                      </div>

                    </div>

                  )
                )}


                {/* Add Entry */}
                <button
                  type="button"
                  onClick={() =>
                    handleAddEntry(section.id)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-xs
                    font-medium
                    text-blue-600
                    hover:text-blue-700
                    px-1
                    py-1
                  "
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add item
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
};