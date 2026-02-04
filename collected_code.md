# Project Code Collection
**Source Directory**: `/Users/sikandar/Desktop/realabodes/experience-blueprint-main`
**Total Files**: 126

--- 

## .gitignore
```txt
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Environment Variables
.env
.env.*
!.env.example

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

## README.md
```md
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

```

## components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}

```

## eslint.config.js
```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);

```

## fix_policies.sql
```sql
-- DROP existing policies to ensure a clean slate and avoid conflicts
DROP POLICY IF EXISTS "Allow public read access" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated update" ON site_settings;
DROP POLICY IF EXISTS "Allow public update" ON site_settings;
DROP POLICY IF EXISTS "Allow public insert" ON site_settings;

DROP POLICY IF EXISTS "Allow public insert" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated select" ON contact_messages;
DROP POLICY IF EXISTS "Allow public select" ON contact_messages;

-- Create tables if they don't exist ensures this script is idempotent
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- NEW PERMISSIVE POLICIES (No Authentication Required for Demo)

-- 1. Site Settings Policies
CREATE POLICY "Enable read access for all users" ON site_settings
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON site_settings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON site_settings
    FOR UPDATE USING (true);

-- 2. Contact Messages Policies
CREATE POLICY "Enable insert access for all users" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON contact_messages
    FOR SELECT USING (true);

```

## index.html
```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- TODO: Set the document title to the name of your application -->
  <title>.:: Real Abodes ::. The best real estate agent in Pimpri Chinchwad. </title>
  <meta name="description" content="Lovable Generated Project" />
  <meta name="author" content="Lovable" />

  <!-- TODO: Update og:title to match your application name -->
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>

</html>
```

## package.json
```json
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@supabase/supabase-js": "^2.93.2",
    "@tanstack/react-query": "^5.83.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.29.2",
    "gsap": "^3.14.2",
    "input-otp": "^1.4.2",
    "locomotive-scroll": "^5.0.1",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "^3.25.76",
    "zustand": "^5.0.10"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@tailwindcss/typography": "^0.5.19",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "jsdom": "^20.0.3",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^5.4.19",
    "vitest": "^3.2.4"
  }
}

```

## postcss.config.js
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

## public/robots.txt
```txt
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

```

## src/App.css
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## src/App.tsx
```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFound from "./pages/NotFound";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
// import { AuthProvider } from "./context/AuthContext";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* <AuthProvider> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* </AuthProvider> */}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

```

## src/components/NavLink.tsx
```tsx
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };

```

## src/components/ProtectedRoute.tsx
```tsx
import { Navigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
import { useAuthStore } from "@/stores/useAuthStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { session, loading } = useAuthStore();

    if (loading) {
        // Simple loading state
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

```

## src/components/admin/BlogEditor.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BlogPost, uniqueCategories } from '@/lib/blog-data';
import { ArrowLeft, Save, Eye, X, Image as ImageIcon, Plus } from 'lucide-react';
import { toast } from 'sonner';

// ImplementationLog
// Date: 2026-01-29
// WHAT: Created BlogEditor component
// WHY: To provide a UI for creating and editing blog posts
// HOW: Using shadcn components and simple state management

interface BlogEditorProps {
    blog?: BlogPost;
    onSave: (blog: BlogPost) => Promise<void>;
    onCancel: () => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ blog, onSave, onCancel }) => {
    // Initial state setup
    // Use blog from props if available as initial state

    // Default empty state
    const defaultBlogState: Omit<BlogPost, 'id'> = {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: '',
        category: '',
        tags: [],
        readTime: '5 min read',
        published: true
    };

    const [formData, setFormData] = useState<Partial<BlogPost>>(blog || defaultBlogState);
    const [previewMode, setPreviewMode] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update form data if blog prop changes
    useEffect(() => {
        if (blog) {
            setFormData(blog);
        }
    }, [blog]);

    // Auto-generate slug from title if not manually set
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug === '' || prev.slug === prev.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') ? slug : prev.slug
        }));
    };

    // Calculate read time based on content length
    useEffect(() => {
        if (formData.content) {
            const words = formData.content.split(/\s+/).length;
            const minutes = Math.ceil(words / 200);
            setFormData(prev => ({ ...prev, readTime: `${minutes} min read` }));
        }
    }, [formData.content]);

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...(prev.tags || []), tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags?.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.slug || !formData.content) {
            toast.error("Please fill in all required fields (Title, Slug, Content)");
            return;
        }

        setIsSubmitting(true);
        try {
            // If editing, use existing ID. If creating, ID will be generated by DB or Service
            // For type safety, we cast, assuming onSave handles the logic
            await onSave(formData as BlogPost);
        } catch (error) {
            console.error("Error saving blog:", error);
            // Toast is handled by parent
        } finally {
            setIsSubmitting(false);
        }
    };

    if (previewMode) {
        return (
            <div className="max-w-4xl mx-auto py-8">
                <Button variant="outline" onClick={() => setPreviewMode(false)} className="mb-6 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Editor
                </Button>

                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                    <div className="h-[400px] relative w-full">
                        {formData.coverImage ? (
                            <img
                                src={formData.coverImage}
                                alt={formData.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">No Cover Image</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <div className="flex gap-2 mb-4">
                                <span className="bg-primary px-3 py-1 rounded-full text-xs font-semibold">{formData.category || 'Uncategorized'}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{formData.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-white/80">
                                <span>{formData.date}</span>
                                <span>•</span>
                                <span>{formData.readTime}</span>
                                <span>•</span>
                                <span>By {formData.author || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 prose prose-lg max-w-none prose-headings:font-serif prose-a:text-primary">
                        <p className="lead text-xl text-gray-600 mb-8 border-l-4 border-primary pl-4 italic">
                            {formData.excerpt}
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: formData.content || '' }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={onCancel} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> Cancel
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setPreviewMode(true)} className="gap-2">
                        <Eye className="w-4 h-4" /> Preview
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                        <Save className="w-4 h-4" /> {isSubmitting ? 'Saving...' : 'Save Post'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Content</CardTitle>
                            <CardDescription>Write your blog post content here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title *</label>
                                <Input
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    placeholder="Enter blog title"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug *</label>
                                <Input
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="url-friendly-slug"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Excerpt</label>
                                <Textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Short summary for the card view..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Content (HTML supported) *</label>
                                <Textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="<p>Write your article content here...</p>"
                                    className="min-h-[400px] font-mono text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Tips: Use &lt;h2&gt; for subtitles, &lt;p&gt; for paragraphs, &lt;blockquote&gt; for quotes.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Cover Image <span className="text-xs text-muted-foreground font-normal ml-1">(Recommended: 1920x1080px)</span>
                                </label>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    const toastId = toast.loading('Uploading image...');
                                                    try {
                                                        const { uploadBlogImage } = await import('@/services/blog');
                                                        const url = await uploadBlogImage(file);
                                                        setFormData({ ...formData, coverImage: url });
                                                        toast.success('Image uploaded successfully', { id: toastId });
                                                    } catch (error) {
                                                        console.error('Upload failed:', error);
                                                        toast.error('Failed to upload image', { id: toastId });
                                                    }
                                                }}
                                                className="cursor-pointer"
                                            />
                                            <div className="absolute inset-0 flex items-center px-3 pointer-events-none text-muted-foreground text-sm bg-background border rounded-md opacity-0">
                                                Upload Image
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">Or use URL</span>
                                        </div>
                                    </div>

                                    <Input
                                        value={formData.coverImage}
                                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>

                                {formData.coverImage && (
                                    <div className="relative aspect-video rounded-md overflow-hidden bg-gray-100 border mt-2 group">
                                        <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => setFormData({ ...formData, coverImage: '' })}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {uniqueCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                    <option value="News">News</option>
                                    <option value="Updates">Updates</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Author</label>
                                <Input
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    placeholder="Author name"
                                />
                            </div>



                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tags</label>
                                <div className="flex gap-2">
                                    <Input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        placeholder="Add tag..."
                                    />
                                    <Button type="button" size="icon" variant="secondary" onClick={handleAddTag}>
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tags?.map(tag => (
                                        <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1">
                                            {tag}
                                            <button onClick={() => handleRemoveTag(tag)} className="hover:text-destructive">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

```

## src/components/admin/MessagesView.tsx
```tsx

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Calendar, CheckCircle, Circle } from 'lucide-react';
import { ContactMessage, fetchContactMessages } from '@/services/contact';
import { format } from 'date-fns';

interface MessagesViewProps {
    onBack: () => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ onBack }) => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await fetchContactMessages();
                setMessages(data);
            } catch (error) {
                console.error("Failed to load messages", error);
            } finally {
                setLoading(false);
            }
        };
        loadMessages();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Inquiries</h2>
                    <p className="text-muted-foreground">View messages from the contact form.</p>
                </div>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-10">Loading messages...</div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed">
                        <p className="text-muted-foreground">No messages found.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <Card key={msg.id || Math.random()} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-lg">{msg.name}</CardTitle>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${msg.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {msg.status?.toUpperCase() || 'NEW'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {msg.created_at ? format(new Date(msg.created_at), 'PPP p') : 'Unknown Date'}
                                    </div>
                                </div>
                                <CardDescription className="text-sm">
                                    {msg.email} • {msg.phone || 'No Phone'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-md border text-sm">
                                    {msg.message}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

```

## src/components/admin/PropertyEditor.tsx
```tsx
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

```

## src/components/admin/SettingsView.tsx
```tsx

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Shield } from 'lucide-react';
import { fetchSiteSettings, updateSiteSetting } from '@/services/settings';
import { toast } from 'sonner';

interface SettingsViewProps {
    onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const settings = await fetchSiteSettings();
                if (settings['contact_email']) {
                    setEmail(settings['contact_email']);
                }
            } catch (error) {
                console.error("Failed to load settings", error);
                toast.error("Failed to load settings");
            } finally {
                setLoading(false);
            }
        };
        loadSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSiteSetting('contact_email', email);
            toast.success("Settings saved successfully");
        } catch (error) {
            console.error("Failed to save settings", error);
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
                    <p className="text-muted-foreground">Configure global site settings.</p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Admin Configuration</CardTitle>
                            <CardDescription>Manage notification preferences and admin contacts.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="contact_email" className="text-sm font-medium">Contact Notification Email</label>
                        <Input
                            id="contact_email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <p className="text-xs text-muted-foreground">
                            This email will be used for system notifications and contact form inquiries (future integration).
                        </p>
                    </div>

                    <div className="pt-4">
                        <Button onClick={handleSave} disabled={saving || loading} className="gap-2">
                            {saving ? 'Saving...' : 'Save Changes'}
                            {!saving && <Save className="w-4 h-4" />}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

```

## src/components/home/BuyingJourneyParallax.tsx
```tsx

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Search, Home, FileCheck, Key } from 'lucide-react';

const buyingSteps = [
    {
        step: '01',
        title: 'Share Your Requirements',
        description: 'Tell us your budget, preferred location, and property type. We listen first to understand your vision.',
        icon: Search
    },
    {
        step: '02',
        title: 'Curated Property Match',
        description: 'We handpick properties that match your criteria—no spam, only relevant options that save your time.',
        icon: Home
    },
    {
        step: '03',
        title: 'Site Visits & Guidance',
        description: 'Accompanied site visits with honest insights about pros and cons. We act as your neutral advisor.',
        icon: CheckCircle2
    },
    {
        step: '04',
        title: 'Hassle-Free Booking',
        description: 'Complete documentation support, loan assistance, and smooth possession. We handle the paperwork.',
        icon: FileCheck
    },
    {
        step: '05',
        title: 'Key Handover',
        description: 'Celebrate the joy of your new home. Our relationship continues even after you move in.',
        icon: Key
    }
];

export function BuyingJourneyParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    return (
        <section ref={containerRef} className="relative py-32 bg-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium tracking-wider uppercase text-accent mb-3 block"
                    >
                        Your Journey With Us
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-5xl text-primary mb-6"
                    >
                        Simple Steps to Your <span className="text-accent italic">Dream Home</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg"
                    >
                        We've simplified the home buying process into a seamless experience.
                        Here is how we work together to find your perfect property.
                    </motion.p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Connector Line (Central) */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-1/2" />

                    {/* Build the connector line fill animation based on scroll? 
                        Ideally, we want it to fill as we scroll.
                    */}
                    <motion.div
                        style={{ scaleY: scrollYProgress, originY: 0 }}
                        className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-accent transform md:-translate-x-1/2 origin-top"
                    />

                    <div className="space-y-24 md:space-y-32">
                        {buyingSteps.map((step, index) => (
                            <JourneyStep
                                key={step.step}
                                step={step}
                                index={index}
                                total={buyingSteps.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function JourneyStep({ step, index, total }: { step: any, index: number, total: number }) {
    const isEven = index % 2 === 0;
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Parallax Effects
    // Number moves slower/faster than the card to create depth
    const yNumber = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const yCard = useTransform(scrollYProgress, [0, 1], [100, -20]); // Enters from lower

    return (
        <div ref={ref} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

            {/* Center Node (Timeline Point) */}
            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-white border-4 border-accent rounded-full z-20 transform -translate-x-1/2 md:translate-x-[-50%] mt-6 md:mt-0" />

            {/* Content Side */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <motion.div
                    style={{ y: yCard }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                            <step.icon size={24} />
                        </div>
                        <h3 className="font-serif text-2xl text-primary">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                    </p>
                </motion.div>
            </div>

            {/* Number Side (Parallax Element) */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 mt-4 md:mt-0 ${isEven ? 'md:pl-16 text-left' : 'md:pr-16 text-right'}`}>
                <motion.div
                    style={{ y: yNumber }}
                    className="opacity-20 pointer-events-none select-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.15 }}
                    transition={{ duration: 1 }}
                >
                    <span
                        className="font-serif text-[8rem] md:text-[10rem] leading-none text-transparent"
                        style={{ WebkitTextStroke: '2px var(--primary)' }}
                    >
                        {step.step}
                    </span>
                </motion.div>
            </div>

        </div>
    );
}

```

## src/components/home/FeaturedProjectsStack.tsx
```tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFeaturedProjects } from '@/hooks/useFeaturedProjects';
import { projects as staticProjects } from '@/lib/projects-data'; // Fallback

export function FeaturedProjectsStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const { projects, loading } = useFeaturedProjects();
    const displayProjects = loading || projects.length === 0 ? staticProjects.filter(p => p.featured).slice(0, 3) : projects.slice(0, 3);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-primary" data-scroll-section>
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="md:col-span-4 lg:col-span-5 text-white z-10">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-sm font-medium tracking-wider uppercase text-accent mb-4 block"
                            >
                                Handpicked for You
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
                            >
                                Featured <span className="text-accent italic">Projects</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/70 text-lg leading-relaxed mb-8"
                            >
                                Explore our exclusive collection of premium properties selected just for you.
                                Each residence is a masterpiece of design and comfort.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button
                                    size="lg"
                                    className="bg-accent text-primary hover:bg-accent/90 rounded-full px-8"
                                    asChild
                                >
                                    <Link to="/projects">
                                        View All Projects <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>

                        {/* Right Column - Stacking Cards */}
                        <div className="md:col-span-8 lg:col-span-7 relative h-[600px] flex items-center justify-center perspective-1000">
                            <div className="relative w-full max-w-md aspect-[4/5]">
                                {displayProjects.map((project, index) => (
                                    <StackingCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        total={displayProjects.length}
                                        scrollYProgress={scrollYProgress}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StackingCard({ project, index, total, scrollYProgress }: { project: any, index: number, total: number, scrollYProgress: MotionValue<number> }) {
    // Animation Logic Refined
    // Total Scroll Progress: 0 to 1
    // We have 3 cards. 
    // Card 1 Entrance: 0.1 -> 0.35
    // Card 2 Entrance: 0.35 -> 0.65
    // Card 3 Entrance: 0.65 -> 0.95

    // Rotation Logic:
    // Card 1: 
    //   - At 0.35 (when C2 starts): rotates 0 -> -5
    //   - At 0.65 (when C3 starts): rotates -5 -> -10
    // Card 2:
    //   - At 0.65 (when C3 starts): rotates 0 -> -5

    // Entrance X: "150%" to "0%"

    const enterFrom = "150%";
    const center = "0%";

    let xRange = [0, 0];
    let xOutput = [enterFrom, enterFrom];
    let rotateRange = [0, 1];
    let rotateOutput = [0, 0];
    let opacityRange = [0, 1];
    let opacityOutput = [0, 0];

    // Card 1 (Index 0)
    if (index === 0) {
        // Enters first
        xRange = [0, 0.25];
        xOutput = [enterFrom, center];

        // Opacity
        opacityRange = [0, 0.1];
        opacityOutput = [0, 1];

        // Rotation
        // 0.25 -> 0.5 (C2 enters): 0 -> -5
        // 0.5 -> 0.75 (C3 enters): -5 -> -10
        rotateRange = [0.25, 0.5, 0.75];
        rotateOutput = [0, -5, -10];
    }
    // Card 2 (Index 1)
    else if (index === 1) {
        // Enters second
        xRange = [0.25, 0.5];
        xOutput = [enterFrom, center];

        // Opacity
        opacityRange = [0.25, 0.35];
        opacityOutput = [0, 1];

        // Rotation
        // 0.5 -> 0.75 (C3 enters): 0 -> -5
        rotateRange = [0.5, 0.75];
        rotateOutput = [0, -5];
    }
    // Card 3 (Index 2)
    else if (index === 2) {
        // Enters third
        xRange = [0.5, 0.75];
        xOutput = [enterFrom, center];

        // Opacity
        opacityRange = [0.5, 0.6];
        opacityOutput = [0, 1];

        // No rotation for top card
        rotateRange = [0, 1];
        rotateOutput = [0, 0];
    }

    const x = useTransform(scrollYProgress, xRange, xOutput);
    const opacity = useTransform(scrollYProgress, opacityRange, opacityOutput);
    const rotate = useTransform(scrollYProgress, rotateRange, rotateOutput);

    return (
        <motion.div
            style={{
                x,
                opacity,
                rotate,
                zIndex: index,
                transformOrigin: "bottom left"
            }}
            className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        >
            <div className="relative h-full flex flex-col">
                <div className="relative h-[65%] overflow-hidden">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                            {project.status?.replace('-', ' ') || 'Featured'}
                        </span>
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-white text-primary">
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2 uppercase tracking-wide">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                        </div>
                        <h3 className="font-serif text-2xl mb-1 text-primary">{project.title}</h3>
                        {project.subtitle && <p className="text-sm font-medium text-black/60 mb-3">{project.subtitle}</p>}
                        <p className="text-muted-foreground text-sm line-clamp-2">{project.shortDescription}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="font-semibold text-lg">{project.priceRange || 'Price on Request'}</span>
                        <Button variant="ghost" size="sm" className="hover:bg-primary/5 hover:text-primary p-0 h-auto font-medium" asChild>
                            <Link to={`/project/${project.slug}`}>
                                Details <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

```

## src/components/home/PropertyTypesSection.tsx
```tsx

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Building2, Home, Trees, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Data for the property types
// Data for the property types
// Data for the property types
const propertyTypes = [
    {
        id: 'apartments',
        title: 'Modern Apartments',
        description: 'Elevated homes tailored for those who seek more. Experience intelligent design, breathtaking views, and a community that inspires.',
        features: ['Panoramic Views', 'Smart Living', '24/7 Concierge', 'Premium Finish'],
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        icon: Building2,
        color: 'from-blue-600 to-blue-900',
        count: '50+'
    },
    {
        id: 'villas',
        title: 'Luxury Villas',
        description: 'Your personal retreat from the world. Independent villas that blend luxury with nature, offering unmatched privacy and space.',
        features: ['Private Gardens', 'Exclusive Access', 'Bespoke Interiors', 'Serene Environs'],
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        icon: Home,
        color: 'from-amber-600 to-amber-900',
        count: '30+'
    },
    {
        id: 'plots',
        title: 'Premium Plots',
        description: 'A solid foundation for your vision. Premium NA plots in strategic locations, ready for you to build your dream or grow your wealth.',
        features: ['Clear Titles', 'Prime Location', 'Infra Ready', 'High Appreciation'],
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
        icon: Trees,
        color: 'from-emerald-600 to-emerald-900',
        count: '20+'
    }
];

export function PropertyTypesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const [activeTextIndex, setActiveTextIndex] = useState(0);

    // Dynamic Clip Path Animation
    // 0 -> 0.15: Expand from rounded box (10% inset) to full screen (0% inset)
    const clipPath = useTransform(
        scrollYProgress,
        [0, 0.15],
        ['inset(10% 10% 10% 10% round 100px)', 'inset(0% 0% 0% 0% round 0px)']
    );


    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Text Entrance Synchronization:
        // Title should begin fade/blur-to-clear exactly when mask reaches 50% expansion. 
        // 50% of 0.15 expansion range is 0.075.

        if (latest < 0.075) {
            // Before 50% expansion - Text HIDDEN (or at least index 0 is not yet triggered effectively if we treated 0 as 'pre-start')
            // However, our TextBlock logic currently shows index 0 immediately if activeTextIndex is 0.
            // To strictly follow "Title should begin... when container mask reaches 50%", we might need a "null" or "-1" state if we want it completely hidden before. 
            // But usually index 0 is just visible. 
            // Let's assume the user wants the *transition* to happen there. 
            // If we want it to 'enter', it must be *not* entering before.

            // Let's introduce a -1 state for 'not yet started' if strict sync is needed.
            if (activeTextIndex !== -1) setActiveTextIndex(-1);
        } else if (latest < 0.35) {
            // After 50% expansion (0.075) but before next card
            if (activeTextIndex !== 0) setActiveTextIndex(0);
        } else if (latest < 0.68) {
            if (activeTextIndex !== 1) setActiveTextIndex(1);
        } else {
            if (activeTextIndex !== 2) setActiveTextIndex(2);
        }
    });

    return (
        <section ref={containerRef} className="relative h-[400vh]" data-scroll-section>
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

                <motion.div
                    style={{ clipPath }}
                    className="relative w-full h-full"
                >
                    {/* Layer 1: Full Screen Background Images */}
                    <div className="absolute inset-0 w-full h-full z-0">
                        {propertyTypes.map((type, index) => (
                            <ImageBackground
                                key={type.id}
                                data={type}
                                index={index}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>

                    {/* Layer 2: Floating Text Card (Desktop) */}
                    <div className="hidden md:flex absolute inset-0 z-10 items-center pointer-events-none">
                        <div className="container mx-auto px-6 lg:px-8">
                            <div className="w-full max-w-[600px] bg-primary/95 backdrop-blur-sm p-10 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto">
                                <div className="relative h-[450px]">
                                    <AnimatePresence mode="popLayout">
                                        {propertyTypes.map((type, index) => (
                                            activeTextIndex === index && (
                                                <TextBlock
                                                    key={type.id}
                                                    data={type}
                                                    index={index}
                                                />
                                            )
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout (Floating card style adapted) */}
                    <div className="md:hidden absolute inset-0 z-10 pointer-events-none flex items-end">
                        {/* We can't do the full sticky effect easily on mobile with this height.
                             We'll stick to the previous mobile implementation but styled to match.
                             Actually, let's keep the previous mobile section logic which effectively overlays this.
                         */}
                    </div>

                </motion.div>

            </div>

            {/* Mobile Content (Overlay - Visible only on mobile) */}
            <div className="md:hidden absolute inset-0 bg-background flex flex-col">
                <div className="py-12 px-6">
                    <div className="mb-8 text-center">
                        <span className="text-sm font-medium tracking-wider uppercase text-accent mb-2 block">
                            Our Expertise
                        </span>
                        <h2 className="font-serif text-3xl text-foreground">
                            Find Your Space
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {propertyTypes.map((type) => (
                            <div key={type.id} className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
                                <img
                                    src={type.image}
                                    alt={type.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-accent text-primary">
                                            <type.icon size={20} />
                                        </div>
                                        <h3 className="text-2xl font-serif">{type.title}</h3>
                                    </div>
                                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                                        {type.description}
                                    </p>
                                    <Button variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-white/90">
                                        Explore <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}

// Sub-component for Background Images
function ImageBackground({ data, index, scrollYProgress }: { data: any, index: number, scrollYProgress: MotionValue<number> }) {
    // Logic for slide/reveal
    // Same stagger logic as before for consistency
    const startRange = index === 1 ? 0.25 : 0.58;
    const endRange = index === 1 ? 0.40 : 0.73;

    // Use clipPath inset for the "reveal" effect instead of just moving Y, 
    // creating a "wiping" effect or "stacking" effect.
    // Or simple Y translation like cards.
    const y = useTransform(
        scrollYProgress,
        [startRange, endRange],
        ['100%', '0%']
    );

    // Scale for a slight zoom effect
    const scale = useTransform(scrollYProgress, [startRange, endRange], [1.1, 1]);

    // Parallax effect: Move image slightly up/down as we scroll through the section
    // We use the full range [0, 1] so it moves continuously throughout the section
    const parallaxY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);


    const zIndex = index;
    const isBase = index === 0;

    return (
        <motion.div
            style={{
                y: isBase ? 0 : y,
                zIndex
            }}
            className="absolute inset-0 w-full h-full overflow-hidden"
        >
            <motion.img
                style={{
                    scale: isBase ? 1 : scale,
                    y: parallaxY
                }}
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
            />
            {/* Dark overlay to ensure text readability on the left if needed outside the card? 
                The card has its own background, so maybe just a subtle one. 
            */}
            <div className="absolute inset-0 bg-black/20" />
        </motion.div>
    );
}


// Sub-component for desktop text animations
// Sub-component for desktop text animations
function TextBlock({ data, index }: { data: any, index: number }) {
    // Staggered animation variants
    const containerVariants = {
        hidden: {
            opacity: 0,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0
            }
        },
        exit: {
            opacity: 0,
            filter: "blur(10px)",
            transition: {
                duration: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            filter: "blur(10px)",
            y: 0
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            filter: "blur(10px)",
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    const linkVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.2 }
        },
        exit: {
            opacity: 0,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex flex-col justify-center"
        >
            <motion.span
                variants={itemVariants}
                className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-6 block"
            >
                Our Expertise
            </motion.span>

            <motion.h3
                variants={itemVariants}
                className="text-4xl md:text-5xl font-serif text-white mb-6"
            >
                {data.title}
            </motion.h3>

            <motion.div variants={itemVariants} className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl md:text-6xl font-bold text-accent font-serif">
                    {data.count}
                </span>
                <span className="text-white/60 text-lg uppercase tracking-wider font-medium">
                    Available
                </span>
            </motion.div>

            <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-8 leading-relaxed max-w-md"
            >
                {data.description}
            </motion.p>

            <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4 mb-10"
            >
                {data.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        <span className="text-white/90 text-sm">{feature}</span>
                    </div>
                ))}
            </motion.div>

            <motion.div variants={linkVariants}>
                <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 border-0 font-medium">
                    View {data.title} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </motion.div>
        </motion.div>
    );
}


```

## src/components/home/ServiceAreasSection.tsx
```tsx

import { motion } from 'framer-motion';

const serviceAreas = [
    'Wakad', 'Hinjewadi', 'Baner', 'Balewadi', 'Pimple Saudagar',
    'Ravet', 'Tathawade', 'Punawale', 'Chikhali', 'Moshi',
];

export function ServiceAreasSection() {
    return (
        <section className="relative py-20 bg-gray-50 z-10">
            <div className="container mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h3 className="font-serif text-2xl text-primary mb-3">Areas We Serve</h3>
                    <p className="text-muted-foreground">Properties available across Pune's prime locations</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {serviceAreas.map((area, i) => (
                        <motion.div
                            key={area}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 bg-white rounded-full border border-gray-200 text-sm font-medium text-gray-600 cursor-default shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary"
                        >
                            {area}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

```

## src/components/home/TestimonialsSection.tsx
```tsx

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Vikas Gupta',
        property: 'Rama Krystal One, Chikhali',
        quote: 'Real Abodes made finding our dream home a seamless experience. Their team is professional and highly knowledgeable.',
        rating: 5,
    },
    {
        name: 'Shashank Chaudhary',
        property: 'Sankeshwar Sparsh, Moshi',
        quote: "With Mr. Hameed's help, we found our dream home. He truly understands your needs and recommends the best options.",
        rating: 5,
    },
    {
        name: 'Priya Sharma',
        property: 'Azure Residence, Wakad',
        quote: 'Exceptional service from start to finish. They guided us through every step of the buying process with patience and expertise.',
        rating: 5,
    },
];

export function TestimonialsSection() {
    return (
        <section className="relative py-24 bg-white z-10">
            <div className="container mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-sm font-medium tracking-wider uppercase text-accent mb-3 block">
                        Happy Homeowners
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                        What Our Clients Say
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative group hover:shadow-lg transition-all duration-300"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20 group-hover:text-accent/40 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                            </div>

                            <p className="text-primary/80 mb-8 leading-relaxed italic relative z-10">
                                "{testimonial.quote}"
                            </p>

                            <div className="pt-6 border-t border-gray-200">
                                <div className="font-serif text-lg text-primary mb-1">{testimonial.name}</div>
                                <div className="text-sm text-accent font-medium">{testimonial.property}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

```

## src/components/home/TrustSignalsSection.tsx
```tsx

import { motion } from 'framer-motion';
import { Shield, Users, Award, CheckCircle2 } from 'lucide-react';

const trustSignals = [
    {
        icon: Shield,
        title: 'RERA Registered',
        description: 'All our listed properties are RERA compliant ensuring complete transparency',
    },
    {
        icon: Users,
        title: 'Channel Partners',
        description: 'Official channel partners with leading developers in Pune region',
    },
    {
        icon: Award,
        title: '500+ Happy Families',
        description: 'Trusted by hundreds of families to find their dream homes',
    },
    {
        icon: CheckCircle2,
        title: 'End-to-End Support',
        description: 'From site visits to documentation, we handle everything',
    },
];

export function TrustSignalsSection() {
    return (
        <section className="relative py-24 bg-gray-50 z-10">
            <div className="container mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-sm font-medium tracking-wider uppercase text-accent mb-3 block">
                        Why Choose Us
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                        Your Trust, Our Commitment
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We prioritize your peace of mind with a transparent and professional approach.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trustSignals.map((signal, i) => (
                        <motion.div
                            key={signal.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl p-8 border border-gray-100 text-center shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                <signal.icon className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-xl text-primary mb-3">{signal.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{signal.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

```

## src/components/layout/Footer.tsx
```tsx
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-50 border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="font-serif text-2xl text-gradient-gold">
              Real Abodes
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Opening doors to a better living. Your trusted partner in real estate excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-foreground">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {['Home', 'Projects', 'Blog', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm underline-hover inline-block"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-foreground">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:info@realabodes.in" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>info@realabodes.in</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 9876 543 210</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>The Evoq, Wakad<br />Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground text-sm">
              Subscribe to receive updates on new projects.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-gold rounded-lg text-primary-foreground hover:shadow-gold transition-shadow"
                aria-label="Subscribe"
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Real Abodes. All rights reserved.
            <span className="mx-2">|</span>
            <a href="https://blinkwiser.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Designed by BlinkWiser
            </a>
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

```

## src/components/layout/Header.tsx
```tsx
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerWidth < 768 ? 20 : 50;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine effective state for styling
  // If menu is open, we force the "scrolled" look (solid bg) for readability
  const isSolid = isScrolled || isMobileMenuOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          borderBottomColor: "transparent",
          paddingBlock: "24px"
        }}
        animate={{
          backgroundColor: isSolid ? "hsl(0 0% 100% / 0.9)" : "transparent",
          backdropFilter: isSolid ? "blur(12px)" : "blur(0px)",
          borderBottomColor: isSolid ? "hsl(var(--border))" : "transparent",
          paddingBlock: isSolid ? (window.innerWidth < 768 ? "12px" : "12px") : (window.innerWidth < 768 ? "16px" : "24px")
        }}
        style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full"
      >
        <div className="container mx-auto flex items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
              style={{ height: '45px' }}
            >
              {/* White logo - visible when header is transparent */}
              <img
                src="/assets/whitelogo.svg"
                alt="Real Abodes"
                className={`h-[45px] w-auto transition-opacity duration-300 ${isSolid ? 'opacity-0' : 'opacity-100'}`}
                style={{ position: isSolid ? 'absolute' : 'relative' }}
              />
              {/* Dark logo - visible when header has white background */}
              <img
                src="/assets/logo-v.svg"
                alt="Real Abodes"
                className={`h-[45px] w-auto transition-opacity duration-300 ${isSolid ? 'opacity-100' : 'opacity-0'}`}
                style={{ position: isSolid ? 'relative' : 'absolute' }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium tracking-wide uppercase underline-hover transition-colors ${isSolid
                  ? (location.pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground')
                  : 'text-white hover:text-white/80'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isSolid
                ? 'bg-gradient-gold text-primary-foreground hover:shadow-gold'
                : 'bg-transparent border border-white text-white hover:bg-white/10'
                }`}
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 transition-colors duration-300 ${isSolid ? 'text-foreground' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-card border-t border-border shadow-lg"
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg font-medium ${location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-primary-foreground rounded-full text-sm font-medium mt-4 w-full justify-center"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

```

## src/components/layout/Layout.tsx
```tsx
import { ReactNode, useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  removeTopPadding?: boolean;
}

export function Layout({ children, removeTopPadding = false }: LayoutProps) {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      }
    });

    return () => {
      scroll.destroy();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${removeTopPadding ? 'pt-0' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

```

## src/components/projects/EmptyState.tsx
```tsx
import { motion } from 'framer-motion';
import { Search, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  searchQuery: string;
  onClear: () => void;
}

export function EmptyState({ searchQuery, onClear }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        {searchQuery ? (
          <Search className="w-10 h-10 text-muted-foreground" />
        ) : (
          <FolderOpen className="w-10 h-10 text-muted-foreground" />
        )}
      </div>
      
      <h3 className="font-serif text-2xl text-foreground mb-2">
        {searchQuery ? 'No results found' : 'No projects yet'}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-6">
        {searchQuery
          ? `We couldn't find any projects matching "${searchQuery}". Try adjusting your filters or search terms.`
          : 'Projects will appear here once they are added.'}
      </p>

      {searchQuery && (
        <button
          onClick={onClear}
          className="px-6 py-2.5 bg-gradient-gold text-primary-foreground rounded-full text-sm font-medium hover:shadow-gold transition-shadow"
        >
          Clear Search
        </button>
      )}
    </motion.div>
  );
}

```

## src/components/projects/ProjectCard.tsx
```tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { Project } from '@/lib/projects-data';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
  index: number;
  priority?: 'high' | 'normal';
}

export function ProjectCard({ project, index, priority = 'normal' }: ProjectCardProps) {
  const statusColors = {
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planning: 'Planning',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group ${priority === 'high' ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <Link 
        to={`/project/${project.slug}`}
        className="block h-full"
        aria-label={`View ${project.title} project details`}
      >
        <div className="relative h-full bg-gradient-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg">
          {/* Image Container with Overlay */}
          <div className={`relative overflow-hidden ${priority === 'high' ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
            <img
              src={project.thumbnail}
              alt={`${project.title} - ${project.subtitle}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-gold text-primary-foreground">
                  Featured
                </span>
              </div>
            )}

            {/* Hover Arrow */}
            <motion.div
              initial={{ opacity: 0, x: -10, y: 10 }}
              whileHover={{ opacity: 1, x: 0, y: 0 }}
              className="absolute bottom-4 right-4 p-3 bg-primary rounded-full text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Category */}
            <span className="text-xs font-medium tracking-wider uppercase text-primary">
              {project.category}
            </span>

            {/* Title & Subtitle */}
            <div>
              <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 italic font-serif">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {project.shortDescription}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {project.location.split(',')[0]}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            </div>

            {/* Tags - Show first 3 */}
            {priority === 'high' && (
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

```

## src/components/projects/ProjectFilters.tsx
```tsx
import { motion } from 'framer-motion';
import { Search, X, Grid, List } from 'lucide-react';
import { categories, statusFilters, budgetRanges, serviceAreas } from '@/lib/projects-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectFiltersProps {
  selectedCategory: string;
  selectedStatus: string;
  selectedBudget: string;
  selectedLocation: string;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onBudgetChange: (budget: string) => void;
  onLocationChange: (location: string) => void;
  onSearchChange: (search: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  resultCount: number;
}

export function ProjectFilters({
  selectedCategory,
  selectedStatus,
  selectedBudget,
  selectedLocation,
  searchQuery,
  viewMode,
  onCategoryChange,
  onStatusChange,
  onBudgetChange,
  onLocationChange,
  onSearchChange,
  onViewModeChange,
  resultCount,
}: ProjectFiltersProps) {
  const hasActiveFilters =
    selectedCategory !== 'All Projects' ||
    selectedStatus !== 'All Status' ||
    selectedBudget !== 'All Budgets' ||
    selectedLocation !== 'All Locations' ||
    searchQuery !== '';

  const clearFilters = () => {
    onCategoryChange('All Projects');
    onStatusChange('All Status');
    onBudgetChange('All Budgets');
    onLocationChange('All Locations');
    onSearchChange('');
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, location, or tag..."
          className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          aria-label="Search projects"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div className="flex flex-col gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              role="tab"
              aria-selected={selectedCategory === category}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${selectedCategory === category
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dropdowns & View Toggle */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusFilters.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Budget Filter */}
            <Select value={selectedBudget} onValueChange={onBudgetChange}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={onLocationChange}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {serviceAreas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden md:block w-px h-8 bg-border mx-2" />

          {/* View Toggle */}
          <div className="flex items-center self-end md:self-auto bg-card border border-border rounded-lg p-1 ml-auto md:ml-0">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count & Clear */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          Showing <span className="text-foreground font-medium">{resultCount}</span> project{resultCount !== 1 ? 's' : ''}
        </p>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear filters
          </motion.button>
        )}
      </div>
    </div>
  );
}

```

## src/components/projects/ProjectListItem.tsx
```tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, Clock } from 'lucide-react';
import { Project } from '@/lib/projects-data';
import { Badge } from '@/components/ui/badge';

interface ProjectListItemProps {
  project: Project;
  index: number;
}

export function ProjectListItem({ project, index }: ProjectListItemProps) {
  const statusColors = {
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planning: 'Planning',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group flex flex-col md:flex-row gap-6 p-4 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
        aria-label={`View ${project.title} project details`}
      >
        {/* Thumbnail */}
        <div className="relative w-full md:w-64 lg:w-80 flex-shrink-0 aspect-[16/10] md:aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div className="space-y-3">
            {/* Top Row: Category & Status */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium tracking-wider uppercase text-primary">
                {project.category}
              </span>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
              {project.featured && (
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gradient-gold text-primary-foreground">
                  Featured
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 italic font-serif">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {project.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bottom Row: Meta & CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {project.duration}
              </span>
            </div>

            <span className="flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
              View Project
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

```

## src/components/projects/SkeletonCard.tsx
```tsx
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  priority?: 'high' | 'normal';
}

export function SkeletonCard({ priority = 'normal' }: SkeletonCardProps) {
  return (
    <div className={`bg-gradient-card rounded-xl overflow-hidden border border-border ${priority === 'high' ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <Skeleton className={`w-full ${priority === 'high' ? 'aspect-[16/10]' : 'aspect-[4/3]'}`} />
      <div className="p-6 space-y-4">
        <Skeleton className="h-3 w-20" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-gradient-card rounded-xl border border-border">
      <Skeleton className="w-full md:w-64 lg:w-80 flex-shrink-0 aspect-[16/10] md:aspect-[4/3] rounded-lg" />
      <div className="flex-1 py-2 space-y-4">
        <div className="flex gap-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <div className="flex gap-4 pt-4 border-t border-border">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

```

## src/components/ui/Preloader.tsx
```tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
    onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 20); // 20ms * 100 = 2000ms = 2 seconds

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            // Small buffer after 100% to ensure smoothness
            setTimeout(() => {
                onComplete();
            }, 500);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary text-white"
        >
            <div className="w-full max-w-md px-6">
                <div className="flex justify-between text-sm uppercase tracking-widest mb-2 opacity-50">
                    <span>Loading Experience</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />
                </div>
                <div className="mt-8 text-center overflow-hidden">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <img
                            src="/assets/preloader.svg"
                            alt="Real Abodes"
                            className="h-16 md:h-20 w-auto"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

```

## src/components/ui/accordion.tsx
```tsx
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

```

## src/components/ui/alert-dialog.tsx
```tsx
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

```

## src/components/ui/alert.tsx
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

```

## src/components/ui/aspect-ratio.tsx
```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };

```

## src/components/ui/avatar.tsx
```tsx
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

```

## src/components/ui/badge.tsx
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

```

## src/components/ui/breadcrumb.tsx
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

```

## src/components/ui/button.tsx
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

```

## src/components/ui/calendar.tsx
```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

```

## src/components/ui/card.tsx
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

```

## src/components/ui/carousel.tsx
```tsx
import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };

```

## src/components/ui/chart.tsx
```tsx
import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };

```

## src/components/ui/checkbox.tsx
```tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

```

## src/components/ui/collapsible.tsx
```tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

```

## src/components/ui/command.tsx
```tsx
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

```

## src/components/ui/context-menu.tsx
```tsx
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

```

## src/components/ui/dialog.tsx
```tsx
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

```

## src/components/ui/drawer.tsx
```tsx
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

```

## src/components/ui/dropdown-menu.tsx
```tsx
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

```

## src/components/ui/form.tsx
```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
  },
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };

```

## src/components/ui/hover-card.tsx
```tsx
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };

```

## src/components/ui/input-otp.tsx
```tsx
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  ),
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  ),
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

```

## src/components/ui/input.tsx
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

```

## src/components/ui/label.tsx
```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

```

## src/components/ui/menubar.tsx
```tsx
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};

```

## src/components/ui/navigation-menu.tsx
```tsx
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

```

## src/components/ui/pagination.tsx
```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 pl-2.5", className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

```

## src/components/ui/popover.tsx
```tsx
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };

```

## src/components/ui/progress.tsx
```tsx
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

```

## src/components/ui/radio-group.tsx
```tsx
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

```

## src/components/ui/resizable.tsx
```tsx
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

```

## src/components/ui/scroll-area.tsx
```tsx
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

```

## src/components/ui/select.tsx
```tsx
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

```

## src/components/ui/separator.tsx
```tsx
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

```

## src/components/ui/sheet.tsx
```tsx
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};

```

## src/components/ui/sidebar.tsx
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
        >
          {children}
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", className)}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 hover:after:bg-sidebar-border sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-sidebar="input"
        className={cn(
          "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        data-sidebar="separator"
        className={cn("mx-2 w-auto bg-sidebar-border", className)}
        {...props}
      />
    );
  },
);
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "group-data-[collapsible=icon]:hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
  ),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ ...props }, ref) => (
  <li ref={ref} {...props} />
));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

```

## src/components/ui/skeleton.tsx
```tsx
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };

```

## src/components/ui/slider.tsx
```tsx
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

```

## src/components/ui/sonner.tsx
```tsx
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

```

## src/components/ui/switch.tsx
```tsx
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

```

## src/components/ui/table.tsx
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

```

## src/components/ui/tabs.tsx
```tsx
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

```

## src/components/ui/textarea.tsx
```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

```

## src/components/ui/toast.tsx
```tsx
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};

```

## src/components/ui/toaster.tsx
```tsx
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

```

## src/components/ui/toggle-group.tsx
```tsx
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };

```

## src/components/ui/toggle.tsx
```tsx
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

```

## src/components/ui/tooltip.tsx
```tsx
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

```

## src/components/ui/use-toast.ts
```ts
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };

```

## src/context/AuthContext.tsx
```tsx

import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextType = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    signOut: async () => { },
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const value = {
        session,
        user,
        loading,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

```

## src/hooks/use-mobile.tsx
```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

```

## src/hooks/use-toast.ts
```ts
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };

```

## src/hooks/useFeaturedProjects.ts
```ts

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/lib/projects-data';

export function useFeaturedProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('featured', true)
                    .limit(3);

                if (error) throw error;

                // Map Supabase data to Project interface if necessary
                // Assuming schema matches for now, but handling potential discrepancies
                const mappedProjects: Project[] = (data || []).map((p: any) => ({
                    ...p,
                    priceRange: p.price_range || p.details?.priceRange,
                    subtitle: p.subtitle || p.details?.subtitle,
                    // Ensure thumbnail exists, fallback if necessary
                    thumbnail: p.thumbnail || p.details?.thumbnail || 'https://placehold.co/600x800',
                    // Default other required fields if missing in DB
                    images: p.images || [],
                    metrics: p.metrics || [],
                    phases: p.phases || [],
                    tags: p.tags || [],
                    highlights: p.highlights || [],
                    amenities: p.amenities || [],
                    proximity: p.proximity || [],
                    floorPlans: p.floorPlans || [],
                    specifications: p.specifications || [],
                    faqs: p.faqs || [],
                    relatedProjects: p.relatedProjects || []
                }));

                setProjects(mappedProjects);
            } catch (err: any) {
                console.error('Error fetching featured projects:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return { projects, loading, error };
}

```

## src/index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Azure-inspired luxury design system */

@layer base {
  :root {
    /* Clean white/cream base - luxury light theme */
    --background: 40 15% 97%;
    --foreground: 200 50% 21%;

    /* Cards with subtle warmth */
    --card: 0 0% 100%;
    --card-foreground: 200 50% 21%;
    --card-hover: 40 15% 96%;

    /* Popover surfaces */
    --popover: 0 0% 100%;
    --popover-foreground: 200 50% 21%;

    /* Azure Royal Blue - primary brand color */
    --primary: 200 50% 21%;
    --primary-foreground: 0 0% 100%;
    --primary-light: 200 40% 35%;

    /* Warm cream secondary */
    --secondary: 40 20% 94%;
    --secondary-foreground: 200 50% 21%;

    --muted: 40 15% 92%;
    --muted-foreground: 200 20% 45%;

    /* Luxury Gold accent */
    --accent: 43 45% 60%;
    --accent-foreground: 200 50% 15%;

    --destructive: 0 65% 50%;
    --destructive-foreground: 0 0% 100%;

    --border: 40 15% 88%;
    --input: 40 15% 92%;
    --ring: 200 50% 21%;

    --radius: 0.5rem;

    /* Typography */
    --font-serif: 'Playfair Display', Georgia, serif;
    --font-sans: 'Inter', system-ui, sans-serif;

    /* Gradients - Azure blue & gold */
    --gradient-gold: linear-gradient(135deg, hsl(43 45% 60%), hsl(45 50% 65%));
    --gradient-blue: linear-gradient(135deg, hsl(200 50% 21%), hsl(200 45% 30%));
    --gradient-light: linear-gradient(180deg, hsl(40 15% 97%), hsl(40 15% 94%));
    --gradient-card: linear-gradient(145deg, hsl(0 0% 100%), hsl(40 15% 97%));

    /* Shadows */
    --shadow-sm: 0 2px 8px -2px hsl(200 50% 21% / 0.08);
    --shadow-md: 0 8px 24px -8px hsl(200 50% 21% / 0.12);
    --shadow-lg: 0 16px 48px -12px hsl(200 50% 21% / 0.15);
    --shadow-gold: 0 8px 32px -8px hsl(43 45% 60% / 0.25);

    /* Sidebar */
    --sidebar-background: 200 50% 21%;
    --sidebar-foreground: 0 0% 100%;
    --sidebar-primary: 43 45% 60%;
    --sidebar-primary-foreground: 200 50% 15%;
    --sidebar-accent: 200 45% 28%;
    --sidebar-accent-foreground: 0 0% 100%;
    --sidebar-border: 200 40% 30%;
    --sidebar-ring: 43 45% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: var(--font-sans);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-serif);
  }
}

@layer components {
  .text-gradient-gold {
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .bg-gradient-gold {
    background: var(--gradient-gold);
  }

  .bg-gradient-card {
    background: var(--gradient-card);
  }

  .shadow-gold {
    box-shadow: var(--shadow-gold);
  }

  /* Elegant underline animation */
  .underline-hover {
    position: relative;
  }

  .underline-hover::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: hsl(var(--primary));
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .underline-hover:hover::after {
    width: 100%;
  }

  /* Glass morphism - light theme */
  .glass {
    background: hsl(0 0% 100% / 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid hsl(var(--border));
  }

  /* Image overlay gradient - lighter */
  .image-overlay {
    position: relative;
  }

  .image-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, hsl(0 0% 0% / 0.6) 0%, transparent 60%);
    pointer-events: none;
  }
}
```

## src/integrations/supabase/client.ts
```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase URL or Anon Key. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);

```

## src/lib/blog-data.ts
```ts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  published?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-luxury-living-2026",
    title: "The Future of Luxury Living: Trends to Watch in 2026",
    excerpt: "Explore the emerging trends that are redefining high-end residential spaces, from sustainable smart homes to wellness-integrated environments.",
    content: `
      <h2>Redefining Opulence through Sustainability</h2>
      <p>The concept of luxury is shifting. It's no longer just about gold taps and marble floors; it's about conscious living. In 2026, we are seeing a massive surge in <strong>biophilic design</strong>, where nature is not just a view but an integral part of the architecture.</p>
      
      <p>Eco-luxury is the new standard. Homeowners are demanding energy-efficient systems that don't compromise on comfort. Solar skins, geothermal heating, and smart water management systems are becoming standard in ultra-luxury developments.</p>

      <h2>The Wellness Sanctuary</h2>
      <p>Your home is your sanctuary. The new wave of luxury homes integrates wellness into the very fabric of the building. Think circadian lighting systems that adjust to your natural sleep-wake cycle, air purification systems that rival hospital standards, and dedicated spaces for meditation and movement.</p>
      
      <blockquote>"True luxury is silence, space, and time. And the modern home is designed to give you exactly that."</blockquote>

      <h2>Smart Homes, but Invisible</h2>
      <p>Technology is everywhere, but it should be seen and not heard (or rather, felt and not seen). The trend is towards <em>calm technology</em>—tech that works in the background to enhance your life without demanding your attention. Voice-controlled everything, but with privacy at the core.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1600596542815-e32c8cc13bc9?q=80&w=2600&auto=format&fit=crop",
    date: "January 24, 2026",
    author: "Sarah Jenkins",
    category: "Market Trends",
    tags: ["Luxury", "Sustainability", "Wellness"],
    readTime: "5 min read",
  },
  {
    id: "2",
    slug: "investing-in-premium-real-estate",
    title: "Why Premium Real Estate Remains a Safe Haven",
    excerpt: "In volatile economic times, tangible assets like luxury real estate offer stability and appreciation. Here's why smart investors are looking at top-tier properties.",
    content: `
      <h2>Stability in Volatility</h2>
      <p>History has shown that while stock markets fluctuate, prime real estate in desirable locations holds its value. Whether it's a penthouse in New York or a villa in Dubai, the demand for exclusive properties often outstrips supply.</p>

      <h2>The Rental Yield Advantage</h2>
      <p>Beyond capital appreciation, luxury properties are commanding record-high rental yields. With the rise of the global nomad and executive relocations, the market for high-end short and medium-term rentals is booming.</p>
      
      <h2>Location, Location, Lifestyle</h2>
      <p>Investment today is driven by lifestyle. Properties that offer access to world-class amenities, privacy, and security are not just homes; they are assets that appreciate because they offer a quality of life that is scarce.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2600&auto=format&fit=crop",
    date: "January 20, 2026",
    author: "Michael Ross",
    category: "Real Estate Tips",
    tags: ["Investment", "Finance", "Property"],
    readTime: "4 min read",
  },
  {
    id: "3",
    slug: "timeless-interior-design",
    title: "Creating Timeless Interiors: A Guide to Classic Elegance",
    excerpt: "Trends come and go, but style is eternal. Learn how to curate a home that feels fresh today and relevant ten years from now.",
    content: `
      <h2>The Foundation: Quality Materials</h2>
      <p>Timeless design starts with the bones of the house. Hardwood floors, natural stone, and quality craftsmanship never go out of style. Avoid trendy materials that might look dated in a few years.</p>
      
      <h2>Neutral Palettes with Textural Depth</h2>
      <p>A neutral color palette doesn't have to be boring. Layering textures—linens, wools, wood grains—adds warmth and interest without the visual noise of bold patterns. It creates a calming backdrop for your life.</p>

      <h2>Invest in Statement Pieces</h2>
      <p>Instead of filling a room with clutter, choose a few high-quality pieces that speak to you. A vintage armchair, a hand-knotted rug, or a piece of original art can ground a room and give it soul.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop",
    date: "January 15, 2026",
    author: "Elena Vasquez",
    category: "Interior Design",
    tags: ["Design", "Interiors", "Style"],
    readTime: "6 min read",
  },
  {
    id: "4",
    slug: "smart-home-integration",
    title: "Seamless Smart Home Integration for Modern Families",
    excerpt: "How to automate your home without making it feel like a spaceship. Practical tips for families who want convenience without complexity.",
    content: `
      <h2>Unified Control Systems</h2>
      <p>The key to a successful smart home is a single interface. Instead of five different apps for lights, music, and heating, use a unified system like Control4 or Savant. This makes technology accessible to every family member, not just the tech-savvy ones.</p>
      
      <h2>Security and Peace of Mind</h2>
      <p>Modern smart security goes beyond cameras. We're talking about leak detection sensors, smart locks that allow remote access for service personnel, and perimeter monitoring that alerts you before a breach occurs.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=2600&auto=format&fit=crop",
    date: "January 10, 2026",
    author: "David Chen",
    category: "Technology",
    tags: ["Smart Home", "Automation", "Family"],
    readTime: "3 min read",
  },
  {
    id: "5",
    slug: "architecture-of-light",
    title: "The Architecture of Light: Shaping Space with Illumination",
    excerpt: "Light is the fourth dimension of architecture. Discover how lighting design can transform the mood and functionality of your living spaces.",
    content: `
      <h2>Layering Light</h2>
      <p>A well-lit room needs three layers of light: ambient (general illumination), task (for reading or cooking), and accent (to highlight art or features). Relying on just overhead downlights creates a flat, clinical atmosphere.</p>
      
      <h2>Daylight Harvesting</h2>
      <p>Maximizing natural light is not just about big windows; it's about orientation and control. Automated shades that adjust with the sun can protect your interiors from UV damage while maintaining views and natural brightness.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2600&auto=format&fit=crop",
    date: "January 05, 2026",
    author: "Sophia Lemoine",
    category: "Architecture",
    tags: ["Lighting", "Design", "Architecture"],
    readTime: "7 min read",
  }
];

export const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));

```

## src/lib/filter-utils.ts
```ts

export function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;

    // Normalize string
    const str = priceStr.toLowerCase().replace(/,/g, '');

    // Extract number
    const match = str.match(/[\d.]+/);
    if (!match) return 0;

    const num = parseFloat(match[0]);

    // Apply multiplier
    if (str.includes('cr') || str.includes('crore')) {
        return num * 10000000;
    }
    if (str.includes('l') || str.includes('lakh') || str.includes('lac')) {
        return num * 100000;
    }
    if (str.includes('k')) {
        return num * 1000;
    }

    // If just a number/price, assume it's raw value if > 1000, otherwise might be a unit issue?
    // Most prices in our data have "Lakh" or "Cr" or "per sq.ft" (which is rent/lease usually)
    return num;
}

export function matchesBudget(project: any, budgetRange: string): boolean {
    if (!budgetRange || budgetRange === 'All Budgets') return true;

    let min = 0;
    let max = Infinity;

    // Parse budget range
    // Options:
    // "₹30 Lakh - ₹50 Lakh"
    // "₹50 Lakh - ₹75 Lakh"
    // "₹75 Lakh - ₹1 Crore"
    // "₹1 Crore - ₹2 Crore"
    // "Above ₹2 Crore"

    if (budgetRange.includes('Above')) {
        min = 20000000; // 2 Cr
    } else {
        // Extract both numbers
        const parts = budgetRange.split('-');
        if (parts.length === 2) {
            min = parsePrice(parts[0]);
            max = parsePrice(parts[1]);
        }
    }

    // Get all prices associated with the project
    const prices: number[] = [];

    // Check priceRange string
    if (project.priceRange) {
        // If it's a range "X - Y", we should check overlap? 
        // Or just check if either end is in range?
        // Let's parse all numbers found in priceRange string
        // Simple approach: Extract all numbers with units
        // This is hard.

        // Alternative: extract just min and max from project.priceRange if it matches pattern
        // "₹65 Lakh - ₹2.5 Cr"
        const rangeParts = project.priceRange.split('-');
        if (rangeParts.length > 0) prices.push(parsePrice(rangeParts[0]));
        if (rangeParts.length > 1) prices.push(parsePrice(rangeParts[1]));
    }

    // Check floorPlans
    if (project.floorPlans) {
        project.floorPlans.forEach((plan: any) => {
            if (plan.price) {
                prices.push(parsePrice(plan.price));
            }
        });
    }

    // If no prices found, maybe include? Or exclude. Let's exclude.
    if (prices.length === 0) return false;

    // Check if any price falls within range
    // Or if project range overlaps with budget range
    // Simple check: is there any price point in the project that is >= min and <= max
    return prices.some(p => p >= min && p <= max);
}

```

## src/lib/projects-data.ts
```ts
// Project data with comprehensive information for UX
export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface ProjectPhase {
  name: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  date?: string;
}

export interface Amenity {
  name: string;
  icon: string;
  category: 'lifestyle' | 'sports' | 'convenience' | 'safety' | 'sustainability';
}

export interface ProximityItem {
  name: string;
  distance: string;
  type: 'education' | 'healthcare' | 'shopping' | 'transport' | 'leisure' | 'business';
  duration?: string;
}

export interface FloorPlan {
  name: string;
  type: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  image?: string;
  price?: string;
}

export interface Specification {
  category: string;
  items: { label: string; value: string }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planning';
  featured: boolean;
  thumbnail: string;
  thumbnailAlt?: string;
  thumbnailCaption?: string;
  heroImage: string;
  heroImageAlt?: string;
  heroImageCaption?: string;
  images: ProjectImage[];
  shortDescription: string;
  fullDescription: string;
  location: string;
  address: string;
  year: string;
  client: string;
  duration: string;
  metrics: ProjectMetric[];
  phases: ProjectPhase[];
  tags: string[];
  highlights: string[];
  amenities: Amenity[];
  proximity: ProximityItem[];
  floorPlans: FloorPlan[];
  specifications: Specification[];
  faqs: FAQ[];
  priceRange?: string;
  reraNumber?: string;
  videoUrl?: string;
  virtualTourUrl?: string;
  brochureUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  relatedProjects: string[];
}

export const categories = [
  'All Projects',
  'Apartments',
  'Commercial and Apartments',
  'Commercials',
  'Villas',
  'Plots',
] as const;

export const statusFilters = [
  'All Status',
  'Completed',
  'In Progress',
  'Planning',
] as const;

export const budgetRanges = [
  'All Budgets',
  '₹30 Lakh - ₹50 Lakh',
  '₹50 Lakh - ₹75 Lakh',
  '₹75 Lakh - ₹1 Crore',
  '₹1 Crore - ₹2 Crore',
  'Above ₹2 Crore',
] as const;

export const serviceAreas = [
  'All Locations',
  'Wakad',
  'Hinjewadi',
  'Baner',
  'Balewadi',
  'Pimple Saudagar',
  'Ravet',
  'Tathawade',
  'Punawale',
  'Chikhali',
  'Moshi',
] as const;

export const commonAmenities: Amenity[] = [
  { name: 'Swimming Pool', icon: 'pool', category: 'lifestyle' },
  { name: 'Gymnasium', icon: 'dumbbell', category: 'sports' },
  { name: 'Clubhouse', icon: 'home', category: 'lifestyle' },
  { name: 'Children\'s Play Area', icon: 'baby', category: 'lifestyle' },
  { name: 'Landscaped Gardens', icon: 'trees', category: 'lifestyle' },
  { name: 'Jogging Track', icon: 'footprints', category: 'sports' },
  { name: 'Tennis Court', icon: 'tennis', category: 'sports' },
  { name: 'Basketball Court', icon: 'basketball', category: 'sports' },
  { name: '24/7 Security', icon: 'shield', category: 'safety' },
  { name: 'CCTV Surveillance', icon: 'camera', category: 'safety' },
  { name: 'Power Backup', icon: 'zap', category: 'convenience' },
  { name: 'Covered Parking', icon: 'car', category: 'convenience' },
  { name: 'EV Charging', icon: 'plug', category: 'sustainability' },
  { name: 'Rainwater Harvesting', icon: 'droplets', category: 'sustainability' },
  { name: 'Solar Panels', icon: 'sun', category: 'sustainability' },
  { name: 'Spa & Sauna', icon: 'sparkles', category: 'lifestyle' },
  { name: 'Business Center', icon: 'briefcase', category: 'convenience' },
  { name: 'Concierge Services', icon: 'bell', category: 'convenience' },
  { name: 'Multipurpose Hall', icon: 'layout', category: 'lifestyle' },
  { name: 'Library', icon: 'book', category: 'lifestyle' },
  { name: 'Yoga & Meditation', icon: 'heart', category: 'lifestyle' },
  { name: 'Indoor Games', icon: 'gamepad', category: 'sports' },
  { name: 'Mini Theatre', icon: 'film', category: 'lifestyle' },
  { name: 'Cafeteria', icon: 'coffee', category: 'convenience' },
];

export const projects: Project[] = [
  {
    id: '1',
    slug: 'azure-residence',
    title: 'Azure Residence',
    subtitle: 'Luxury Living Redefined',
    category: 'Apartments',
    status: 'completed',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', alt: 'Main facade', caption: 'Exterior view at sunset' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', alt: 'Living space', caption: 'Open-plan living area' },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', alt: 'Pool area', caption: 'Infinity pool terrace' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', alt: 'Bedroom', caption: 'Master suite with view' },
      { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', alt: 'Kitchen', caption: 'Gourmet kitchen' },
    ],
    shortDescription: 'A collection of 48 bespoke residences featuring panoramic views and world-class amenities.',
    fullDescription: 'Azure Residence represents the pinnacle of luxury living, offering an exclusive collection of 48 meticulously designed homes. Each residence has been crafted with an unwavering commitment to quality, featuring floor-to-ceiling windows, premium finishes, and intelligent home systems. The development seamlessly blends indoor and outdoor living, with private terraces overlooking landscaped gardens and a stunning infinity pool.',
    location: 'Wakad, Pune',
    address: 'Near Hinjewadi IT Park, Wakad, Pune 411057',
    year: '2024',
    client: 'Azure Developments',
    duration: '24 months',
    priceRange: '₹65 Lakh - ₹2.5 Cr',
    reraNumber: 'RERA/2024/RES/1234',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    brochureUrl: '#',
    metrics: [
      { label: 'Total Units', value: '48' },
      { label: 'Floor Area', value: '25,000 m²' },
      { label: 'Floors', value: '12' },
      { label: 'Occupancy', value: '95%' },
    ],
    phases: [
      { name: 'Concept & Design', status: 'completed', description: 'Architectural vision and planning', date: 'Q1 2022' },
      { name: 'Construction', status: 'completed', description: 'Building and structural work', date: 'Q2 2022 - Q4 2023' },
      { name: 'Interior Finishing', status: 'completed', description: 'Premium interior installations', date: 'Q1 2024' },
      { name: 'Handover', status: 'completed', description: 'Keys delivered to residents', date: 'Q2 2024' },
    ],
    tags: ['Luxury', 'Smart Home', 'Sustainable', 'Gated Community'],
    highlights: [
      'Smart home automation in every unit',
      'Private rooftop gardens',
      '24/7 concierge services',
      'Electric vehicle charging stations',
    ],
    amenities: [
      { name: 'Infinity Pool', icon: 'pool', category: 'lifestyle' },
      { name: 'State-of-art Gymnasium', icon: 'dumbbell', category: 'sports' },
      { name: 'Premium Clubhouse', icon: 'home', category: 'lifestyle' },
      { name: 'Children\'s Play Area', icon: 'baby', category: 'lifestyle' },
      { name: 'Landscaped Gardens', icon: 'trees', category: 'lifestyle' },
      { name: 'Jogging Track', icon: 'footprints', category: 'sports' },
      { name: 'Tennis Court', icon: 'tennis', category: 'sports' },
      { name: '24/7 Security', icon: 'shield', category: 'safety' },
      { name: 'CCTV Surveillance', icon: 'camera', category: 'safety' },
      { name: 'Power Backup', icon: 'zap', category: 'convenience' },
      { name: 'Covered Parking', icon: 'car', category: 'convenience' },
      { name: 'EV Charging Stations', icon: 'plug', category: 'sustainability' },
      { name: 'Rainwater Harvesting', icon: 'droplets', category: 'sustainability' },
      { name: 'Spa & Wellness Center', icon: 'sparkles', category: 'lifestyle' },
      { name: 'Business Lounge', icon: 'briefcase', category: 'convenience' },
      { name: 'Concierge Services', icon: 'bell', category: 'convenience' },
      { name: 'Banquet Hall', icon: 'layout', category: 'lifestyle' },
      { name: 'Yoga Pavilion', icon: 'heart', category: 'lifestyle' },
      { name: 'Private Cinema', icon: 'film', category: 'lifestyle' },
      { name: 'Rooftop Lounge', icon: 'coffee', category: 'lifestyle' },
    ],
    proximity: [
      { name: 'Symbiosis International School', distance: '2.5 km', duration: '8 min', type: 'education' },
      { name: 'Indira College', distance: '1.2 km', duration: '4 min', type: 'education' },
      { name: 'Ruby Hall Clinic', distance: '4 km', duration: '12 min', type: 'healthcare' },
      { name: 'Aditya Birla Hospital', distance: '1.8 km', duration: '6 min', type: 'healthcare' },
      { name: 'Westend Mall', distance: '3 km', duration: '10 min', type: 'shopping' },
      { name: 'Phoenix Mall', distance: '2 km', duration: '7 min', type: 'shopping' },
      { name: 'Hinjewadi Metro Station', distance: '800 m', duration: '3 min walk', type: 'transport' },
      { name: 'Pune International Airport', distance: '25 km', duration: '40 min', type: 'transport' },
      { name: 'Hinjewadi IT Park', distance: '5 km', duration: '15 min', type: 'business' },
      { name: 'Rajiv Gandhi IT Park', distance: '8 km', duration: '20 min', type: 'business' },
      { name: 'Oxford Golf Resort', distance: '6 km', duration: '15 min', type: 'leisure' },
      { name: 'Lavasa Hill City', distance: '60 km', duration: '90 min', type: 'leisure' },
    ],
    floorPlans: [
      { name: 'Studio Haven', type: 'Studio', size: '450 sq.ft', bedrooms: 0, bathrooms: 1, price: '₹65 Lakh' },
      { name: 'Urban Suite', type: '1 BHK', size: '650 sq.ft', bedrooms: 1, bathrooms: 1, price: '₹85 Lakh' },
      { name: 'Family Comfort', type: '2 BHK', size: '950 sq.ft', bedrooms: 2, bathrooms: 2, price: '₹1.25 Cr' },
      { name: 'Executive Living', type: '3 BHK', size: '1400 sq.ft', bedrooms: 3, bathrooms: 3, price: '₹1.85 Cr' },
      { name: 'Penthouse Royale', type: 'Penthouse', size: '2500 sq.ft', bedrooms: 4, bathrooms: 4, price: '₹2.5 Cr' },
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Foundation', value: 'RCC framed structure with earthquake resistant design' },
          { label: 'Walls', value: 'AAC blocks with premium plastering' },
          { label: 'Ceiling Height', value: '3.2 meters (10.5 ft)' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Living & Dining', value: 'Imported Italian marble' },
          { label: 'Bedrooms', value: 'Engineered wooden flooring' },
          { label: 'Bathrooms', value: 'Anti-skid vitrified tiles' },
          { label: 'Balcony', value: 'Designer ceramic tiles' },
        ],
      },
      {
        category: 'Kitchen',
        items: [
          { label: 'Platform', value: 'Granite/Quartz countertop' },
          { label: 'Cabinets', value: 'Modular kitchen with soft-close fittings' },
          { label: 'Sink', value: 'Stainless steel double bowl' },
          { label: 'Appliances', value: 'Chimney, hob, and oven provision' },
        ],
      },
      {
        category: 'Bathrooms',
        items: [
          { label: 'Fittings', value: 'Premium Kohler/Grohe sanitary ware' },
          { label: 'Tiles', value: 'Floor-to-ceiling designer tiles' },
          { label: 'Shower', value: 'Rain shower with mixer' },
          { label: 'Vanity', value: 'Designer vanity with mirror cabinet' },
        ],
      },
      {
        category: 'Electrical',
        items: [
          { label: 'Wiring', value: 'Concealed copper wiring with MCB' },
          { label: 'Switches', value: 'Modular switches (Legrand/Schneider)' },
          { label: 'Lighting', value: 'LED lights with smart control provision' },
          { label: 'AC', value: 'VRV air conditioning system' },
        ],
      },
      {
        category: 'Doors & Windows',
        items: [
          { label: 'Main Door', value: 'Designer wooden door with digital lock' },
          { label: 'Internal Doors', value: 'Flush doors with premium finish' },
          { label: 'Windows', value: 'Double glazed UPVC with mosquito mesh' },
          { label: 'Balcony', value: 'Sliding glass doors with safety rails' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the possession date for Azure Residence?',
        answer: 'Azure Residence has already been completed and handed over. Immediate possession is available for remaining units.',
      },
      {
        question: 'Are there any payment plans available?',
        answer: 'Yes, we offer flexible payment plans including 20:80, construction-linked, and customized payment options. Our team can help you choose the best plan.',
      },
      {
        question: 'What amenities are included in the maintenance?',
        answer: 'The maintenance covers all common amenities including pool, gym, clubhouse, security, landscaping, and common area utilities.',
      },
      {
        question: 'Is home loan assistance available?',
        answer: 'Yes, we have tie-ups with leading banks offering competitive interest rates. Our sales team can assist with the loan process.',
      },
      {
        question: 'Are pets allowed in Azure Residence?',
        answer: 'Yes, Azure Residence is a pet-friendly community with designated pet zones and walking areas.',
      },
      {
        question: 'What is the maintenance cost?',
        answer: 'The maintenance charges are ₹4.50 per sqft per month, which includes all common amenities and services.',
      },
    ],
    testimonial: {
      quote: 'Living at Azure has exceeded all our expectations. The attention to detail and quality of life here is unmatched.',
      author: 'Mohammed Al-Rashid',
      role: 'Resident',
    },
    relatedProjects: ['2', '3'],
  },
  {
    id: '2',
    slug: 'oasis-towers',
    title: 'Oasis Towers',
    subtitle: 'Where Business Meets Excellence',
    category: 'Commercials',
    status: 'completed',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', alt: 'Tower exterior', caption: 'Twin towers at dusk' },
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', alt: 'Office interior', caption: 'Modern workspace design' },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80', alt: 'Meeting room', caption: 'Executive boardroom' },
      { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80', alt: 'Open office', caption: 'Collaborative workspace' },
    ],
    shortDescription: 'Twin Grade A office towers offering 85,000 sq.ft of premium workspace in the heart of the business district.',
    fullDescription: 'Oasis Towers stands as a landmark of modern business architecture, comprising twin 45-story towers connected by a stunning sky bridge. The development offers flexible floor plates, cutting-edge building management systems, and IGBC Gold certification. With direct metro access and a curated retail podium, Oasis Towers creates a complete business ecosystem.',
    location: 'Baner, Pune',
    address: 'Baner-Pashan Link Road, Baner, Pune 411045',
    year: '2023',
    client: 'Oasis Holdings',
    duration: '36 months',
    priceRange: '₹8,500 - ₹12,000 per sq.ft/year',
    reraNumber: 'RERA/P52100012345',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    brochureUrl: '#',
    metrics: [
      { label: 'Office Space', value: '85,000 m²' },
      { label: 'Floors', value: '45' },
      { label: 'Parking', value: '2,500 spaces' },
      { label: 'Tenants', value: '120+' },
    ],
    phases: [
      { name: 'Foundation', status: 'completed', description: 'Deep foundation and basement', date: 'Q2 2020' },
      { name: 'Structure', status: 'completed', description: 'Core and shell construction', date: 'Q3 2020 - Q4 2021' },
      { name: 'Fit-out', status: 'completed', description: 'Interior finishing and MEP', date: 'Q1 2022 - Q2 2023' },
      { name: 'Operations', status: 'completed', description: 'Full operational status', date: 'Q3 2023' },
    ],
    tags: ['LEED Gold', 'Smart Building', 'Metro Access', 'Sky Bridge'],
    highlights: [
      'LEED Gold certified',
      'Direct metro connectivity',
      'Sky bridge observation deck',
      'Fortune 500 tenants',
    ],
    amenities: [
      { name: 'Executive Lounge', icon: 'armchair', category: 'lifestyle' },
      { name: 'Premium Gymnasium', icon: 'dumbbell', category: 'sports' },
      { name: 'Sky Bridge', icon: 'bridge', category: 'lifestyle' },
      { name: 'Rooftop Helipad', icon: 'plane', category: 'convenience' },
      { name: 'Conference Center', icon: 'presentation', category: 'convenience' },
      { name: 'Food Court', icon: 'utensils', category: 'convenience' },
      { name: 'Retail Podium', icon: 'shopping-bag', category: 'convenience' },
      { name: '24/7 Security', icon: 'shield', category: 'safety' },
      { name: 'CCTV Surveillance', icon: 'camera', category: 'safety' },
      { name: 'Fire Safety System', icon: 'flame', category: 'safety' },
      { name: 'Full Power Backup', icon: 'zap', category: 'convenience' },
      { name: 'Multi-level Parking', icon: 'car', category: 'convenience' },
      { name: 'EV Charging', icon: 'plug', category: 'sustainability' },
      { name: 'Solar Power', icon: 'sun', category: 'sustainability' },
      { name: 'Smart BMS', icon: 'cpu', category: 'convenience' },
      { name: 'High-speed Elevators', icon: 'arrow-up', category: 'convenience' },
    ],
    proximity: [
      { name: 'Baner Metro Station', distance: 'Direct access', duration: '0 min', type: 'transport' },
      { name: 'Pune International Airport', distance: '18 km', duration: '35 min', type: 'transport' },
      { name: 'Phoenix Mall', distance: '3 km', duration: '8 min', type: 'shopping' },
      { name: 'Westend Mall', distance: '5 km', duration: '12 min', type: 'shopping' },
      { name: 'Sahyadri Hospital', distance: '4 km', duration: '10 min', type: 'healthcare' },
      { name: 'Baner Hills', distance: '2 km', duration: '5 min', type: 'leisure' },
      { name: 'Maratha Chamber of Commerce', distance: '1 km', duration: '3 min', type: 'business' },
      { name: 'Premium Hotels', distance: '500 m', duration: '2 min walk', type: 'leisure' },
    ],
    floorPlans: [
      { name: 'Standard Office', type: 'Office', size: '5,000 sq.ft', bedrooms: 0, bathrooms: 2, price: '₹42 Lakh/year' },
      { name: 'Executive Suite', type: 'Office', size: '10,000 sq.ft', bedrooms: 0, bathrooms: 4, price: '₹95 Lakh/year' },
      { name: 'Full Floor', type: 'Office', size: '20,000 sq.ft', bedrooms: 0, bathrooms: 8, price: '₹2.1 Cr/year' },
      { name: 'Retail Unit', type: 'Retail', size: '2,000 sq.ft', bedrooms: 0, bathrooms: 1, price: '₹28 Lakh/year' },
    ],
    specifications: [
      {
        category: 'Building Systems',
        items: [
          { label: 'Facade', value: 'Double-glazed curtain wall with UV protection' },
          { label: 'Ceiling', value: 'Suspended ceiling 2.8m finished height' },
          { label: 'Floors', value: 'Raised access flooring system' },
        ],
      },
      {
        category: 'HVAC',
        items: [
          { label: 'System', value: 'Variable Refrigerant Volume (VRV) system' },
          { label: 'Control', value: 'Individual zone temperature control' },
          { label: 'Air Quality', value: 'HEPA filtration with fresh air intake' },
        ],
      },
      {
        category: 'Electrical & IT',
        items: [
          { label: 'Power', value: '100W per sqm provision' },
          { label: 'Data', value: 'Fiber optic infrastructure' },
          { label: 'Backup', value: '100% backup with UPS' },
        ],
      },
      {
        category: 'Elevators',
        items: [
          { label: 'Passenger', value: '24 high-speed elevators (8 m/s)' },
          { label: 'Service', value: '4 service elevators' },
          { label: 'VIP', value: '2 dedicated VIP elevators' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the minimum lease term?',
        answer: 'The minimum lease term is 3 years for office spaces and 5 years for retail units, with options for renewal.',
      },
      {
        question: 'Is fit-out included in the rent?',
        answer: 'Base building fit-out is included. Custom fit-out can be arranged through our approved contractors or tenant\'s choice.',
      },
      {
        question: 'What are the operating hours?',
        answer: 'The building operates 24/7 with full services available during business hours (8 AM - 10 PM) and security round the clock.',
      },
      {
        question: 'Is there a grace period for rent?',
        answer: 'New tenants receive a 3-month fit-out period rent-free for spaces above 1,000 sqm.',
      },
    ],
    testimonial: {
      quote: 'Oasis Towers offers everything a modern business needs - prime location, world-class facilities, and exceptional management.',
      author: 'Sarah Al-Zahrani',
      role: 'CEO, Tech Innovations Ltd',
    },
    relatedProjects: ['1', '4'],
  },
  {
    id: '3',
    slug: 'palm-gardens',
    title: 'Palm Gardens',
    subtitle: 'A Sanctuary of Serenity',
    category: 'Villas',
    status: 'in-progress',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', alt: 'Villa exterior', caption: 'Contemporary villa design' },
      { url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80', alt: 'Garden', caption: 'Lush private gardens' },
      { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', alt: 'Interior', caption: 'Master suite' },
    ],
    shortDescription: 'An exclusive gated community of 32 villas, each with private pools and landscaped gardens.',
    fullDescription: 'Palm Gardens offers the ultimate in private residential living with 32 individually designed villas set within 15 acres of landscaped grounds. Each home features a private pool, temperature-controlled wine cellar, and home cinema. The community includes a clubhouse, spa, tennis courts, and a private school within walking distance.',
    location: 'Balewadi, Pune',
    address: 'Near Balewadi High Street, Balewadi, Pune 411045',
    year: '2025',
    client: 'Palm Developments',
    duration: '30 months',
    priceRange: '₹2.5 Cr - ₹8 Cr',
    reraNumber: 'RERA/P52100045678',
    brochureUrl: '#',
    metrics: [
      { label: 'Villas', value: '32' },
      { label: 'Land Area', value: '15 hectares' },
      { label: 'Pool Size', value: '12m avg' },
      { label: 'Completion', value: '75%' },
    ],
    phases: [
      { name: 'Site Preparation', status: 'completed', description: 'Land clearing and infrastructure', date: 'Q1 2023' },
      { name: 'Villa Construction', status: 'in-progress', description: '28 of 32 villas under construction', date: 'Q2 2023 - Present' },
      { name: 'Landscaping', status: 'in-progress', description: 'Gardens and common areas', date: 'Q4 2024 - Present' },
      { name: 'Handover', status: 'upcoming', description: 'Expected completion', date: 'Q2 2025' },
    ],
    tags: ['Gated Community', 'Private Pools', 'Villa', 'Family'],
    highlights: [
      'Private pools for each villa',
      'Smart irrigation systems',
      'Community clubhouse & spa',
      'Walking distance to school',
    ],
    amenities: [
      { name: 'Private Pool (each villa)', icon: 'pool', category: 'lifestyle' },
      { name: 'Community Pool', icon: 'waves', category: 'lifestyle' },
      { name: 'Clubhouse', icon: 'home', category: 'lifestyle' },
      { name: 'Spa & Wellness', icon: 'sparkles', category: 'lifestyle' },
      { name: 'Tennis Courts', icon: 'tennis', category: 'sports' },
      { name: 'Basketball Court', icon: 'basketball', category: 'sports' },
      { name: 'Children\'s Playground', icon: 'baby', category: 'lifestyle' },
      { name: 'Gated Security', icon: 'shield', category: 'safety' },
      { name: 'Smart Home Systems', icon: 'smartphone', category: 'convenience' },
      { name: 'Wine Cellar (each villa)', icon: 'wine', category: 'lifestyle' },
      { name: 'Home Cinema (each villa)', icon: 'film', category: 'lifestyle' },
      { name: 'BBQ Area', icon: 'flame', category: 'lifestyle' },
      { name: 'Guest Parking', icon: 'car', category: 'convenience' },
      { name: 'Landscaped Gardens', icon: 'trees', category: 'lifestyle' },
    ],
    proximity: [
      { name: 'Vibgyor International School', distance: '800 m', duration: '3 min', type: 'education' },
      { name: 'Sahyadri Super Specialty Hospital', distance: '5 km', duration: '12 min', type: 'healthcare' },
      { name: 'Balewadi High Street', distance: '2 km', duration: '6 min', type: 'shopping' },
      { name: 'Hinjewadi Metro (Planned)', distance: '1.5 km', duration: '5 min', type: 'transport' },
      { name: 'Oxford Golf Resort', distance: '4 km', duration: '10 min', type: 'leisure' },
      { name: 'Hinjewadi IT Park', distance: '8 km', duration: '18 min', type: 'business' },
    ],
    floorPlans: [
      { name: 'Villa Oasis', type: '4 BHK Villa', size: '3,500 sq.ft', bedrooms: 4, bathrooms: 5, price: '₹2.5 Cr' },
      { name: 'Villa Serenity', type: '5 BHK Villa', size: '4,500 sq.ft', bedrooms: 5, bathrooms: 6, price: '₹4 Cr' },
      { name: 'Villa Prestige', type: '6 BHK Villa', size: '5,800 sq.ft', bedrooms: 6, bathrooms: 7, price: '₹6 Cr' },
      { name: 'Villa Royal', type: '7 BHK Mansion', size: '8,000 sq.ft', bedrooms: 7, bathrooms: 9, price: '₹8 Cr' },
    ],
    specifications: [
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
    ],
    faqs: [
      {
        question: 'When is the expected handover date?',
        answer: 'The first batch of 12 villas will be handed over in Q2 2025, with remaining villas following in Q3-Q4 2025.',
      },
      {
        question: 'Can I customize my villa?',
        answer: 'Yes, buyers can customize interiors, pool design, and landscaping within approved guidelines. Early buyers get more customization options.',
      },
      {
        question: 'What is included in the price?',
        answer: 'Price includes the villa, private pool, landscaped garden, smart home system, and all interior finishes as per specifications.',
      },
    ],
    relatedProjects: ['1', '5'],
  },
  {
    id: '4',
    slug: 'crystal-hotel',
    title: 'Crystal Hotel & Spa',
    subtitle: 'Five-Star Excellence',
    category: 'Commercials',
    status: 'completed',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', alt: 'Hotel exterior', caption: 'Beachfront facade' },
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80', alt: 'Lobby', caption: 'Grand lobby atrium' },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', alt: 'Suite', caption: 'Presidential suite' },
    ],
    shortDescription: 'A 280-room luxury beachfront resort with world-class spa and dining experiences.',
    fullDescription: 'Crystal Hotel & Spa delivers an unparalleled hospitality experience on the shores of the Arabian Sea. The resort features 280 luxuriously appointed rooms and suites, a 25,000 sq.ft wellness center, and five signature restaurants helmed by award-winning chefs. The architecture draws inspiration from traditional Indian design while embracing contemporary luxury.',
    location: 'Alibaug, Maharashtra',
    address: 'Alibaug Beach Road, Alibaug 402201',
    year: '2023',
    client: 'Crystal Hospitality Group',
    duration: '28 months',
    priceRange: '₹8,000 - ₹75,000 per night',
    metrics: [
      { label: 'Rooms', value: '280' },
      { label: 'Restaurants', value: '5' },
      { label: 'Spa Size', value: '3,000 m²' },
      { label: 'Beach', value: '400m private' },
    ],
    phases: [
      { name: 'Design', status: 'completed', description: 'Concept and detailed design', date: 'Q1 2021' },
      { name: 'Construction', status: 'completed', description: 'Building and infrastructure', date: 'Q2 2021 - Q3 2022' },
      { name: 'FF&E', status: 'completed', description: 'Furniture and equipment', date: 'Q4 2022' },
      { name: 'Opening', status: 'completed', description: 'Soft opening achieved', date: 'Q1 2023' },
    ],
    tags: ['5-Star', 'Beachfront', 'Spa', 'Resort'],
    highlights: [
      'Private 400m beach',
      'Michelin-starred dining',
      'Infinity-edge pools',
      'Helipad access',
    ],
    amenities: [
      { name: 'Private Beach', icon: 'umbrella', category: 'lifestyle' },
      { name: 'Infinity Pools (3)', icon: 'pool', category: 'lifestyle' },
      { name: 'World-class Spa', icon: 'sparkles', category: 'lifestyle' },
      { name: '5 Signature Restaurants', icon: 'utensils', category: 'convenience' },
      { name: 'Beach Club', icon: 'sun', category: 'lifestyle' },
      { name: 'Water Sports Center', icon: 'waves', category: 'sports' },
      { name: 'Tennis Courts', icon: 'tennis', category: 'sports' },
      { name: 'Fitness Center', icon: 'dumbbell', category: 'sports' },
      { name: 'Kids Club', icon: 'baby', category: 'lifestyle' },
      { name: 'Business Center', icon: 'briefcase', category: 'convenience' },
      { name: 'Helipad', icon: 'plane', category: 'convenience' },
      { name: 'Yacht Marina', icon: 'anchor', category: 'lifestyle' },
    ],
    proximity: [
      { name: 'Alibaug Jetty', distance: '5 km', duration: '10 min', type: 'transport' },
      { name: 'Pune', distance: '150 km', duration: '3 hrs', type: 'business' },
      { name: 'Murud Beach', distance: '2 km', duration: '5 min', type: 'leisure' },
      { name: 'Alibaug Market', distance: '4 km', duration: '8 min', type: 'shopping' },
    ],
    floorPlans: [
      { name: 'Deluxe Room', type: 'Room', size: '480 sq.ft', bedrooms: 1, bathrooms: 1, price: '₹8,000/night' },
      { name: 'Sea View Suite', type: 'Suite', size: '800 sq.ft', bedrooms: 1, bathrooms: 1, price: '₹18,000/night' },
      { name: 'Family Suite', type: 'Suite', size: '1,300 sq.ft', bedrooms: 2, bathrooms: 2, price: '₹35,000/night' },
      { name: 'Presidential Suite', type: 'Suite', size: '2,700 sq.ft', bedrooms: 3, bathrooms: 3, price: '₹75,000/night' },
    ],
    specifications: [
      {
        category: 'Rooms',
        items: [
          { label: 'Bedding', value: 'King-size premium mattress with Egyptian cotton' },
          { label: 'Bathroom', value: 'Marble with rain shower and soaking tub' },
          { label: 'Technology', value: 'Smart room controls, 65" OLED TV' },
        ],
      },
      {
        category: 'Dining',
        items: [
          { label: 'Main Restaurant', value: 'International buffet (300 seats)' },
          { label: 'Specialty', value: '4 à la carte restaurants' },
          { label: 'Bars', value: '3 bars including beach bar' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What dining options are available?',
        answer: 'The resort features 5 restaurants offering international, Arabic, Asian, seafood, and Mediterranean cuisine, plus 3 bars.',
      },
      {
        question: 'Is the resort family-friendly?',
        answer: 'Yes, we have a dedicated kids club, family suites, children\'s pool, and family-friendly activities.',
      },
    ],
    testimonial: {
      quote: 'Crystal Hotel has redefined luxury hospitality in the region. An exceptional achievement.',
      author: 'Travel & Leisure Magazine',
      role: '2024 Best New Hotel',
    },
    relatedProjects: ['2', '5'],
  },
  {
    id: '5',
    slug: 'urban-quarter',
    title: 'Urban Quarter',
    subtitle: 'Live, Work, Play',
    category: 'Commercial and Apartments',
    status: 'planning',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80', alt: 'Development', caption: 'Mixed-use masterplan' },
      { url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80', alt: 'Plaza', caption: 'Central plaza design' },
      { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', alt: 'Retail', caption: 'Retail promenade' },
    ],
    shortDescription: 'A visionary 30-acre mixed-use development combining residential, retail, and entertainment.',
    fullDescription: 'Urban Quarter is set to transform the city skyline with a 30-acre integrated development. The masterplan includes 500 residential units, 4,00,000 sq.ft of retail space, a boutique hotel, and extensive public realm featuring parks, plazas, and water features. Sustainability is central to the design, targeting net-zero carbon operations.',
    location: 'Pimpri-Chinchwad, Pune',
    address: 'PCMC Smart City Zone, Pimpri 411018',
    year: '2027',
    client: 'Urban Development Authority',
    duration: '48 months',
    priceRange: '₹55 Lakh - ₹1.8 Cr (Residential)',
    metrics: [
      { label: 'Site Area', value: '30 acres' },
      { label: 'Residences', value: '500' },
      { label: 'Retail', value: '4,00,000 sq.ft' },
      { label: 'Investment', value: '₹1,200 Cr' },
    ],
    phases: [
      { name: 'Masterplanning', status: 'completed', description: 'Vision and framework', date: 'Q4 2024' },
      { name: 'Detailed Design', status: 'in-progress', description: 'Architecture and engineering', date: 'Q1 2025 - Present' },
      { name: 'Phase 1 Construction', status: 'upcoming', description: 'Residential tower and retail', date: 'Q4 2025' },
      { name: 'Full Completion', status: 'upcoming', description: 'All phases delivered', date: 'Q4 2027' },
    ],
    tags: ['Net Zero', 'Transit-Oriented', 'Public Realm', 'Landmark'],
    highlights: [
      'Net-zero carbon target',
      'Metro station integration',
      '3 hectares of public parks',
      'Smart city infrastructure',
    ],
    amenities: [
      { name: 'Central Park', icon: 'trees', category: 'lifestyle' },
      { name: 'Water Features', icon: 'droplets', category: 'lifestyle' },
      { name: 'Amphitheatre', icon: 'mic', category: 'lifestyle' },
      { name: 'Premium Mall', icon: 'shopping-bag', category: 'convenience' },
      { name: 'Boutique Hotel', icon: 'building', category: 'lifestyle' },
      { name: 'Metro Station', icon: 'train', category: 'convenience' },
      { name: 'Smart Parking', icon: 'car', category: 'convenience' },
      { name: 'District Cooling', icon: 'thermometer', category: 'sustainability' },
      { name: 'Solar Canopies', icon: 'sun', category: 'sustainability' },
      { name: 'Green Roofs', icon: 'leaf', category: 'sustainability' },
    ],
    proximity: [
      { name: 'Dammam Metro Station', distance: 'On-site', duration: '0 min', type: 'transport' },
      { name: 'King Fahd Airport', distance: '20 km', duration: '25 min', type: 'transport' },
      { name: 'Corniche', distance: '3 km', duration: '10 min', type: 'leisure' },
      { name: 'King Fahd University', distance: '8 km', duration: '15 min', type: 'education' },
    ],
    floorPlans: [
      { name: 'Studio', type: 'Studio', size: '550 sq.ft', bedrooms: 0, bathrooms: 1, price: '₹55 Lakh' },
      { name: '1 Bedroom', type: '1 BHK', size: '750 sq.ft', bedrooms: 1, bathrooms: 1, price: '₹78 Lakh' },
      { name: '2 Bedroom', type: '2 BHK', size: '1,100 sq.ft', bedrooms: 2, bathrooms: 2, price: '₹1.15 Cr' },
      { name: '3 Bedroom', type: '3 BHK', size: '1,550 sq.ft', bedrooms: 3, bathrooms: 3, price: '₹1.8 Cr' },
    ],
    specifications: [
      {
        category: 'Sustainability',
        items: [
          { label: 'Energy', value: 'Net-zero carbon operations' },
          { label: 'Water', value: '100% recycled water for landscaping' },
          { label: 'Materials', value: 'Sustainable and recycled materials' },
        ],
      },
      {
        category: 'Smart City',
        items: [
          { label: 'Infrastructure', value: 'Fiber-to-home connectivity' },
          { label: 'Mobility', value: 'Autonomous shuttle service' },
          { label: 'Utilities', value: 'Smart metering and monitoring' },
        ],
      },
    ],
    faqs: [
      {
        question: 'When will sales launch?',
        answer: 'Pre-registration is open now. Official sales launch is expected in Q3 2025 with early-bird pricing.',
      },
      {
        question: 'Will there be affordable housing options?',
        answer: 'Yes, 20% of residential units are designated as affordable housing with government subsidy options.',
      },
    ],
    relatedProjects: ['2', '3'],
  },
  {
    id: '6',
    slug: 'heritage-plaza',
    title: 'Heritage Plaza',
    subtitle: 'Modern Meets Traditional',
    category: 'Commercial',
    status: 'in-progress',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1464938050520-ef2571f42989?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1464938050520-ef2571f42989?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1464938050520-ef2571f42989?w=1200&q=80', alt: 'Building', caption: 'Heritage-inspired facade' },
      { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80', alt: 'Office', caption: 'Contemporary interiors' },
      { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80', alt: 'Workspace', caption: 'Collaborative spaces' },
    ],
    shortDescription: 'A 28-story office tower blending traditional architectural heritage with cutting-edge design.',
    fullDescription: 'Heritage Plaza pays homage to traditional architecture while delivering a state-of-the-art commercial tower. The facade features intricate jali-inspired screens that provide natural shading and reduce cooling loads by 30%. Inside, flexible floor plates accommodate everything from startups to corporate headquarters.',
    location: 'Shivajinagar, Pune',
    address: 'FC Road, Shivajinagar, Pune 411005',
    year: '2025',
    client: 'Heritage Properties',
    duration: '30 months',
    priceRange: '₹7,500 - ₹11,000 per sq.ft/year',
    reraNumber: 'RERA/P52100078901',
    metrics: [
      { label: 'Office Space', value: '42,000 m²' },
      { label: 'Floors', value: '28' },
      { label: 'Energy Saving', value: '30%' },
      { label: 'Pre-leased', value: '65%' },
    ],
    phases: [
      { name: 'Foundation', status: 'completed', description: 'Piling and basement', date: 'Q2 2023' },
      { name: 'Superstructure', status: 'completed', description: 'Core and frame', date: 'Q3 2023 - Q2 2024' },
      { name: 'Facade', status: 'in-progress', description: 'Mashrabiya installation', date: 'Q3 2024 - Present' },
      { name: 'Completion', status: 'upcoming', description: 'Handover to tenants', date: 'Q3 2025' },
    ],
    tags: ['Heritage', 'Sustainable', 'Grade A', 'Innovation'],
    highlights: [
      'Mashrabiya-inspired facade',
      '30% energy reduction',
      'Heritage museum lobby',
      'Rooftop garden terrace',
    ],
    amenities: [
      { name: 'Heritage Museum', icon: 'landmark', category: 'lifestyle' },
      { name: 'Rooftop Garden', icon: 'trees', category: 'lifestyle' },
      { name: 'Executive Lounge', icon: 'armchair', category: 'lifestyle' },
      { name: 'Fitness Center', icon: 'dumbbell', category: 'sports' },
      { name: 'Prayer Room', icon: 'moon', category: 'convenience' },
      { name: 'Conference Center', icon: 'presentation', category: 'convenience' },
      { name: 'Cafeteria', icon: 'coffee', category: 'convenience' },
      { name: 'Smart BMS', icon: 'cpu', category: 'convenience' },
    ],
    proximity: [
      { name: 'FC Road', distance: 'On FC Road', duration: '0 min', type: 'shopping' },
      { name: 'Shivajinagar Railway Station', distance: '1 km', duration: '3 min', type: 'transport' },
      { name: 'Pune Metro Station', distance: '400 m', duration: '5 min walk', type: 'transport' },
      { name: 'JM Road', distance: '2 km', duration: '6 min', type: 'business' },
    ],
    floorPlans: [
      { name: 'Standard Floor', type: 'Office', size: '15,000 sq.ft', bedrooms: 0, bathrooms: 4, price: '₹1.25 Cr/year' },
      { name: 'Half Floor', type: 'Office', size: '7,500 sq.ft', bedrooms: 0, bathrooms: 2, price: '₹65 Lakh/year' },
    ],
    specifications: [
      {
        category: 'Facade',
        items: [
          { label: 'Design', value: 'Parametric mashrabiya screens' },
          { label: 'Material', value: 'Anodized aluminum with bronze finish' },
          { label: 'Performance', value: '30% reduction in solar heat gain' },
        ],
      },
      {
        category: 'Interior',
        items: [
          { label: 'Ceiling', value: '2.85m finished ceiling height' },
          { label: 'Floor', value: 'Raised access flooring' },
          { label: 'Lighting', value: 'LED with daylight sensors' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What makes Heritage Plaza unique?',
        answer: 'The mashrabiya-inspired facade is both culturally significant and highly functional, reducing energy consumption by 30% while creating a striking visual identity.',
      },
      {
        question: 'What is the current leasing status?',
        answer: '65% of the building is pre-leased to major corporations. Premium floors are still available for early tenants.',
      },
    ],
    relatedProjects: ['2', '4'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getRelatedProjects(projectId: string): Project[] {
  const project = projects.find(p => p.id === projectId);
  if (!project) return [];
  return project.relatedProjects
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is Project => p !== undefined);
}

export function filterProjects(category: string, status: string, search: string): Project[] {
  return projects.filter(project => {
    const matchesCategory = category === 'All Projects' || project.category === category;
    const matchesStatus = status === 'All Status' ||
      (status === 'Completed' && project.status === 'completed') ||
      (status === 'In Progress' && project.status === 'in-progress') ||
      (status === 'Planning' && project.status === 'planning');
    const matchesSearch = search === '' ||
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.location.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesStatus && matchesSearch;
  });
}

```

## src/lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

## src/main.tsx
```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

```

## src/pages/AboutPage.tsx
```tsx
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { CheckCircle2, Users, Heart, Lightbulb, Shield } from 'lucide-react';
import { Preloader } from '@/components/ui/Preloader';

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>
            <Layout removeTopPadding={true}>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-primary text-white">
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
                                About Real Abodes
                            </span>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                                Building Trust, With <span className="italic text-gradient-gold">Timeless Dedication</span>
                            </h1>
                            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                                We don’t just sell homes — we help people find the spaces where their lives truly unfold.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-20 md:py-32 bg-background relative overflow-hidden">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase mb-4 block text-accent">Our Story</span>
                                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                                    More Than Just a <span className="italic text-primary">Transaction</span>
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                                    <p>
                                        At Real Abodes, our journey began with a simple belief: real estate should be transparent, trustworthy, and truly redefine the way people experience it.
                                    </p>
                                    <p>
                                        With deep roots in PCMC and PMC, we are more than a channel partner; we are your trusted guide in navigating one of life’s most important decisions.
                                        Every project we take on is carefully curated, ensuring it meets the highest standards of quality, location, and lifestyle.
                                    </p>
                                    <p>
                                        Headquartered at Wakad, Pune, Real Abodes proudly operates as a sole selling and mandate company, giving us the privilege to represent some of the finest developments across the region.
                                    </p>
                                </div>
                            </motion.div>

                            <div className="relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    {/* Placeholder for Story Image - using a generic luxury abstract/interior if available, or color block */}
                                    <div className="absolute inset-0 bg-secondary/30" />
                                    <img
                                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                        alt="Luxury Interior"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                {/* Decorative element */}
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values - Parallax Section */}
                <section ref={containerRef} className="py-24 bg-secondary/30 relative">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-sm font-medium tracking-wider text-accent uppercase mb-3 block">Our Core Values</span>
                            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
                                Guiding Principles
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Heart className="w-8 h-8" />,
                                    title: "Homes, Not Just Houses",
                                    desc: "For us, it’s not about square feet — it’s about creating spaces where families grow, moments are shared, and life finds its rhythm."
                                },
                                {
                                    icon: <Shield className="w-8 h-8" />,
                                    title: "Trust Beyond Transactions",
                                    desc: "Our success isn’t measured in sales, but in the trust and long-term relationships we build with our clients."
                                },
                                {
                                    icon: <CheckCircle2 className="w-8 h-8" />,
                                    title: "Curated Excellence",
                                    desc: "Every project we represent is handpicked for its quality, location, and lifestyle promise — because you deserve nothing less."
                                },
                                {
                                    icon: <Lightbulb className="w-8 h-8" />,
                                    title: "Clarity in Every Step",
                                    desc: "We believe real estate should never feel complicated. Transparency and guidance are at the heart of every conversation we have."
                                },
                                {
                                    icon: <Users className="w-8 h-8" />,
                                    title: "Evolving with You",
                                    desc: "As lifestyles change, so do we. We adapt, innovate, and redefine what realty means to match the aspirations of tomorrow."
                                }
                            ].map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="bg-card p-8 rounded-2xl border border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-6 group-hover:bg-accent group-hover:text-primary-foreground transition-colors duration-300">
                                        {value.icon}
                                    </div>
                                    <h3 className="font-serif text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {value.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="max-w-2xl">
                                <span className="text-sm font-medium tracking-wider text-accent uppercase mb-3 block">Meet The Leaders</span>
                                <h2 className="font-serif text-3xl md:text-5xl text-foreground">
                                    The Team Behind <span className="italic text-primary">Real Abodes</span>
                                </h2>
                            </div>
                            <p className="max-w-md text-muted-foreground">
                                Backed by a team of professionals who blend market expertise with genuine care.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Hameed Shukoor", role: "Director - Sales", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                                { name: "Akmal Razaa", role: "Director - Marketing", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                                { name: "Zeenat S.", role: "Director - Marketing", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                            ].map((member, i) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.2 }}
                                    className="group relative"
                                >
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary mb-4">
                                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-foreground">{member.name}</h3>
                                    <p className="text-sm text-accent font-medium uppercase tracking-wide">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

```

## src/pages/AdminPage.tsx
```tsx
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

```

## src/pages/BlogDetailPage.tsx
```tsx
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

```

## src/pages/BlogListPage.tsx
```tsx
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

```

## src/pages/ContactPage.tsx
```tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Preloader } from '@/components/ui/Preloader';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [contactEmail, setContactEmail] = useState('info@realabodes.in');
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const { fetchSiteSettings } = await import('@/services/settings');
                const settings = await fetchSiteSettings();
                if (settings['contact_email']) {
                    setContactEmail(settings['contact_email']);
                }
            } catch (error) {
                console.error("Failed to load contact email", error);
            }
        };
        loadSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { sendContactMessage } = await import('@/services/contact');
            await sendContactMessage({
                name: formState.name,
                email: formState.email,
                phone: formState.phone,
                message: formState.message
            });

            toast({
                title: "Message Sent Successfully",
                description: "Thank you for reaching out. We have received your message.",
            });

            setFormState({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error Sending Message",
                description: "There was a problem sending your message. Please try again later.",
                variant: 'destructive'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>
            <Layout removeTopPadding={true}>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-primary text-white">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary-light/80" />

                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10" />

                    <div className="container mx-auto px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <span className="inline-block text-sm font-medium tracking-wider uppercase text-accent mb-4 pl-1">
                                Get in Touch
                            </span>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-6">
                                Let's Start Your <br />
                                <span className="italic text-gradient-gold">Real Estate Journey</span>
                            </h1>
                            <p className="text-lg text-white/80 leading-relaxed max-w-2xl border-l-2 border-accent/30 pl-6">
                                Whether you're looking for your dream home or a lucrative investment, we're here to guide you every step of the way with transparency and expertise.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-20 md:py-32 bg-background relative">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-12"
                            >
                                <div>
                                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                                        Visit Our Office
                                    </h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        We invite you to experience our hospitality and discuss your property needs in person.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="group flex items-start gap-6 p-6 rounded-2xl bg-secondary/30 border border-transparent hover:border-accent/20 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-foreground mb-2">Head Office</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Luxury Square, Sawata Mali Mandir Road,<br />
                                                Chikhali, Pune - 411062<br />
                                                Maharashtra, India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-6 p-6 rounded-2xl bg-secondary/30 border border-transparent hover:border-accent/20 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-foreground mb-2">Call Us</h3>
                                            <p className="text-muted-foreground mb-1">+91 9022 11 4646</p>
                                            <p className="text-muted-foreground">+91 9022 11 3633</p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-6 p-6 rounded-2xl bg-secondary/30 border border-transparent hover:border-accent/20 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-foreground mb-2">Email Us</h3>
                                            <p className="text-muted-foreground mb-1">{contactEmail}</p>
                                            <p className="text-sm text-accent mt-2">We reply within 24 hours</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl blur-3xl transform rotate-3" />
                                <div className="relative bg-card p-8 md:p-10 rounded-3xl border border-border shadow-xl">
                                    <div className="mb-8">
                                        <h3 className="font-serif text-2xl text-foreground mb-2">Send Message</h3>
                                        <p className="text-muted-foreground text-sm">Fill in the form and our team will get back to you.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">Full Name</label>
                                                <Input
                                                    id="name"
                                                    placeholder="John Doe"
                                                    className="bg-background/50 border-input/50 focus:bg-background transition-colors h-11"
                                                    value={formState.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="phone" className="text-sm font-medium text-foreground ml-1">Phone Number</label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="+91 00000 00000"
                                                    className="bg-background/50 border-input/50 focus:bg-background transition-colors h-11"
                                                    value={formState.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">Email Address</label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="bg-background/50 border-input/50 focus:bg-background transition-colors h-11"
                                                value={formState.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">Tell us about your requirements</label>
                                            <Textarea
                                                id="message"
                                                placeholder="I am interested in..."
                                                className="min-h-[140px] bg-background/50 border-input/50 focus:bg-background transition-colors resize-none"
                                                value={formState.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 text-lg bg-gradient-gold text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                                    Sending...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Send Message <Send className="w-4 h-4 ml-1" />
                                                </span>
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Map Section - Placeholder style to match design */}
                <section className="h-[400px] w-full bg-secondary/30 relative grayscale hover:grayscale-0 transition-all duration-700">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.273673739768!2d73.80962!3d18.65172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM5JzA2LjIiTiA3M8KwNDgnMzQuNiJF!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
                </section>
            </Layout>
        </>
    );
}

```

## src/pages/HomePage.tsx
```tsx
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import { Layout } from '@/components/layout/Layout';
import {
  ArrowRight,
  Building2,
  Home,
  MapPin,
  Trees,
  Shield,
  Users,
  Award,
  Phone,
  CheckCircle2,
  Star,
  ChevronRight,
  Play,
  ChevronDown,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects, budgetRanges, serviceAreas } from '@/lib/projects-data';
import { PropertyTypesSection } from '@/components/home/PropertyTypesSection';
import { FeaturedProjectsStack } from '@/components/home/FeaturedProjectsStack';
import { BuyingJourneyParallax } from '@/components/home/BuyingJourneyParallax';
import { TrustSignalsSection } from '@/components/home/TrustSignalsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ServiceAreasSection } from '@/components/home/ServiceAreasSection';

// ... (log entries)

// ... (constants: propertyTypes, trustSignals, testimonials, buyingSteps, serviceAreas)






// ImplementationLog
// Date: 2026-01-28
// WHAT: Added background video to the hero section
// WHY: To enhance visual appeal and user engagement with dynamic content
// Date: 2026-01-28
// WHAT: Added animated SVG overlay to Hero section
// WHY: To match the design of the reference static site provided by the user
// Date: 2026-01-28
// WHAT: Removed background overlays and fixed Hero height
// WHY: User requested to remove gradients and ensure SVG/Hero is 100% height (h-screen)
// Date: 2026-01-28
// WHAT: Added 20% blue overlay to Hero section
// WHY: To improve content visibility against the video background as requested
// Date: 2026-01-28
// WHAT: Fixed SVG height issue
// WHY: SVG was not covering the full height properly. Reference checks showed strict styling needs.
// HOW: Applied inline styles for height: 100%, objectFit: cover, and will-change: transform to mimic the 'svg-fix' and 'background--cover' classes from reference.
// Date: 2026-01-28
// WHAT: Increased opacity of hero section blue overlay from 20% to 40%
// WHY: User requested to increase visibility of the blue background
// HOW: Changed Tailwind class `bg-primary/20` to `bg-primary/40`
// Date: 2026-01-28
// WHAT: Replaced Property Types grid with interactive PropertyTypesSection component
// WHY: Requested by user to add a sticky scroll animation for better engagement.
// HOW: Implemented PropertyTypesSection with useScroll and sticky positioning, replacing the static grid.



export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [activePropertyType, setActivePropertyType] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const propertyTypes = ['Any', 'Apartments', 'Villas', 'Plots'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const category = propertyTypes[activePropertyType];
    const params = new URLSearchParams();

    if (category && category !== 'Any') params.set('category', category);
    if (selectedBudget && selectedBudget !== 'All Budgets') params.set('budget', selectedBudget);
    if (selectedLocation && selectedLocation !== 'All Locations') params.set('location', selectedLocation);

    navigate(`/projects?${params.toString()}`);
  };





  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Layout removeTopPadding={true}>
        {/* Hero Section - Single Column with Accordion Form */}
        <section ref={heroRef} className="fixed inset-0 w-screen h-screen flex items-center overflow-hidden z-0" data-scroll-section>
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/assets/5856675_Family_At_Home_1280x720.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Blue Overlay (40%) */}
          <div className="absolute inset-0 bg-primary/40 z-10" />

          {/* Desktop SVG Overlay */}
          <motion.svg
            className="absolute inset-0 w-full h-full hidden md:block pointer-events-none z-10"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
            width="1440"
            height="820"
            viewBox="0 0 1440 820"
            fill="none"
            preserveAspectRatio="xMidYMin slice"
          >
            <defs>
              <linearGradient id="paint0_linear_desktop" x1="1239.5" y1="253.5" x2="1192.18" y2="91.1199" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint1_linear_desktop" x1="620.375" y1="538.15" x2="799.229" y2="-41.2021" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint2_linear_desktop" x1="637" y1="1303.5" x2="644.403" y2="755.519" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint3_linear_desktop" x1="461" y1="264" x2="371.306" y2="672.546" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              d="M986 15V171.961C986 186.355 986.938 234.855 1025.06 265.832C1056.07 291.026 1094.44 299 1136 299C1177.56 299 1215.93 291.026 1246.94 265.832C1285.06 234.855 1286 186.355 1286 171.961V-280"
              stroke="url(#paint0_linear_desktop)"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
              d="M536 -344V345.859C536 374.653 537.875 471.678 614.125 533.648C676.139 584.048 752.875 600 836 600C919.125 600 995.861 584.048 1057.88 533.648C1134.12 471.678 1136 374.653 1136 345.859V-344"
              stroke="url(#paint1_linear_desktop)"
              strokeOpacity="0.2"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
              d="M416 548V1100.11C416 1123.15 417.5 1200.8 478.5 1250.4C528.111 1290.73 589.5 1303.5 656 1303.5C722.5 1303.5 783.889 1290.73 833.5 1250.4C894.5 1200.8 896 1123.15 896 1100.11V548"
              stroke="url(#paint2_linear_desktop)"
              strokeOpacity="0.3"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.1 }}
              d="M-81.5 1631.53V710.356C-81.5 671.907 -78.9969 542.35 22.7969 459.6C105.586 392.3 208.028 371 319 371C429.972 371 532.414 392.3 615.203 459.6C716.997 542.35 719.5 671.907 719.5 710.356V1704.18"
              stroke="url(#paint3_linear_desktop)"
              strokeOpacity="0.8"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>

          {/* Mobile SVG Overlay */}
          <motion.svg
            className="absolute inset-0 w-full h-full object-cover md:hidden pointer-events-none z-0"
            width="360"
            height="640"
            viewBox="0 0 360 640"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="paint0_linear_mobile" x1="458" y1="92.3299" x2="432.71" y2="5.54693" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint1_linear_mobile" x1="127.113" y1="244.459" x2="222.7" y2="-65.1716" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint2_linear_mobile" x1="102" y1="89.5" x2="59.2726" y2="468.693" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              d="M322.519 -35.1349V48.7521C322.519 56.4446 323.02 82.3651 343.395 98.9208C359.967 112.386 380.473 116.647 402.685 116.647C424.898 116.647 445.404 112.386 461.975 98.9208C482.351 82.3651 482.852 56.4446 482.852 48.7521V-192.796"
              stroke="url(#paint0_linear_mobile)"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
              d="M82.019 -227V141.691C82.019 157.08 83.0211 208.934 123.772 242.053C156.915 268.989 197.926 277.515 242.352 277.515C286.778 277.515 327.789 268.989 360.932 242.053C401.683 208.934 402.685 157.08 402.685 141.691V-227"
              stroke="url(#paint1_linear_mobile)"
              strokeOpacity="0.2"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
              d="M-248 828.809V336.494C-248 315.945 -246.662 246.704 -192.259 202.479C-148.013 166.511 -93.2636 155.127 -33.9553 155.127C25.3529 155.127 80.1026 166.511 124.349 202.479C178.752 246.704 180.089 315.945 180.089 336.494V867.638"
              stroke="url(#paint2_linear_mobile)"
              strokeOpacity="0.8"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>

          {/* Decorative elements (Blurs) - Keeping original but subduing or moving below SVG */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl z-0" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-2xl z-0" />

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-white text-center">
                {/* Collapsible Hero Content */}
                <AnimatePresence mode="wait">
                  {!isFormOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                        <MapPin className="w-4 h-4 text-accent" />
                        Serving Pune, PCMC & PMC Zones
                      </span>

                      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                        Opening Doors to a{' '}
                        <span className="text-accent">Better Living</span>
                      </h1>

                      <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
                        Your trusted partner in finding the perfect home. We deal in apartments,
                        villas, and plots across Pune's prime locations with complete transparency.
                      </p>

                      {/* Quick Action Buttons */}
                      <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <Button
                          size="lg"
                          className="bg-accent text-primary hover:bg-accent/90 group"
                          asChild
                        >
                          <Link to="/projects">
                            View All Projects
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        <Button
                          size="lg"
                          className="border border-accent text-accent bg-accent/10 backdrop-blur-md hover:bg-accent/20 transition-all duration-300"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Talk to Expert
                        </Button>
                      </div>

                      {/* Trust badges */}
                      <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm mb-10">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span>RERA Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span>500+ Families</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span>Free Consultation</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Accordion Form - Glass Effect */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-2xl mx-auto"
                >
                  <div
                    className={`backdrop-blur-sm bg-primary/95 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 ${isFormOpen ? 'shadow-2xl' : 'shadow-lg'
                      }`}
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => setIsFormOpen(!isFormOpen)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <Search className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl text-white">Find Your Dream Home</h3>
                          <p className="text-white/60 text-sm">Tell us what you're looking for</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isFormOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6 text-accent" />
                      </motion.div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {isFormOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2">
                            <form onSubmit={handleSearch} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">I'm looking for</label>
                                <div className="grid grid-cols-4 gap-2">
                                  {propertyTypes.map((type, i) => (
                                    <button
                                      key={type}
                                      type="button"
                                      onClick={() => setActivePropertyType(i)}
                                      className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activePropertyType === i
                                        ? 'bg-accent text-primary'
                                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                                        }`}
                                    >
                                      {type}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Budget Range</label>
                                <select
                                  value={selectedBudget}
                                  onChange={(e) => setSelectedBudget(e.target.value)}
                                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm [&>option]:bg-primary"
                                >
                                  <option value="">Any Budget</option>
                                  {budgetRanges.filter(b => b !== 'All Budgets').map(range => (
                                    <option key={range} value={range}>{range}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Preferred Location</label>
                                <select
                                  value={selectedLocation}
                                  onChange={(e) => setSelectedLocation(e.target.value)}
                                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm [&>option]:bg-primary"
                                >
                                  <option value="">Any Location</option>
                                  {serviceAreas.filter(l => l !== 'All Locations').map(area => (
                                    <option key={area} value={area}>{area}</option>
                                  ))}
                                </select>
                              </div>

                              <Button type="submit" size="lg" className="w-full bg-accent text-primary hover:bg-accent/90">
                                Search Properties
                                <Search className="w-4 h-4 ml-2" />
                              </Button>
                            </form>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types We Deal In */}
        {/* Property Types - Sticky Scroll Section */}
        <div className="relative z-10" style={{ marginTop: '100vh' }}>
          <PropertyTypesSection />

          {/* Featured Projects */}
          {/* Featured Projects - Horizontal Scroll */}
          {/* Featured Projects - Stacking Cards Section */}
          <FeaturedProjectsStack />



          {/* How We Work - Buying Journey - Parallax */}
          <BuyingJourneyParallax />

          {/* Why Choose Us - Trust Signals */}
          <TrustSignalsSection />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Service Areas */}
          <ServiceAreasSection />


        </div>
      </Layout>
    </>
  );
}

```

## src/pages/Index.tsx
```tsx
// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Your Blank App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default Index;

```

## src/pages/LoginPage.tsx
```tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Logged in successfully");
                navigate("/admin");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access the admin panel
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;

```

## src/pages/NotFound.tsx
```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

```

## src/pages/ProjectDetailPage.tsx
```tsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Calendar,
  Clock,
  Users,
  Check,
  Circle,
  ChevronRight,
  ChevronDown,
  Quote,
  Share2,
  Heart,
  Download,
  Play,
  Phone,
  Mail,
  Building,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Train,
  Palmtree,
  Briefcase,
  Home,
  BedDouble,
  Bath,
  Maximize,
  Dumbbell,
  Shield,
  Zap,
  Leaf,
  Waves,
  Coffee,
  Baby,
  Trees,
  Camera,
  Car,
  Droplets,
  Sun,
  Film,
  Sparkles,
  Footprints,
  Bell,
  Cpu,
  Plug
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Amenity, ProximityItem, Project } from '@/lib/projects-data';
import { useState, useEffect } from 'react';
import { fetchProjects } from '@/services/projects';
import { useProjectStore } from '@/stores/useProjectStore';

// Icon mapping for amenities
const amenityIcons: Record<string, React.ReactNode> = {
  pool: <Waves className="w-5 h-5" />,
  waves: <Waves className="w-5 h-5" />,
  dumbbell: <Dumbbell className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  baby: <Baby className="w-5 h-5" />,
  trees: <Trees className="w-5 h-5" />,
  footprints: <Footprints className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  car: <Car className="w-5 h-5" />,
  plug: <Plug className="w-5 h-5" />,
  droplets: <Droplets className="w-5 h-5" />,
  sun: <Sun className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  briefcase: <Briefcase className="w-5 h-5" />,
  bell: <Bell className="w-5 h-5" />,
  layout: <Building className="w-5 h-5" />,
  heart: <Sparkles className="w-5 h-5" />,
  film: <Film className="w-5 h-5" />,
  coffee: <Coffee className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
  leaf: <Leaf className="w-5 h-5" />,
};

// Icon mapping for proximity types
const proximityIcons: Record<string, React.ReactNode> = {
  education: <GraduationCap className="w-5 h-5" />,
  healthcare: <Hospital className="w-5 h-5" />,
  shopping: <ShoppingBag className="w-5 h-5" />,
  transport: <Train className="w-5 h-5" />,
  leisure: <Palmtree className="w-5 h-5" />,
  business: <Briefcase className="w-5 h-5" />,
};

const proximityLabels: Record<string, string> = {
  education: 'Education',
  healthcare: 'Healthcare',
  shopping: 'Shopping',
  transport: 'Transport',
  leisure: 'Leisure',
  business: 'Business',
};

const amenityCategoryLabels: Record<string, string> = {
  lifestyle: 'Lifestyle',
  sports: 'Sports & Fitness',
  convenience: 'Convenience',
  safety: 'Safety & Security',
  sustainability: 'Sustainability',
};

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const { selectedProject: project, isLoading, fetchProjectBySlug } = useProjectStore();

  // const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // Preloader state
  const [showPreloader, setShowPreloader] = useState(true);

  // Fetch project data
  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;

      await fetchProjectBySlug(slug);

      // Fetch related projects (simple implementation: fetch a few others)
      // Ideally we would fetch by specific IDs if they exist in property.relatedProjects
      // For now, let's fetch recent projects and exclude current one
      // We can use the store's project list if already populated, or fetch fresh.
      // For simplicity, let's call the service directly for related projects or use store actions if available.
      // Since we want to keep `relatedProjects` local, we can just call the service here 
      // OR better, rely on store.projects if loaded.

      try {
        const allProjects = await fetchProjects();
        // We need the ID of the current project, but `project` from store might not be set immediately 
        // due to async nature or closure. 
        // Actually `fetchProjectBySlug` in store updates `selectedProject`.
        // We can't easily get the ID here without subscribing or awaiting properly.
        // But `fetchProjects` returns data.
        const related = allProjects
          .filter(p => p.slug !== slug) // Filter by slug instead of ID if ID is cleaner
          .slice(0, 2);
        setRelatedProjects(related);
      } catch (e) {
        console.error("Error fetching related projects", e);
      }
    };

    loadData();
  }, [slug, fetchProjectBySlug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-[80vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground animate-pulse">Loading project details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  const statusColors = {
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planning: 'Planning',
  };

  const phaseStatusIcons = {
    completed: <Check className="w-4 h-4" />,
    'in-progress': <Circle className="w-4 h-4 fill-current" />,
    upcoming: <Circle className="w-4 h-4" />,
  };

  // Group amenities by category
  const amenitiesByCategory = project.amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<string, Amenity[]>);

  // Group proximity by type
  const proximityByType = project.proximity.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, ProximityItem[]>);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      </AnimatePresence>
      <Layout removeTopPadding={true}>
        {/* Breadcrumb Navigation - Absolute on top for transparency if needed, or relative below header */}

        {/* Hero Section */}
        <section className="relative">
          {/* Hero Image or Fallback */}
          <div className="relative h-[50vh] md:h-[70vh] overflow-hidden bg-gradient-gold">
            {project.heroImage ? (
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-gold flex items-center justify-center">
                {/* Optional Pattern or texture could go here */}
                <Sparkles className="w-20 h-20 text-white/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex items-center gap-3">
              {project.videoUrl && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-full text-foreground hover:bg-card/90 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">Watch Video</span>
                </button>
              )}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full glass transition-colors ${isLiked ? 'text-red-400' : 'text-foreground'}`}
                aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => navigator.share?.({ title: project.title, url: window.location.href })}
                className="p-3 rounded-full glass text-foreground hover:bg-card/90 transition-colors"
                aria-label="Share project"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Project Title Overlay */}
          <div className="container mx-auto px-6 lg:px-8 -mt-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-medium tracking-wider uppercase text-primary">
                  {project.category}
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
                  {statusLabels[project.status]}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-gold text-primary-foreground">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
                {project.title}
              </h1>
              <p className="font-serif text-xl md:text-2xl text-muted-foreground italic mb-4">
                {project.subtitle}
              </p>

              {/* Quick Info Pills */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{project.year}</span>
                </div>
                {project.priceRange && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full text-sm">
                    <span className="text-primary font-medium">{project.priceRange}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideo && project.videoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-4xl aspect-video bg-card rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={project.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={`${project.title} video`}
                />
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 p-2 bg-background/80 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-16">

                {/* Overview Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Overview</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.fullDescription}
                  </p>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="p-4 bg-gradient-card rounded-xl border border-border text-center">
                        <div className="font-serif text-2xl md:text-3xl text-gradient-gold">{metric.value}</div>
                        <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Image Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Gallery</h2>
                  </div>

                  {/* Main Image */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                    <img
                      src={project.images[activeImageIndex].url}
                      alt={project.images[activeImageIndex].alt}
                      className="w-full h-full object-cover"
                    />
                    {project.images[activeImageIndex].caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
                        <p className="text-sm text-muted-foreground">
                          {project.images[activeImageIndex].caption}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === index
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        aria-label={`View ${image.alt}`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Amenities Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Amenities & Facilities</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Experience world-class amenities designed for modern living
                  </p>

                  <Tabs defaultValue={Object.keys(amenitiesByCategory)[0]} className="w-full">
                    <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0 mb-6">
                      {Object.keys(amenitiesByCategory).map((category) => (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className="px-4 py-2 rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                        >
                          {amenityCategoryLabels[category]}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {Object.entries(amenitiesByCategory).map(([category, amenities]) => (
                      <TabsContent key={category} value={category} className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {amenities.map((amenity) => (
                            <div
                              key={amenity.name}
                              className="flex flex-col items-center gap-3 p-4 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-colors text-center"
                            >
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {amenityIcons[amenity.icon] || <Sparkles className="w-5 h-5" />}
                              </div>
                              <span className="text-sm text-foreground">{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </motion.div>

                {/* Location & Proximity Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Location Advantages</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Strategically located with easy access to essential amenities
                  </p>

                  {/* Address */}
                  <div className="p-4 bg-gradient-card rounded-xl border border-border">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">{project.title}</div>
                        <div className="text-muted-foreground text-sm">{project.address}</div>
                      </div>
                    </div>
                  </div>

                  {/* Proximity by Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(proximityByType).map(([type, items]) => (
                      <div key={type} className="space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          {proximityIcons[type]}
                          <h3 className="font-medium">{proximityLabels[type]}</h3>
                        </div>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between p-3 bg-gradient-card rounded-lg border border-border"
                            >
                              <span className="text-foreground text-sm">{item.name}</span>
                              <div className="text-right">
                                <div className="text-primary text-sm font-medium">{item.distance}</div>
                                {item.duration && (
                                  <div className="text-muted-foreground text-xs">{item.duration}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Floor Plans Section */}
                {project.floorPlans.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground">Floor Plans & Pricing</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Choose from a variety of thoughtfully designed layouts
                    </p>

                    {/* Floor Plan Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.floorPlans.map((plan, index) => (
                        <button
                          key={plan.name}
                          onClick={() => setActiveFloorPlan(index)}
                          className={`px-4 py-2 rounded-full border transition-all ${activeFloorPlan === index
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                            }`}
                        >
                          {plan.type}
                        </button>
                      ))}
                    </div>

                    {/* Active Floor Plan Details */}
                    <div className="p-6 bg-gradient-card rounded-xl border border-border">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                          <h3 className="font-serif text-2xl text-foreground mb-2">
                            {project.floorPlans[activeFloorPlan].name}
                          </h3>
                          <p className="text-muted-foreground">
                            {project.floorPlans[activeFloorPlan].type}
                          </p>

                          <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <Maximize className="w-4 h-4 text-primary" />
                              <span>{project.floorPlans[activeFloorPlan].size}</span>
                            </div>
                            {project.floorPlans[activeFloorPlan].bedrooms > 0 && (
                              <div className="flex items-center gap-2">
                                <BedDouble className="w-4 h-4 text-primary" />
                                <span>{project.floorPlans[activeFloorPlan].bedrooms} Beds</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Bath className="w-4 h-4 text-primary" />
                              <span>{project.floorPlans[activeFloorPlan].bathrooms} Baths</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          {project.floorPlans[activeFloorPlan].price && (
                            <>
                              <div className="text-sm text-muted-foreground">Price</div>
                              <div className="font-serif text-3xl text-gradient-gold">
                                {project.floorPlans[activeFloorPlan].price}
                              </div>
                            </>
                          )}
                          <a
                            href="#enquiry"
                            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-gradient-gold text-primary-foreground rounded-full text-sm font-medium hover:shadow-gold transition-shadow"
                          >
                            Enquire Now
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* All Floor Plans Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {project.floorPlans.map((plan, index) => (
                        <button
                          key={plan.name}
                          onClick={() => setActiveFloorPlan(index)}
                          className={`p-4 rounded-xl border transition-all text-left ${activeFloorPlan === index
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-gradient-card hover:border-primary/30'
                            }`}
                        >
                          <div className="font-medium text-foreground">{plan.name}</div>
                          <div className="text-sm text-muted-foreground">{plan.type} • {plan.size}</div>
                          {plan.price && (
                            <div className="text-primary font-medium mt-2">{plan.price}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Specifications Section */}
                {project.specifications.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground">Specifications</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Premium materials and finishes throughout
                    </p>

                    <div className="space-y-4">
                      {project.specifications.map((spec) => (
                        <div key={spec.category} className="bg-gradient-card rounded-xl border border-border overflow-hidden">
                          <div className="p-4 border-b border-border bg-muted/20">
                            <h3 className="font-medium text-foreground">{spec.category}</h3>
                          </div>
                          <div className="divide-y divide-border">
                            {spec.items.map((item) => (
                              <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
                                <span className="text-muted-foreground">{item.label}</span>
                                <span className="text-foreground font-medium">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Project Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Project Timeline</h2>
                  </div>

                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                    <div className="space-y-6">
                      {project.phases.map((phase, index) => (
                        <div key={phase.name} className="relative flex gap-6 pl-12">
                          {/* Status Icon */}
                          <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center ${phase.status === 'completed'
                            ? 'bg-emerald-500 text-emerald-950'
                            : phase.status === 'in-progress'
                              ? 'bg-amber-500 text-amber-950'
                              : 'bg-muted text-muted-foreground'
                            }`}>
                            {phaseStatusIcons[phase.status]}
                          </div>

                          <div className="flex-1 pb-6">
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                              <h3 className="font-medium text-foreground">{phase.name}</h3>
                              {phase.date && (
                                <span className="text-xs text-muted-foreground">{phase.date}</span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{phase.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* FAQs Section */}
                {project.faqs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground">Frequently Asked Questions</h2>
                    </div>

                    <Accordion type="single" collapsible className="space-y-3">
                      {project.faqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`faq-${index}`}
                          className="bg-gradient-card rounded-xl border border-border px-4"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <span className="text-foreground font-medium pr-4">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-8 bg-gradient-card rounded-xl border border-border"
                  >
                    <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/30" />
                    <blockquote className="relative z-10 pl-8">
                      <p className="font-serif text-xl text-foreground italic mb-6">
                        "{project.testimonial.quote}"
                      </p>
                      <footer>
                        <div className="font-medium text-foreground">{project.testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{project.testimonial.role}</div>
                      </footer>
                    </blockquote>
                  </motion.div>
                )}

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                  <section className="py-12 border-t border-border mt-12">
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                      Other Projects You May Like
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedProjects.map((relatedProject, index) => (
                        <ProjectCard key={relatedProject.id} project={relatedProject} index={index} />
                      ))}
                    </div>
                  </section>
                )}

              </div>

              {/* Right Column - Enquiry Form (Sticky) */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div id="enquiry" className="bg-card border border-border rounded-xl p-6 shadow-lg">
                    <h3 className="font-serif text-2xl text-foreground mb-4">Interested?</h3>
                    <p className="text-muted-foreground mb-6">
                      Request a callback or schedule a site visit for {project.title}.
                    </p>

                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                        <input
                          type="tel"
                          placeholder="Your Number"
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Email (Optional)</label>
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                        <textarea
                          placeholder="I am interested in..."
                          rows={4}
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-gold text-primary-foreground rounded-lg font-medium hover:shadow-gold transition-shadow"
                      >
                        Request Callback
                      </button>

                      <p className="text-xs text-center text-muted-foreground mt-4">
                        By submitting, you agree to our privacy policy.
                      </p>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="flex items-center justify-center gap-2 text-primary font-medium mb-2">
                        <Phone className="w-4 h-4" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                        <Mail className="w-4 h-4" />
                        <span>sales@realabodes.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

```

## src/pages/ProjectsPage.tsx
```tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectListItem } from '@/components/projects/ProjectListItem';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { EmptyState } from '@/components/projects/EmptyState';
import { SkeletonCard, SkeletonList } from '@/components/projects/SkeletonCard';
import { Project } from '@/lib/projects-data';
import { fetchProjects } from '@/services/projects';
import { matchesBudget } from '@/lib/filter-utils';
import { useProjectStore } from '@/stores/useProjectStore';

export default function ProjectsPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const {
    projects,
    filteredProjects,
    filters,
    isLoading: isProjectLoading,
    fetchProjects,
    setFilter,
    clearFilters,
    filterProjects
  } = useProjectStore();

  const { category: selectedCategory, status: selectedStatus, budget: selectedBudget, location: selectedLocation, search: searchQuery } = filters;

  // Update logic to react to searchParams changes if navigation happens while on the page
  useEffect(() => {
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const budget = searchParams.get('budget');
    const location = searchParams.get('location');
    const search = searchParams.get('search');

    if (category) setFilter('category', category);
    if (status) setFilter('status', status);
    if (budget) setFilter('budget', budget);
    if (location) setFilter('location', location);
    if (search) setFilter('search', search);
  }, [searchParams, setFilter]);

  // Fetch projects from Supabase
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects based on current filters (Handled by store now)
  // Trigger filter when filters change is handled in store actions but we might need to ensure initialization
  useEffect(() => {
    filterProjects();
  }, [filters, projects, filterProjects]);

  // Separate featured projects for grid view
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  // Clear all filters


  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <Layout removeTopPadding={true}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-primary text-white">
          {/* Background gradient - Blend Blue effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary-light/50" />

          <div className="container mx-auto px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block text-sm font-medium tracking-wider uppercase text-accent mb-4">
                Our Portfolio
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Exceptional{' '}
                <span className="italic text-gradient-gold">Projects</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                Explore our collection of landmark developments, from luxury residences
                to iconic commercial spaces. Each project reflects our commitment to
                excellence and innovation.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/20"
            >
              {[
                { value: `${projects.length}+`, label: 'Projects' },
                { value: '150K+', label: 'Square Meters' },
                { value: '12+', label: 'Years Experience' },
                { value: '98%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="font-serif text-3xl md:text-4xl text-gradient-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-y border-border bg-card/30 sticky top-16 z-40 backdrop-blur-lg">
          <div className="container mx-auto px-6 lg:px-8">
            <ProjectFilters
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
              selectedBudget={selectedBudget}
              selectedLocation={selectedLocation}
              searchQuery={searchQuery}
              viewMode={viewMode}
              onCategoryChange={(val) => setFilter('category', val)}
              onStatusChange={(val) => setFilter('status', val)}
              onBudgetChange={(val) => setFilter('budget', val)}
              onLocationChange={(val) => setFilter('location', val)}
              onSearchChange={(val) => setFilter('search', val)}
              onViewModeChange={setViewMode}
              resultCount={filteredProjects.length}
            />
          </div>
        </section>

        {/* Projects Grid/List */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            {isProjectLoading ? (
              // Skeleton Loading State
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SkeletonCard priority="high" />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonList key={i} />
                  ))}
                </div>
              )
            ) : filteredProjects.length === 0 ? (
              // Empty State
              <EmptyState searchQuery={searchQuery} onClear={clearFilters} />
            ) : viewMode === 'grid' ? (
              // Grid View - Featured projects span 2 columns
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Render featured projects first with priority */}
                {featuredProjects.slice(0, 1).map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} priority="high" />
                ))}

                {/* Regular projects */}
                {regularProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index + 1} />
                ))}

                {/* Remaining featured projects */}
                {featuredProjects.slice(1).map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={regularProjects.length + index + 1}
                  />
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredProjects.map((project, index) => (
                  <ProjectListItem key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>


      </Layout>
    </>
  );
}

```

## src/services/blog.ts
```ts

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

```

## src/services/contact.ts
```ts

import { supabase } from '@/integrations/supabase/client';

export type ContactMessage = {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    status?: 'new' | 'read' | 'replied';
    created_at?: string;
};

export const sendContactMessage = async (message: ContactMessage) => {
    // 1. Save to Database
    const { data: savedMessage, error: dbError } = await supabase
        .from('contact_messages')
        .insert([{ ...message, status: 'new' }])
        .select()
        .single();

    if (dbError) {
        throw dbError;
    }

    // 2. Fetch Admin Email
    const { data: settingsData } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'contact_email')
        .single();

    // Default to a fallback if not set, or handle gracefully
    const adminEmail = settingsData?.value || 'info@realabodes.in';

    // 3. Send Notification Email (Fire and forget, or await if critical)
    try {
        console.log("Invoking 'send-contact-email' with:", { adminEmail, message });

        const { data, error: fnError } = await supabase.functions.invoke('send-contact-email', {
            body: {
                name: message.name,
                email: message.email,
                phone: message.phone,
                message: message.message,
                to_email: adminEmail
            },
        });

        if (fnError) {
            console.error('Edge Function Error:', fnError);
        } else {
            console.log('Edge Function Success:', data);
        }
    } catch (err) {
        console.error('Failed to invoke edge function (Exception):', err);
    }

    return savedMessage;
};

export const fetchContactMessages = async () => {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching contact messages:', error);
        return [];
    }

    return data;
};

```

## src/services/projects.ts
```ts
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/lib/projects-data';

export const fetchProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }

    // Map DB structure to Frontend Project interface
    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category,
        status: item.status,
        featured: item.featured,
        location: item.location,
        priceRange: item.price_range,
        ...item.details // Spread individual JSONB fields (images, amenities, etc.)
    }));
};

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        console.error('Error fetching project by slug:', error);
        throw error;
    }

    if (!data) return null;

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        featured: data.featured,
        location: data.location,
        priceRange: data.price_range,
        ...data.details
    };
};

export const createProject = async (project: Project): Promise<Project> => {
    // Separate top-level columns from JSONB details
    const {
        id, // let DB generate ID usually, or use if provided but ignore for new insert if UUID
        title,
        slug,
        category,
        status,
        featured,
        location,
        priceRange,
        ...details
    } = project;

    const { data, error } = await supabase
        .from('projects')
        .insert([
            {
                title,
                slug: slug || title.toLowerCase().replace(/ /g, '-'), // fallback slug gen
                category,
                status,
                featured,
                location,
                price_range: priceRange,
                details
            }
        ])
        .select()
        .single();

    if (error) throw error;

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        featured: data.featured,
        location: data.location,
        priceRange: data.price_range,
        ...data.details
    };
};

export const updateProject = async (project: Project): Promise<Project> => {
    const {
        id,
        title,
        slug,
        category,
        status,
        featured,
        location,
        priceRange,
        ...details
    } = project;

    const { data, error } = await supabase
        .from('projects')
        .update({
            title,
            slug,
            category,
            status,
            featured,
            location,
            price_range: priceRange,
            details
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        featured: data.featured,
        location: data.location,
        priceRange: data.price_range,
        ...data.details
    };
};

export const deleteProject = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

export const uploadProjectImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

export const seedProject = async (project: Project): Promise<Project> => {
    // Separate top-level columns from JSONB details
    const {
        id, // eslint-disable-next-line @typescript-eslint/no-unused-vars
        title,
        slug,
        category,
        status,
        featured,
        location,
        priceRange,
        ...details
    } = project;

    const { data, error } = await supabase
        .from('projects')
        .upsert([
            {
                title,
                slug: slug || title.toLowerCase().replace(/ /g, '-'), // fallback slug gen
                category,
                status,
                featured,
                location,
                price_range: priceRange,
                details
            }
        ], { onConflict: 'slug' })
        .select()
        .single();

    if (error) throw error;

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        status: data.status,
        featured: data.featured,
        location: data.location,
        priceRange: data.price_range,
        ...data.details
    };
};

```

## src/services/settings.ts
```ts

import { supabase } from '@/integrations/supabase/client';

export type SiteSetting = {
    key: string;
    value: string;
};

export const fetchSiteSettings = async (): Promise<Record<string, string>> => {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*');

    if (error) {
        console.error('Error fetching site settings:', error);
        return {};
    }

    const settings: Record<string, string> = {};
    data.forEach((setting: SiteSetting) => {
        settings[setting.key] = setting.value;
    });

    return settings;
};

export const updateSiteSetting = async (key: string, value: string) => {
    const { data, error } = await supabase
        .from('site_settings')
        .upsert({ key, value })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

```

## src/stores/useAuthStore.ts
```ts

import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
    session: Session | null;
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    initialize: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    user: null,
    loading: true,
    isAuthenticated: false,

    initialize: async () => {
        set({ loading: true });

        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        set({
            session,
            user: session?.user ?? null,
            isAuthenticated: !!session,
            loading: false
        });

        // Listen for changes
        supabase.auth.onAuthStateChange((_event, session) => {
            set({
                session,
                user: session?.user ?? null,
                isAuthenticated: !!session,
                loading: false
            });
        });
    },

    signOut: async () => {
        await supabase.auth.signOut();
        set({ session: null, user: null, isAuthenticated: false });
    },
}));

```

## src/stores/useBlogStore.ts
```ts

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

```

## src/stores/useProjectStore.ts
```ts

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

```

## src/stores/useUIStore.ts
```ts

import { create } from 'zustand';

interface UIState {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (isOpen: boolean) => void;
    // Add other UI states here as needed
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
}));

```

## src/test/example.test.ts
```ts
import { describe, it, expect } from "vitest";

describe("example", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

```

## src/test/setup.ts
```ts
import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

```

## src/vite-env.d.ts
```ts
/// <reference types="vite/client" />

```

## supabase/.temp/cli-latest
```txt
v2.72.7
```

## supabase/blog-schema.sql
```sql
-- Create blogs table
create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null,
  excerpt text,
  content text,
  cover_image text,
  date text,
  author text,
  category text,
  tags text[],
  read_time text,
  published boolean default false,

  -- Add constraints
  constraint blogs_slug_key unique (slug)
);

-- Enable Row Level Security (RLS)
alter table public.blogs enable row level security;

-- Create policies
-- Drop existing policies first to allow re-running the script
drop policy if exists "Public blogs are viewable by everyone" on public.blogs;
drop policy if exists "Enable insert for all users" on public.blogs;
drop policy if exists "Enable update for all users" on public.blogs;
drop policy if exists "Enable delete for all users" on public.blogs;

-- Allow public read access
create policy "Public blogs are viewable by everyone" 
  on public.blogs for select 
  using (true);

-- Allow authenticated users to insert/update/delete (adjust if you have specific admin roles)
-- FOR DEVELOPMENT: Allowing public access. Revert to auth.role() = 'authenticated' for production.
create policy "Enable insert for all users" 
  on public.blogs for insert 
  with check (true);

create policy "Enable update for all users" 
  on public.blogs for update 
  using (true);

create policy "Enable delete for all users" 
  on public.blogs for delete 
  using (true);

-- Create storage bucket for blog images if it doesn't exist
insert into storage.buckets (id, name, public) 
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "Blog images are publicly accessible" on storage.objects;
drop policy if exists "Enable public upload for blog images" on storage.objects;

create policy "Blog images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );

-- FOR DEVELOPMENT: Allowing public uploads. Revert to auth access for production.
create policy "Enable public upload for blog images"
  on storage.objects for insert
  with check ( bucket_id = 'blog-images' );

```

## supabase/functions/send-contact-email/index.ts
```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
    name: string;
    email: string;
    phone?: string;
    message: string;
    to_email: string;
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { name, email, phone, message, to_email }: EmailRequest = await req.json();

        if (!RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not set");
            // We still return 200 to not break the frontend flow, but log the error
            return new Response(
                JSON.stringify({ error: "Server configuration error: Missing API Key" }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 500,
                }
            );
        }

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Contact Form <onboarding@resend.dev>", // Start with the testing email
                to: [to_email], // The admin email configured in settings
                subject: `New Inquiry from ${name}`,
                html: `
          <h1>New Contact Inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
            ${message}
          </blockquote>
        `,
            }),
        });

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});

```

## supabase/schema.sql
```sql
-- Create projects table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text not null,
  category text,
  status text default 'active',
  featured boolean default false,
  location text,
  price_range text,
  details jsonb default '{}'::jsonb,
  
  -- Add constraints
  constraint projects_slug_key unique (slug)
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policies (modify as needed for your auth setup)
-- Drop existing policies first to allow re-running the script
drop policy if exists "Public projects are viewable by everyone" on public.projects;
drop policy if exists "Enable insert for all users" on public.projects;
drop policy if exists "Enable update for all users" on public.projects;
drop policy if exists "Enable delete for all users" on public.projects;
drop policy if exists "Authenticated users can insert projects" on public.projects;
drop policy if exists "Authenticated users can update projects" on public.projects;
drop policy if exists "Authenticated users can delete projects" on public.projects;

-- Allow public read access
create policy "Public projects are viewable by everyone" 
  on public.projects for select 
  using (true);

-- Allow authenticated users to insert/update/delete (adjust if you have specific admin roles)
-- FOR DEVELOPMENT: Allowing public access. Revert to auth.role() = 'authenticated' for production.
create policy "Enable insert for all users" 
  on public.projects for insert 
  with check (true);

create policy "Enable update for all users" 
  on public.projects for update 
  using (true);

create policy "Enable delete for all users" 
  on public.projects for delete 
  using (true);

-- Create storage bucket for project images if it doesn't exist
insert into storage.buckets (id, name, public) 
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "Project images are publicly accessible" on storage.objects;
-- drop policy if exists "Authenticated users can upload project images" on storage.objects; -- In case it exists with the old name
drop policy if exists "Enable public upload for project images" on storage.objects;

create policy "Project images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'project-images' );

-- FOR DEVELOPMENT: Allowing public uploads. Revert to auth access for production.
create policy "Enable public upload for project images"
  on storage.objects for insert
  with check ( bucket_id = 'project-images' );

```

## supabase_setup.sql
```sql
-- Create a table for site settings (key-value pairs)
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default contact email setting if it doesn't exist
INSERT INTO site_settings (key, value)
VALUES ('contact_email', 'admin@example.com')
ON CONFLICT (key) DO NOTHING;

-- Create a table for contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, read, replied
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for site_settings
-- Allow everyone to read settings (public)
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT USING (true);

-- Allow everyone to update settings (for development without auth)
CREATE POLICY "Allow public update" ON site_settings
  FOR UPDATE USING (true);

-- Allow everyone to insert settings (upsert needs insert permission)
CREATE POLICY "Allow public insert" ON site_settings
  FOR INSERT WITH CHECK (true);

-- Policies for contact_messages
-- Allow public to insert messages (submitting the form)
CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Allow everyone to view messages (for admin view without auth)
CREATE POLICY "Allow public select" ON contact_messages
  FOR SELECT USING (true);

```

## tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card-hover))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        shimmer: "shimmer 2s infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

```

## tsconfig.app.json
```json
{
  "compilerOptions": {
    "types": ["vitest/globals"],
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitAny": false,
    "noFallthroughCasesInSwitch": false,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}

```

## tsconfig.json
```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "allowJs": true,
    "noUnusedLocals": false,
    "strictNullChecks": false
  }
}

```

## tsconfig.node.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

## vercel.json
```json
{
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

## vite.config.ts
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

```

## vitest.config.ts
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});

```

