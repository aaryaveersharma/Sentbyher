import { createClient } from '@supabase/supabase-js';

// Fallback to dummy values for testing to prevent client crash if env vars are missing
// Updated to support NEXT_PUBLIC_ variants for Render, and keeping REACT_APP_ as fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
