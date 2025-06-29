import { toast } from "@/components/ui/use-toast";

export type AIMessage = {
  content: string;
  role: 'user' | 'assistant';
};

export class ElizaService {
  private static instance: ElizaService;
  
  private constructor() {}
  
  public static getInstance(): ElizaService {
    if (!ElizaService.instance) {
      ElizaService.instance = new ElizaService();
    }
    return ElizaService.instance;
  }

  async processMessage(message: string): Promise<string> {
    try {
      // Educational responses about cryptocurrency
      const responses = [
        "Bitcoin (BTC) is the first and most well-known cryptocurrency, created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto. It operates on a decentralized network using blockchain technology.",
        
        "Blockchain technology is a distributed ledger that records all transactions across a network of computers. Each block contains a list of transactions and is linked to the previous block, forming a chain of information that cannot be altered.",
        
        "Cryptocurrency wallets come in two main types: hot wallets (connected to the internet) and cold wallets (offline storage). Cold wallets are generally considered more secure for long-term storage of large amounts.",
        
        "DeFi (Decentralized Finance) refers to financial services built on blockchain networks. It allows for lending, borrowing, and trading without traditional intermediaries like banks.",
        
        "When investing in cryptocurrency, it's important to understand the concept of market capitalization (price × circulating supply) as it helps compare the relative sizes of different cryptocurrencies.",
        
        "Smart contracts are self-executing contracts with the terms directly written into code. They automatically enforce and execute agreements, forming the basis for many cryptocurrency applications.",
        
        "Dollar-cost averaging (DCA) is an investment strategy where you invest fixed amounts at regular intervals, regardless of the price. This can help manage the high volatility in cryptocurrency markets.",
        
        "NFTs (Non-Fungible Tokens) are unique digital assets verified using blockchain technology. They can represent ownership of digital art, music, virtual real estate, and more."
      ];
      
      // Select a relevant response based on keywords in the user's message
      const lowercaseMessage = message.toLowerCase();
      let response = "";
      
      if (lowercaseMessage.includes("bitcoin") || lowercaseMessage.includes("btc")) {
        response = responses[0];
      } else if (lowercaseMessage.includes("blockchain")) {
        response = responses[1];
      } else if (lowercaseMessage.includes("wallet")) {
        response = responses[2];
      } else if (lowercaseMessage.includes("defi")) {
        response = responses[3];
      } else if (lowercaseMessage.includes("market") || lowercaseMessage.includes("cap")) {
        response = responses[4];
      } else if (lowercaseMessage.includes("smart") || lowercaseMessage.includes("contract")) {
        response = responses[5];
      } else if (lowercaseMessage.includes("dca") || lowercaseMessage.includes("invest")) {
        response = responses[6];
      } else if (lowercaseMessage.includes("nft")) {
        response = responses[7];
      } else {
        // If no specific keywords are found, return a random educational response
        response = responses[Math.floor(Math.random() * responses.length)];
      }
      
      return response;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process message. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  }
}