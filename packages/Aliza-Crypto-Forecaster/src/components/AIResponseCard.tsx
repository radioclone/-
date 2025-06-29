import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIResponseCardProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AIResponseCard = ({ message, isOpen, onClose }: AIResponseCardProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <Card className="neo-blur relative w-full max-w-2xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white/80 hover:text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="p-6">
              <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
                {message}
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};