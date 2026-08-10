import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-800"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>

            <span className="font-bold">
              Resume<span className="text-blue-600">Craft</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-slate-500">
            <Link
              to="/templates"
              className="hover:text-blue-600 transition-colors"
            >
              Templates
            </Link>

            <Link
              to="/editor"
              className="hover:text-blue-600 transition-colors"
            >
              Resume Builder
            </Link>

            <Link
              to="/"
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} ResumeCraft
          </p>

        </div>

      </div>
    </footer>
  );
};