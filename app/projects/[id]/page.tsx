// projects/[id]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Github,
  ArrowLeft,
  ExternalLink,
  Users,
  Code,
  Calendar,
  Star,
} from "lucide-react";
import { data } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/magnetic-button";
import OptimizedScrollCard from "@/components/optimized-scroll-card";

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();

  const projectId = Number.parseInt(params.id as string);
  const project = data.projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-900/20 rounded-full flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Button
            onClick={() => router.push("/projects")}
            className="bg-white text-black hover:bg-white/90 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    // THEME FIX: Changed background to black
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/projects")}
            className="flex items-center space-x-2 hover:bg-gray-800 transition-colors rounded-full text-white"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Back to Projects</span>
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* TAGS FIX: Removed .slice() to show all tags and added animation */}
            {project.tags.map((tag, i) => (
              <div key={i} className="animate-in fade-in-0 slide-in-from-bottom-2" style={{ animationDelay: `${i * 50}ms` }}>
                <Badge
                  variant="default"
                  className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 transition-colors px-3 py-1 rounded-full"
                >
                  {tag}
                </Badge>
              </div>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Users size={18} className="text-gray-400" />
              <span className="font-medium">{project.contributors.length} Contributors</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={18} className="text-gray-400" />
              <span className="font-medium">Active Project</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={18} className="text-gray-400" />
              <span className="font-medium">Featured</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <OptimizedScrollCard className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl border border-gray-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <img
              src={project.imagePath || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-64 sm:h-80 md:h-[500px] object-cover"
            />
          </OptimizedScrollCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <OptimizedScrollCard>
              <Card className="border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm rounded-2xl h-full">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <div className="w-1 h-8 bg-white rounded-full mr-4"></div>
                    About This Project
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-gray-400 leading-relaxed">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            </OptimizedScrollCard>

            <div className="flex flex-col sm:flex-row gap-4">
              {project.githubLink && (
                <MagneticButton
                  onClick={() => window.open(project.githubLink, "_blank")}
                  className="flex-1 text-lg font-semibold flex items-center justify-center space-x-2 bg-white text-black hover:bg-gray-200 shadow-md transition-all duration-200 hover:shadow-lg px-6 py-4 rounded-full"
                >
                  <Github size={20} />
                  <span>View on GitHub</span>
                </MagneticButton>
              )}

              <MagneticButton
                onClick={() => router.push("/projects")}
                className="flex-1 text-lg font-semibold flex items-center justify-center space-x-2 border-2 border-gray-700 bg-transparent text-white hover:bg-gray-800 shadow-md transition-all duration-200 hover:shadow-lg px-6 py-4 rounded-full"
              >
                <span>View All Projects</span>
                <ExternalLink size={18} />
              </MagneticButton>
            </div>
          </div>

          <div className="space-y-6">
            <OptimizedScrollCard>
              <Card className="border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-200 rounded-2xl h-full">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    {/* THEME FIX: Technologies icon updated to B&W theme */}
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Code size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Technologies</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 transition-colors rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </OptimizedScrollCard>

            <OptimizedScrollCard>
              <Card className="border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-200 rounded-2xl h-full">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                     {/* THEME FIX: Contributors icon updated to B&W theme */}
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Users size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Contributors</h3>
                  </div>
                  <div className="space-y-3">
                    {project.contributors.map((contributor, i) => (
                      <div key={i} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-white">{contributor.charAt(0)}</span>
                        </div>
                        <div>
                          <span className="font-medium text-white">{contributor}</span>
                          <div className="text-xs text-gray-400">Developer</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </OptimizedScrollCard>
          </div>
        </div>
      </div>
    </div>
  );
}