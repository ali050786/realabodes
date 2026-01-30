import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Home, FileText, ArrowRight, LayoutDashboard, Plus, Trash2, MapPin, DollarSign, Search, ArrowLeft, Database, Settings, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects as initialProjects, Project } from '@/lib/projects-data';
import { BlogPost, blogPosts as initialBlogPosts } from '@/lib/blog-data';
import { Toaster, toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PropertyEditor } from '@/components/admin/PropertyEditor';
import { BlogEditor } from '@/components/admin/BlogEditor';
import { SettingsView } from '@/components/admin/SettingsView';
import { MessagesView } from '@/components/admin/MessagesView';
// import { useAuth } from '@/context/AuthContext';
import { useAuthStore } from '@/stores/useAuthStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useBlogStore } from '@/stores/useBlogStore';

// ImplementationLog
// Date: 2026-01-29
// WHAT: Integrated Comprehensive Property Editor
// WHY: To allow full editing of property details including media, amenities, location, etc.
// HOW: Swapped basic Add Dialog with full-screen PropertyEditor component.

const AdminPage = () => {
    const { signOut } = useAuthStore();
    const {
        projects,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject
    } = useProjectStore();

    const {
        posts: blogs,
        fetchPosts: fetchBlogs,
        addPost,
        updatePost,
        deletePost
    } = useBlogStore();

    const [view, setView] = useState<'dashboard' | 'properties' | 'blogs' | 'editor' | 'blogEditor' | 'settings' | 'messages'>('dashboard');
    // Local state for filtered items in admin view might not be needed if we use store filters, 
    // but Admin search is local to Admin view. 
    // Let's keep search local and filter `projects` / `blogs` from store locally for admin view.

    // const [properties, setProperties] = useState<Project[]>([]); // Using store
    // const [blogs, setBlogs] = useState<BlogPost[]>([]); // Using store

    const [searchQuery, setSearchQuery] = useState('');
    const [editingProperty, setEditingProperty] = useState<Project | undefined>(undefined);
    const [editingBlog, setEditingBlog] = useState<BlogPost | undefined>(undefined);
    const [isLocalLoading, setIsLocalLoading] = useState(true);

    // Fetch projects and blogs on load
    React.useEffect(() => {
        const loadData = async () => {
            await Promise.all([fetchProjects(), fetchBlogs()]);
            setIsLocalLoading(false);
        };
        loadData();
    }, [fetchProjects, fetchBlogs]);

    const handleDelete = async (id: string) => {
        try {
            await deleteProject(id);
            toast.success('Property deleted successfully');
        } catch (error) {
            toast.error('Failed to delete property');
        }
    };

    const handleDeleteBlog = async (id: string) => {
        try {
            await deletePost(id);
            toast.success('Blog post deleted successfully');
        } catch (error) {
            toast.error('Failed to delete blog post');
        }
    };

    const handleSaveProperty = async (property: Project) => {
        try {
            if (editingProperty) {
                // Update existing
                await updateProject(property);
                toast.success('Property updated successfully');
            } else {
                // Add new
                await addProject(property);
                toast.success('Property added successfully');
            }
            setView('properties');
            setEditingProperty(undefined);
        } catch (error) {
            console.error(error);
            toast.error('Failed to save property. Check console.');
        }
    };

    const handleSaveBlog = async (blog: BlogPost) => {
        try {
            if (editingBlog) {
                // Update existing
                await updatePost(blog);
                toast.success('Blog post updated successfully');
            } else {
                // Add new
                await addPost(blog);
                toast.success('Blog post created successfully');
            }
            setView('blogs');
            setEditingBlog(undefined);
        } catch (error) {
            console.error(error);
            toast.error('Failed to save blog post. Check console.');
        }
    };

    const handleSeed = async () => {
        if (!confirm('This will upload all demo projects to the database. Continue?')) return;

        setIsLocalLoading(true);
        try {
            const { seedProject } = await import('@/services/projects');
            const { projects: staticProjects } = await import('@/lib/projects-data');
            let count = 0;
            for (const p of staticProjects) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, ...projectData } = p;
                await seedProject(projectData as unknown as Project);
                count++;
            }
            toast.success(`Successfully seeded/updated ${count} projects`);

            // Reload store
            await fetchProjects();
        } catch (error) {
            console.error(error);
            toast.error('Failed to seed database');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSeedBlogs = async () => {
        if (!confirm('This will upload all demo blog posts to the database. Continue?')) return;

        setIsLocalLoading(true);
        try {
            const { seedBlog } = await import('@/services/blog');
            const { blogPosts: staticPosts } = await import('@/lib/blog-data');
            let count = 0;
            for (const p of staticPosts) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, ...blogData } = p;
                await seedBlog(blogData as unknown as BlogPost);
                count++;
            }
            toast.success(`Successfully seeded/updated ${count} blog posts`);

            // Reload store
            await fetchBlogs();
        } catch (error) {
            console.error(error);
            toast.error('Failed to seed blogs database');
        } finally {
            setIsLoading(false);
        }
    };

    const openEditor = (property?: Project) => {
        setEditingProperty(property);
        setView('editor');
    };

    const openBlogEditor = (blog?: BlogPost) => {
        setEditingBlog(blog);
        setView('blogEditor');
    };

    const DashboardView = () => (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Manage Properties Card */}
            <Card
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group cursor-pointer"
                onClick={() => setView('properties')}
            >
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Home className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Manage Properties</CardTitle>
                    <CardDescription>Add, edit, or remove property listings.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                    <Button className="group-hover:bg-blue-600 transition-colors">
                        Go to Properties <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </CardContent>
            </Card>

            {/* Manage Blogs Card */}
            <Card
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-amber-500/20 group cursor-pointer"
                onClick={() => setView('blogs')}
            >
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-8 h-8 text-amber-600" />
                    </div>
                    <CardTitle className="text-2xl">Manage Blogs</CardTitle>
                    <CardDescription>Create and publish new blog posts.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                    <Button variant="outline" className="border-amber-200 hover:bg-amber-50 text-amber-700 hover:text-amber-800 group-hover:bg-amber-600 group-hover:text-white group-hover:border-transparent transition-all">
                        Go to Blogs <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </CardContent>
            </Card>

            {/* Inquiries Card */}
            <Card
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-violet-500/20 group cursor-pointer"
                onClick={() => setView('messages')}
            >
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-8 h-8 text-violet-600" />
                    </div>
                    <CardTitle className="text-2xl">Inquiries</CardTitle>
                    <CardDescription>View messages from contact form.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                    <Button variant="outline" className="border-violet-200 hover:bg-violet-50 text-violet-700 hover:text-violet-800 group-hover:bg-violet-600 group-hover:text-white group-hover:border-transparent transition-all">
                        View Messages <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </CardContent>
            </Card>

            {/* Settings Card */}
            <Card
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-slate-500/20 group cursor-pointer"
                onClick={() => setView('settings')}
            >
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Settings className="w-8 h-8 text-slate-600" />
                    </div>
                    <CardTitle className="text-2xl">Settings</CardTitle>
                    <CardDescription>Configure site settings and emails.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                    <Button variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-800 group-hover:bg-slate-600 group-hover:text-white group-hover:border-transparent transition-all">
                        Configure <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

    const PropertiesView = () => {
        const filteredProperties = projects.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => setView('dashboard')}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Properties</h2>
                            <p className="text-muted-foreground">Manage your real estate listings.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search properties..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="gap-2" onClick={() => openEditor()}>
                            <Plus className="w-4 h-4" /> Add Property
                        </Button>
                        <Button variant="outline" className="gap-2" onClick={handleSeed} title="Seed Database with Demo Data">
                            <Database className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                        <Card key={property.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={property.thumbnail}
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-medium">
                                    {property.category}
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg line-clamp-1">{property.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1 line-clamp-1">
                                    <MapPin className="w-3 h-3" /> {property.location}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-semibold text-primary flex items-center gap-1">
                                        <DollarSign className="w-3 h-3" /> {property.priceRange || 'Price on Request'}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1 text-xs h-8" onClick={() => openEditor(property)}>
                                        Edit
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Property?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete "{property.title}"? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    onClick={() => handleDelete(property.id)}
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {filteredProperties.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed">
                        <p className="text-muted-foreground">No properties found matching your search.</p>
                    </div>
                )}
            </div>
        );
    };

    const BlogsView = () => {
        const filteredBlogs = blogs.filter(b =>
            b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.author.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => setView('dashboard')}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Blogs</h2>
                            <p className="text-muted-foreground">Manage your articles and posts.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search blogs..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="gap-2 bg-amber-600 hover:bg-amber-700" onClick={() => openBlogEditor()}>
                            <Plus className="w-4 h-4" /> New Post
                        </Button>
                        <Button variant="outline" className="gap-2" onClick={handleSeedBlogs} title="Seed Database with Demo Blogs">
                            <Database className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog) => (
                        <Card key={blog.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <span className="bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-medium">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg line-clamp-1">{blog.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1 line-clamp-1">
                                    By {blog.author} • {blog.date}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs px-2 py-1 rounded-full ${blog.published ?? true ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {blog.published ?? true ? 'Published' : 'Draft'}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {blog.readTime}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1 text-xs h-8" onClick={() => openBlogEditor(blog)}>
                                        Edit
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Blog Post?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    onClick={() => handleDeleteBlog(blog.id)}
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {filteredBlogs.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed">
                        <p className="text-muted-foreground">No blog posts found matching your search.</p>
                    </div>
                )}
            </div>
        );
    };

    if (view === 'editor') {
        return (
            <div className="min-h-screen bg-gray-50/50 p-6">
                <PropertyEditor
                    property={editingProperty}
                    onSave={handleSaveProperty}
                    onCancel={() => setView('properties')}
                />
            </div>
        );
    }

    if (view === 'blogEditor') {
        return (
            <div className="min-h-screen bg-gray-50/50 p-6">
                <BlogEditor
                    blog={editingBlog}
                    onSave={handleSaveBlog}
                    onCancel={() => setView('blogs')}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Top Navigation */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/admin" className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <LayoutDashboard className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild>
                            <Link to="/">Exit to Homepage</Link>
                        </Button>
                        <Button variant="destructive" onClick={signOut}>
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {view === 'dashboard' ? (
                    <>
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                            <p className="text-muted-foreground mt-2 text-lg">Select a section to manage.</p>
                        </div>
                        <DashboardView />
                    </>
                ) : view === 'properties' ? (
                    <PropertiesView />
                ) : view === 'blogs' ? (
                    <BlogsView />
                ) : view === 'messages' ? (
                    <MessagesView onBack={() => setView('dashboard')} />
                ) : view === 'settings' ? (
                    <SettingsView onBack={() => setView('dashboard')} />
                ) : null}
            </main>
        </div>
    );
};

export default AdminPage;
