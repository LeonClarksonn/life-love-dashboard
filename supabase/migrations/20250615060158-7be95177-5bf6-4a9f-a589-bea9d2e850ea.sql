
-- Create the habits table
CREATE TABLE public.habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  completed BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add comments to the table and columns
COMMENT ON TABLE public.habits IS 'Stores user habits.';
COMMENT ON COLUMN public.habits.id IS 'Unique identifier for each habit.';
COMMENT ON COLUMN public.habits.user_id IS 'The user who owns the habit.';
COMMENT ON COLUMN public.habits.name IS 'The name of the habit.';
COMMENT ON COLUMN public.habits.icon IS 'The name of the lucide-react icon for the habit.';
COMMENT ON COLUMN public.habits.completed IS 'Whether the habit is completed for the day.';
COMMENT ON COLUMN public.habits.created_at IS 'When the habit was created.';

-- Enable Row Level Security
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can view their own habits"
  ON public.habits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own habits"
  ON public.habits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
  ON public.habits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
  ON public.habits FOR DELETE
  USING (auth.uid() = user_id);
