
import { create } from 'zustand';
import { Project } from '@/lib/projects-data';
import { fetchProjects, fetchProjectBySlug, createProject, updateProject, deleteProject } from '@/services/projects';
import { matchesBudget } from '@/lib/filter-utils';

interface ProjectState {
    projects: Project[];
    filteredProjects: Project[];
    selectedProject: Project | null;
    isLoading: boolean;
    error: string | null;

    // Filters
    filters: {
        category: string;
        status: string;
        budget: string;
        location: string;
        search: string;
    };

    // Actions
    fetchProjects: () => Promise<void>;
    fetchProjectBySlug: (slug: string) => Promise<void>;
    setFilter: (key: keyof ProjectState['filters'], value: string) => void;
    clearFilters: () => void;
    filterProjects: () => void;
    addProject: (project: Project) => Promise<void>;
    updateProject: (project: Project) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    filteredProjects: [],
    selectedProject: null,
    isLoading: false,
    error: null,

    filters: {
        category: 'All Projects',
        status: 'All Status',
        budget: 'All Budgets',
        location: 'All Locations',
        search: '',
    },

    fetchProjects: async () => {
        set({ isLoading: true, error: null });
        try {
            const projects = await fetchProjects();
            set({ projects, isLoading: false });
            get().filterProjects(); // Apply existing filters to new data
        } catch (error) {
            console.error('Failed to fetch projects', error);
            set({ error: 'Failed to fetch projects', isLoading: false });
        }
    },

    fetchProjectBySlug: async (slug: string) => {
        set({ isLoading: true, error: null, selectedProject: null });
        try {
            const project = await fetchProjectBySlug(slug);
            set({ selectedProject: project, isLoading: false });
        } catch (error) {
            console.error('Failed to fetch project details', error);
            set({ error: 'Failed to fetch project details', isLoading: false });
        }
    },

    setFilter: (key, value) => {
        set((state) => ({
            filters: { ...state.filters, [key]: value }
        }));
        get().filterProjects();
    },

    clearFilters: () => {
        set({
            filters: {
                category: 'All Projects',
                status: 'All Status',
                budget: 'All Budgets',
                location: 'All Locations',
                search: '',
            }
        });
        get().filterProjects();
    },

    filterProjects: () => {
        const { projects, filters } = get();
        const { category, status, budget, location, search } = filters;

        const filtered = projects.filter(project => {
            const matchesCategory = category === 'All Projects' || project.category === category;

            const matchesStatus = status === 'All Status' ||
                (status === 'Completed' && project.status === 'completed') ||
                (status === 'In Progress' && project.status === 'in-progress') ||
                (status === 'Planning' && project.status === 'planning');

            const matchesLocation = location === 'All Locations' || project.location.includes(location);

            const matchesBudgetRange = matchesBudget(project, budget);

            const matchesSearch = search === '' ||
                project.title.toLowerCase().includes(search.toLowerCase()) ||
                project.location.toLowerCase().includes(search.toLowerCase()) ||
                project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

            return matchesCategory && matchesStatus && matchesLocation && matchesBudgetRange && matchesSearch;
        });

        set({ filteredProjects: filtered });
    },

    addProject: async (project: Project) => {
        set({ isLoading: true, error: null });
        try {
            const newProject = await createProject(project);
            set(state => ({
                projects: [newProject, ...state.projects],
                isLoading: false
            }));
            get().filterProjects();
        } catch (error) {
            console.error('Failed to add project', error);
            set({ error: 'Failed to add project', isLoading: false });
            throw error;
        }
    },

    updateProject: async (project: Project) => {
        set({ isLoading: true, error: null });
        try {
            const updated = await updateProject(project);
            set(state => ({
                projects: state.projects.map(p => p.id === project.id ? updated : p),
                isLoading: false
            }));
            get().filterProjects();
        } catch (error) {
            console.error('Failed to update project', error);
            set({ error: 'Failed to update project', isLoading: false });
            throw error;
        }
    },

    deleteProject: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await deleteProject(id);
            set(state => ({
                projects: state.projects.filter(p => p.id !== id),
                isLoading: false
            }));
            get().filterProjects();
        } catch (error) {
            console.error('Failed to delete project', error);
            set({ error: 'Failed to delete project', isLoading: false });
            throw error;
        }
    },
}));
