import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/home/LandingPage';
import { ResumeEditor } from './components/editor/ResumeEditor';
import { TemplateGallery } from './components/templates/TemplateGallery';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <div className="min-h-screen flex flex-col font-sans bg-slate-100 text-slate-800 antialiased selection:bg-blue-500 selection:text-white">

            <Navbar
              currentPage={currentPage}
              onNavigate={(page) => setCurrentPage(page)}
            />

            <main className="flex-1">
              {currentPage === 'home' && (
                <LandingPage
                  onStartBuilding={() => setCurrentPage('editor')}
                  onBrowseTemplates={() => setCurrentPage('templates')}
                />
              )}

              {currentPage === 'templates' && (
                <TemplateGallery
                  onSelectTemplate={() => setCurrentPage('editor')}
                />
              )}

              {currentPage === 'editor' && (
                <ResumeEditor
                  onNavigateToTemplates={() => setCurrentPage('templates')}
                />
              )}
            </main>

            <Footer
              onNavigate={(page) => setCurrentPage(page)}
            />

          </div>
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;