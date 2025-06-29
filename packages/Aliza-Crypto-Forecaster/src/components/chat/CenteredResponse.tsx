
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CenteredResponseProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const CenteredResponse = ({ message, isVisible, onClose }: CenteredResponseProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-10 w-full max-w-2xl mx-4 my-4"
          >
            <Card className="neo-blur p-6 md:p-8 relative shadow-xl">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-white/60 hover:text-white hover:bg-white/10"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <p className="text-xl text-center text-white/90 leading-relaxed pt-4">
                {message}
              </p>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
