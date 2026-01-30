
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
