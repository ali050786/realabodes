
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/lib/blog-data';

// ImplementationLog
// Date: 2026-01-29
// WHAT: Created blog service
// WHY: To handle CRUD operations for blog posts against Supabase
// HOW: Using Supabase JS client

export const fetchBlogs = async (): Promise<BlogPost[]> => {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }

        // Map database fields to BlogPost interface if needed (Snake_case to camelCase is handled if we align them, 
        // but here we used camelCase in DB schema creation script? 
        // Wait, SQL usually defaults to lowercase. Let's check the schema I wrote.
        // Schema used snake_case for `cover_image`, `read_time`.
        // Interface uses camelCase. We need to map.

        return (data || []).map(item => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            excerpt: item.excerpt,
            content: item.content,
            coverImage: item.cover_image, // Map snake_case to camelCase
            date: item.date,
            author: item.author,
            category: item.category,
            tags: item.tags || [],
            readTime: item.read_time, // Map snake_case to camelCase
            published: item.published
        }));
    } catch (err) {
        console.error('Unexpected error fetching blogs:', err);
        return [];
    }
};

export const fetchBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error(`Error fetching blog with slug ${slug}:`, error);
            return null;
        }

        if (!data) return null;

        return {
            id: data.id,
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            coverImage: data.cover_image,
            date: data.date,
            author: data.author,
            category: data.category,
            tags: data.tags || [],
            readTime: data.read_time,
            published: data.published
        };
    } catch (err) {
        console.error(`Unexpected error fetching blog ${slug}:`, err);
        return null;
    }
};

export const createBlog = async (blog: Omit<BlogPost, 'id'>): Promise<BlogPost | null> => {
    try {
        const dbPayload = {
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            cover_image: blog.coverImage,
            date: blog.date,
            author: blog.author,
            category: blog.category,
            tags: blog.tags,
            read_time: blog.readTime,
            published: blog.published || false
        };

        const { data, error } = await supabase
            .from('blogs')
            .insert([dbPayload])
            .select()
            .single();

        if (error) {
            console.error('Error creating blog:', error);
            throw error;
        }

        return {
            id: data.id,
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            coverImage: data.cover_image,
            date: data.date,
            author: data.author,
            category: data.category,
            tags: data.tags || [],
            readTime: data.read_time,
            published: data.published
        };
    } catch (err) {
        console.error('Unexpected error creating blog:', err);
        throw err;
    }
};

export const updateBlog = async (blog: BlogPost): Promise<BlogPost | null> => {
    try {
        const dbPayload = {
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            cover_image: blog.coverImage,
            date: blog.date,
            author: blog.author,
            category: blog.category,
            tags: blog.tags,
            read_time: blog.readTime,
            published: blog.published,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('blogs')
            .update(dbPayload)
            .eq('id', blog.id)
            .select()
            .single();

        if (error) {
            console.error('Error updating blog:', error);
            throw error;
        }

        return {
            id: data.id,
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            coverImage: data.cover_image,
            date: data.date,
            author: data.author,
            category: data.category,
            tags: data.tags || [],
            readTime: data.read_time,
            published: data.published
        };
    } catch (err) {
        console.error('Unexpected error updating blog:', err);
        throw err;
    }
};

export const deleteBlog = async (id: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting blog:', error);
            throw error;
        }

        return true;
    } catch (err) {
        console.error('Unexpected error deleting blog:', err);
        throw err;
    }
};

export const seedBlog = async (blog: Omit<BlogPost, 'id'>): Promise<void> => {
    // Check if exists by slug
    const existing = await fetchBlogBySlug(blog.slug);
    if (existing) {
        // Update
        await updateBlog({ ...blog, id: existing.id } as BlogPost);
    } else {
    }
};

export const uploadBlogImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

    return data.publicUrl;
};
