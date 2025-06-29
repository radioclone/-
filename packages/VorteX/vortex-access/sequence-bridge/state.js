// Simple state management for VorteX
// This provides a foundation for future expansion

/**
 * State manager class - singleton pattern
 * Provides a central store for application state
 */
class StateManager {
  constructor() {
    // Initial state
    this.state = {
      wallet: {
        connected: false,
        address: null,
        error: null
      },
      // Additional state properties can be added as needed
      // For example:
      // interface: { type: null, loaded: false },
      // dice: { lastRoll: null, destination: null }
    };
    
    // Subscribers for state changes
    this.subscribers = [];
    
    // Initialize state from localStorage if available
    this.initFromStorage();
  }
  
  /**
   * Initialize state from localStorage
   */
  initFromStorage() {
    try {
      const walletConnected = localStorage.getItem('walletConnected') === 'true';
      const walletAddress = localStorage.getItem('walletAddress');
      
      if (walletConnected && walletAddress) {
        this.state.wallet.connected = true;
        this.state.wallet.address = walletAddress;
      }
    } catch (error) {
      console.error('Error initializing state from storage:', error);
    }
  }
  
  /**
   * Get current state
   * @returns {Object} Current state
   */
  getState() {
    return this.state;
  }
  
  /**
   * Update state
   * @param {Object} newState Partial state to merge with current state
   */
  updateState(newState) {
    // Deep merge the new state with the current state
    this.state = this.deepMerge(this.state, newState);
    
    // Notify subscribers
    this.notifySubscribers();
  }
  
  /**
   * Deep merge two objects
   * @param {Object} target Target object
   * @param {Object} source Source object to merge
   * @returns {Object} Merged object
   */
  deepMerge(target, source) {
    const output = { ...target };
    
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  }
  
  /**
   * Check if value is an object
   * @param {*} item Item to check
   * @returns {boolean} True if item is an object
   */
  isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
  
  /**
   * Subscribe to state changes
   * @param {Function} callback Callback function to call on state change
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this.subscribers.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
  
  /**
   * Notify subscribers of state change
   */
  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }
}

// Create singleton instance
export const stateManager = new StateManager();

// Export state manager class for potential extension
export default StateManager;
