import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FileText,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Plus
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { createDefaultLocalResume } from '../../utils/storage';

export const Navbar = ({ currentPage, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleCreateNewResume = () => {
    createDefaultLocalResume('classic');

    if (onNavigate) {
      onNavigate('editor');
    } else {
      navigate('/editor');
    }

    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('home');
    }
  };

  const handleTemplatesClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('templates');
    }
  };

  const isTemplatesActive =
    currentPage === 'templates' || location.pathname === '/templates';

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Resume<span className="text-blue-600">Craft</span>
            </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/templates"
              onClick={handleTemplatesClick}
              className={`text-sm font-medium transition-colors ${
                isTemplatesActive
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Templates
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                My Resumes
              </Link>
            )}

            {/* Create Resume */}
            <button
              onClick={handleCreateNewResume}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Resume
            </button>


            {/* Authentication */}
            {isAuthenticated ? (
              <div className="relative">

                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <User className="w-4 h-4" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1">

                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user?.name || 'User'}
                      </p>

                      <p className="text-xs text-slate-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      My Resumes
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Log In
              </Link>
            )}

          </div>


          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">

            <button
              onClick={handleCreateNewResume}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              Create
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>

        </div>
      </div>


      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4">

          <div className="flex flex-col gap-1">

            <Link
              to="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Templates
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                My Resumes
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Log In
              </Link>
            )}

            {isAuthenticated && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            )}

          </div>

        </div>
      )}
    </nav>
  );
};