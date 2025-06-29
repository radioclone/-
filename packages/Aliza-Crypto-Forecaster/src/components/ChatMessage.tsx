import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage = ({ message, isUser }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-in slide-in-from-bottom-2 duration-300",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-4 transition-all duration-300",
        isUser ? "bg-white/10 hover:bg-white/15" : "bg-white/5 hover:bg-white/10",
        "animate-fade-in hover:scale-[1.01] hover:shadow-lg hover:shadow-white/5"
      )}>
        <p className="text-white/90">{message}</p>
      </div>
    </div>
  );
};