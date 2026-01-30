
import { create } from 'zustand';
import { BlogPost, blogPosts as staticPosts, uniqueCategories as staticCategories } from '@/lib/blog-data';
import { fetchBlogs, fetchBlogBySlug, createBlog, updateBlog, deleteBlog } from '@/services/blog';

interface BlogState {
    posts: BlogPost[];
    filteredPosts: BlogPost[];
    categories: string[];
    selectedPost: BlogPost | null;
    isLoading: boolean;
    error: string | null;

    // Filters
    filters: {
        category: string;
        search: string;
    };

    // Actions
    fetchPosts: () => Promise<void>;
    fetchPostBySlug: (slug: string) => Promise<void>;
    setFilter: (key: keyof BlogState['filters'], value: string) => void;
    clearFilters: () => void;
    addPost: (post: BlogPost) => Promise<void>;
    updatePost: (post: BlogPost) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
    posts: [],
    filteredPosts: [],
    categories: [],
    selectedPost: null,
    isLoading: false,
    error: null,

    filters: {
        category: 'All',
        search: '',
    },

    fetchPosts: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await fetchBlogs();
            let postsToCheck = data;

            // Fallback to static data if fetch returns empty (based on current implementation logic)
            // or if error happens (handled in catch).
            // The service already returns empty array on error, so we can check length.
            if (data.length === 0) {
                // If no data from DB, load static data? 
                // Current Page logic loads static data if fetch returns empty/error.
                postsToCheck = staticPosts;
            }

            const publishedPosts = postsToCheck.filter(p => p.published !== false);
            const uniqueCats = Array.from(new Set(postsToCheck.map(post => post.category).filter(Boolean)));

            // Using simpler logic: DB data priority, fallback to static if empty array returned.
            // Note: If DB has 0 posts intentionally, this logic might need adjustment, but mirroring current behavior.

            set({
                posts: publishedPosts,
                categories: uniqueCats,
                isLoading: false
            });

            // Apply filters initially
            get().setFilter('category', 'All');

        } catch (error) {
            console.error('Failed to fetch blogs', error);
            // Fallback to static
            set({
                posts: staticPosts,
                categories: staticCategories,
                isLoading: false,
                error: 'Failed to fetch blogs, using static data'
            });
            get().setFilter('category', 'All');
        }
    },

    fetchPostBySlug: async (slug: string) => {
        set({ isLoading: true, error: null, selectedPost: null });
        try {
            // Try fetching from Supabase first
            const post = await fetchBlogBySlug(slug);

            if (post) {
                set({ selectedPost: post, isLoading: false });
            } else {
                // Fallback to static search if not found in DB (mirroring potential hybrid behavior or just safety)
                const staticPost = staticPosts.find(p => p.slug === slug);
                if (staticPost) {
                    set({ selectedPost: staticPost, isLoading: false });
                } else {
                    set({ error: 'Post not found', isLoading: false });
                }
            }
        } catch (error) {
            console.error('Failed to fetch blog post', error);
            // Fallback search
            const staticPost = staticPosts.find(p => p.slug === slug);
            if (staticPost) {
                set({ selectedPost: staticPost, isLoading: false });
            } else {
                set({ error: 'Failed to fetch blog post', isLoading: false });
            }
        }
    },

    setFilter: (key, value) => {
        set((state) => {
            const newFilters = { ...state.filters, [key]: value };
            const { posts } = state;
            const { category, search } = newFilters;

            const filtered = posts.filter((post) => {
                const matchesCategory = category === 'All' || post.category === category;
                const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                    post.excerpt.toLowerCase().includes(search.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            return {
                filters: newFilters,
                filteredPosts: filtered
            };
        });
    },

    clearFilters: () => {
        get().setFilter('category', 'All');
        get().setFilter('search', '');
    },

    addPost: async (post: BlogPost) => {
        set({ isLoading: true, error: null });
        try {
            const newPost = await createBlog(post);
            if (newPost) {
                set(state => ({
                    posts: [newPost, ...state.posts],
                    isLoading: false
                }));
                // Re-apply filter? Handled by setFilter logic but 'filteredPosts' needs update.
                // We should probably just re-run setFilter with current values but setFilter updates state...
                // Or make a filterPosts internal function like in ProjectStore.
                // For simplicity, let's just manually update filteredPosts or call setFilter with current value.
                // Simpler: Just rely on next render or force update? Zustand doesn't auto-derive.
                // Let's copy setFilter logic or extracting it.
                // Actually, let's just trigger a filter update by resetting filter to itself?
                const { filters } = get();
                get().setFilter('category', filters.category);
            }
        } catch (error) {
            console.error('Failed to add blog post', error);
            set({ error: 'Failed to add blog post', isLoading: false });
            throw error;
        }
    },

    updatePost: async (post: BlogPost) => {
        set({ isLoading: true, error: null });
        try {
            const updated = await updateBlog(post);
            if (updated) {
                set(state => ({
                    posts: state.posts.map(p => p.id === post.id ? updated : p),
                    isLoading: false
                }));
                const { filters } = get();
                get().setFilter('category', filters.category);
            }
        } catch (error) {
            console.error('Failed to update blog post', error);
            set({ error: 'Failed to update blog post', isLoading: false });
            throw error;
        }
    },

    deletePost: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await deleteBlog(id);
            set(state => ({
                posts: state.posts.filter(p => p.id !== id),
                isLoading: false
            }));
            const { filters } = get();
            get().setFilter('category', filters.category);
        } catch (error) {
            console.error('Failed to delete blog post', error);
            set({ error: 'Failed to delete blog post', isLoading: false });
            throw error;
        }
    },
}));
