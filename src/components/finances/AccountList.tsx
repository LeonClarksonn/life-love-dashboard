
import { useAccounts } from "@/hooks/useFinance";
import { Skeleton } from "@/components/ui/skeleton";
import { AddAccountDialog } from "./AddAccountDialog";
import { Wallet } from "lucide-react";

const AccountList = () => {
  const { data: accounts, isLoading } = useAccounts();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        <AddAccountDialog />
      </div>
      {accounts && accounts.length > 0 ? (
        <ul className="space-y-3">
          {accounts.map(account => (
            <li key={account.id} className="flex justify-between items-center p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-full">
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium capitalize">{account.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{account.type.replace('_', ' ')}</p>
                </div>
              </div>
              <p className="font-mono text-base font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(account.balance))}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
          <p>No accounts yet.</p>
          <p className="text-sm">Add one to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AccountList;
