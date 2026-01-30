import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectListItem } from '@/components/projects/ProjectListItem';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { EmptyState } from '@/components/projects/EmptyState';
import { SkeletonCard, SkeletonList } from '@/components/projects/SkeletonCard';
import { Project } from '@/lib/projects-data';
import { fetchProjects } from '@/services/projects';
import { matchesBudget } from '@/lib/filter-utils';
import { useProjectStore } from '@/stores/useProjectStore';

export default function ProjectsPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const {
    projects,
    filteredProjects,
    filters,
    isLoading: isProjectLoading,
    fetchProjects,
    setFilter,
    clearFilters,
    filterProjects
  } = useProjectStore();

  const { category: selectedCategory, status: selectedStatus, budget: selectedBudget, location: selectedLocation, search: searchQuery } = filters;

  // Update logic to react to searchParams changes if navigation happens while on the page
  useEffect(() => {
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const budget = searchParams.get('budget');
    const location = searchParams.get('location');
    const search = searchParams.get('search');

    if (category) setFilter('category', category);
    if (status) setFilter('status', status);
    if (budget) setFilter('budget', budget);
    if (location) setFilter('location', location);
    if (search) setFilter('search', search);
  }, [searchParams, setFilter]);

  // Fetch projects from Supabase
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects based on current filters (Handled by store now)
  // Trigger filter when filters change is handled in store actions but we might need to ensure initialization
  useEffect(() => {
    filterProjects();
  }, [filters, projects, filterProjects]);

  // Separate featured projects for grid view
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  // Clear all filters


  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <Layout removeTopPadding={true}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-primary text-white">
          {/* Background gradient - Blend Blue effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary-light/50" />

          <div className="container mx-auto px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block text-sm font-medium tracking-wider uppercase text-accent mb-4">
                Our Portfolio
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Exceptional{' '}
                <span className="italic text-gradient-gold">Projects</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                Explore our collection of landmark developments, from luxury residences
                to iconic commercial spaces. Each project reflects our commitment to
                excellence and innovation.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/20"
            >
              {[
                { value: `${projects.length}+`, label: 'Projects' },
                { value: '150K+', label: 'Square Meters' },
                { value: '12+', label: 'Years Experience' },
                { value: '98%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="font-serif text-3xl md:text-4xl text-gradient-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-y border-border bg-card/30 sticky top-16 z-40 backdrop-blur-lg">
          <div className="container mx-auto px-6 lg:px-8">
            <ProjectFilters
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              selectedBudget={selectedBudget}
              selectedLocation={selectedLocation}
              searchQuery={searchQuery}
              viewMode={viewMode}
              onCategoryChange={(val) => setFilter('category', val)}
              onStatusChange={(val) => setFilter('status', val)}
              onBudgetChange={(val) => setFilter('budget', val)}
              onLocationChange={(val) => setFilter('location', val)}
              onSearchChange={(val) => setFilter('search', val)}
              onViewModeChange={setViewMode}
              resultCount={filteredProjects.length}
            />
          </div>
        </section>

        {/* Projects Grid/List */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            {isProjectLoading ? (
              // Skeleton Loading State
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SkeletonCard priority="high" />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonList key={i} />
                  ))}
                </div>
              )
            ) : filteredProjects.length === 0 ? (
              // Empty State
              <EmptyState searchQuery={searchQuery} onClear={clearFilters} />
            ) : viewMode === 'grid' ? (
              // Grid View - Featured projects span 2 columns
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Render featured projects first with priority */}
                {featuredProjects.slice(0, 1).map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} priority="high" />
                ))}

                {/* Regular projects */}
                {regularProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index + 1} />
                ))}

                {/* Remaining featured projects */}
                {featuredProjects.slice(1).map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={regularProjects.length + index + 1}
                  />
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredProjects.map((project, index) => (
                  <ProjectListItem key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>


      </Layout>
    </>
  );
}
