import { Response } from 'express';
import { AuthenticatedRequest } from './auth';
import { db, ResumeRecord } from './db';

export const getResumesHandler = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
  const resumes = db.getUserResumes(req.user.id);
  return res.json({
    success: true,
    data: resumes
  });
};

export const getResumeByIdHandler = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const resume = db.getResumeById(id);
  if (!resume) {
    return res.status(404).json({ success: false, message: 'Resume not found' });
  }
  // Allow if public/guest or matching user
  if (req.user && resume.userId !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  return res.json({
    success: true,
    data: resume
  });
};

export const createResumeHandler = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
  const { title, template, data, design, sectionOrder, hiddenSections } = req.body;

  const newResume: ResumeRecord = {
    id: 'resume-' + Date.now(),
    userId: req.user.id,
    title: title || 'My Professional Resume',
    template: template || 'classic',
    data: data || {},
    design: design || {},
    sectionOrder: sectionOrder || [],
    hiddenSections: hiddenSections || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.saveResume(newResume);
  return res.status(201).json({
    success: true,
    message: 'Resume saved successfully',
    data: newResume
  });
};

export const updateResumeHandler = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
  const { id } = req.params;
  const existing = db.getResumeById(id);

  if (!existing) {
    // If saving guest resume for newly registered user
    const newResume: ResumeRecord = {
      id,
      userId: req.user.id,
      title: req.body.title || 'My Professional Resume',
      template: req.body.template || 'classic',
      data: req.body.data || {},
      design: req.body.design || {},
      sectionOrder: req.body.sectionOrder || [],
      hiddenSections: req.body.hiddenSections || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.saveResume(newResume);
    return res.json({
      success: true,
      message: 'Resume created successfully',
      data: newResume
    });
  }

  if (existing.userId !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }

  const updated: ResumeRecord = {
    ...existing,
    title: req.body.title !== undefined ? req.body.title : existing.title,
    template: req.body.template !== undefined ? req.body.template : existing.template,
    data: req.body.data !== undefined ? req.body.data : existing.data,
    design: req.body.design !== undefined ? req.body.design : existing.design,
    sectionOrder: req.body.sectionOrder !== undefined ? req.body.sectionOrder : existing.sectionOrder,
    hiddenSections: req.body.hiddenSections !== undefined ? req.body.hiddenSections : existing.hiddenSections,
    updatedAt: new Date().toISOString()
  };

  db.saveResume(updated);
  return res.json({
    success: true,
    message: 'Resume updated successfully',
    data: updated
  });
};

export const deleteResumeHandler = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
  const { id } = req.params;
  const deleted = db.deleteResume(id, req.user.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Resume not found or unauthorized' });
  }
  return res.json({
    success: true,
    message: 'Resume deleted successfully'
  });
};

export const duplicateResumeHandler = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });
  const { id } = req.params;
  const original = db.getResumeById(id);

  if (!original || original.userId !== req.user.id) {
    return res.status(404).json({ success: false, message: 'Resume not found' });
  }

  const copy: ResumeRecord = {
    ...original,
    id: 'resume-' + Date.now(),
    title: `${original.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.saveResume(copy);
  return res.status(201).json({
    success: true,
    message: 'Resume duplicated successfully',
    data: copy
  });
};
