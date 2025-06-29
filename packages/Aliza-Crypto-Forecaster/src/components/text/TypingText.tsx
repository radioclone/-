
import React from 'react';
import { cn } from "@/lib/utils";

interface TypingTextProps {
  text: string;
  className?: string;
}

export const TypingText = ({ text, className }: TypingTextProps) => {
  return (
    <div className="flex items-center">
      <div className={cn("typing-text animate-typewriter", className)}>
        {text}
      </div>
      <div className="cursor animate-blink" />
    </div>
  );
};
