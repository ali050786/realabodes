import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts as staticPosts, uniqueCategories as staticCategories, BlogPost } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { Preloader } from "@/components/ui/Preloader";
import { useBlogStore } from "@/stores/useBlogStore";


const BlogListPage = () => {
    const {
        posts,
        filteredPosts,
        categories,
        isLoading,
        fetchPosts: fetchBlogs,
        filters,
        setFilter
    } = useBlogStore();

    // We can keep local loading state for Preloader if we want to differentiate initial load vs re-fetches
    // But usually store's isLoading is enough.
    // The existing component uses `loading` for Preloader and `isLoading` for data.
    // Let's use local state for Preloader to show it only on initial mount.
    const [preloaderVisible, setPreloaderVisible] = useState(true);

    const { category: selectedCategory, search: searchQuery } = filters;

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    // Filter logic is now in the store (filteredPosts)

    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    const remainingPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

    return (
        <>
            <AnimatePresence mode="wait">
                {preloaderVisible && <Preloader onComplete={() => setPreloaderVisible(false)} />}
            </AnimatePresence>
            <Layout removeTopPadding={true}>
                {/* Header Section */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-primary text-white">
                    {/* Background gradient - Blend Blue effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary-light/50" />

                    <div className="container mx-auto px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <span className="inline-block text-sm font-medium tracking-wider uppercase text-accent mb-4">
                                Our Journal
                            </span>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                                Insights on <span className="italic text-gradient-gold">Luxury Living</span>
                            </h1>
                            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                                Explore trends, design philosophies, and the art of premium real estate.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="min-h-screen bg-background pb-20 px-6 md:px-12 lg:px-24 pt-12">

                    {/* Filter & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 max-w-7xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button
                                variant={selectedCategory === "All" ? "default" : "outline"}
                                onClick={() => setFilter('category', "All")}
                                className="rounded-full"
                            >
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    onClick={() => setFilter('category', category)}
                                    className="rounded-full"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search articles..."
                                className="pl-10 rounded-full bg-card"
                                value={searchQuery}
                                onChange={(e) => setFilter('search', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="max-w-7xl mx-auto space-y-16">

                        {/* Featured Post */}
                        {featuredPost && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="relative h-64 md:h-auto overflow-hidden">
                                        <img
                                            src={featuredPost.coverImage}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
                                                Featured
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                            <span>{featuredPost.date}</span>
                                            <span>•</span>
                                            <span>{featuredPost.category}</span>
                                        </div>
                                        <h2 className="text-3xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                                            <Link to={`/blog/${featuredPost.slug}`}>
                                                {featuredPost.title}
                                            </Link>
                                        </h2>
                                        <p className="text-muted-foreground mb-6 line-clamp-3">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-sm font-medium text-foreground">
                                                By {featuredPost.author}
                                            </div>
                                            <Link to={`/blog/${featuredPost.slug}`}>
                                                <Button variant="ghost" className="group/btn p-0 hover:bg-transparent">
                                                    Read Article
                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Post Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {remainingPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                    className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Link to={`/blog/${post.slug}`}>
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </Link>
                                        <div className="absolute top-3 left-3">
                                            <Badge variant="secondary" className="backdrop-blur-md bg-background/70">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                            <Clock className="w-3 h-3" /> {post.readTime}
                                        </div>
                                        <h3 className="text-xl font-serif font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                            <Link to={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <Link to={`/blog/${post.slug}`} className="mt-auto">
                                            <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read more <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {remainingPosts.length === 0 && !featuredPost && (
                            <div className="text-center py-20 text-muted-foreground">
                                No articles found matching your criteria.
                            </div>
                        )}

                    </div>
                </div>
            </Layout>
        </>
    );
};

export default BlogListPage;
