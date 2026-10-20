import api from "./api";

export const parseJobDescription = (description) => {
    return api.post("/api/ai/parse-jd", { description });
};

export const generateCoverLetter = (company, role, notes, candidateProfile) => {
    return api.post("/api/ai/cover-letter", { company, role, notes, candidateProfile });
};

export const generateOutreach = (company, role, candidateProfile) => {
    return api.post("/api/ai/outreach", { company, role, candidateProfile });
};

export const generateInterviewPrep = (company, role, notes) => {
    return api.post("/api/ai/interview-prep", { company, role, notes });
};

export const analyzeMatch = (skills, description) => {
    return api.post("/api/ai/match-score", { skills, description });
};
