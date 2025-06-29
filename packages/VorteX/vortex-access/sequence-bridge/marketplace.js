// Sequence NFT marketplace integration for VorteX

// Import wallet functions and state manager
import { getWallet, getWalletAddress } from './index.js';
import { stateManager } from './state.js';

// Mock NFT collection for testing
const MOCK_NFT_COLLECTION = {
  name: 'VorteX Access Pass',
  contractAddress: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
  tokens: [
    { id: '1', name: 'VIP Access', image: 'https://placeholder.com/vip.png' },
    { id: '2', name: 'Regular Access', image: 'https://placeholder.com/regular.png' }
  ]
};

/**
 * Check if user has a specific NFT
 * @param {string} contractAddress NFT contract address
 * @param {string} tokenId Token ID to check for
 * @returns {Promise<boolean>} True if user has the NFT
 */
export async function checkNFTOwnership(contractAddress, tokenId) {
  try {
    const address = await getWalletAddress();
    if (!address) return false;
    
    // In production with Sequence SDK:
    // const wallet = getWallet();
    // const signer = wallet.getSigner();
    // const provider = signer.provider;
    // const contract = new ethers.Contract(contractAddress, NFT_ABI, provider);
    // const balance = await contract.balanceOf(address, tokenId);
    // return balance.gt(0);
    
    // For demonstration, we'll use a mock implementation
    console.log(`Checking NFT ownership for ${contractAddress} token ${tokenId}`);
    
    // Mock ownership check - always returns true for demo purposes
    // In a real implementation, this would query the blockchain
    return true;
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
    return false;
  }
}

/**
 * Check if user has access to VorteX
 * @returns {Promise<Object>} Access result with status and NFT details
 */
export async function checkVorteXAccess() {
  try {
    const address = await getWalletAddress();
    if (!address) {
      return { 
        hasAccess: false, 
        reason: 'Wallet not connected' 
      };
    }
    
    // Check for VorteX Access Pass NFT
    const hasNFT = await checkNFTOwnership(
      MOCK_NFT_COLLECTION.contractAddress,
      MOCK_NFT_COLLECTION.tokens[0].id
    );
    
    if (hasNFT) {
      return {
        hasAccess: true,
        nft: {
          collection: MOCK_NFT_COLLECTION.name,
          token: MOCK_NFT_COLLECTION.tokens[0].name
        }
      };
    }
    
    return {
      hasAccess: false,
      reason: 'No VorteX Access Pass NFT found'
    };
  } catch (error) {
    console.error('Error checking VorteX access:', error);
    return {
      hasAccess: false,
      reason: error?.message || 'Unknown error checking access'
    };
  }
}

/**
 * Get all NFTs owned by the connected wallet
 * @returns {Promise<Array>} Array of owned NFTs
 */
export async function getOwnedNFTs() {
  try {
    const address = await getWalletAddress();
    if (!address) return [];
    
    // In production with Sequence SDK:
    // const wallet = getWallet();
    // const signer = wallet.getSigner();
    // const provider = signer.provider;
    // const nfts = await provider.getTokenBalances({
    //   accountAddress: address,
    //   includeNFTs: true
    // });
    // return nfts;
    
    // For demonstration, return mock NFTs
    return [
      {
        collection: MOCK_NFT_COLLECTION.name,
        contractAddress: MOCK_NFT_COLLECTION.contractAddress,
        tokenId: MOCK_NFT_COLLECTION.tokens[0].id,
        name: MOCK_NFT_COLLECTION.tokens[0].name,
        image: MOCK_NFT_COLLECTION.tokens[0].image
      }
    ];
  } catch (error) {
    console.error('Error getting owned NFTs:', error);
    return [];
  }
}

/**
 * Update NFT state in the state manager
 */
export async function updateNFTState() {
  try {
    const ownedNFTs = await getOwnedNFTs();
    const hasAccess = await checkVorteXAccess();
    
    // Update state with NFT information
    stateManager.updateState({
      nfts: {
        owned: ownedNFTs,
        hasAccess: hasAccess.hasAccess,
        accessDetails: hasAccess
      }
    });
  } catch (error) {
    console.error('Error updating NFT state:', error);
    stateManager.updateState({
      nfts: {
        error: error?.message || 'Unknown error updating NFT state'
      }
    });
  }
}

// Export mock collection for testing
export { MOCK_NFT_COLLECTION };
