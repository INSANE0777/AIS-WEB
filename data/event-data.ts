export interface Event {
slug: string;
title: string;
imageSrc: string;
shortDesc: string;
longDesc: string;
date: string;
location: string;
keyFeatures: string[];
}

// This is the single source of truth for all event data.
const allEvents: Event[] = [
{
slug: "ai-101",
title: "AI 101",
imageSrc: "/images/AI 101.png",
shortDesc: "An immersive kickoff event where freshers engaged in foundational AI concepts, hands-on coding sessions, and insightful talks.",
longDesc: "AI 101 marked the official start of our academic year, providing an immersive kickoff for freshmen. The event was designed to build a strong foundation in artificial intelligence through a series of engaging activities. Attendees participated in hands-on coding sessions, gaining practical experience with fundamental algorithms. Insightful talks from senior members and faculty provided a roadmap for their journey into AI, setting the stage for a year of innovation and learning.",
date: "August 2024",
location: "Bennett University Auditorium",
keyFeatures: ["Introductory AI Concepts", "Live Coding Sessions", "Guest Speaker Talks", "Team Building Activities"],
},
{
slug: "ai-hunt-2-0",
title: "AI Hunt 2.0",
imageSrc: "/images/AI HUNT 2.0.png",
shortDesc: "An exciting 48-hour online cryptic treasure hunt, featuring a Gen AI workshop, an info session, and dynamic problem-solving challenges.",
longDesc: "AI Hunt 2.0 was an exhilarating 48-hour online cryptic treasure hunt that challenged participants' problem-solving skills and creativity. The event kicked off with a workshop on Generative AI, equipping hunters with cutting-edge tools. An info session detailed the rules before teams dove into a series of dynamic, AI-themed puzzles. The hunt pushed the boundaries of exploration and collaborative thinking, becoming a highlight of our event calendar.",
date: "September 2024",
location: "Online",
keyFeatures: ["48-Hour Cryptic Hunt", "Generative AI Workshop", "Online Leaderboard", "Challenging Puzzles"],
},
{
slug: "tech-arena-2025",
title: "TechArena 2025",
imageSrc: "/images/TECH ARENA.png",
shortDesc: "AIS proudly participated in TechArena 2025, presenting innovative projects and connecting with a vibrant community of tech enthusiasts.",
longDesc: "The AI Society proudly made its mark at TechArena 2025, Bennett University's flagship tech fest. Our booth became a hub of innovation, where we presented a diverse range of student-led projects. This event was a fantastic opportunity to connect with a vibrant community of tech enthusiasts, industry experts, and fellow students, sharing our passion and showcasing the practical applications of our research.",
date: "February 2025",
location: "Bennett University Campus",
keyFeatures: ["Project Demonstrations", "Industry Networking", "Tech Talks", "Interactive Booth"],
},
{
slug: "project-showcase",
title: "Project Showcase",
imageSrc: "/images/Project Showcase.png",
shortDesc: "AIS shone at the Project Showcase, presenting over 10 groundbreaking projects that redefined innovation and creativity.",
longDesc: "Our annual Project Showcase was a testament to the incredible talent within the AI Society. Members presented over 10 groundbreaking projects, the most by any student body at the event. From advanced machine learning models to creative applications of generative AI, the showcase highlighted a year of hard work and redefined the boundaries of student-led innovation and creativity on campus.",
date: "March 2025",
location: "Innovation Hub",
keyFeatures: ["10+ Student Projects", "Live Demos & Q&A", "Faculty Judging Panel", "Networking Session"],
},
{
slug: "xr-gen-ai-workshop",
title: "XR & GenAI Workshop",
imageSrc: "/images/Workshop.png",
shortDesc: "A deep dive into the fusion of XR and Generative AI, providing students with hands-on experience and practical insights.",
longDesc: "This specialized workshop offered a deep dive into the exciting fusion of Extended Reality (XR) and Generative AI. Students explored how these two revolutionary fields are converging to create new immersive experiences. The session was packed with hands-on exercises and practical insights, empowering attendees to start building their own projects at the intersection of these emerging technologies.",
date: "April 2025",
location: "Digital Labs",
keyFeatures: ["XR Development Basics", "Generative AI for 3D Assets", "Hands-On Project", "Career Insights"],
},
{
slug: "club-carnival",
title: "Club Carnival",
imageSrc: "/images/Club Carnival.png",
shortDesc: "Freshers Orientation and Club Carnival for the new batch of students, including a variety of fun demos, games, and fun events.",
longDesc: "We warmly welcomed the new batch of students at the annual Freshers Orientation and Club Carnival. Our booth was buzzing with energy, featuring a variety of fun AI-powered demos, interactive games, and engaging activities. It was the perfect opportunity for new students to meet the team, learn about our work, and see how they can get involved in the exciting world of AI.",
date: "July 2024",
location: "Student Activity Center",
keyFeatures: ["AI Game Demos", "Meet the Team", "Membership Signup", "Interactive Activities"],
},
];

// Function to get all events, used by the dynamic [slug] page.
export const getEventData = () => allEvents;

// Specific arrays for the main events page layout.
export const leftImagesData = [allEvents[0], allEvents[2], allEvents[4]];
export const rightImagesData = [allEvents[1], allEvents[3], allEvents[5]];

// Data for the 3D cubes on the hero section.
export const leftCubeImages = [
{ src: "/images/RL.png", alt: "RL" }, { src: "/images/GENAI.png", alt: "GENAI" }, { src: "/images/NLP.png", alt: "NLP" },
{ src: "/images/CV.png", alt: "CV" }, { src: "/images/DESIGN.png", alt: "DESIGN" }, { src: "/images/MULTIMEDIA.png", alt: "MULTIMEDIA" },
];
export const rightCubeImages = [
{ src: "/images/MANAGEMENT.png", alt: "MANAGEMENT" }, { src: "/images/PR.png", alt: "PR" }, { src: "/images/DESIGN.png", alt: "DESIGN" },
{ src: "/images/MULTIMEDIA.png", alt: "MULTIMEDIA" }, { src: "/images/GENAI.png", alt: "GENAI" }, { src: "/images/NLP.png", alt: "NLP" },
];