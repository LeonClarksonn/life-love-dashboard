
-- Create the goals table
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('daily', 'monthly', 'yearly')),
  completed BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add comments to the table and columns
COMMENT ON TABLE public.goals IS 'Stores user goals.';
COMMENT ON COLUMN public.goals.id IS 'Unique identifier for each goal.';
COMMENT ON COLUMN public.goals.user_id IS 'The user who owns the goal.';
COMMENT ON COLUMN public.goals.text IS 'The content of the goal.';
COMMENT ON COLUMN public.goals.type IS 'The type of goal (daily, monthly, yearly).';
COMMENT ON COLUMN public.goals.completed IS 'Whether the goal has been completed.';
COMMENT ON COLUMN public.goals.created_at IS 'When the goal was created.';

-- Enable Row Level Security
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can view their own goals"
  ON public.goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON public.goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON public.goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
  ON public.goals FOR DELETE
  USING (auth.uid() = user_id);
