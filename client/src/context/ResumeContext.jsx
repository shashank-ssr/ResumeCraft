import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleResumeData, defaultDesignSettings, defaultSectionOrder, emptyResumeData } from '../data/demoData';
import { getActiveResume, saveLocalResume } from '../utils/storage';

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [activeResumeId, setActiveResumeId] = useState('resumecraft-main');
  const [title, setTitle] = useState("My Professional Resume");
  const [templateId, setTemplateId] = useState("classic");
  const [data, setData] = useState(sampleResumeData);
  const [design, setDesign] = useState(defaultDesignSettings);
  const [sectionOrder, setSectionOrder] = useState(defaultSectionOrder);

  // Load from local storage on initial mount if available
  useEffect(() => {
    const saved = getActiveResume(activeResumeId);
    if (saved) {
      if (saved.title) setTitle(saved.title);
      if (saved.template) setTemplateId(saved.template);
      if (saved.data) setData(saved.data);
      if (saved.design) setDesign(saved.design);
      if (saved.sectionOrder) setSectionOrder(saved.sectionOrder);
    }
  }, [activeResumeId]);

  // Auto-persist to localStorage on data changes
  useEffect(() => {
    saveLocalResume({
      id: activeResumeId,
      title,
      template: templateId,
      data,
      design,
      sectionOrder
    });
  }, [title, templateId, data, design, sectionOrder, activeResumeId]);

  // Personal info updater
  const updatePersonalInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      personal: {
        ...(prev.personal || {}),
        [field]: value
      }
    }));
  };

  // Summary updater
  const updateSummary = (value) => {
    setData(prev => ({
      ...prev,
      personal: {
        ...(prev.personal || {}),
        summary: value
      }
    }));
  };

  // Generic List item adder
  const addListEntry = (sectionKey, defaultItem) => {
    setData(prev => ({
      ...prev,
      [sectionKey]: [...(prev[sectionKey] || []), { ...defaultItem, id: `${sectionKey}-${Date.now()}` }]
    }));
  };

  // Generic List item updater
  const updateListEntry = (sectionKey, entryId, field, value) => {
    setData(prev => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] || []).map(entry =>
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    }));
  };

  // Generic List item deleter
  const deleteListEntry = (sectionKey, entryId) => {
    setData(prev => ({
      ...prev,
      [sectionKey]: (prev[sectionKey] || []).filter(entry => entry.id !== entryId)
    }));
  };

  // Generic List entry mover
  const moveListEntry = (sectionKey, index, direction) => {
    const list = [...(data[sectionKey] || [])];
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === list.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const [moved] = list.splice(index, 1);
    list.splice(targetIdx, 0, moved);

    setData(prev => ({ ...prev, [sectionKey]: list }));
  };

  // Design setting updater
  const updateDesign = (field, value) => {
    setDesign(prev => ({ ...prev, [field]: value }));
  };

  // Reset to sample data
  const resetToSampleData = () => {
    setData(sampleResumeData);
    setDesign(defaultDesignSettings);
  };

  // Clear all data
  const clearAllData = () => {
    setData(emptyResumeData);
  };

  // Export JSON backup
  const exportResumeJSON = () => {
    const payload = {
      version: "1.0",
      title,
      templateId,
      data,
      design,
      sectionOrder,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_ResumeCraft.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const importResumeJSON = (jsonObj) => {
    if (jsonObj) {
      if (jsonObj.title) setTitle(jsonObj.title);
      if (jsonObj.templateId) setTemplateId(jsonObj.templateId);
      if (jsonObj.data) setData(jsonObj.data);
      if (jsonObj.design) setDesign(jsonObj.design);
      if (jsonObj.sectionOrder) setSectionOrder(jsonObj.sectionOrder);
    }
  };

  // Print PDF trigger
  const printPDF = () => {
    window.print();
  };

  return (
    <ResumeContext.Provider value={{
      activeResumeId,
      setActiveResumeId,
      title,
      setTitle,
      templateId,
      setTemplateId,
      data,
      setData,
      design,
      setDesign,
      sectionOrder,
      setSectionOrder,
      updatePersonalInfo,
      updateSummary,
      addListEntry,
      updateListEntry,
      deleteListEntry,
      moveListEntry,
      updateDesign,
      resetToSampleData,
      clearAllData,
      exportResumeJSON,
      importResumeJSON,
      printPDF
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
