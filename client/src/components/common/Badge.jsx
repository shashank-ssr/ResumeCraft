import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  icon = null,
  className = ''
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600 border-slate-200',

    ats: 'bg-emerald-50 text-emerald-700 border-emerald-200',

    popular: 'bg-blue-50 text-blue-700 border-blue-200',

    new: 'bg-violet-50 text-violet-700 border-violet-200',

    photo: 'bg-purple-50 text-purple-700 border-purple-200',

    modern: 'bg-cyan-50 text-cyan-700 border-cyan-200',

    minimal: 'bg-slate-50 text-slate-600 border-slate-200',

    classic: 'bg-amber-50 text-amber-700 border-amber-200',

    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',

    warning: 'bg-amber-50 text-amber-700 border-amber-200'
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        px-2.5
        py-1
        rounded-md
        border
        text-xs
        font-medium
        whitespace-nowrap
        ${variants[variant] || variants.default}
        ${className}
      `}
    >
      {icon && (
        <span className="shrink-0">
          {icon}
        </span>
      )}

      {children}
    </span>
  );
};