import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { Project } from '@/lib/projects-data';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
  index: number;
  priority?: 'high' | 'normal';
}

export function ProjectCard({ project, index, priority = 'normal' }: ProjectCardProps) {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group ${priority === 'high' ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <Link 
        to={`/project/${project.slug}`}
        className="block h-full"
        aria-label={`View ${project.title} project details`}
      >
        <div className="relative h-full bg-gradient-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg">
          {/* Image Container with Overlay */}
          <div className={`relative overflow-hidden ${priority === 'high' ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
            <img
              src={project.thumbnail}
              alt={`${project.title} - ${project.subtitle}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-gold text-primary-foreground">
                  Featured
                </span>
              </div>
            )}

            {/* Hover Arrow */}
            <motion.div
              initial={{ opacity: 0, x: -10, y: 10 }}
              whileHover={{ opacity: 1, x: 0, y: 0 }}
              className="absolute bottom-4 right-4 p-3 bg-primary rounded-full text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Category */}
            <span className="text-xs font-medium tracking-wider uppercase text-primary">
              {project.category}
            </span>

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

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {project.location.split(',')[0]}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            </div>

            {/* Tags - Show first 3 */}
            {priority === 'high' && (
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
