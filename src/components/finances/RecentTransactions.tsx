
import { useTransactions } from "@/hooks/useFinance";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { icons } from 'lucide-react';

const toPascalCase = (str: string) => {
    if (!str) return 'Ellipsis';
    return str
        .toLowerCase()
        .split(/[-_ ]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

const TransactionIcon = ({ name, className }: { name: string | null; className?: string }) => {
    const iconName = toPascalCase(name || 'ellipsis');
    const LucideIcon = icons[iconName as keyof typeof icons] || icons['Ellipsis'];
    return <LucideIcon className={className} />;
};


const RecentTransactions = () => {
    const { data: transactions, isLoading } = useTransactions();
    
    if(isLoading) return (
      <div className="space-y-2">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </div>
    );

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions && transactions.length > 0 ? (
                    transactions.slice(0, 5).map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted p-2 rounded-full">
                                        <TransactionIcon name={transaction.categories?.icon || 'ellipsis'} className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{transaction.description}</p>
                                        <p className="text-sm text-muted-foreground">{transaction.categories?.name || 'Uncategorized'}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{format(new Date(transaction.date), 'MMM d, yyyy')}</TableCell>
                            <TableCell className="text-right">
                                <span className={transaction.type === 'income' ? 'text-green-600' : 'text-destructive'}>
                                    {transaction.type === 'income' ? '+' : '-'}
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(transaction.amount))}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center h-24">
                            No transactions yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default RecentTransactions;
