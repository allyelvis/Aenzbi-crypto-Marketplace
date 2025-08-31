import React, { useState, useEffect } from 'react';
import { XIcon, MetaMaskIcon } from './icons';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHasProvider(true);
    } else {
      setHasProvider(false);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleConnect = async () => {
    if (!hasProvider) return;
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        onConnect(accounts[0]);
      } else {
         console.warn("No accounts found.");
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card w-full max-w-md rounded-2xl shadow-2xl shadow-black/40 border border-gray-700/50 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Connect your wallet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><XIcon className="h-6 w-6" /></button>
        </div>
        <div className="p-8">
            <p className="text-center text-gray-400 mb-6">
                To continue, please connect your Ethereum wallet. By connecting, you agree to our Terms of Service.
            </p>
            <button 
                onClick={handleConnect}
                disabled={isConnecting || !hasProvider}
                className="w-full flex items-center justify-center gap-4 bg-dark-secondary p-4 rounded-lg hover:bg-gray-700/80 transition-colors duration-300 border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isConnecting ? (
                    <>
                        <div className="w-6 h-6 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                        <span>Connecting...</span>
                    </>
                ) : (
                    <>
                        <MetaMaskIcon className="h-8 w-8" />
                        <span className="text-lg font-semibold text-white">MetaMask</span>
                    </>
                )}
            </button>
            {!hasProvider && (
              <p className="text-center text-sm text-brand-accent mt-4">
                MetaMask not detected. Please install the browser extension to connect.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;