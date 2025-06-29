
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { soundManager } from "@/utils/sounds";
import { useIsMobile } from "@/hooks/use-mobile";

export const Attribution = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed left-0 right-0 text-center bottom-10 text-[10px] text-white/30 z-[40]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <a 
            href="https://www.elizaos.ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors"
            onClick={() => soundManager.playSound('click')}
          >
            {isMobile ? "Eliza OS" : "Inspired by Eliza OS"}
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-black/90 border-white/10 text-white p-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Eliza OS</h4>
            <p className="text-xs text-white/80">
              This project draws inspiration from the open source Eliza OS project.
              Click to visit the original project.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
