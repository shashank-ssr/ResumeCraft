export const sampleResumeData = {
  personal: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Full Stack Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan-dev",
    github: "github.com/alexmorgan",
    portfolio: "alexmorgan.dev/portfolio",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  },
  summary: "Driven Full Stack Engineer with 6+ years of experience building scalable web applications, microservices, and user-centric web tools. Passionate about high-performance frontend architectures, modern design systems, and seamless cloud deployments.",
  experience: [
    {
      id: "exp-1",
      jobTitle: "Senior Frontend Engineer",
      company: "Apex Tech Innovations",
      location: "San Francisco, CA",
      startDate: "2023-01",
      endDate: "Present",
      currentlyWorking: true,
      description: "• Architected and maintained core React micro-frontends serving 1.5M+ active monthly users.\n• Improved web vital metrics by 42% through code-splitting, lazy loading, and SSR optimization.\n• Mentored 5 junior engineers and established automated CI/CD frontend test pipelines.",
    },
    {
      id: "exp-2",
      jobTitle: "Full Stack Developer",
      company: "Nexus Software Solutions",
      location: "San Jose, CA",
      startDate: "2020-06",
      endDate: "2022-12",
      currentlyWorking: false,
      description: "• Developed scalable RESTful and GraphQL APIs using Node.js, Express, and PostgreSQL.\n• Collaborated closely with product designers to implement responsive, accessible UI components.\n• Integrated third-party payment gateways (Stripe) and real-time WebSocket notifications.",
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2016-08",
      endDate: "2020-05",
      gpa: "3.85 / 4.0",
      description: "Specialized in Software Engineering and Human-Computer Interaction. Dean's Honor Roll 2018-2020.",
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "ResumeCraft Platform",
      description: "Interactive real-time resume builder featuring dynamic template customization, live A4 preview, and automated client-side PDF export.",
      technologies: "React, Vite, Node.js, Express, Tailwind CSS",
      projectUrl: "https://resumecraft.app",
      githubUrl: "https://github.com/alexmorgan/resumecraft",
      startDate: "2024-01",
      endDate: "2024-03",
    },
    {
      id: "proj-2",
      name: "CloudMetrics Analytics Dashboard",
      description: "High-throughput real-time telemetry dashboard for monitoring cloud application performance and server latency.",
      technologies: "TypeScript, React, D3.js, WebSockets, Go",
      projectUrl: "https://cloudmetrics.io",
      githubUrl: "https://github.com/alexmorgan/cloudmetrics",
      startDate: "2023-06",
      endDate: "2023-11",
    }
  ],
  skills: [
    { id: "sk-1", name: "JavaScript / TypeScript", level: "Expert" },
    { id: "sk-2", name: "React / Next.js", level: "Expert" },
    { id: "sk-3", name: "Node.js / Express", level: "Advanced" },
    { id: "sk-4", name: "Tailwind CSS & Modern UI", level: "Expert" },
    { id: "sk-5", name: "PostgreSQL / MongoDB", level: "Advanced" },
    { id: "sk-6", name: "Docker & CI/CD", level: "Intermediate" },
    { id: "sk-7", name: "RESTful & GraphQL APIs", level: "Advanced" },
    { id: "sk-8", name: "Git & Agile Workflows", level: "Expert" }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      organization: "Amazon Web Services",
      date: "2023-05",
      url: "https://aws.amazon.com/verification",
      description: "Demonstrated expertise in designing distributed, cost-efficient cloud architectures on AWS.",
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "1st Place Winner – HackSF 2023",
      description: "Built an AI-driven accessibility tool for vision-impaired web navigation in 36 hours.",
      date: "2023-10",
    }
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native / Fluent" },
    { id: "lang-2", name: "Spanish", proficiency: "Professional Working" }
  ],
  interests: [
    { id: "int-1", name: "Open Source Contributing" },
    { id: "int-2", name: "UI Design & Typography" },
    { id: "int-3", name: "Marathon Running" }
  ],
  volunteer: [
    {
      id: "vol-1",
      organization: "Code for Good Foundation",
      role: "Volunteer Tech Instructor",
      startDate: "2021-01",
      endDate: "Present",
      description: "Taught web development fundamentals to high school students in underserved communities.",
    }
  ],
  references: [
    {
      id: "ref-1",
      name: "Sarah Jenkins",
      position: "VP of Engineering",
      company: "Apex Tech Innovations",
      email: "sarah.jenkins@apextech.com",
      phone: "+1 (555) 987-6543",
    }
  ],
  customSections: [
    {
      id: "cust-1",
      title: "Publications",
      entries: [
        {
          id: "ce-1",
          title: "Optimizing Micro-Frontend Performance at Scale",
          subtitle: "Web Developer Quarterly Journal",
          date: "2023-08",
          location: "San Francisco, CA",
          description: "In-depth case study analyzing bundle reduction techniques in large React enterprise applications.",
          url: "https://example.com/publication"
        }
      ]
    }
  ]
};

export const defaultDesignSettings = {
  primaryColor: "#1e40af",    // Deep Royal Blue
  secondaryColor: "#475569",  // Slate Gray
  textColor: "#1e293b",       // Dark Slate Text
  backgroundColor: "#ffffff",
  fontFamily: "Inter",        // 'Inter', 'Roboto', 'Poppins', 'Montserrat', 'Georgia', 'Times New Roman', 'Playfair Display'
  fontSize: "medium",         // 'small', 'medium', 'large'
  headingSize: "medium",      // 'small', 'medium', 'large'
  sectionSpacing: 16,         // 12 to 28
  lineHeight: 1.5,            // 1.3 to 1.8
  pageMargins: 16,            // 10 to 25
};

export const defaultSectionOrder = [
  "summary",
  "experience",
  "education",
  "projects",
  "skills",
  "certifications",
  "achievements",
  "languages",
  "interests",
  "volunteer",
  "references",
  "custom"
];

export const emptyResumeData = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    portfolio: "",
    photo: "",
  },
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: [],
  certifications: [],
  achievements: [],
  languages: [],
  interests: [],
  volunteer: [],
  references: [],
  customSections: []
};
