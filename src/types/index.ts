import type { User as SupabaseUser } from '@supabase/supabase-js';

export type { SupabaseUser };

export type Profile = {
  id: string;
  email?: string | null;
  phone?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  role?: 'user' | 'admin' | 'partner';
  account_type?: 'individual' | 'business';
  email_verified?: boolean;
  created_at?: string;
};

export type AuthState = {
  user: SupabaseUser | null;
  profile: Profile | null;
  initialized: boolean;
};
