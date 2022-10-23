import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://udwwwyliqzmasypcpiye.supabase.co';
const supabaseAnonKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkd3d3eWxpcXptYXN5cGNwaXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUxNTY3MzAsImV4cCI6MTk4MDczMjczMH0.LaHlpfg8rXvUzzqRp1stiS7qgglMMiQ6wOiawZEY8P0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);