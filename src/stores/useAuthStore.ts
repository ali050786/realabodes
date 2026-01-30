
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
