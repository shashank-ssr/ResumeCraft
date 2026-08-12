import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ResumeContext = createContext(null);

const initialResume = {
    personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
    },

    summary: "",

    experience: [],

    education: [],

    projects: [],

    skills: [],

    certifications: [],

    achievements: [],

    languages: [],

    template: "modern",

    enabledSections: [
        "personalInfo",
        "summary",
        "education",
        "skills",
    ],
};

const STORAGE_KEY = "resumecraft_resume";

export function ResumeProvider({ children }) {
    const [resume, setResume] = useState(() => {
        try {
            const savedResume = localStorage.getItem(STORAGE_KEY);

            if (!savedResume) {
                return initialResume;
            }

            const parsedResume = JSON.parse(savedResume);

            return {
                ...initialResume,
                ...parsedResume,

                personalInfo: {
                    ...initialResume.personalInfo,
                    ...(parsedResume.personalInfo || {}),
                },

                // Support older saved resumes
                enabledSections:
                    Array.isArray(parsedResume.enabledSections)
                        ? parsedResume.enabledSections
                        : initialResume.enabledSections,
            };
        } catch (error) {
            console.error(
                "Failed to load saved resume:",
                error
            );

            return initialResume;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(resume)
            );
        } catch (error) {
            console.error(
                "Failed to save resume:",
                error
            );
        }
    }, [resume]);

    const updatePersonalInfo = (field, value) => {
        setResume((previous) => ({
            ...previous,

            personalInfo: {
                ...previous.personalInfo,
                [field]: value,
            },
        }));
    };

    const updateResume = (field, value) => {
        setResume((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const addSection = (section) => {
        setResume((previous) => {
            if (previous.enabledSections.includes(section)) {
                return previous;
            }

            return {
                ...previous,
                enabledSections: [
                    ...previous.enabledSections,
                    section,
                ],
            };
        });
    };

    const removeSection = (section) => {
        // Personal information should always remain
        if (section === "personalInfo") {
            return;
        }

        setResume((previous) => ({
            ...previous,
            enabledSections:
                previous.enabledSections.filter(
                    (item) => item !== section
                ),
        }));
    };

    const isSectionEnabled = (section) => {
        return resume.enabledSections.includes(section);
    };

    const resetResume = () => {
        setResume(initialResume);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <ResumeContext.Provider
            value={{
                resume,
                setResume,
                updatePersonalInfo,
                updateResume,
                addSection,
                removeSection,
                isSectionEnabled,
                resetResume,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);

    if (!context) {
        throw new Error(
            "useResume must be used inside ResumeProvider"
        );
    }

    return context;
}