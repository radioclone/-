
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PredictionDisplayProps {
  prediction: {
    marketOutlook: string;
    personalityTraits: string;
    timing: string;
  };
  onClose: () => void;
}

export const PredictionDisplay = ({ prediction, onClose }: PredictionDisplayProps) => {
  // Create a complete fortune message from all prediction parts
  const fortuneMessage = `${prediction.marketOutlook} ${prediction.personalityTraits} ${prediction.timing}`;

  return (
    <Card className="neo-blur p-6 w-full max-w-lg mx-4 animate-fade-in relative shadow-xl">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 text-white/60 hover:text-white hover:bg-white/10"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-gradient">Your Market Fortune</h2>
        <ScrollArea className="h-auto max-h-[40vh]">
          <p className="text-xl text-white/90 leading-relaxed italic">
            "{fortuneMessage}"
          </p>
        </ScrollArea>
      </div>
    </Card>
  );
};
