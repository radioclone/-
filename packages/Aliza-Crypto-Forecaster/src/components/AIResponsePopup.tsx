import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface AIResponsePopupProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onViewFull?: () => void;
}

export const AIResponsePopup = ({ message, isOpen, onClose, onViewFull }: AIResponsePopupProps) => {
  const [truncatedMessage, setTruncatedMessage] = useState(message);
  const { toast } = useToast();

  useEffect(() => {
    if (message.length > 280) {
      setTruncatedMessage(message.substring(0, 277) + "...");
      // Show toast notification for long messages
      toast({
        title: "Long response available",
        description: "Click 'View Full Response' to see the complete message",
        duration: 5000,
      });
    } else {
      setTruncatedMessage(message);
    }
  }, [message, toast]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-[1000]"
        >
          <Card className="neo-blur w-full max-w-md p-4 bg-black/80 backdrop-blur-sm border border-white/20">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-white/80" />
                <span className="text-sm font-medium text-white/80">AI Response</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-6 w-6 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-3">
              {truncatedMessage}
            </p>
            {message.length > 280 && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onViewFull}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <span>View Full Response</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};