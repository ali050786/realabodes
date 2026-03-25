import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Globe, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TITLE_LIMIT = 60;
const DESC_LIMIT = 160;

type ScoreLevel = 'good' | 'warning' | 'error' | 'empty';

interface SeoPreviewPanelProps {
    /** Auto-generated title from the content (e.g. post.title or project.title) */
    autoTitle: string;
    /** Auto-generated description (e.g. excerpt or subtitle) */
    autoDescription: string;
    /** The URL path shown in the preview, e.g. /blog/my-post */
    urlPath: string;
    /** Optional: allow custom SEO title override */
    customTitle?: string;
    onCustomTitleChange?: (val: string) => void;
    /** Optional: allow custom SEO description override */
    customDescription?: string;
    onCustomDescriptionChange?: (val: string) => void;
    /** Compact mode — used in sidebars */
    compact?: boolean;
}

const CharBadge = ({ value, limit }: { value: string; limit: number }) => {
    const len = value.length;
    const color =
        len === 0 ? 'bg-gray-100 text-gray-400' :
        len > limit ? 'bg-red-100 text-red-600' :
        len > limit * 0.85 ? 'bg-yellow-100 text-yellow-700' :
        'bg-green-100 text-green-700';
    return (
        <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${color}`}>
            {len}/{limit}
        </span>
    );
};

function getScore(title: string, description: string): { level: ScoreLevel; message: string } {
    if (!title && !description) return { level: 'empty', message: 'Add a title and description to improve SEO.' };
    if (!title) return { level: 'error', message: 'Missing title — Google needs this.' };
    if (!description) return { level: 'error', message: 'Missing description — add one for better click-through.' };
    if (title.length > TITLE_LIMIT) return { level: 'warning', message: 'Title is too long — Google will cut it off.' };
    if (description.length > DESC_LIMIT) return { level: 'warning', message: 'Description is too long — shorten it.' };
    if (title.length < 20) return { level: 'warning', message: 'Title is very short — try to be more descriptive.' };
    if (description.length < 60) return { level: 'warning', message: 'Description is short — add more detail.' };
    return { level: 'good', message: 'Looking great! This will show well in Google.' };
}

export const SeoPreviewPanel: React.FC<SeoPreviewPanelProps> = ({
    autoTitle,
    autoDescription,
    urlPath,
    customTitle,
    onCustomTitleChange,
    customDescription,
    onCustomDescriptionChange,
    compact = false,
}) => {
    const [expanded, setExpanded] = useState(!compact);

    const displayTitle = (customTitle !== undefined && customTitle !== '') ? customTitle : autoTitle;
    const displayDesc  = (customDescription !== undefined && customDescription !== '') ? customDescription : autoDescription;
    const fullTitle    = displayTitle ? `${displayTitle} | Real Abodes` : 'Real Abodes';
    const score        = getScore(displayTitle, displayDesc);

    const ScoreIcon = () => {
        if (score.level === 'good')    return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />;
        if (score.level === 'warning') return <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />;
        if (score.level === 'error')   return <AlertCircle className="w-3.5 h-3.5 text-red-500" />;
        return <Lightbulb className="w-3.5 h-3.5 text-gray-400" />;
    };

    const scoreBadgeClass =
        score.level === 'good'    ? 'bg-green-100 text-green-700 border-green-200' :
        score.level === 'warning' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
        score.level === 'error'   ? 'bg-red-100 text-red-700 border-red-200' :
        'bg-gray-100 text-gray-500 border-gray-200';

    return (
        <Card className="border border-gray-200">
            {/* Header — always visible */}
            <CardHeader
                className="pb-2 pt-3 px-4 cursor-pointer select-none"
                onClick={() => setExpanded(e => !e)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <CardTitle className="text-sm font-semibold">SEO Preview</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${scoreBadgeClass}`}>
                            <ScoreIcon /> {score.level === 'good' ? 'Good' : score.level === 'warning' ? 'Improve' : score.level === 'error' ? 'Missing' : 'Empty'}
                        </span>
                        {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                </div>
            </CardHeader>

            {expanded && (
                <CardContent className="px-4 pb-4 space-y-4">
                    {/* Google Preview Box */}
                    <div className="border rounded-lg p-3 bg-white space-y-0.5">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Google Search Preview</p>
                        <p className="text-blue-700 text-sm font-medium leading-snug line-clamp-1">{fullTitle}</p>
                        <p className="text-green-700 text-xs">realabodes.in{urlPath}</p>
                        <p className="text-gray-500 text-xs leading-snug line-clamp-2 mt-0.5">
                            {displayDesc || <span className="italic text-gray-400">No description — add one to appear here.</span>}
                        </p>
                    </div>

                    {/* Score tip */}
                    <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <ScoreIcon />
                        {score.message}
                    </p>

                    {/* Custom overrides — only shown if callbacks are provided */}
                    {(onCustomTitleChange || onCustomDescriptionChange) && (
                        <div className="space-y-3 pt-2 border-t">
                            <p className="text-xs text-muted-foreground font-medium">
                                Override SEO fields (optional — leave blank to use content above)
                            </p>

                            {onCustomTitleChange && (
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-medium text-gray-700">Custom SEO Title</label>
                                        <CharBadge value={customTitle || ''} limit={TITLE_LIMIT} />
                                    </div>
                                    <Input
                                        value={customTitle || ''}
                                        onChange={e => onCustomTitleChange(e.target.value)}
                                        placeholder={autoTitle || 'Leave blank to use the main title'}
                                        className="text-sm"
                                    />
                                </div>
                            )}

                            {onCustomDescriptionChange && (
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-medium text-gray-700">Custom SEO Description</label>
                                        <CharBadge value={customDescription || ''} limit={DESC_LIMIT} />
                                    </div>
                                    <Textarea
                                        value={customDescription || ''}
                                        onChange={e => onCustomDescriptionChange(e.target.value)}
                                        placeholder={autoDescription || 'Leave blank to use the excerpt / subtitle'}
                                        rows={2}
                                        className="text-sm"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    );
};
