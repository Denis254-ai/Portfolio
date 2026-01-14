export interface Project {
    id: string;
    title: string;
    category: string;
    image?: string; // Path to asset
    gradient: string; // Fallback or overlay
}

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "LandKrypt Dapps",
        category: "Crypto",
        image: "/assets/concept_crypto.jpg",
        gradient: "from-purple-900 to-indigo-900",
    },
    {
        id: "2",
        title: "NobleKin Bio",
        category: "Medical AI",
        image: "/assets/concept_bio.jpg",
        gradient: "from-emerald-900 to-teal-900",
    },
    {
        id: "3",
        title: "World Forest Fund",
        category: "Green Tech",
        image: "/assets/concept_nature.jpg",
        gradient: "from-green-900 to-lime-900",
    },
    {
        id: "4",
        title: "Marmara Holiday",
        category: "SaaS",
        // No image provided in prompt for this one, utilizing gradient
        gradient: "from-orange-900 to-red-900",
    },
];
