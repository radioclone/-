import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

const VIDEO_ID = '020mz4vdLAs'; // Replace playlist ID with video ID

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load the YouTube IFrame Player API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    let player: any;

    // Initialize player when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      player = new (window as any).YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: VIDEO_ID, // Use video ID instead of playlist
        playerVars: {
          autoplay: 0, // Do not autoplay
        },
        events: {
          onReady: () => {
            console.log('YouTube player ready');
          },
          onError: (error: any) => {
            console.error('YouTube player error:', error);
            toast({
              title: "Error",
              description: "Failed to load audio stream. Please try again.",
              variant: "destructive",
            });
          },
        },
      });
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  const togglePlay = () => {
    const player = (window as any).YT.get('youtube-player');
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const player = (window as any).YT.get('youtube-player');
    if (player) {
      if (isMuted) {
        player.unMute();
        player.setVolume(volume);
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    const player = (window as any).YT.get('youtube-player');
    if (player) {
      player.setVolume(newVolume);
    }
  };

  return (
    <div className="fixed bottom-24 left-4 z-[100] glass-card p-4 rounded-lg w-64">
      <div id="youtube-player" className="hidden" />
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="hover:bg-white/10"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="hover:bg-white/10"
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6" />
          ) : (
            <Volume2 className="h-6 w-6" />
          )}
        </Button>
        <div className="flex-1">
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};