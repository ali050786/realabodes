import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, Clock } from 'lucide-react';
import { Project } from '@/lib/projects-data';
import { Badge } from '@/components/ui/badge';

interface ProjectListItemProps {
  project: Project;
  index: number;
}

export function ProjectListItem({ project, index }: ProjectListItemProps) {
  const statusColors = {
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planning: 'Planning',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group flex flex-col md:flex-row gap-6 p-4 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
        aria-label={`View ${project.title} project details`}
      >
        {/* Thumbnail */}
        <div className="relative w-full md:w-64 lg:w-80 flex-shrink-0 aspect-[16/10] md:aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div className="space-y-3">
            {/* Top Row: Category & Status */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium tracking-wider uppercase text-primary">
                {project.category}
              </span>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
              {project.featured && (
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gradient-gold text-primary-foreground">
                  Featured
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 italic font-serif">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {project.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bottom Row: Meta & CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {project.duration}
              </span>
            </div>

            <span className="flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
              View Project
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
