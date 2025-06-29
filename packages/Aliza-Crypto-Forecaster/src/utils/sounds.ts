class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private initialized = false;
  private isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor() {
    this.initializeSounds();
  }

  private async initializeSounds() {
    if (this.initialized) return;

    const soundEffects = {
      click: '/audio/click.mp3',
      hover: '/audio/hover.mp3',
      send: '/audio/send.mp3',
      receive: '/audio/receive.mp3',
      error: '/audio/error.mp3'
    };

    try {
      console.log('Initializing sounds...');
      for (const [key, url] of Object.entries(soundEffects)) {
        console.log(`Loading sound: ${key} from ${url}`);
        const audio = new Audio();
        audio.src = url;
        audio.preload = 'auto';

        // Set volume lower for better UX
        audio.volume = 0.3;

        // For mobile devices, we need to load on user interaction
        if (!this.isMobile) {
          await audio.load();
        }

        this.sounds[key] = audio; // Ensure the correct key is used
      }

      // Initialize audio context on mobile devices
      if (this.isMobile) {
        document.addEventListener(
          'touchstart',
          () => {
            Object.values(this.sounds).forEach(audio => {
              audio.load();
            });
          },
          { once: true }
        );
      }

      this.initialized = true;
      console.log('Sound effects initialized successfully');
    } catch (error) {
      console.error('Error initializing sound effects:', error);
    }
  }

  public async playSound(soundName: 'click' | 'hover' | 'send' | 'receive' | 'error') {
    try {
      if (!this.initialized) {
        console.log('Sounds not initialized. Initializing now...');
        await this.initializeSounds();
      }

      const sound = this.sounds[soundName];
      if (!sound) {
        console.warn(`Sound ${soundName} not found`);
        return;
      }

      console.log(`Playing sound: ${soundName} from ${sound.src}`);
      const playSound = new Audio(sound.src); // Create a new instance for playback
      playSound.volume = 0.3;
      await playSound.play();
      console.log(`Sound ${soundName} played successfully`);
    } catch (error) {
      console.error(`Audio playback failed for sound ${soundName}:`, error);
    }
  }
}

export const soundManager = new SoundManager();