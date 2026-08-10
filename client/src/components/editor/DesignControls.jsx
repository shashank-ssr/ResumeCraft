import React from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  Palette,
  Type,
  SlidersHorizontal
} from 'lucide-react';

export const DesignControls = () => {
  const { design, updateDesign } = useResume();

  const colorPalettes = [
    {
      name: 'Navy',
      primary: '#1e3a8a',
      secondary: '#3b82f6'
    },
    {
      name: 'Emerald',
      primary: '#065f46',
      secondary: '#10b981'
    },
    {
      name: 'Slate',
      primary: '#334155',
      secondary: '#64748b'
    },
    {
      name: 'Indigo',
      primary: '#3730a3',
      secondary: '#6366f1'
    },
    {
      name: 'Burgundy',
      primary: '#831843',
      secondary: '#db2777'
    },
    {
      name: 'Charcoal',
      primary: '#111827',
      secondary: '#4b5563'
    },
    {
      name: 'Purple',
      primary: '#581c87',
      secondary: '#9333ea'
    },
    {
      name: 'Teal',
      primary: '#134e4a',
      secondary: '#14b8a6'
    }
  ];

  const fonts = [
    {
      name: 'Inter',
      value: 'Inter, sans-serif'
    },
    {
      name: 'Roboto',
      value: 'Roboto, sans-serif'
    },
    {
      name: 'Montserrat',
      value: 'Montserrat, sans-serif'
    },
    {
      name: 'Poppins',
      value: 'Poppins, sans-serif'
    },
    {
      name: 'Merriweather',
      value: 'Merriweather, serif'
    },
    {
      name: 'Playfair Display',
      value: "'Playfair Display', serif"
    }
  ];

  const fontSizes = ['small', 'normal', 'large'];
  const lineSpacings = ['tight', 'normal', 'relaxed'];
  const margins = ['compact', 'normal', 'spacious'];
  const paperFormats = ['A4', 'Letter'];


  const OptionButton = ({
    value,
    currentValue,
    onClick,
    children
  }) => {
    const selected = currentValue === value;

    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          px-3
          py-2
          text-xs
          font-medium
          rounded-md
          border
          transition-colors
          ${
            selected
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          }
        `}
      >
        {children}
      </button>
    );
  };


  return (
    <section className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-sm font-semibold text-slate-900">
          Design
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Customize the appearance of your resume.
        </p>
      </div>


      {/* Color */}
      <div className="space-y-3">

        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-slate-500" />

          <h3 className="text-xs font-semibold text-slate-800">
            Color
          </h3>
        </div>


        <div className="flex flex-wrap gap-2">

          {colorPalettes.map((palette) => {
            const selected =
              design.primaryColor === palette.primary;

            return (
              <button
                key={palette.name}
                type="button"
                title={palette.name}
                aria-label={`Use ${palette.name} color`}
                onClick={() => {
                  updateDesign(
                    'primaryColor',
                    palette.primary
                  );

                  updateDesign(
                    'secondaryColor',
                    palette.secondary
                  );
                }}
                className={`
                  relative
                  w-8
                  h-8
                  rounded-md
                  border
                  transition-transform
                  hover:scale-105
                  ${
                    selected
                      ? 'ring-2 ring-blue-500 ring-offset-2'
                      : 'border-slate-200'
                  }
                `}
                style={{
                  backgroundColor: palette.primary
                }}
              >

                {selected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </span>
                )}

              </button>
            );
          })}

        </div>


        {/* Custom Color */}
        <div className="
          flex
          items-center
          justify-between
          gap-3
          p-3
          bg-slate-50
          border
          border-slate-200
          rounded-lg
        ">

          <div>
            <p className="text-xs font-medium text-slate-700">
              Custom color
            </p>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Choose your own accent color
            </p>
          </div>

          <div className="flex items-center gap-2">

            <input
              type="color"
              value={
                design.primaryColor || '#1e3a8a'
              }
              onChange={(e) =>
                updateDesign(
                  'primaryColor',
                  e.target.value
                )
              }
              className="
                w-8
                h-8
                p-0
                border
                border-slate-200
                rounded-md
                cursor-pointer
              "
            />

            <span className="
              text-[11px]
              font-mono
              text-slate-500
              uppercase
            ">
              {design.primaryColor || '#1e3a8a'}
            </span>

          </div>

        </div>

      </div>


      {/* Typography */}
      <div className="
        pt-5
        border-t
        border-slate-200
        space-y-3
      ">

        <div className="flex items-center gap-2">

          <Type className="w-4 h-4 text-slate-500" />

          <h3 className="text-xs font-semibold text-slate-800">
            Typography
          </h3>

        </div>


        <div>
          <label className="
            block
            mb-1.5
            text-xs
            font-medium
            text-slate-700
          ">
            Font
          </label>

          <select
            value={design.fontFamily || fonts[0].value}
            onChange={(e) =>
              updateDesign(
                'fontFamily',
                e.target.value
              )
            }
            className="
              w-full
              px-3
              py-2
              text-sm
              bg-white
              border
              border-slate-300
              rounded-lg
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/10
            "
          >

            {fonts.map((font) => (
              <option
                key={font.value}
                value={font.value}
              >
                {font.name}
              </option>
            ))}

          </select>
        </div>

      </div>


      {/* Layout */}
      <div className="
        pt-5
        border-t
        border-slate-200
        space-y-5
      ">

        <div className="flex items-center gap-2">

          <SlidersHorizontal className="w-4 h-4 text-slate-500" />

          <h3 className="text-xs font-semibold text-slate-800">
            Layout
          </h3>

        </div>


        {/* Font Size */}
        <div>

          <label className="
            block
            mb-2
            text-xs
            font-medium
            text-slate-700
          ">
            Text size
          </label>

          <div className="grid grid-cols-3 gap-2">

            {fontSizes.map((size) => (
              <OptionButton
                key={size}
                value={size}
                currentValue={design.fontSize}
                onClick={() =>
                  updateDesign(
                    'fontSize',
                    size
                  )
                }
              >
                {size.charAt(0).toUpperCase() +
                  size.slice(1)}
              </OptionButton>
            ))}

          </div>

        </div>


        {/* Line Spacing */}
        <div>

          <label className="
            block
            mb-2
            text-xs
            font-medium
            text-slate-700
          ">
            Line spacing
          </label>

          <div className="grid grid-cols-3 gap-2">

            {lineSpacings.map((spacing) => (
              <OptionButton
                key={spacing}
                value={spacing}
                currentValue={design.lineSpacing}
                onClick={() =>
                  updateDesign(
                    'lineSpacing',
                    spacing
                  )
                }
              >
                {spacing.charAt(0).toUpperCase() +
                  spacing.slice(1)}
              </OptionButton>
            ))}

          </div>

        </div>


        {/* Margins */}
        <div>

          <label className="
            block
            mb-2
            text-xs
            font-medium
            text-slate-700
          ">
            Page margins
          </label>

          <div className="grid grid-cols-3 gap-2">

            {margins.map((margin) => (
              <OptionButton
                key={margin}
                value={margin}
                currentValue={design.margins}
                onClick={() =>
                  updateDesign(
                    'margins',
                    margin
                  )
                }
              >
                {margin.charAt(0).toUpperCase() +
                  margin.slice(1)}
              </OptionButton>
            ))}

          </div>

        </div>


        {/* Paper Format */}
        <div>

          <label className="
            block
            mb-2
            text-xs
            font-medium
            text-slate-700
          ">
            Paper size
          </label>

          <div className="grid grid-cols-2 gap-2">

            {paperFormats.map((format) => (
              <OptionButton
                key={format}
                value={format}
                currentValue={design.paperFormat}
                onClick={() =>
                  updateDesign(
                    'paperFormat',
                    format
                  )
                }
              >
                {format}
              </OptionButton>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};