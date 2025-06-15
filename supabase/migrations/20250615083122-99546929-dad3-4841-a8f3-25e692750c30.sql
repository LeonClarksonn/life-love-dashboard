
-- Create ENUM types for better data consistency
CREATE TYPE public.account_type AS ENUM ('checking', 'savings', 'credit_card', 'investment', 'cash');
CREATE TYPE public.transaction_type AS ENUM ('income', 'expense');
CREATE TYPE public.budget_period AS ENUM ('weekly', 'monthly', 'yearly');

-- 1. Accounts Table
-- Stores user's financial accounts (e.g., checking, savings, credit card).
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type public.account_type NOT NULL,
  balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.accounts IS 'Stores user financial accounts.';

-- RLS for accounts
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own accounts" ON public.accounts
  FOR ALL USING (auth.uid() = user_id);

-- 2. Categories Table
-- Stores transaction categories (e.g., Groceries, Rent). Can be user-defined or default.
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT, -- e.g., Lucide icon name
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.categories IS 'Stores transaction categories, both default (user_id is NULL) and user-created.';
-- Unique constraint for user-specific categories
CREATE UNIQUE INDEX user_category_name_idx ON public.categories (user_id, lower(name)) WHERE user_id IS NOT NULL;
-- Unique constraint for default categories
CREATE UNIQUE INDEX default_category_name_idx ON public.categories (lower(name)) WHERE user_id IS NULL;


-- RLS for categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view default and their own categories" ON public.categories
  FOR SELECT USING (user_id IS NULL OR auth.uid() = user_id);
CREATE POLICY "Users can insert their own categories" ON public.categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own categories" ON public.categories
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own categories" ON public.categories
  FOR DELETE USING (auth.uid() = user_id);

-- 3. Transactions Table
-- Stores individual financial transactions.
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  amount NUMERIC(15, 2) NOT NULL,
  type public.transaction_type NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.transactions IS 'Stores individual financial transactions.';

-- RLS for transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own transactions" ON public.transactions
  FOR ALL USING (auth.uid() = user_id);

-- 4. Budgets Table
-- Stores user-defined budgets for specific categories.
CREATE TABLE public.budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  amount NUMERIC(15, 2) NOT NULL,
  period public.budget_period NOT NULL,
  start_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, category_id, period)
);
COMMENT ON TABLE public.budgets IS 'Stores user-defined budgets for categories.';

-- RLS for budgets
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own budgets" ON public.budgets
  FOR ALL USING (auth.uid() = user_id);

-- Insert some default categories
INSERT INTO public.categories (name, icon) VALUES
('Groceries', 'shopping-cart'),
('Rent', 'home'),
('Salary', 'dollar-sign'),
('Utilities', 'lightbulb'),
('Transport', 'bus'),
('Entertainment', 'popcorn'),
('Health', 'heart-pulse'),
('Dining Out', 'utensils'),
('Shopping', 'shirt'),
('Travel', 'plane'),
('Other', 'ellipsis');
