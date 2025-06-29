
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Wallet, Send, Loader } from 'lucide-react';
import { soneiumService, TransactionResult } from '@/services/blockchain/SoneiumService';

export const SoneiumWallet = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    initializeService();
  }, []);

  const initializeService = async () => {
    try {
      setIsLoading(true);
      await soneiumService.initialize();
      setIsInitialized(true);
      toast({
        title: "Soneium Service Initialized",
        description: "Ready to create smart accounts and send transactions.",
      });
    } catch (error) {
      console.error('Failed to initialize Soneium service:', error);
      toast({
        title: "Initialization Failed",
        description: "Could not connect to Soneium network.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createSmartAccount = async () => {
    if (!privateKey) {
      toast({
        title: "Private Key Required",
        description: "Please enter your private key to create a smart account.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const address = await soneiumService.createSmartAccount(privateKey);
      setSmartAccountAddress(address);
      toast({
        title: "Smart Account Created",
        description: `Account address: ${address}`,
      });
    } catch (error) {
      console.error('Failed to create smart account:', error);
      toast({
        title: "Account Creation Failed",
        description: "Could not create smart account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendTransaction = async () => {
    if (!recipient || !smartAccountAddress) {
      toast({
        title: "Missing Information",
        description: "Please ensure you have a smart account and recipient address.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const result: TransactionResult = await soneiumService.sendTransaction(recipient, amount || "0");
      
      if (result.success) {
        toast({
          title: "Transaction Successful",
          description: `Transaction hash: ${result.hash}`,
        });
        setRecipient('');
        setAmount('');
      } else {
        toast({
          title: "Transaction Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      toast({
        title: "Transaction Error",
        description: "Could not send transaction.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 neo-blur">
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Soneium Wallet</h3>
      </div>

      {!isInitialized ? (
        <div className="flex items-center justify-center py-8">
          <Loader className="h-6 w-6 animate-spin text-white/60" />
          <span className="ml-2 text-white/60">Initializing Soneium service...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {!smartAccountAddress ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="privateKey" className="text-white/80">Private Key</Label>
                <Input
                  id="privateKey"
                  type="password"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="0x..."
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <Button 
                onClick={createSmartAccount}
                disabled={isLoading || !privateKey}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
                Create Smart Account
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-400">Smart Account Address:</p>
                <p className="text-xs text-white font-mono break-all">{smartAccountAddress}</p>
              </div>

              <div>
                <Label htmlFor="recipient" className="text-white/80">Recipient Address</Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="amount" className="text-white/80">Amount (ETH)</Label>
                <Input
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  type="number"
                  step="0.001"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <Button 
                onClick={sendTransaction}
                disabled={isLoading || !recipient}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isLoading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                Send Transaction
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
