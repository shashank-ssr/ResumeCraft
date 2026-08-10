import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface ResumeRecord {
  id: string;
  userId: string;
  title: string;
  template: string;
  data: any;
  design: any;
  sectionOrder: string[];
  hiddenSections: Record<string, boolean>;
  createdAt: string;
  updatedAt: string;
}

interface DBData {
  users: User[];
  resumes: ResumeRecord[];
}

const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial DB structure
function loadDB(): DBData {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading JSON db file:", e);
  }
  const defaultData: DBData = { users: [], resumes: [] };
  saveDB(defaultData);
  return defaultData;
}

function saveDB(data: DBData) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error("Error writing JSON db file:", e);
  }
}

export const db = {
  findUserByEmail: (email: string): User | undefined => {
    const data = loadDB();
    return data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  findUserById: (id: string): User | undefined => {
    const data = loadDB();
    return data.users.find(u => u.id === id);
  },
  createUser: (user: User): User => {
    const data = loadDB();
    data.users.push(user);
    saveDB(data);
    return user;
  },
  getUserResumes: (userId: string): ResumeRecord[] => {
    const data = loadDB();
    return data.resumes.filter(r => r.userId === userId).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },
  getResumeById: (id: string): ResumeRecord | undefined => {
    const data = loadDB();
    return data.resumes.find(r => r.id === id);
  },
  saveResume: (resume: ResumeRecord): ResumeRecord => {
    const data = loadDB();
    const idx = data.resumes.findIndex(r => r.id === resume.id);
    if (idx >= 0) {
      data.resumes[idx] = resume;
    } else {
      data.resumes.unshift(resume);
    }
    saveDB(data);
    return resume;
  },
  deleteResume: (id: string, userId: string): boolean => {
    const data = loadDB();
    const initialLen = data.resumes.length;
    data.resumes = data.resumes.filter(r => !(r.id === id && r.userId === userId));
    saveDB(data);
    return data.resumes.length < initialLen;
  }
};
