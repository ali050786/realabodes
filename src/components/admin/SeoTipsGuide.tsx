import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Lightbulb, ChevronDown, ChevronUp, CheckCircle2, XCircle,
    Globe, FileText, Search, MapPin, Clock, Image, Link
} from 'lucide-react';

interface Tip {
    icon: React.ReactNode;
    title: string;
    description: string;
    good?: string;
    bad?: string;
    tag?: 'Essential' | 'Helpful' | 'Advanced';
}

const TIPS: Tip[] = [
    {
        icon: <Search className="w-4 h-4 text-blue-500" />,
        title: 'Write titles the way buyers search',
        description: 'Your page title is the single most important SEO factor. Use the exact words someone in Pimpri Chinchwad would type into Google.',
        good: '3BHK Flats in Wakad under 80 Lakhs | Real Abodes',
        bad: 'Premium Living Spaces – Exquisite Residences',
        tag: 'Essential',
    },
    {
        icon: <FileText className="w-4 h-4 text-purple-500" />,
        title: 'Keep titles under 60 characters',
        description: 'Google cuts off titles longer than 60 characters in search results. Keep it short and front-load the most important keyword.',
        good: 'New Flats in Hinjewadi | Real Abodes (44 chars)',
        bad: 'Discover Premium Residential Apartments in the Heart of Hinjewadi, Pimpri-Chinchwad (85 chars)',
        tag: 'Essential',
    },
    {
        icon: <FileText className="w-4 h-4 text-green-500" />,
        title: 'Descriptions should sell the click',
        description: 'Your meta description doesn\'t directly affect ranking, but it decides whether someone clicks your result. Write it like a mini-ad — under 160 characters.',
        good: 'Ready-to-move 2 & 3BHK flats in Wakad with clubhouse, parking & RERA approved. Call now for site visit.',
        bad: 'This project is located in a good area and has many features for residents to enjoy.',
        tag: 'Essential',
    },
    {
        icon: <MapPin className="w-4 h-4 text-red-500" />,
        title: 'Always include the locality name',
        description: 'People search for "flats in Baner" or "plots in Ravet" — not just "flats". Including the locality in your title and description dramatically improves local rankings.',
        good: 'Luxury Apartments in Baner, Pune',
        bad: 'Luxury Apartments – Prime Location',
        tag: 'Essential',
    },
    {
        icon: <Link className="w-4 h-4 text-orange-500" />,
        title: 'Use clean, readable slugs',
        description: 'The URL of each blog post or project page should be short and contain the main keyword. Avoid numbers, dates, or special characters.',
        good: '/project/green-meadows-wakad',
        bad: '/project/1742839102-proj?id=abc123',
        tag: 'Essential',
    },
    {
        icon: <Image className="w-4 h-4 text-teal-500" />,
        title: 'Add a high-quality cover image',
        description: 'Blog posts and property pages with a cover image get significantly more clicks when shared. Use a real photo — not a stock image — at 1200×630px for best results on WhatsApp, Facebook, and Google.',
        tag: 'Helpful',
    },
    {
        icon: <FileText className="w-4 h-4 text-indigo-500" />,
        title: 'Write a meaningful excerpt for blog posts',
        description: 'The excerpt (short summary) is used as the meta description on blog posts. Make it 1-2 sentences that describe exactly what the article covers and why it\'s useful.',
        good: 'Learn the 5 documents every homebuyer needs before registering a flat in PCMC — checklist included.',
        bad: 'Read this article to know more about property.',
        tag: 'Helpful',
    },
    {
        icon: <Clock className="w-4 h-4 text-gray-500" />,
        title: 'Publish blogs regularly',
        description: 'Google rewards websites that publish fresh content. Even one blog post per month on topics buyers care about (like "best areas in PCMC", "home loan guide", "RERA explained") builds long-term traffic.',
        tag: 'Helpful',
    },
    {
        icon: <Globe className="w-4 h-4 text-emerald-500" />,
        title: 'Target long-tail searches for projects',
        description: 'Instead of competing for "flats in Pune" (very competitive), target specific phrases like "2BHK flats near Hinjewadi IT Park under 60 lakhs" — these are easier to rank for and attract serious buyers.',
        tag: 'Advanced',
    },
    {
        icon: <Search className="w-4 h-4 text-cyan-500" />,
        title: 'Use H1 / H2 headings in blog content',
        description: 'When writing blog content, structure it with headings. Start with one <h1> (the title) and use <h2> tags for each section. Google uses these to understand what your page is about.',
        good: '<h2>Documents Required for Property Registration in PCMC</h2>',
        bad: '<p><b>Documents Required</b></p>',
        tag: 'Advanced',
    },
];

const TAG_COLORS: Record<string, string> = {
    Essential: 'bg-red-100 text-red-700 border-red-200',
    Helpful:   'bg-blue-100 text-blue-700 border-blue-200',
    Advanced:  'bg-purple-100 text-purple-700 border-purple-200',
};

export const SeoTipsGuide: React.FC = () => {
    const [expanded, setExpanded] = useState<number | null>(0);
    const [filterTag, setFilterTag] = useState<string | null>(null);

    const filtered = filterTag ? TIPS.filter(t => t.tag === filterTag) : TIPS;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="font-semibold text-gray-700">Filter by:</span>
                {['Essential', 'Helpful', 'Advanced'].map(tag => (
                    <button
                        key={tag}
                        onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                        className={`text-xs px-3 py-1 rounded-full border font-medium transition-all ${
                            filterTag === tag ? TAG_COLORS[tag] : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                        }`}
                    >
                        {tag}
                    </button>
                ))}
                {filterTag && (
                    <button onClick={() => setFilterTag(null)} className="text-xs text-muted-foreground underline">
                        Clear
                    </button>
                )}
            </div>

            <div className="space-y-2">
                {filtered.map((tip, index) => (
                    <Card
                        key={index}
                        className="border cursor-pointer hover:shadow-sm transition-shadow"
                        onClick={() => setExpanded(expanded === index ? null : index)}
                    >
                        <CardContent className="p-0">
                            <div className="flex items-center gap-3 p-4">
                                <div className="shrink-0">{tip.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-medium text-sm text-gray-800">{tip.title}</span>
                                        {tip.tag && (
                                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TAG_COLORS[tip.tag]}`}>
                                                {tip.tag}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {expanded === index
                                    ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                                    : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                            </div>

                            {expanded === index && (
                                <div className="px-4 pb-4 space-y-3 border-t pt-3">
                                    <p className="text-sm text-gray-600">{tip.description}</p>

                                    {(tip.good || tip.bad) && (
                                        <div className="space-y-2">
                                            {tip.good && (
                                                <div className="flex items-start gap-2 text-sm bg-green-50 border border-green-100 rounded-lg p-3">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="font-medium text-green-700">Good: </span>
                                                        <span className="text-green-800 font-mono text-xs">{tip.good}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {tip.bad && (
                                                <div className="flex items-start gap-2 text-sm bg-red-50 border border-red-100 rounded-lg p-3">
                                                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="font-medium text-red-600">Avoid: </span>
                                                        <span className="text-red-700 font-mono text-xs">{tip.bad}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
