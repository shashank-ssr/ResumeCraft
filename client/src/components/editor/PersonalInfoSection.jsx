import React from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Camera,
  Trash2
} from 'lucide-react';

export const PersonalInfoSection = () => {
  const { data, updatePersonalInfo } = useResume();
  const personal = data.personal || {};

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Photo size must be under 2MB.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      updatePersonalInfo('photo', reader.result);
    };

    reader.readAsDataURL(file);
  };

  const inputClass =
    'w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg ' +
    'outline-none transition-colors ' +
    'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 ' +
    'placeholder:text-slate-400';

  const Label = ({ icon: Icon, children, optional = false }) => (
    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 mb-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />}
      <span>{children}</span>
      {optional && (
        <span className="text-[10px] font-normal text-slate-400">
          Optional
        </span>
      )}
    </label>
  );

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          Personal Information
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Add the contact details you want employers to see.
        </p>
      </div>

      {/* Profile Photo */}
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
          {personal.photo ? (
            <img
              src={personal.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-slate-400" />
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-slate-700">
            Profile Photo
            <span className="ml-1 text-slate-400 font-normal">
              Optional
            </span>
          </p>

          <p className="text-[11px] text-slate-400 mt-0.5 mb-2">
            JPG, PNG up to 2MB
          </p>

          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              {personal.photo ? 'Change' : 'Upload'}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>

            {personal.photo && (
              <button
                type="button"
                onClick={() => updatePersonalInfo('photo', '')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-600 rounded-full" />
          <h4 className="text-xs font-semibold text-slate-800">
            Basic Details
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <div>
            <Label icon={User}>Full Name</Label>
            <input
              type="text"
              value={personal.fullName || ''}
              onChange={(e) =>
                updatePersonalInfo('fullName', e.target.value)
              }
              placeholder="Alex Morgan"
              autoComplete="name"
              className={inputClass}
            />
          </div>

          <div>
            <Label>Professional Title</Label>
            <input
              type="text"
              value={personal.jobTitle || ''}
              onChange={(e) =>
                updatePersonalInfo('jobTitle', e.target.value)
              }
              placeholder="Full Stack Developer"
              className={inputClass}
            />
          </div>

        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-600 rounded-full" />
          <h4 className="text-xs font-semibold text-slate-800">
            Contact Details
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <div>
            <Label icon={Mail}>Email</Label>
            <input
              type="email"
              value={personal.email || ''}
              onChange={(e) =>
                updatePersonalInfo('email', e.target.value)
              }
              placeholder="alex@example.com"
              autoComplete="email"
              className={inputClass}
            />
          </div>

          <div>
            <Label icon={Phone}>Phone</Label>
            <input
              type="tel"
              value={personal.phone || ''}
              onChange={(e) =>
                updatePersonalInfo('phone', e.target.value)
              }
              placeholder="+91 98765 43210"
              autoComplete="tel"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <Label icon={MapPin} optional>
              Location
            </Label>
            <input
              type="text"
              value={personal.location || ''}
              onChange={(e) =>
                updatePersonalInfo('location', e.target.value)
              }
              placeholder="Jaipur, Rajasthan, India"
              autoComplete="address-level2"
              className={inputClass}
            />
          </div>

        </div>
      </div>

      {/* Online Profiles */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-600 rounded-full" />
          <div>
            <h4 className="text-xs font-semibold text-slate-800">
              Online Profiles
            </h4>
            <p className="text-[10px] text-slate-400">
              Add links recruiters can use to learn more about you.
            </p>
          </div>
        </div>

        <div className="space-y-3">

          <div>
            <Label icon={Globe} optional>
              Portfolio / Website
            </Label>
            <input
              type="url"
              value={personal.website || ''}
              onChange={(e) =>
                updatePersonalInfo('website', e.target.value)
              }
              placeholder="https://yourwebsite.com"
              className={inputClass}
            />
          </div>

          <div>
            <Label icon={Linkedin} optional>
              LinkedIn
            </Label>
            <input
              type="url"
              value={personal.linkedin || ''}
              onChange={(e) =>
                updatePersonalInfo('linkedin', e.target.value)
              }
              placeholder="https://linkedin.com/in/yourname"
              className={inputClass}
            />
          </div>

          <div>
            <Label icon={Github} optional>
              GitHub
            </Label>
            <input
              type="url"
              value={personal.github || ''}
              onChange={(e) =>
                updatePersonalInfo('github', e.target.value)
              }
              placeholder="https://github.com/yourusername"
              className={inputClass}
            />
          </div>

        </div>
      </div>

      {/* Small helper */}
      <div className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <span className="font-medium text-slate-700">
            Tip:
          </span>{' '}
          Keep your name, professional title, email, and phone number
          consistent with the information you use when applying for jobs.
        </p>
      </div>

    </div>
  );
};