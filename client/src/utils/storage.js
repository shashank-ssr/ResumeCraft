import { sampleResumeData, defaultDesignSettings, defaultSectionOrder } from '../data/demoData';

const LOCAL_RESUMES_KEY = "resumecraft_local_resumes";
const CURRENT_RESUME_KEY = "resumecraft_current_active_resume";

export const getLocalResumes = () => {
  try {
    const data = localStorage.getItem(LOCAL_RESUMES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to read local resumes", e);
    return [];
  }
};

export const saveLocalResume = (resume) => {
  try {
    const resumes = getLocalResumes();
    const existingIndex = resumes.findIndex(r => r.id === resume.id);
    const updatedResume = {
      ...resume,
      updatedAt: new Date().toISOString()
    };
    
    if (existingIndex >= 0) {
      resumes[existingIndex] = updatedResume;
    } else {
      resumes.unshift(updatedResume);
    }
    
    localStorage.setItem(LOCAL_RESUMES_KEY, JSON.stringify(resumes));
    localStorage.setItem(CURRENT_RESUME_KEY, JSON.stringify(updatedResume));
    return updatedResume;
  } catch (e) {
    console.error("Failed to save local resume", e);
    return resume;
  }
};

export const createDefaultLocalResume = (templateId = "classic") => {
  const newResume = {
    id: "guest-resume-" + Date.now(),
    title: "My Professional Resume",
    template: templateId,
    data: sampleResumeData,
    design: defaultDesignSettings,
    sectionOrder: defaultSectionOrder,
    hiddenSections: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  return saveLocalResume(newResume);
};

export const getActiveResume = (id) => {
  const resumes = getLocalResumes();
  if (id) {
    const found = resumes.find(r => r.id === id);
    if (found) return found;
  }
  try {
    const current = localStorage.getItem(CURRENT_RESUME_KEY);
    if (current) {
      const parsed = JSON.parse(current);
      if (!id || parsed.id === id) return parsed;
    }
  } catch (e) {}
  
  if (resumes.length > 0) return resumes[0];
  return createDefaultLocalResume();
};

export const deleteLocalResume = (id) => {
  try {
    const resumes = getLocalResumes().filter(r => r.id !== id);
    localStorage.setItem(LOCAL_RESUMES_KEY, JSON.stringify(resumes));
  } catch (e) {
    console.error("Failed to delete local resume", e);
  }
};

export const generateAISummary = async (jobTitle = 'Professional', skills = '', industry = 'Technology') => {
  // Simulate AI delay
  await new Promise(res => setTimeout(res, 600));

  return [
    `Results-driven ${jobTitle} with over 5 years of experience delivering scalable solutions in the ${industry} sector. Proven track record in ${skills || 'team leadership, process optimization, and project execution'}. Adept at partnering with cross-functional stakeholders to accelerate business growth.`,
    `Innovative and detail-oriented ${jobTitle} specializing in ${skills || 'high-performance execution and system design'}. Passionate about leveraging cutting-edge methodologies to solve complex engineering challenges and improve operational efficiency.`,
    `Strategic ${jobTitle} recognized for driving cross-team collaboration and driving key business metrics. Combining expertise in ${skills || 'analytics, agile delivery, and project management'} to consistently exceed quarterly performance benchmarks.`
  ];
};

export const generateAIBulletPoints = async (initialText = '', jobTitle = 'Software Engineer') => {
  await new Promise(res => setTimeout(res, 600));

  const base = initialText.trim() || "Worked on team projects and delivered results.";

  return [
    `• Engineered scalable core features for high-traffic applications, improving system performance by 35%.\n• Spearheaded cross-functional project execution for 10+ major milestones, consistently meeting strict deadlines.\n• Automated manual data workflows, reducing operational overhead by 25 hours per week.`,
    `• Architected and deployed end-to-end solutions utilizing modern industry frameworks, serving 50,000+ active users.\n• Streamlined code review and testing practices, boosting release reliability by 40%.\n• Collaborated closely with product managers and UX designers to deliver intuitive customer features.`,
    `• Led execution of key ${jobTitle} initiatives, resulting in a 20% increase in user retention and satisfaction.\n• Mentored junior team members and established best practices for documentation and maintenance.\n• Quantified operational bottlenecks and optimized performance using data-driven benchmarks.`
  ];
};
