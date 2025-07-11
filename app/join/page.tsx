// app/registration/page.js
"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "gsap";
import { Users, Sparkles, Award, Brain, Heart, Zap, Star, Rocket, ArrowRight, Send, LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";

import MagneticButton from "@/components/magnetic-button";
import { useMobileOptimization, getOptimizedDuration, getOptimizedEase } from "@/components/mobile-optimized-animations";
import { databases, ID } from "./appwrite/app"; // Make sure this path is correct for your project

// Zod Schema adapted for the new form structure
const formSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Invalid 10-digit phone number"),
    degree: z.string().min(2, "Degree must be at least 2 characters"),
    year: z.enum(["1st", "2nd", "3rd", "4th", "Postgrad"], { required_error: "Please select your year" }),
    hostel: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
    domain: z.enum(["Tech", "Non-Tech"], { required_error: "Please select a domain" }),
    department: z.string().min(1, "Department is required"),
    additionalSkills: z.array(z.string()).min(1, "At least one skill must be selected"),
    elaborateChoices: z.string().min(10, "Explanation must be at least 10 characters"),
    hobbies: z.string().min(2, "Hobbies are required"),
    fictionalCharacter: z.string().min(2, "Character name is required"),
    whyJoinUs: z.string().min(10, "Explanation must be at least 10 characters"),
    portfolioLinks: z.string().url("Must be a valid URL (e.g., a public Google Doc link)").optional().or(z.literal("")),
    linkedinLink: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    githubLink: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  })
  .refine((data) => (data.domain === "Tech" ? !!data.githubLink && data.githubLink.length > 0 : true), {
    message: "GitHub link is required for the Tech domain",
    path: ["githubLink"],
  });


// Department and Skill options
const NON_TECH_DEPARTMENTS = {
  "Community Outreach": { icon: Users, description: "Social Media Managers: Manage socials and create engaging content (stories & reels on Instagram).", skills: ["Social Media Management", "Content Creation", "Community Building"] },
  "Designers": { icon: Sparkles, description: "Proficient with Canva/Figma for creating designs. Focus on graphic and visual design.", skills: ["Canva/Figma", "Graphic Design", "Visual Identity"] },
  "Event Managers": { icon: Award, description: "Oversee administrative and logistical aspects. Coordinate meetings, events, and club activities.", skills: ["Event Planning", "Project Management", "Leadership"] },
  "Public Speakers (PR)": { icon: Brain, description: "Engage with external representatives and organizations. Build partnerships and collaborations.", skills: ["Public Speaking", "Networking", "Partnership Development"] },
  "Photographers / Video Editors": { icon: Zap, description: "Capture high-quality photos and videos during events. Edit and create engaging visual content.", skills: ["Photography", "Video Editing", "Creative Direction"] },
};

const ALL_DEPARTMENTS = {
    "Tech": [
        "Natural Language Processing (NLP)",
        "Generative AI (GenAI)",
        "Reinforcement Learning (RL)",
        "Computer Vision (CV)",
    ],
    "Non-Tech": Object.keys(NON_TECH_DEPARTMENTS),
};


const ADDITIONAL_SKILLS = [
  "Researching", "Content Writing", "Designing (Canva/Figma/Photoshop etc.)", "Public Speaking", "Outreach and Sponsorship",
  "Social Media Management / Marketing", "Photography/Videography", "Managing Events", "3D softwares (Blender, Maya, etc)",
  "Video editing (Capcut/Kinemaster/After Effects, Da Vinci etc)",
];

export default function JoinUs() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { isMobile, reducedMotion } = useMobileOptimization();

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        additionalSkills: [],
        portfolioLinks: "",
        linkedinLink: "",
        githubLink: "",
    },
  });

  const domain = watch("domain");

  useEffect(() => {
    // GSAP Animations (unchanged)
    const tl = gsap.timeline();
    tl.fromTo(".page-header", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(1.2, isMobile, reducedMotion), ease: getOptimizedEase(isMobile) })
      .fromTo(".form-section", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: getOptimizedDuration(0.8, isMobile, reducedMotion), stagger: 0.1, ease: getOptimizedEase(isMobile) }, "-=0.8");
    if (!reducedMotion) {
      gsap.to(".float-icon", { y: isMobile ? -10 : -20, rotation: isMobile ? 5 : 10, duration: getOptimizedDuration(3, isMobile, reducedMotion), repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5 });
    }
  }, [isMobile, reducedMotion]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
        // Map form data to the structure expected by your Appwrite collection
        const appwriteData = {
            fullname: data.fullName,
            email: data.email,
            phone: data.phone,
            degree: data.degree,
            currentyear: data.year,
            // Convert 'Yes'/'No' to Appwrite's expected 'true'/'false' string
            hostel: data.hostel === 'Yes' ? 'true' : 'false', 
            domain: data.domain.toLowerCase(),
            department: data.department,
            additionalskills: data.additionalSkills.join(', '),
            elaboratechoices: data.elaborateChoices,
            hobbies: data.hobbies,
            fictionalchar: data.fictionalCharacter,
            whyjoin: data.whyJoinUs,
            
            // --- FIX IS HERE ---
            // Convert empty strings to null for optional URL fields
            otherlinks: data.portfolioLinks || null,
            linkedinlink: data.linkedinLink || null,
            githublink: data.githubLink || null,
        };
        
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

        if (!databaseId || !collectionId) {
            throw new Error("Appwrite Database ID or Collection ID is not configured.");
        }

        await databases.createDocument(databaseId, collectionId, ID.unique(), appwriteData);
        
        toast.success("Registration successful! We'll be in touch.");
        reset(); // Reset form fields on successful submission
    } catch (error: any) {
        console.error("Registration error:", error);
        toast.error("Registration failed: " + (error.message || "An unknown error occurred."));
    } finally {
        setLoading(false);
    }
  };

  const renderError = (fieldName: keyof z.infer<typeof formSchema>) =>
    errors[fieldName] && <span className="text-sm text-red-500 mt-1">{errors[fieldName]?.message}</span>;


  return (
    <div ref={pageRef} className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Users className="float-icon absolute top-20 left-10 w-8 h-8 text-black/10" />
        <Brain className="float-icon absolute top-40 right-20 w-10 h-10 text-black/10" />
        <Rocket className="float-icon absolute bottom-40 left-20 w-6 h-6 text-black/10" />
        <Star className="float-icon absolute bottom-20 right-40 w-8 h-8 text-black/10" />
        <Heart className="float-icon absolute top-1/2 left-1/4 w-6 h-6 text-black/10" />
        <Zap className="float-icon absolute top-3/4 right-1/3 w-8 h-8 text-black/10" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="page-header text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Sparkles size={16} /><span>Join the AI Revolution</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6">Registration<br /><span className="text-black/60">Form</span></h1>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-black/70 leading-relaxed">
            <p className="font-semibold text-black">Welcome to the AIS Core Selection Process!</p>
            <p>We are currently seeking dedicated, passionate, and skilled individuals to join our core team in <span className="font-semibold text-black">Tech, Multimedia, Design and Management</span> roles.</p>
          </div>
        </div>
        
        {/* All other informational sections remain unchanged... */}
        <div className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Our Organizational Structure</h2>
          <div className="bg-white p-4 rounded-2xl border border-black/10 hover:border-black/20 transition-all">
            <img src="/images/org-chart.avif" alt="AI Society Organizational Chart" className="w-full h-auto object-contain rounded-xl" />
          </div>
        </div>
        <div className="form-section bg-white p-8 rounded-2xl border border-black/10 hover:border-black/20 transition-all mb-12 group">
          <div className="flex items-center space-x-3 mb-6"><div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><Brain size={24} className="text-white" /></div><h2 className="text-2xl font-bold text-black">About AIS</h2></div>
          <p className="text-black/70 leading-relaxed mb-4">The Artificial Intelligence Society (AIS) at Bennett University is one of the most research + open-source development focused student communities on campus. Our mission is to foster a deep understanding of AI and its applications by bringing together like-minded individuals who are eager to learn, share knowledge, and work on innovative projects.</p>
          <p className="text-black/70 leading-relaxed"><span className="font-semibold text-black"> We are an exclusive group of productive individuals</span>, so keep that in mind while you fill the form honestly.</p>
        </div>
        <div className="form-section mb-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Non-Technical Departments</h2>
          <div className="grid md:grid-cols-2 gap-6">{Object.entries(NON_TECH_DEPARTMENTS).map(([dept, info]) => { const Icon = info.icon; return (<div key={dept} className="bg-white p-6 rounded-xl border border-black/10 hover:border-black hover:shadow-lg transition-all group"><div className="flex items-center space-x-3 mb-4"><div className="w-10 h-10 bg-black group-hover:bg-white border-2 border-black rounded-full flex items-center justify-center transition-all"><Icon size={20} className="text-white group-hover:text-black transition-colors" /></div><h3 className="font-bold text-black">{dept}</h3></div><p className="text-black/70 text-sm mb-4">{info.description}</p><div className="flex flex-wrap gap-2">{info.skills.map((skill, i) => (<span key={i} className="px-2 py-1 bg-black/5 text-black text-xs rounded-full">{skill}</span>))}</div></div>)})}</div>
        </div>

        {/* --- Registration Form with Integrated Logic --- */}
        <div className="form-section bg-white p-8 rounded-2xl border border-black/10 hover:border-black/20 transition-all">
          <div className="flex items-center space-x-3 mb-8"><div className="w-12 h-12 bg-black rounded-full flex items-center justify-center"><Send size={24} className="text-white" /></div><h2 className="text-2xl font-bold text-black">Registration Form</h2></div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-black mb-2">Full Name <span className="text-red-500">*</span></label><input type="text" {...register("fullName")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="Enter your legal full name" />{renderError("fullName")}</div>
              <div><label className="block text-sm font-semibold text-black mb-2">Email <span className="text-red-500">*</span></label><input type="email" {...register("email")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="Enter your email address" />{renderError("email")}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-black mb-2">Phone Number <span className="text-red-500">*</span></label><input type="tel" {...register("phone")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="10-digit phone number" />{renderError("phone")}</div>
              <div><label className="block text-sm font-semibold text-black mb-2">Degree Program <span className="text-red-500">*</span></label><input type="text" {...register("degree")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="Your current degree program" />{renderError("degree")}</div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div><label className="block text-sm font-semibold text-black mb-2">Current Year <span className="text-red-500">*</span></label><select {...register("year")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"><option value="">Select Year</option><option value="1st">1st Year</option><option value="2nd">2nd Year</option><option value="3rd">3rd Year</option><option value="4th">4th Year</option><option value="Postgrad">Postgrad</option></select>{renderError("year")}</div>
              <div><label className="block text-sm font-semibold text-black mb-2">Hostel Accommodation <span className="text-red-500">*</span></label><select {...register("hostel")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select>{renderError("hostel")}</div>
              <div><label className="block text-sm font-semibold text-black mb-2">Domain <span className="text-red-500">*</span></label><select {...register("domain")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40"><option value="">Select Domain</option><option value="Tech">Tech</option><option value="Non-Tech">Non-Tech</option></select>{renderError("domain")}</div>
            </div>

            {/* Conditional Tech Fields */}
            {domain === "Tech" && (
                <div className="grid md:grid-cols-2 gap-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div><label className="block text-sm font-semibold text-black mb-2">GitHub Profile <span className="text-red-500">*</span></label><input type="text" {...register("githubLink")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="https://github.com/username" />{renderError("githubLink")}</div>
                    <div><label className="block text-sm font-semibold text-black mb-2">LinkedIn Profile</label><input type="text" {...register("linkedinLink")} className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="https://linkedin.com/in/username" />{renderError("linkedinLink")}</div>
                </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Department <span className="text-red-500">*</span></label>
              <select {...register("department")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40">
                <option value="">Select Department</option>
                {domain && ALL_DEPARTMENTS[domain].map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
              </select>
              {renderError("department")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-4">Additional Skills <span className="text-red-500">*</span></label>
              <div className="grid md:grid-cols-2 gap-3">{ADDITIONAL_SKILLS.map((skill) => (<label key={skill} className="flex items-center space-x-3 cursor-pointer group"><input type="checkbox" value={skill} {...register("additionalSkills")} className="w-5 h-5 text-black border-2 border-black/20 rounded focus:ring-black focus:ring-2" /><span className="text-black/70 group-hover:text-black transition-colors text-sm">{skill}</span></label>))}</div>
              {renderError("additionalSkills")}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Portfolio/Task Links</label>
              <textarea {...register("portfolioLinks")} rows={3} className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none" placeholder="Add all relevant links in a public Google doc and paste the link here." />
              {renderError("portfolioLinks")}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-black mb-2">Elaborate on Your Choices <span className="text-red-500">*</span></label><textarea {...register("elaborateChoices")} required rows={4} className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none" placeholder="Explain your department and skill choices" />{renderError("elaborateChoices")}</div>
              <div><label className="block text-sm font-semibold text-black mb-2">Hobbies <span className="text-red-500">*</span></label><textarea {...register("hobbies")} required rows={4} className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none" placeholder="Describe your hobbies in a few lines" />{renderError("hobbies")}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-black mb-2">Fictional Character <span className="text-red-500">*</span></label><input type="text" {...register("fictionalCharacter")} required className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40" placeholder="A fictional character you resemble" />{renderError("fictionalCharacter")}</div>
              <div><label className="block text-sm font-semibold text-black mb-2">Why Join Us? <span className="text-red-500">*</span></label><textarea {...register("whyJoinUs")} required rows={4} className="w-full px-4 py-3 border-2 border-black/20 rounded-lg focus:outline-none focus:border-black transition-colors hover:border-black/40 resize-none" placeholder="Write concisely. Don't use ChatGPT (Your application might be filtered automatically)" />{renderError("whyJoinUs")}</div>
            </div>
            
            <div className="pt-6">
              <MagneticButton type="submit" disabled={loading} className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-black/90 transition-all interactive group flex items-center justify-center space-x-2 disabled:bg-gray-500 disabled:cursor-not-allowed">
                {loading ? (
                    <>
                        <LoaderIcon className="animate-spin" size={20} />
                        <span>Submitting...</span>
                    </>
                ) : (
                    <>
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span>Submit Application</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
              </MagneticButton>
            </div>
          </form>
        </div>

        {/* --- Final Section (Unchanged) --- */}
        <div className="form-section mt-12 bg-black text-white p-8 rounded-2xl">
          <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-3"><Heart className="text-red-500 animate-pulse" /><span>Why Join AIS?</span><Rocket className="text-blue-400 animate-bounce" /></h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center group"><div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><Brain size={32} className="text-white" /></div><h3 className="font-bold mb-2">Learn & Grow</h3><p className="text-white/80 text-sm">Access to cutting-edge AI resources and mentorship</p></div>
            <div className="text-center group"><div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><Users size={32} className="text-white" /></div><h3 className="font-bold mb-2">Network</h3><p className="text-white/80 text-sm">Connect with like-minded AI enthusiasts and industry experts</p></div>
            <div className="text-center group"><div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><Award size={32} className="text-white" /></div><h3 className="font-bold mb-2">Achieve</h3><p className="text-white/80 text-sm">Work on award-winning projects and research publications</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}