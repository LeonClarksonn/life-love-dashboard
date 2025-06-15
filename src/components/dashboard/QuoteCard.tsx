
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const QuoteCard = () => {
  return (
    <Card className="bg-accent border-accent-foreground/20">
      <CardContent className="p-6">
        <div className="flex items-center">
          <Lightbulb className="h-8 w-8 text-accent-foreground mr-4" />
          <div>
            <p className="font-serif text-lg text-accent-foreground">"The secret of getting ahead is getting started."</p>
            <p className="text-sm text-accent-foreground/80 mt-1">- Mark Twain</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
