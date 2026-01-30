
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
