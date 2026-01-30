
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/lib/projects-data';

export function useFeaturedProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('featured', true)
                    .limit(3);

                if (error) throw error;

                // Map Supabase data to Project interface if necessary
                // Assuming schema matches for now, but handling potential discrepancies
                const mappedProjects: Project[] = (data || []).map((p: any) => ({
                    ...p,
                    priceRange: p.price_range || p.details?.priceRange,
                    subtitle: p.subtitle || p.details?.subtitle,
                    // Ensure thumbnail exists, fallback if necessary
                    thumbnail: p.thumbnail || p.details?.thumbnail || 'https://placehold.co/600x800',
                    // Default other required fields if missing in DB
                    images: p.images || [],
                    metrics: p.metrics || [],
                    phases: p.phases || [],
                    tags: p.tags || [],
                    highlights: p.highlights || [],
                    amenities: p.amenities || [],
                    proximity: p.proximity || [],
                    floorPlans: p.floorPlans || [],
                    specifications: p.specifications || [],
                    faqs: p.faqs || [],
                    relatedProjects: p.relatedProjects || []
                }));

                setProjects(mappedProjects);
            } catch (err: any) {
                console.error('Error fetching featured projects:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return { projects, loading, error };
}
