
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TablesInsert } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';

// Fetch all accounts
const fetchAccounts = async () => {
  const { data, error } = await supabase.from('accounts').select('*').order('created_at');
  if (error) throw error;
  return data;
};

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAccounts,
  });
};

// Fetch transactions
const fetchTransactions = async () => {
    const { data, error } = await supabase.from('transactions').select(`
      *,
      categories (name, icon)
    `).order('date', { ascending: false });
    if (error) throw error;
    // The explicit type is needed because supabase client can't infer joined types.
    return data as (Omit<(typeof data)[number], 'categories'> & { categories: {name: string, icon: string} | null })[] || [];
};

export const useTransactions = () => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: fetchTransactions,
    });
};

// Fetch categories
const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error) throw error;
    return data;
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });
};

// Add a transaction
export const useAddTransaction = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (transaction: TablesInsert<'transactions'>) => {
            // First, insert the transaction
            const { error: transactionError } = await supabase.from('transactions').insert(transaction);
            if (transactionError) throw new Error(transactionError.message);

            // Then, update the account balance
            const account = (await queryClient.fetchQuery({ queryKey: ['accounts']}) as any[])?.find(a => a.id === transaction.account_id);
            
            if (account) {
              const newBalance = transaction.type === 'income'
                ? Number(account.balance) + transaction.amount
                : Number(account.balance) - transaction.amount;
              
              const { error: accountError } = await supabase
                .from('accounts')
                .update({ balance: newBalance, updated_at: new Date().toISOString() })
                .eq('id', transaction.account_id);
              
              if (accountError) throw new Error(accountError.message);
            }
        },
        onSuccess: () => {
            toast({ title: "Success", description: "Transaction added." });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: (error: Error) => {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    });
};

