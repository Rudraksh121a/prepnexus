import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vjkvifqqzjmrflukaivf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqa3ZpZnFxemptcmZsdWthaXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODg1MjksImV4cCI6MjA4ODQ2NDUyOX0.AslJyU2XO1yQm_I6LwkO70_jCAZfmqJHum9dMn8mPZU'
);

(async () => {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  console.log('Error:', error);
  console.log('Data:', data);
})();
