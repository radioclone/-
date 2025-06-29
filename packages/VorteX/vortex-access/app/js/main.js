// VorteX Main Entry Point

// Import Sequence wallet functions
import { 
  connectWallet, 
  disconnectWallet, 
  isWalletConnected, 
  getWalletAddress,
  subscribeToWalletState 
} from '../../sequence-bridge/index.js';

// Import NFT verification functions
import { 
  checkVorteXAccess, 
  updateNFTState 
} from '../../sequence-bridge/marketplace.js';

// Initialize the application
async function initApp() {
  console.log('Initializing VorteX application');
  
  // Create wallet UI elements if they don't exist
  createWalletUI();
  
  // Set up wallet connection button
  setupWalletButton();
  
  // Check if wallet is already connected
  const connected = await isWalletConnected();
  if (connected) {
    await handleWalletConnected();
  }
  
  // Subscribe to wallet state changes
  subscribeToWalletState(handleWalletStateChange);
}

// Create wallet UI elements
function createWalletUI() {
  // Check if wallet UI already exists
  if (document.getElementById('wallet-section')) return;
  
  // Create wallet section
  const walletSection = document.createElement('div');
  walletSection.id = 'wallet-section';
  walletSection.className = 'wallet-section';
  
  // Create wallet button
  const walletButton = document.createElement('button');
  walletButton.id = 'wallet-button';
  walletButton.textContent = 'Connect Wallet';
  
  // Create wallet status
  const walletStatus = document.createElement('div');
  walletStatus.id = 'wallet-status';
  walletStatus.textContent = 'Not connected';
  
  // Add elements to wallet section
  walletSection.appendChild(walletButton);
  walletSection.appendChild(walletStatus);
  
  // Add wallet section to the page
  const container = document.getElementById('tee-dogg-container');
  if (container) {
    container.parentNode.insertBefore(walletSection, container);
  } else {
    document.body.prepend(walletSection);
  }
  
  // Add basic styles
  addWalletStyles();
}

// Add basic wallet styles
function addWalletStyles() {
  // Check if styles already exist
  if (document.getElementById('wallet-styles')) return;
  
  // Create style element
  const style = document.createElement('style');
  style.id = 'wallet-styles';
  style.textContent = `
    .wallet-section {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      padding: 10px;
      background-color: #1e1e1e;
      border-radius: 5px;
    }
    
    #wallet-button {
      padding: 8px 16px;
      background-color: #6200ea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    #wallet-button:hover {
      background-color: #7c4dff;
    }
    
    #wallet-status {
      padding: 4px 8px;
      background-color: #333;
      border-radius: 4px;
    }
    
    .connected {
      background-color: #2e7d32 !important;
    }
    
    .hidden {
      display: none !important;
    }
  `;
  
  // Add style to head
  document.head.appendChild(style);
}

// Set up wallet connection button
function setupWalletButton() {
  const walletButton = document.getElementById('wallet-button');
  if (!walletButton) return;
  
  walletButton.addEventListener('click', async () => {
    const connected = await isWalletConnected();
    
    if (connected) {
      // Disconnect wallet
      walletButton.textContent = 'Disconnecting...';
      walletButton.disabled = true;
      
      const result = await disconnectWallet();
      
      walletButton.disabled = false;
      if (!result.connected) {
        walletButton.textContent = 'Connect Wallet';
        updateWalletStatus('Not connected');
      } else {
        walletButton.textContent = 'Disconnect';
        updateWalletStatus('Error disconnecting', true);
      }
    } else {
      // Connect wallet
      walletButton.textContent = 'Connecting...';
      walletButton.disabled = true;
      
      const result = await connectWallet();
      
      walletButton.disabled = false;
      if (result.connected) {
        walletButton.textContent = 'Disconnect';
        updateWalletStatus(`Connected: ${formatAddress(result.address)}`, true);
        
        // Handle wallet connected
        await handleWalletConnected();
      } else {
        walletButton.textContent = 'Connect Wallet';
        updateWalletStatus(result.error ? `Error: ${result.error}` : 'Connection failed');
      }
    }
  });
}

// Update wallet status display
function updateWalletStatus(text, connected = false) {
  const walletStatus = document.getElementById('wallet-status');
  if (!walletStatus) return;
  
  walletStatus.textContent = text;
  
  if (connected) {
    walletStatus.classList.add('connected');
  } else {
    walletStatus.classList.remove('connected');
  }
}

// Format wallet address for display
function formatAddress(address) {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Handle wallet state changes
function handleWalletStateChange(walletState) {
  console.log('Wallet state changed:', walletState);
  
  const walletButton = document.getElementById('wallet-button');
  
  if (walletState.connected) {
    if (walletButton) walletButton.textContent = 'Disconnect';
    updateWalletStatus(`Connected: ${formatAddress(walletState.address)}`, true);
  } else {
    if (walletButton) walletButton.textContent = 'Connect Wallet';
    updateWalletStatus(walletState.error || 'Not connected');
  }
}

// Handle wallet connected
async function handleWalletConnected() {
  // Update NFT state
  await updateNFTState();
  
  // Check access
  const accessResult = await checkVorteXAccess();
  
  if (accessResult.hasAccess) {
    console.log('Access granted:', accessResult);
    showAccessGranted(accessResult);
  } else {
    console.log('Access denied:', accessResult);
    showAccessDenied(accessResult);
  }
}

// Show access granted UI
function showAccessGranted(accessResult) {
  // Create or update access container
  let accessContainer = document.getElementById('access-container');
  if (!accessContainer) {
    accessContainer = document.createElement('div');
    accessContainer.id = 'access-container';
    
    // Add to page
    const container = document.getElementById('tee-dogg-container');
    if (container) {
      container.parentNode.insertBefore(accessContainer, container.nextSibling);
    } else {
      document.body.appendChild(accessContainer);
    }
  }
  
  // Update content
  accessContainer.innerHTML = `
    <div class="access-granted">
      <h2>Access Granted!</h2>
      <p>Welcome, holder of ${accessResult.nft.collection} - ${accessResult.nft.token}</p>
      <button id="enter-button">Enter VorteX</button>
    </div>
  `;
  
  // Add event listener to enter button
  const enterButton = document.getElementById('enter-button');
  if (enterButton) {
    enterButton.addEventListener('click', handleEnterVorteX);
  }
}

// Show access denied UI
function showAccessDenied(accessResult) {
  // Create or update access container
  let accessContainer = document.getElementById('access-container');
  if (!accessContainer) {
    accessContainer = document.createElement('div');
    accessContainer.id = 'access-container';
    
    // Add to page
    const container = document.getElementById('tee-dogg-container');
    if (container) {
      container.parentNode.insertBefore(accessContainer, container.nextSibling);
    } else {
      document.body.appendChild(accessContainer);
    }
  }
  
  // Update content
  accessContainer.innerHTML = `
    <div class="access-denied">
      <h2>Access Denied</h2>
      <p>${accessResult.reason || 'You need a VorteX Access Pass to enter'}</p>
      <button id="get-nft-button">Get Access Pass</button>
    </div>
  `;
  
  // Add event listener to get NFT button
  const getNFTButton = document.getElementById('get-nft-button');
  if (getNFTButton) {
    getNFTButton.addEventListener('click', handleGetNFT);
  }
}

// Handle enter VorteX button click
function handleEnterVorteX() {
  console.log('Entering VorteX experience');
  
  // This is where you would load the VorteX experience
  // For now, we'll just show a message
  alert('VorteX experience loading... (This would load the actual experience in production)');
}

// Handle get NFT button click
function handleGetNFT() {
  console.log('Getting NFT access pass');
  
  // This is where you would redirect to NFT purchase or show NFT acquisition UI
  // For now, we'll just show a message
  alert('NFT acquisition flow would start here (This would connect to Sequence marketplace in production)');
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
