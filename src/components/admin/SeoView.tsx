import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Globe, FileText, CheckCircle2, AlertCircle, Search, ExternalLink } from 'lucide-react';
import { fetchSiteSettings, updateSiteSetting } from '@/services/settings';
import { toast } from 'sonner';

interface SeoViewProps {
    onBack: () => void;
}

// The pages we manage SEO for
interface SeoPage {
    key: string;          // settings key prefix, e.g. "seo_home"
    label: string;        // display name
    path: string;         // URL path on the site
    icon: React.ReactNode;
}

const SEO_PAGES: SeoPage[] = [
    { key: 'seo_home', label: 'Home Page', path: '/', icon: <Globe className="w-4 h-4" /> },
    { key: 'seo_projects', label: 'Projects / Properties', path: '/projects', icon: <FileText className="w-4 h-4" /> },
    { key: 'seo_about', label: 'About Us', path: '/about', icon: <FileText className="w-4 h-4" /> },
    { key: 'seo_contact', label: 'Contact', path: '/contact', icon: <FileText className="w-4 h-4" /> },
    { key: 'seo_blog', label: 'Blog', path: '/blog', icon: <FileText className="w-4 h-4" /> },
];

interface SeoFields {
    title: string;
    description: string;
    keywords: string;
}

const DEFAULT_SEO: Record<string, SeoFields> = {
    seo_home: {
        title: 'Best Real Estate Agent in Pimpri Chinchwad, PCMC',
        description: "Real Abodes is Pimpri Chinchwad's most trusted real estate agent. Explore premium residential & commercial properties in PCMC, Pune.",
        keywords: 'real estate Pimpri Chinchwad, property in PCMC, flats in Pimpri, apartments Chinchwad, real estate agent Pune',
    },
    seo_projects: {
        title: 'Properties & Projects – Browse Real Estate in PCMC',
        description: 'Browse premium residential and commercial projects in Pimpri Chinchwad, Pune. Filter by location, budget, and type to find your perfect home.',
        keywords: 'properties in Pimpri Chinchwad, new projects PCMC, flats for sale Pune, residential plots PCMC',
    },
    seo_about: {
        title: 'About Us – Our Story & Mission',
        description: 'Learn about Real Abodes – Pimpri Chinchwad\'s most trusted real estate agency. Meet our team and discover our values.',
        keywords: 'about Real Abodes, real estate agency Pimpri Chinchwad, PCMC property experts',
    },
    seo_contact: {
        title: 'Contact Us – Get in Touch',
        description: 'Contact Real Abodes today. Visit our office in Pimpri Chinchwad, call us, or send a message.',
        keywords: 'contact Real Abodes, real estate agent contact Pimpri Chinchwad, property inquiry PCMC',
    },
    seo_blog: {
        title: 'Real Estate Blog – Tips, Guides & Market Insights',
        description: 'Read the Real Abodes blog for the latest real estate tips, property buying guides, and market insights for Pimpri Chinchwad.',
        keywords: 'real estate blog, property buying guide, PCMC market insights, home buying tips Pune',
    },
};

const TITLE_LIMIT = 60;
const DESC_LIMIT = 160;

const CharCounter = ({ value, limit }: { value: string; limit: number }) => {
    const len = value.length;
    const color = len > limit ? 'text-red-500' : len > limit * 0.85 ? 'text-yellow-500' : 'text-green-600';
    return (
        <span className={`text-xs font-mono ${color}`}>
            {len}/{limit}
        </span>
    );
};

export const SeoView: React.FC<SeoViewProps> = ({ onBack }) => {
    const [selectedPage, setSelectedPage] = useState<SeoPage | null>(null);
    const [seoData, setSeoData] = useState<Record<string, SeoFields>>({ ...DEFAULT_SEO });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savedPages, setSavedPages] = useState<Set<string>>(new Set());

    useEffect(() => {
        const loadSeoSettings = async () => {
            try {
                const settings = await fetchSiteSettings();
                const updated = { ...DEFAULT_SEO };

                SEO_PAGES.forEach(page => {
                    const t = settings[`${page.key}_title`];
                    const d = settings[`${page.key}_description`];
                    const k = settings[`${page.key}_keywords`];
                    if (t || d || k) {
                        updated[page.key] = {
                            title: t || updated[page.key]?.title || '',
                            description: d || updated[page.key]?.description || '',
                            keywords: k || updated[page.key]?.keywords || '',
                        };
                    }
                });

                setSeoData(updated);
            } catch (error) {
                console.error('Failed to load SEO settings', error);
                toast.error('Could not load saved SEO settings. Showing defaults.');
            } finally {
                setLoading(false);
            }
        };
        loadSeoSettings();
    }, []);

    const handleFieldChange = (pageKey: string, field: keyof SeoFields, value: string) => {
        setSeoData(prev => ({
            ...prev,
            [pageKey]: { ...prev[pageKey], [field]: value },
        }));
    };

    const handleSave = async (page: SeoPage) => {
        setSaving(true);
        try {
            const fields = seoData[page.key];
            await Promise.all([
                updateSiteSetting(`${page.key}_title`, fields.title),
                updateSiteSetting(`${page.key}_description`, fields.description),
                updateSiteSetting(`${page.key}_keywords`, fields.keywords),
            ]);
            setSavedPages(prev => new Set([...prev, page.key]));
            toast.success(`SEO settings saved for "${page.label}"`);
        } catch (error) {
            console.error('Failed to save SEO settings', error);
            toast.error('Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    // ── Page Detail View ──────────────────────────────────────────────────────
    if (selectedPage) {
        const fields = seoData[selectedPage.key] || { title: '', description: '', keywords: '' };
        const titleOk = fields.title.length > 0 && fields.title.length <= TITLE_LIMIT;
        const descOk = fields.description.length > 0 && fields.description.length <= DESC_LIMIT;

        return (
            <div className="space-y-6 max-w-2xl">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => setSelectedPage(null)}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedPage.label}</h2>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            realabodes.in{selectedPage.path}
                        </p>
                    </div>
                    {savedPages.has(selectedPage.key) && (
                        <Badge variant="secondary" className="gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" /> Saved
                        </Badge>
                    )}
                </div>

                {/* SEO Score Preview */}
                <Card className="border-l-4 border-l-primary bg-blue-50/50">
                    <CardContent className="pt-4 pb-3">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Google Search Preview</p>
                        <p className="text-blue-700 text-base font-medium leading-snug truncate">
                            {fields.title || 'Page Title Here'} | Real Abodes
                        </p>
                        <p className="text-green-700 text-xs">realabodes.in{selectedPage.path}</p>
                        <p className="text-gray-600 text-sm leading-snug mt-0.5 line-clamp-2">
                            {fields.description || 'Meta description will appear here...'}
                        </p>
                    </CardContent>
                </Card>

                {/* Fields */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Meta Title</CardTitle>
                        <CardDescription>Shown in browser tabs and Google search results. Keep it under 60 characters.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Characters used</span>
                            <CharCounter value={fields.title} limit={TITLE_LIMIT} />
                        </div>
                        <Input
                            value={fields.title}
                            onChange={e => handleFieldChange(selectedPage.key, 'title', e.target.value)}
                            placeholder="e.g. Best Real Estate Agent in Pimpri Chinchwad"
                            className={fields.title.length > TITLE_LIMIT ? 'border-red-400' : ''}
                        />
                        {!titleOk && fields.title.length > TITLE_LIMIT && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Title is too long – Google may truncate it.
                            </p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Meta Description</CardTitle>
                        <CardDescription>Shown below the title in search results. Keep it under 160 characters to avoid truncation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Characters used</span>
                            <CharCounter value={fields.description} limit={DESC_LIMIT} />
                        </div>
                        <Textarea
                            value={fields.description}
                            onChange={e => handleFieldChange(selectedPage.key, 'description', e.target.value)}
                            placeholder="e.g. Real Abodes is Pimpri Chinchwad's most trusted real estate agent..."
                            rows={3}
                            className={fields.description.length > DESC_LIMIT ? 'border-red-400' : ''}
                        />
                        {!descOk && fields.description.length > DESC_LIMIT && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Description is too long – Google may cut it off.
                            </p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Keywords</CardTitle>
                        <CardDescription>Comma-separated keywords relevant to this page. Helps with internal categorisation (less important for modern Google, but still useful).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={fields.keywords}
                            onChange={e => handleFieldChange(selectedPage.key, 'keywords', e.target.value)}
                            placeholder="e.g. real estate Pimpri Chinchwad, flats in PCMC, property agent Pune"
                            rows={2}
                        />
                    </CardContent>
                </Card>

                <Button
                    onClick={() => handleSave(selectedPage)}
                    disabled={saving}
                    className="w-full gap-2"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving…' : 'Save SEO Settings'}
                </Button>
            </div>
        );
    }

    // ── Page List View ────────────────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">SEO Manager</h2>
                    <p className="text-muted-foreground">Edit page titles, descriptions, and keywords for each page of your website.</p>
                </div>
            </div>

            {/* SEO Quick Guide */}
            <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-4 pb-3 space-y-1">
                    <p className="font-semibold text-amber-800 text-sm flex items-center gap-2">
                        <Search className="w-4 h-4" /> What is SEO?
                    </p>
                    <p className="text-xs text-amber-700">
                        SEO (Search Engine Optimisation) helps Google find and rank your website. A good <strong>title</strong> and <strong>description</strong> make your site appear higher in search results when people search for properties in Pimpri Chinchwad. Click any page below to edit its SEO settings.
                    </p>
                </CardContent>
            </Card>

            {/* Page Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SEO_PAGES.map(page => {
                    const fields = seoData[page.key];
                    const titleLen = fields?.title?.length || 0;
                    const descLen = fields?.description?.length || 0;
                    const isHealthy = titleLen > 0 && titleLen <= TITLE_LIMIT && descLen > 0 && descLen <= DESC_LIMIT;
                    const hasIssues = titleLen > TITLE_LIMIT || descLen > DESC_LIMIT;

                    return (
                        <Card
                            key={page.key}
                            className="cursor-pointer hover:shadow-md transition-shadow border"
                            onClick={() => setSelectedPage(page)}
                        >
                            <CardContent className="pt-4 pb-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                                        {page.icon}
                                        {page.label}
                                    </div>
                                    {savedPages.has(page.key) ? (
                                        <Badge variant="secondary" className="gap-1 text-xs">
                                            <CheckCircle2 className="w-3 h-3 text-green-500" /> Saved
                                        </Badge>
                                    ) : hasIssues ? (
                                        <Badge variant="destructive" className="gap-1 text-xs">
                                            <AlertCircle className="w-3 h-3" /> Fix needed
                                        </Badge>
                                    ) : isHealthy ? (
                                        <Badge className="gap-1 text-xs bg-green-100 text-green-700 border-green-200">
                                            <CheckCircle2 className="w-3 h-3" /> Good
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-xs text-muted-foreground">
                                            Not set
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground truncate">
                                    {fields?.title || <span className="italic">No title set</span>}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                    {fields?.description || <span className="italic">No description set</span>}
                                </p>
                                <div className="flex gap-3 text-xs text-muted-foreground">
                                    <span>Title: <CharCounter value={fields?.title || ''} limit={TITLE_LIMIT} /></span>
                                    <span>Desc: <CharCounter value={fields?.description || ''} limit={DESC_LIMIT} /></span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Tip */}
            <Card className="bg-gray-50 border-dashed">
                <CardContent className="pt-4 pb-3">
                    <p className="text-xs text-muted-foreground">
                        💡 <strong>Tip:</strong> Individual blog posts and property pages get their SEO automatically from the content you enter in the Blog Editor and Property Editor. You only need to manage the main page SEO here.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
