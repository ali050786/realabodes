
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
