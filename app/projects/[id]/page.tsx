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

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();

  const projectId = Number.parseInt(params.id as string);
  const project = data.projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Button
            onClick={() => router.push("/projects")}
            className="bg-primary hover:bg-primary/90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/projects")}
            className="flex items-center space-x-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Back to Projects</span>
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {project.tags.slice(0, 3).map((tag, i) => (
              <Badge
                key={i}
                variant="default"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge
                variant="outline"
                className="border-slate-300 dark:border-slate-600"
              >
                +{project.tags.length - 3} more
              </Badge>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold  mb-6 leading-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Users size={18} className="text-primary" />
              <span className="font-medium">
                {project.contributors.length} Contributors
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={18} className="text-primary" />
              <span className="font-medium">Active Project</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={18} className="text-primary" />
              <span className="font-medium">Featured</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <img
              src={
                project.imagePath ||
                "/placeholder.svg?height=500&width=1000&query=modern tech project showcase" ||
                "/placeholder.svg"
              }
              alt={project.title}
              className="w-full h-64 sm:h-80 md:h-[500px] object-cover"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-slate-200 dark:border-slate-700 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <div className="w-1 h-8 bg-primary rounded-full mr-4"></div>
                  About This Project
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              {project.githubLink && (
                <Button
                  onClick={() => window.open(project.githubLink, "_blank")}
                  className="flex items-center justify-center space-x-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-md transition-all duration-200 hover:shadow-lg px-6 py-3"
                  size="lg"
                >
                  <Github size={20} />
                  <span className="font-medium">View on GitHub</span>
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => router.push("/projects")}
                className="flex items-center justify-center space-x-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-md transition-all duration-200 hover:shadow-lg px-6 py-3"
                size="lg"
              >
                <span className="font-medium">View All Projects</span>
                <ExternalLink size={18} />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Technologies Card */}
            <Card className="border-slate-200 dark:border-slate-700 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Code size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground">
                    Technologies
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contributors Card */}
            <Card className="border-slate-200 dark:border-slate-700 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground">
                    Contributors
                  </h3>
                </div>
                <div className="space-y-3">
                  {project.contributors.map((contributor, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-sm font-bold text-white">
                          {contributor.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-card-foreground">
                          {contributor}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          Developer
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
