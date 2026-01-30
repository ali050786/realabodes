import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts as staticPosts, BlogPost } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout/Layout";
import { Preloader } from "@/components/ui/Preloader";
import { fetchBlogs } from "@/services/blog";
import { useBlogStore } from "@/stores/useBlogStore";

const BlogDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { posts, isLoading, fetchPosts: fetchBlogs } = useBlogStore();

    // We can use local state for the *specific* post, or derive it from posts. 
    // Deriving is better to ensure reactivity if store updates.
    // However, if we refresh the page, posts might be empty initially.

    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [showPreloader, setShowPreloader] = useState(true);

    const post = posts.find(p => p.slug === slug);
    // If post not found in store, we might need to fetch (useEffect handles this)

    useEffect(() => {
        const loadData = async () => {
            // Ensure posts are loaded
            if (posts.length === 0) {
                await fetchBlogs();
            }
        };
        loadData();
    }, [posts.length, fetchBlogs]);

    // Calculate related posts when post changes
    useEffect(() => {
        if (post && posts.length > 0) {
            const related = posts
                .filter(p => p.category === post.category && p.slug !== post.slug && p.published !== false)
                .slice(0, 2);
            setRelatedPosts(related);
        }
    }, [post, posts]);

    if (isLoading) {
        return (
            <Layout removeTopPadding={true}>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout removeTopPadding={true}>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Article not found</h1>
                    <Button onClick={() => navigate("/blog")}>Back to Journal</Button>
                </div>
            </Layout>
        );
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
            </AnimatePresence>
            <Layout removeTopPadding={true}>
                <article className="min-h-screen bg-background pb-20">
                    {/* Hero Image */}
                    <div className="relative h-[60vh] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-black/30 z-10" />
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24 z-20 max-w-5xl mx-auto w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal
                                </Link>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground border-none">
                                        {post.category}
                                    </Badge>
                                    <span className="inline-flex items-center text-white/90 text-sm backdrop-blur-sm bg-black/20 px-3 py-0.5 rounded-full">
                                        <Clock className="w-3 h-3 mr-1.5" /> {post.readTime}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                                    {post.title}
                                </h1>
                                <div className="flex items-center gap-4 text-white/90">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 mr-3 flex items-center justify-center text-slate-800 font-bold">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span className="font-medium">{post.author}</span>
                                    </div>
                                    <span className="text-white/50">•</span>
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" /> {post.date}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="container mx-auto px-6 lg:px-8 mt-16">
                        <div className="max-w-5xl mx-auto">
                            {/* Content Body */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                            prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground 
                            prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-10 prose-h1:mt-12
                            prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8
                            prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-16 prose-h3:mb-6
                            prose-h4:text-xl md:prose-h4:text-2xl prose-h4:mt-12 prose-h4:mb-6
                            prose-p:leading-relaxed prose-p:mb-10 prose-p:text-lg text-gray-700
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-10 prose-li:mb-4 prose-li:marker:text-primary
                            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-10
                            prose-img:rounded-xl prose-img:shadow-lg prose-img:my-12
                            hover:prose-a:text-primary transition-colors"
                            >
                                {/* This is a simple way to render the HTML content. In production, use a sanitizer. */}
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </motion.div>
                        </div>

                        {/* Tags & Share */}
                        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="px-3 py-1 text-sm text-muted-foreground">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                            <Button variant="outline" className="gap-2">
                                <Share2 className="w-4 h-4" /> Share Article
                            </Button>
                        </div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div className="mt-24">
                                <h3 className="text-2xl font-serif font-bold mb-8">Related Articles</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {relatedPosts.map((related) => (
                                        <Link key={related.id} to={`/blog/${related.slug}`} className="group block">
                                            <div className="relative h-64 overflow-hidden rounded-xl mb-4">
                                                <img
                                                    src={related.coverImage}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground mb-2">
                                                <span className="text-primary font-medium">{related.category}</span>
                                                <span className="mx-2">•</span>
                                                <span>{related.readTime}</span>
                                            </div>
                                            <h4 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                                                {related.title}
                                            </h4>
                                            <div className="flex items-center text-primary text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                                Read Now <ArrowRight className="ml-1 w-3 h-3" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </Layout>
        </>
    );
};

export default BlogDetailPage;
