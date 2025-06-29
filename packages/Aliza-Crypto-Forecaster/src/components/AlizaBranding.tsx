
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { soundManager } from "@/utils/sounds";
import { BirthDataCard } from './BirthDataCard';
import { useToast } from "@/components/ui/use-toast";
import { BirthData } from '@/types/birth';
import { useIsMobile } from "@/hooks/use-mobile";

export const AlizaBranding = () => {
  const [showBirthCard, setShowBirthCard] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleBirthDataSubmit = (data: BirthData) => {
    console.log('Birth data submitted:', data);
    toast({
      title: "Processing Your Birth Data",
      description: "Analyzing your astrological profile and market compatibility...",
    });
    setShowBirthCard(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="fixed bottom-2 left-2 z-[60] p-0 h-auto w-auto hover:bg-transparent opacity-60 hover:opacity-100 transition-opacity"
        onClick={() => {
          setShowBirthCard(true);
          soundManager.playSound('click');
        }}
        onMouseEnter={() => soundManager.playSound('hover')}
      >
        <div className="relative flex flex-col items-center">
          <img 
            src="https://nifrnbzdjizwmbgatyfr.supabase.co/storage/v1/object/public/assets_brand//Ask%20Aliza%20Branding..gif"
            alt="Ask Aliza Branding"
            className="w-16 h-auto"
          />
        </div>
      </Button>

      {showBirthCard && (
        <BirthDataCard
          onClose={() => setShowBirthCard(false)}
          onSubmit={handleBirthDataSubmit}
        />
      )}
    </>
  );
};
