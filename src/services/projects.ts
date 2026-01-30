import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/lib/projects-data';

export const fetchProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }

    // Map DB structure to Frontend Project interface
    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category,
        status: item.status,
        featured: item.featured,
        location: item.location,
        priceRange: item.price_range,
        ...item.details // Spread individual JSONB fields (images, amenities, etc.)
    }));
};

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        console.error('Error fetching project by slug:', error);
        throw error;
    }

    if (!data) return null;

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        featured: data.featured,
        location: data.location,
        priceRange: data.price_range,
        ...data.details
    };
};

export const createProject = async (project: Project): Promise<Project> => {
    // Separate top-level columns from JSONB details
    const {
        id, // let DB generate ID usually, or use if provided but ignore for new insert if UUID
        title,
        slug,
        category,
        status,
        featured,
        location,
        priceRange,
        ...details
    } = project;

    const { data, error } = await supabase
        .from('projects')
        .insert([
            {
                title,
                slug: slug || title.toLowerCase().replace(/ /g, '-'), // fallback slug gen
                category,
                status,
                featured,
                location,
                price_range: priceRange,
                details
            }
        ])
        .select()
        .single();

    if (error) throw error;

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        featured: data.featured,
        location: data.location,
        priceRange: data.price_range,
        ...data.details
    };
};

export const updateProject = async (project: Project): Promise<Project> => {
    const {
        id,
        title,
        slug,
        category,
        status,
        featured,
        location,
        priceRange,
        ...details
    } = project;

    const { data, error } = await supabase
        .from('projects')
        .update({
            title,
            slug,
            category,
            status,
            featured,
            location,
            price_range: priceRange,
            details
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        featured: data.featured,
        location: data.location,
        priceRange: data.price_range,
        ...data.details
    };
};

export const deleteProject = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

export const uploadProjectImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

export const seedProject = async (project: Project): Promise<Project> => {
    // Separate top-level columns from JSONB details
    const {
        id, // eslint-disable-next-line @typescript-eslint/no-unused-vars
        title,
        slug,
        category,
        status,
        featured,
        location,
        priceRange,
        ...details
    } = project;

    const { data, error } = await supabase
        .from('projects')
        .upsert([
            {
                title,
                slug: slug || title.toLowerCase().replace(/ /g, '-'), // fallback slug gen
                category,
                status,
                featured,
                location,
                price_range: priceRange,
                details
            }
        ], { onConflict: 'slug' })
        .select()
        .single();

    if (error) throw error;

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        featured: data.featured,
        location: data.location,
        priceRange: data.price_range,
        ...data.details
    };
};
