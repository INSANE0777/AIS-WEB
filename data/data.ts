export const data = {
  projects: [
    {
      id: 1,
      slug: "sentinel-ai-fire-detection", // URL-friendly identifier
      title: "Sentinel AI: Real-time Fire Detection",
      description: "An advanced computer vision system for early wildfire and urban fire detection using UAVs and static cameras.",
      detailedDescription: "Sentinel AI is a critical infrastructure project designed to mitigate the devastating impact of fires. By leveraging state-of-the-art YOLO models and real-time data processing, the system provides instant alerts to emergency services, significantly reducing response times. The project includes a robust data pipeline for continuous model improvement and a user-friendly dashboard for monitoring.",
      imagePath: "/images/projects/fire.avif",
      tags: ["Computer Vision", "Real-Time", "Safety"],
      techStack: ["Python", "TensorFlow", "OpenCV", "React", "Node.js"],
      contributors: ["Alice Johnson", "Bob Williams", "Charlie Brown"],
      githubLink: "https://github.com/...",
      status: "Completed",
      startDate: "2023-09-01",
    },
    {
      id: 2,
      slug: "genai-creative-writer",
      title: "GenAI Creative Writer's Assistant",
      description: "A generative AI tool that assists authors with plot generation, character development, and overcoming writer's block.",
      detailedDescription: "This tool utilizes a fine-tuned GPT-style Large Language Model to act as a creative partner for writers. It can generate story prompts, suggest dialogue, describe settings, and even brainstorm alternative plot twists based on the user's input. The interface is designed to be non-intrusive, providing inspiration without taking over the creative process.",
      imagePath: "/images/projects/writer.avif",
      tags: ["Generative AI", "NLP", "Creative Tools"],
      techStack: ["PyTorch", "Hugging Face", "Next.js", "FastAPI"],
      contributors: ["Diana Prince", "Eve Adams", "Frank Miller"],
      githubLink: "https://github.com/...",
      status: "Active",
      startDate: "2024-02-15",
    },
    // Add more projects with the same new structure...
  ],
};