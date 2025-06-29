// Startale Dice Roller
// TODO: Replace mock randomness with real Startale RPC + contract call

this.provider = {
  getRandomNumber: async () => {
    // Simulated delay for mock dice roll
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // TODO: Replace with result from Startale contract
    const min = this.config.minValue;
    const max = this.config.maxValue;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
