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

    // Available:
    // modern
    // classic
    // minimal
    // professional
    // creative
    // executive
    template: "modern",

    enabledSections: [
        "personalInfo",
        "summary",
        "education",
        "skills",
    ],
};

const STORAGE_KEY = "resumecraft_resume";

const normalizeResume = (parsedResume) => {
    return {
        ...initialResume,
        ...parsedResume,

        personalInfo: {
            ...initialResume.personalInfo,
            ...(parsedResume?.personalInfo || {}),
        },

        experience: Array.isArray(parsedResume?.experience)
            ? parsedResume.experience
            : [],

        education: Array.isArray(parsedResume?.education)
            ? parsedResume.education
            : [],

        projects: Array.isArray(parsedResume?.projects)
            ? parsedResume.projects
            : [],

        skills: Array.isArray(parsedResume?.skills)
            ? parsedResume.skills
            : [],

        certifications: Array.isArray(parsedResume?.certifications)
            ? parsedResume.certifications
            : [],

        achievements: Array.isArray(parsedResume?.achievements)
            ? parsedResume.achievements
            : [],

        languages: Array.isArray(parsedResume?.languages)
            ? parsedResume.languages
            : [],

        enabledSections: Array.isArray(
            parsedResume?.enabledSections
        )
            ? parsedResume.enabledSections
            : initialResume.enabledSections,

        template:
            typeof parsedResume?.template === "string"
                ? parsedResume.template
                : initialResume.template,
    };
};

export function ResumeProvider({ children }) {
    const [resume, setResume] = useState(() => {
        try {
            const savedResume =
                localStorage.getItem(STORAGE_KEY);

            if (!savedResume) {
                return initialResume;
            }

            const parsedResume = JSON.parse(savedResume);

            return normalizeResume(parsedResume);
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

    /*
    =========================================================
    PERSONAL INFORMATION
    =========================================================
    */

    const updatePersonalInfo = (field, value) => {
        setResume((previous) => ({
            ...previous,

            personalInfo: {
                ...previous.personalInfo,
                [field]: value,
            },
        }));
    };

    /*
    =========================================================
    GENERAL RESUME UPDATE
    =========================================================
    */

    const updateResume = (field, value) => {
        setResume((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    /*
    =========================================================
    TEMPLATE
    =========================================================
    */

    const setTemplate = (templateId) => {
        const validTemplates = [
            "modern",
            "classic",
            "minimal",
            "professional",
            "creative",
            "executive",
        ];

        if (!validTemplates.includes(templateId)) {
            console.warn(
                `Invalid resume template: ${templateId}`
            );

            return;
        }

        setResume((previous) => ({
            ...previous,
            template: templateId,
        }));
    };

    /*
    =========================================================
    PHOTO
    =========================================================
    */

    const setPhoto = (photo) => {
        setResume((previous) => ({
            ...previous,

            personalInfo: {
                ...previous.personalInfo,
                photo,
            },
        }));
    };

    const removePhoto = () => {
        setResume((previous) => ({
            ...previous,

            personalInfo: {
                ...previous.personalInfo,
                photo: "",
            },
        }));
    };

    /*
    =========================================================
    SECTIONS
    =========================================================
    */

    const addSection = (section) => {
        setResume((previous) => {
            const currentSections =
                previous.enabledSections || [];

            if (currentSections.includes(section)) {
                return previous;
            }

            return {
                ...previous,

                enabledSections: [
                    ...currentSections,
                    section,
                ],
            };
        });
    };

    const removeSection = (section) => {
        // Personal information cannot be removed.
        if (section === "personalInfo") {
            return;
        }

        setResume((previous) => ({
            ...previous,

            enabledSections: (
                previous.enabledSections || []
            ).filter(
                (item) => item !== section
            ),
        }));
    };

    const isSectionEnabled = (section) => {
        return (
            resume.enabledSections?.includes(section) ||
            false
        );
    };

    /*
    =========================================================
    RESET
    =========================================================
    */

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

                setTemplate,

                setPhoto,
                removePhoto,

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