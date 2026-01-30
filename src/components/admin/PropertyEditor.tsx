import React, { useState } from 'react';
import { Project, commonAmenities, Amenity } from '@/lib/projects-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, ArrowLeft, Plus, Trash2, MapPin, Upload, Check, ChevronDown, X, Link as LinkIcon, Calendar, User, Clock, FileText, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

interface PropertyEditorProps {
    property?: Project;
    onSave: (property: Project) => void;
    onCancel: () => void;
}

const defaultProperty: Partial<Project> = {
    title: '',
    subtitle: '',
    slug: '',
    category: 'Residential',
    status: 'planning',
    featured: false,
    shortDescription: '',
    fullDescription: '',
    location: '',
    address: '',
    priceRange: '',
    year: new Date().getFullYear().toString(),
    images: [],
    metrics: [],
    phases: [],
    tags: [],
    highlights: [],
    amenities: [],
    proximity: [],
    floorPlans: [],
    specifications: [],
    faqs: [],
    relatedProjects: []
};

const amenityCategories = [
    'Lifestyle',
    'Sports',
    'Safety',
    'Convenience',
    'Sustainability'
];

const defaultSpecifications = [
    {
        category: 'Structure',
        items: [
            { label: 'Foundation', value: 'Isolated footings with damp proofing' },
            { label: 'Walls', value: 'Double-wall construction with insulation' },
            { label: 'Roof', value: 'Insulated flat roof with landscaping option' },
        ],
    },
    {
        category: 'Exterior',
        items: [
            { label: 'Facade', value: 'Premium stone cladding' },
            { label: 'Pool', value: '12m infinity edge with heating' },
            { label: 'Garden', value: 'Automated smart irrigation' },
            { label: 'Driveway', value: 'Granite paving with lighting' },
        ],
    },
    {
        category: 'Interior',
        items: [
            { label: 'Flooring', value: 'Imported marble and wooden flooring' },
            { label: 'Height', value: '3.6m double-height living areas' },
            { label: 'Wine Cellar', value: 'Climate-controlled 500 bottle capacity' },
            { label: 'Home Cinema', value: 'Acoustic treatment with 4K projection' },
        ],
    },
];

const defaultFAQs = [
    { question: "What is the possession date?", answer: "The project is scheduled for completion by December 2025." },
    { question: "Is there a clubhouse?", answer: "Yes, we feature a state-of-the-art clubhouse with gym, pool, and indoor games." },
    { question: "What are the payment plans?", answer: "We offer construction-linked plans (CLP) and flexible down-payment options." },
];

export const PropertyEditor = ({ property, onSave, onCancel }: PropertyEditorProps) => {
    const [formData, setFormData] = useState<Project>(() => {
        let initialData = property ? { ...property } : {
            ...defaultProperty,
            id: Date.now().toString(),
            images: [],
            amenities: [],
            proximity: [],
        } as Project;

        if (!initialData.metrics || initialData.metrics.length === 0) {
            initialData.metrics = [
                { label: 'Total Units', value: '' },
                { label: 'Floor Area', value: '' }
            ];
        }

        return initialData;
    });

    const [activeAmenityCategory, setActiveAmenityCategory] = useState('Lifestyle');
    const [visibleSections, setVisibleSections] = useState<string[]>(() => {
        const sections: string[] = [];
        if (formData.amenities && formData.amenities.length > 0) sections.push('amenities');
        if (formData.floorPlans && formData.floorPlans.length > 0) sections.push('floorPlans');
        if ((formData.proximity && formData.proximity.length > 0) || formData.address) sections.push('location');
        if (formData.specifications && formData.specifications.length > 0) sections.push('specifications');
        if (formData.faqs && formData.faqs.length > 0) sections.push('faqs');
        if (formData.phases && formData.phases.length > 0) sections.push('timeline');
        return sections;
    });

    const handleChange = (field: keyof Project, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (field: keyof Project, index: number, subField: string, value: any) => {
        setFormData(prev => {
            const list = [...(prev[field] as any[])];
            list[index] = { ...list[index], [subField]: value };
            return { ...prev, [field]: list };
        });
    };

    const addItem = (field: keyof Project, item: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...(prev[field] as any[]), item]
        }));
    };

    const removeItem = (field: keyof Project, index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: (prev[field] as any[]).filter((_, i) => i !== index)
        }));
    };

    const toggleAmenity = (amenity: Amenity) => {
        const exists = formData.amenities.find(a => a.name === amenity.name);
        if (exists) {
            setFormData(prev => ({
                ...prev,
                amenities: prev.amenities.filter(a => a.name !== amenity.name)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, amenity]
            }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImage' | 'thumbnail' | 'gallery_new') => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const { uploadProjectImage } = await import('@/services/projects');
            const url = await uploadProjectImage(file);

            if (field === 'gallery_new') {
                addItem('images', { url, alt: file.name.split('.')[0] });
            } else {
                handleChange(field, url);
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Ensure Supabase is connected.");
        }
    };

    const toggleSection = (section: string) => {
        if (!visibleSections.includes(section)) {
            setVisibleSections([...visibleSections, section]);
            // Pre-fill specifications if adding for the first time and empty
            if (section === 'specifications' && (!formData.specifications || formData.specifications.length === 0)) {
                setFormData(prev => ({
                    ...prev,
                    specifications: defaultSpecifications
                }));
            }
        }
        if (section === 'faqs' && (!formData.faqs || formData.faqs.length === 0)) {
            setFormData(prev => ({
                ...prev,
                faqs: defaultFAQs
            }));
        }
    };


    return (
        <div className="flex flex-col h-[calc(100vh-100px)] max-w-5xl mx-auto w-full">
            {/* Header / Actions */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {property ? 'Edit Property' : 'Add New Property'}
                        </h2>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onSave(formData)} className="gap-2 bg-black text-white hover:bg-black/90">
                        <Save className="w-4 h-4" /> Save
                    </Button>
                </div>
            </div>

            <ScrollArea className="flex-1 -mx-6 px-6 pb-20">
                <div className="space-y-10 pb-20">

                    {/* 1. Basic Info Section */}
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Property Name</Label>
                                <Input
                                    value={formData.title}
                                    onChange={e => handleChange('title', e.target.value)}
                                    placeholder="e.g. Grand Horizon Villas"
                                    className="h-12 border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Tagline</Label>
                                <Input
                                    value={formData.subtitle}
                                    onChange={e => handleChange('subtitle', e.target.value)}
                                    placeholder="e.g. Luxury Living Redefined"
                                    className="h-12 border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Slug (URL)</Label>
                                <Input
                                    value={formData.slug}
                                    onChange={e => handleChange('slug', e.target.value)}
                                    placeholder="e.g. grand-horizon-villas"
                                    className="h-12 border-gray-300 rounded-md"
                                />
                                <p className="text-xs text-muted-foreground">Will be auto-generated from title if empty.</p>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-medium text-gray-700">Featured Project</Label>
                                    <p className="text-xs text-muted-foreground">Show this property in the featured section on homepage</p>
                                </div>
                                <Switch
                                    checked={formData.featured}
                                    onCheckedChange={checked => handleChange('featured', checked)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        value={formData.location}
                                        onChange={e => handleChange('location', e.target.value)}
                                        placeholder="e.g. Baner, Pune"
                                        className="h-12 pl-10 border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Price</Label>
                                <Input
                                    value={formData.priceRange}
                                    onChange={e => handleChange('priceRange', e.target.value)}
                                    placeholder="e.g. Starts from ₹1.5 Cr"
                                    className="h-12 border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Status</Label>
                            <div className="flex gap-3">
                                {[
                                    { label: 'Ongoing', value: 'in-progress' },
                                    { label: 'Completed', value: 'completed' },
                                    { label: 'Ready Possession', value: 'completed' } // Mapping to completed for now, logic can be refined
                                ].map((status) => (
                                    <button
                                        key={status.label}
                                        onClick={() => handleChange('status', status.value)}
                                        className={cn(
                                            "px-6 py-2 rounded-full border transition-all text-sm font-medium",
                                            formData.status === status.value && status.label !== 'Ready Possession' // simple check
                                                /* Logic for ready possession distinction might need distinct backend value, assuming 'completed' for simple demo */
                                                ? "bg-gray-900 text-white border-gray-900"
                                                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                                        )}
                                    >
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={val => handleChange('category', val)}
                            >
                                <SelectTrigger className="h-12 border-gray-300 rounded-md bg-white">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Apartments">Apartments</SelectItem>
                                    <SelectItem value="Commercial and Apartments">Commercial and Apartments</SelectItem>
                                    <SelectItem value="Commercials">Commercials</SelectItem>
                                    <SelectItem value="Villas">Villas</SelectItem>
                                    <SelectItem value="Plots">Plots</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Project Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <User className="w-4 h-4" /> Client
                                </Label>
                                <Input
                                    value={formData.client}
                                    onChange={e => handleChange('client', e.target.value)}
                                    placeholder="e.g. Azure Developments"
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Year
                                </Label>
                                <Input
                                    value={formData.year}
                                    onChange={e => handleChange('year', e.target.value)}
                                    placeholder="e.g. 2025"
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Duration
                                </Label>
                                <Input
                                    value={formData.duration}
                                    onChange={e => handleChange('duration', e.target.value)}
                                    placeholder="e.g. 24 months"
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4" /> RERA Number
                                </Label>
                                <Input
                                    value={formData.reraNumber || ''}
                                    onChange={e => handleChange('reraNumber', e.target.value)}
                                    placeholder="e.g. P52100012345"
                                    className="h-10"
                                />
                            </div>
                        </div>





                        {/* External Links */}
                        <div className="space-y-4 pt-4 border-t">
                            <Label className="text-sm font-medium text-gray-700">External Media & Links</Label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground flex items-center gap-1"><Video className="w-3 h-3" /> Video URL</Label>
                                    <Input
                                        value={formData.videoUrl || ''}
                                        onChange={e => handleChange('videoUrl', e.target.value)}
                                        placeholder="YouTube/Vimeo Link"
                                        className="h-9"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground flex items-center gap-1"><LinkIcon className="w-3 h-3" /> Virtual Tour URL</Label>
                                    <Input
                                        value={formData.virtualTourUrl || ''}
                                        onChange={e => handleChange('virtualTourUrl', e.target.value)}
                                        placeholder="Matterport/360 Link"
                                        className="h-9"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground flex items-center gap-1"><FileText className="w-3 h-3" /> Brochure URL</Label>
                                    <Input
                                        value={formData.brochureUrl || ''}
                                        onChange={e => handleChange('brochureUrl', e.target.value)}
                                        placeholder="PDF Link"
                                        className="h-9"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-gray-700">Key Metrics (Max 4)</Label>
                                {formData.metrics.length < 4 && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => addItem('metrics', { label: '', value: '' })}
                                        className="h-8"
                                    >
                                        <Plus className="w-3 h-3 mr-1" /> Add
                                    </Button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {formData.metrics.map((metric, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        <div className="flex-1 space-y-1">
                                            <Input
                                                value={metric.label}
                                                onChange={e => handleNestedChange('metrics', index, 'label', e.target.value)}
                                                placeholder="Label (e.g. Total Units)"
                                                className="h-10"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <Input
                                                value={metric.value}
                                                onChange={e => handleNestedChange('metrics', index, 'value', e.target.value)}
                                                placeholder="Value (e.g. 48)"
                                                className="h-10"
                                            />
                                        </div>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => removeItem('metrics', index)}
                                            className="text-gray-400 hover:text-red-500 h-10 w-10 shrink-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Tags */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-gray-700">Tags</Label>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }))}
                                    className="h-8"
                                >
                                    <Plus className="w-3 h-3 mr-1" /> Add Tag
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, index) => (
                                    <div key={index} className="flex items-center gap-1 bg-white border px-2 py-1 rounded-md shadow-sm">
                                        <Input
                                            value={tag}
                                            onChange={e => {
                                                const newTags = [...formData.tags];
                                                newTags[index] = e.target.value;
                                                setFormData(prev => ({ ...prev, tags: newTags }));
                                            }}
                                            placeholder="Tag name"
                                            className="h-7 border-none shadow-none focus-visible:ring-0 p-0 w-24 text-sm"
                                        />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => setFormData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }))}
                                            className="h-5 w-5 text-gray-400 hover:text-red-500 rounded-full"
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ))}
                                {formData.tags.length === 0 && (
                                    <p className="text-sm text-gray-400 italic">No tags added yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-gray-700">Highlights</Label>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setFormData(prev => ({ ...prev, highlights: [...prev.highlights, ''] }))}
                                    className="h-8"
                                >
                                    <Plus className="w-3 h-3 mr-1" /> Add Highlight
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {formData.highlights.map((highlight, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <div className="h-2 w-2 rounded-full bg-black shrink-0" />
                                        <Input
                                            value={highlight}
                                            onChange={e => {
                                                const newHighlights = [...formData.highlights];
                                                newHighlights[index] = e.target.value;
                                                setFormData(prev => ({ ...prev, highlights: newHighlights }));
                                            }}
                                            placeholder="Highlight descriptions..."
                                            className="flex-1"
                                        />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => setFormData(prev => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }))}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                {formData.highlights.length === 0 && (
                                    <p className="text-sm text-gray-400 italic">No highlights added yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Full Description */}
                        <div className="space-y-2 pt-4 border-t">
                            <Label className="text-sm font-medium text-gray-700">Full Description</Label>
                            <Textarea
                                value={formData.fullDescription}
                                onChange={e => handleChange('fullDescription', e.target.value)}
                                rows={8}
                                placeholder="Comprehensive description of the property features and value proposition..."
                                className="bg-white"
                            />
                        </div>
                    </section>

                    <div className="h-px bg-gray-200" />

                    {/* 2. Media Section */}
                    <section className="space-y-8">
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Hero Image <span className="text-xs text-muted-foreground font-normal ml-2">(Recommended: 1920x1200 px, 16:10 ratio)</span>
                            </Label>
                            <div
                                className="relative group border-2 border-dashed border-gray-300 rounded-xl p-8 transition-colors hover:border-blue-400 bg-gray-50 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center cursor-pointer min-h-[200px] mb-4"
                            >
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={e => handleImageUpload(e, 'heroImage')} />
                                {formData.heroImage ? (
                                    <div className="relative w-full h-full min-h-[200px]">
                                        <img src={formData.heroImage} alt="Hero" className="w-full h-full object-cover rounded-lg absolute inset-0" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                            <span className="text-white font-medium flex items-center gap-2"><Upload className="w-4 h-4" /> Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-4 bg-white rounded-full shadow-sm mb-3">
                                            <Upload className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">Click to upload hero image</p>
                                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                    </>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    placeholder="Hero Alt Text"
                                    value={formData.heroImageAlt || ''}
                                    onChange={e => handleChange('heroImageAlt', e.target.value)}
                                />
                                <Input
                                    placeholder="Hero Caption"
                                    value={formData.heroImageCaption || ''}
                                    onChange={e => handleChange('heroImageCaption', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Thumbnail Image (for List) <span className="text-xs text-muted-foreground font-normal ml-2">(Recommended: 800x600 px standard, 1280x800 px featured)</span>
                            </Label>
                            <div
                                className="relative group border-2 border-dashed border-gray-300 rounded-xl p-6 transition-colors hover:border-blue-400 bg-gray-50 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center cursor-pointer min-h-[120px] mb-4"
                            >
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={e => handleImageUpload(e, 'thumbnail')} />
                                {formData.thumbnail ? (
                                    <div className="relative w-full h-full min-h-[120px]">
                                        <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover rounded-lg absolute inset-0" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                            <span className="text-white font-medium text-sm flex items-center gap-2"><Upload className="w-3 h-3" /> Change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-white rounded-full shadow-sm">
                                            <Upload className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-gray-900">Click to upload thumbnail</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    placeholder="Thumbnail Alt Text"
                                    value={formData.thumbnailAlt || ''}
                                    onChange={e => handleChange('thumbnailAlt', e.target.value)}
                                />
                                <Input
                                    placeholder="Thumbnail Caption"
                                    value={formData.thumbnailCaption || ''}
                                    onChange={e => handleChange('thumbnailCaption', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <Label className="text-sm font-medium text-gray-700">
                                    Gallery <span className="text-xs text-muted-foreground font-normal ml-2">(Recommended: 1920x1200 px, 16:10 ratio)</span>
                                </Label>
                            </div>
                            <div className="space-y-4">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border">
                                        <div className="w-24 h-24 flex-shrink-0 bg-white rounded-md border overflow-hidden">
                                            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <Label className="text-xs mb-1.5 block">Image URL</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        value={img.url}
                                                        onChange={e => handleNestedChange('images', index, 'url', e.target.value)}
                                                        placeholder="https://..."
                                                        className="h-9"
                                                    />
                                                    <Button size="icon" variant="ghost" className="text-destructive h-9 w-9 shrink-0" onClick={() => removeItem('images', index)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-xs mb-1.5 block">Alt Text</Label>
                                                <Input
                                                    value={img.alt}
                                                    onChange={e => handleNestedChange('images', index, 'alt', e.target.value)}
                                                    placeholder="Description"
                                                    className="h-9"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-xs mb-1.5 block">Caption</Label>
                                                <Input
                                                    value={img.caption || ''}
                                                    onChange={e => handleNestedChange('images', index, 'caption', e.target.value)}
                                                    placeholder="Caption"
                                                    className="h-9"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="relative group border-2 border-dashed border-gray-300 rounded-xl p-6 transition-colors hover:border-blue-400 bg-gray-50 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center cursor-pointer min-h-[100px]">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={e => handleImageUpload(e, 'gallery_new')} />
                                    <Plus className="w-6 h-6 text-gray-400 mb-2" />
                                    <p className="text-sm font-medium text-gray-900">Add Gallery Image</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Dynamic Sections */}
                    {visibleSections.includes('floorPlans') && (
                        <Card className="border shadow-none bg-gray-50/50">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Floors & Plans (Units)</h3>
                                    <Button variant="ghost" size="sm" onClick={() => setVisibleSections(prev => prev.filter(s => s !== 'floorPlans'))}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    {formData.floorPlans.map((plan, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg border shadow-sm relative">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="absolute right-2 top-2 text-red-400 hover:text-red-600 h-8 w-8"
                                                onClick={() => removeItem('floorPlans', index)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                                                <div className="space-y-2">
                                                    <Label className="text-xs">Unit Name</Label>
                                                    <Input
                                                        value={plan.name}
                                                        onChange={e => handleNestedChange('floorPlans', index, 'name', e.target.value)}
                                                        placeholder="e.g. 3BHK Type A"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs">Type</Label>
                                                    <Input
                                                        value={plan.type}
                                                        onChange={e => handleNestedChange('floorPlans', index, 'type', e.target.value)}
                                                        placeholder="e.g. Apartment / Penthouse"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                <div className="space-y-2">
                                                    <Label className="text-xs">Size (sq.ft)</Label>
                                                    <Input
                                                        value={plan.size}
                                                        onChange={e => handleNestedChange('floorPlans', index, 'size', e.target.value)}
                                                        placeholder="e.g. 1500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs">Price</Label>
                                                    <Input
                                                        value={plan.price || ''}
                                                        onChange={e => handleNestedChange('floorPlans', index, 'price', e.target.value)}
                                                        placeholder="e.g. ₹1.5 Cr"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs">Bedrooms</Label>
                                                    <Input
                                                        type="number"
                                                        value={plan.bedrooms}
                                                        onChange={e => handleNestedChange('floorPlans', index, 'bedrooms', parseInt(e.target.value) || 0)}
                                                        placeholder="3"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs">Bathrooms</Label>
                                                    <Input
                                                        type="number"
                                                        value={plan.bathrooms}
                                                        onChange={e => handleNestedChange('floorPlans', index, 'bathrooms', parseInt(e.target.value) || 0)}
                                                        placeholder="3"
                                                    />
                                                </div>
                                            </div>

                                            {/* Floor Plan Image Upload placeholder - could be enhanced later */}
                                            {/* <div className="border-t pt-4">
                                                 <Label className="text-xs mb-2 block">Floor Plan Image URL</Label>
                                                 <Input 
                                                    value={plan.image || ''}
                                                    onChange={e => handleNestedChange('floorPlans', index, 'image', e.target.value)}
                                                    placeholder="https://..."
                                                 />
                                            </div> */}
                                        </div>
                                    ))}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addItem('floorPlans', { name: '', type: '', size: '', bedrooms: 0, bathrooms: 0, price: '' })}
                                        className="w-full border-dashed"
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> Add Unit Plan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {visibleSections.includes('amenities') && (
                        <Card className="border shadow-none bg-gray-50/50">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Amenities and Facilities</h3>
                                    <Button variant="ghost" size="sm" onClick={() => setVisibleSections(prev => prev.filter(s => s !== 'amenities'))}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {amenityCategories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveAmenityCategory(cat)}
                                            className={cn(
                                                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                                                activeAmenityCategory === cat
                                                    ? "bg-slate-800 text-white"
                                                    : "bg-white border text-gray-600 hover:bg-gray-100"
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Amenities Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {commonAmenities
                                        .filter(a => a.category.toLowerCase().includes(activeAmenityCategory.toLowerCase()) || activeAmenityCategory === 'All')
                                        .map((amenity) => {
                                            const isSelected = formData.amenities.some(a => a.name === amenity.name);
                                            return (
                                                <div
                                                    key={amenity.name}
                                                    onClick={() => toggleAmenity(amenity)}
                                                    className={cn(
                                                        "flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all gap-3 bg-white",
                                                        isSelected
                                                            ? "border-blue-500 shadow-sm ring-1 ring-blue-500/20"
                                                            : "border-transparent shadow-sm hover:border-gray-200"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "p-3 rounded-full",
                                                        isSelected ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"
                                                    )}>
                                                        {/* Icon placeholder since we don't have dynamic Icon component easily without mapping all. 
                                                            In a real app, mapping string 'pool' to Lucide component is needed. 
                                                            For now, using a generic placeholder or dynamic loading if feasible. 
                                                            Actually, let's just use a Star or checkmark for simplicity if icon mapping is complex, 
                                                            OR purely rely on text being clear. 
                                                         */}
                                                        {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                                    </div>
                                                    <span className={cn(
                                                        "text-sm font-medium text-center",
                                                        isSelected ? "text-blue-700" : "text-gray-600"
                                                    )}>
                                                        {amenity.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div className="mt-8 text-center text-sm text-muted-foreground">
                                    <p>Select amenities to add them to your property listing.</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {visibleSections.includes('location') && (
                        <Card className="border shadow-none bg-gray-50/50">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Location Advantages</h3>
                                    <Button variant="ghost" size="sm" onClick={() => setVisibleSections(prev => prev.filter(s => s !== 'location'))}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <Label className="text-sm font-medium text-gray-700">Full Address / Map Embed Link</Label>
                                    <Textarea
                                        value={formData.address || ''}
                                        onChange={e => handleChange('address', e.target.value)}
                                        placeholder="Enter full address or paste Google Maps embed iframe src..."
                                        className="bg-white min-h-[80px]"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-medium text-gray-500 mb-2 px-2">
                                        <div>Type</div>
                                        <div>Place Name</div>
                                        <div>Distance</div>
                                        <div>Time</div>
                                    </div>
                                    {formData.proximity.map((item, index) => (
                                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start bg-white p-3 rounded-lg border shadow-sm">
                                            <Select
                                                value={item.type}
                                                onValueChange={val => handleNestedChange('proximity', index, 'type', val)}
                                            >
                                                <SelectTrigger className="border-0 bg-transparent h-auto p-0 px-2 focus:ring-0">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="education">Education</SelectItem>
                                                    <SelectItem value="healthcare">Healthcare</SelectItem>
                                                    <SelectItem value="shopping">Shopping</SelectItem>
                                                    <SelectItem value="transport">Transport</SelectItem>
                                                    <SelectItem value="leisure">Leisure</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                value={item.name}
                                                onChange={e => handleNestedChange('proximity', index, 'name', e.target.value)}
                                                placeholder="Name"
                                                className="border-0 h-auto p-0 focus-visible:ring-0"
                                            />
                                            <Input
                                                value={item.distance}
                                                onChange={e => handleNestedChange('proximity', index, 'distance', e.target.value)}
                                                placeholder="Dist."
                                                className="border-0 h-auto p-0 focus-visible:ring-0"
                                            />
                                            <Input
                                                value={item.duration}
                                                onChange={e => handleNestedChange('proximity', index, 'duration', e.target.value)}
                                                placeholder="Time"
                                                className="border-0 h-auto p-0 focus-visible:ring-0"
                                            />
                                            <Button size="icon" variant="ghost" className="absolute right-2 top-2 md:relative md:right-auto md:top-auto h-6 w-6 text-red-400 hover:text-red-600 md:ml-auto" onClick={() => removeItem('proximity', index)}>
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={() => addItem('proximity', { name: '', distance: '', duration: '', type: 'others' })} className="w-full border-dashed">
                                        <Plus className="w-4 h-4 mr-2" /> Add Location Advantage
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}




                    {visibleSections.includes('specifications') && (
                        <Card className="border shadow-none bg-gray-50/50">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Specifications</h3>
                                    <Button variant="ghost" size="sm" onClick={() => setVisibleSections(prev => prev.filter(s => s !== 'specifications'))}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="space-y-8">
                                    {(formData.specifications || []).map((spec, catIndex) => (
                                        <div key={catIndex} className="bg-white p-5 rounded-lg border shadow-sm relative">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="absolute right-2 top-2 text-red-400 hover:text-red-600 h-8 w-8"
                                                onClick={() => removeItem('specifications', catIndex)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>

                                            <div className="mb-4 pr-10">
                                                <Label className="text-xs mb-1.5 block font-semibold text-gray-500 uppercase tracking-wider">Category</Label>
                                                <Input
                                                    value={spec.category}
                                                    onChange={e => handleNestedChange('specifications', catIndex, 'category', e.target.value)}
                                                    placeholder="e.g. Structure"
                                                    className="font-medium"
                                                />
                                            </div>

                                            <div className="space-y-3 pl-4 border-l-2 border-gray-100">
                                                {spec.items.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="flex gap-3 items-start group">
                                                        <div className="flex-1">
                                                            <Input
                                                                value={item.label}
                                                                onChange={e => {
                                                                    const newSpecs = [...formData.specifications];
                                                                    newSpecs[catIndex].items[itemIndex].label = e.target.value;
                                                                    setFormData(prev => ({ ...prev, specifications: newSpecs }));
                                                                }}
                                                                placeholder="Label"
                                                                className="h-9 text-sm"
                                                            />
                                                        </div>
                                                        <div className="flex-[2]">
                                                            <Input
                                                                value={item.value}
                                                                onChange={e => {
                                                                    const newSpecs = [...formData.specifications];
                                                                    newSpecs[catIndex].items[itemIndex].value = e.target.value;
                                                                    setFormData(prev => ({ ...prev, specifications: newSpecs }));
                                                                }}
                                                                placeholder="Value"
                                                                className="h-9 text-sm"
                                                            />
                                                        </div>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() => {
                                                                const newSpecs = [...formData.specifications];
                                                                newSpecs[catIndex].items = newSpecs[catIndex].items.filter((_, i) => i !== itemIndex);
                                                                setFormData(prev => ({ ...prev, specifications: newSpecs }));
                                                            }}
                                                            className="h-9 w-9 text-gray-300 group-hover:text-red-400 shrink-0"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newSpecs = [...formData.specifications];
                                                        newSpecs[catIndex].items.push({ label: '', value: '' });
                                                        setFormData(prev => ({ ...prev, specifications: newSpecs }));
                                                    }}
                                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8"
                                                >
                                                    <Plus className="w-3 h-3 mr-1" /> Add Item
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addItem('specifications', { category: '', items: [] })}
                                        className="w-full border-dashed"
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> Add Specification Category
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>


                    )}

                    {visibleSections.includes('faqs') && (
                        <Card className="border shadow-none bg-gray-50/50">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
                                    <Button variant="ghost" size="sm" onClick={() => setVisibleSections(prev => prev.filter(s => s !== 'faqs'))}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {(formData.faqs || []).map((faq, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg border shadow-sm relative group">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="absolute right-2 top-2 text-red-400 hover:text-red-600 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeItem('faqs', index)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>

                                            <div className="space-y-3 pr-8">
                                                <div className="space-y-1">
                                                    <Label className="text-xs text-gray-500">Question</Label>
                                                    <Input
                                                        value={faq.question}
                                                        onChange={e => handleNestedChange('faqs', index, 'question', e.target.value)}
                                                        placeholder="e.g. Is there visitor parking?"
                                                        className="font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-xs text-gray-500">Answer</Label>
                                                    <Textarea
                                                        value={faq.answer}
                                                        onChange={e => handleNestedChange('faqs', index, 'answer', e.target.value)}
                                                        placeholder="e.g. Yes, ample covered visitor parking is available."
                                                        className="min-h-[60px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addItem('faqs', { question: '', answer: '' })}
                                        className="w-full border-dashed"
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> Add FAQ
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Section Selector */}
                    <div className="flex justify-center py-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2 border-dashed rounded-full px-6 border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900">
                                    Add Sections <ChevronDown className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-56">
                                <DropdownMenuItem onClick={() => toggleSection('amenities')}>Amenities and Facilities</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleSection('floorPlans')}>Floors and Plans</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleSection('location')}>Location Advantages</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleSection('specifications')}>Specifications</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleSection('faqs')}>FAQs</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleSection('timeline')}>Project Timeline (Phases)</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {visibleSections.includes('timeline') && (
                        <Card className="border shadow-none bg-gray-50/50 order-last">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Project Timeline (Phases)</h3>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setFormData(prev => ({
                                                ...prev,
                                                phases: [
                                                    { name: 'Masterplanning', status: 'completed', description: 'Vision and framework', date: 'Q4 2024' },
                                                    { name: 'Detailed Design', status: 'in-progress', description: 'Architecture and engineering', date: 'Q1 2025 - Present' },
                                                    { name: 'Phase 1 Construction', status: 'upcoming', description: 'Residential tower and retail', date: 'Q4 2025' },
                                                    { name: 'Full Completion', status: 'upcoming', description: 'All phases delivered', date: 'Q4 2027' }
                                                ]
                                            }))}
                                            className="h-7 text-xs gap-1"
                                        >
                                            <Clock className="w-3 h-3" /> Pre-fill Standard
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => setVisibleSections(prev => prev.filter(s => s !== 'timeline'))}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {(formData.phases || []).map((phase, index) => (
                                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start bg-white p-4 rounded-lg border shadow-sm">
                                            <div className="md:col-span-1 space-y-2">
                                                <Label className="text-xs text-gray-500">Phase Name</Label>
                                                <Input
                                                    value={phase.name}
                                                    onChange={e => handleNestedChange('phases', index, 'name', e.target.value)}
                                                    placeholder="e.g. Excavation"
                                                    className="h-9"
                                                />
                                            </div>
                                            <div className="md:col-span-1 space-y-2">
                                                <Label className="text-xs text-gray-500">Status</Label>
                                                <Select
                                                    value={phase.status}
                                                    onValueChange={val => handleNestedChange('phases', index, 'status', val)}
                                                >
                                                    <SelectTrigger className="h-9">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                                        <SelectItem value="upcoming">Upcoming</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="md:col-span-1 space-y-2">
                                                <Label className="text-xs text-gray-500">Date / Duration</Label>
                                                <Input
                                                    value={phase.date || ''}
                                                    onChange={e => handleNestedChange('phases', index, 'date', e.target.value)}
                                                    placeholder="e.g. Q1 2024"
                                                    className="h-9"
                                                />
                                            </div>
                                            <div className="md:col-span-1 flex items-end gap-2">
                                                <div className="flex-1 space-y-2">
                                                    <Label className="text-xs text-gray-500">Description</Label>
                                                    <Input
                                                        value={phase.description}
                                                        onChange={e => handleNestedChange('phases', index, 'description', e.target.value)}
                                                        placeholder="Short details..."
                                                        className="h-9"
                                                    />
                                                </div>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => removeItem('phases', index)}
                                                    className="text-gray-400 hover:text-red-500 h-9 w-9 shrink-0 mb-0.5"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addItem('phases', { name: '', status: 'upcoming', description: '', date: '' })}
                                        className="w-full border-dashed h-9"
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> Add Phase
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                </div>
            </ScrollArea >
        </div >
    );
};
