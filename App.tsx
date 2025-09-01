import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import FeaturedProducts from './components/FeaturedProducts';
import POS from './components/POS';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import ConnectWalletModal from './components/ConnectWalletModal';
import BecomeSellerModal from './components/BecomeSellerModal';
import type { Product, CartItem } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

  const marketplaceRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLElement>(null);
  const posRef = useRef<HTMLElement>(null);

  const handleScrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleAddToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.product.id !== productId);
      }
      return prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);
  
  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleConnectWallet = async (address: string) => {
    setWalletAddress(address);
    setIsWalletModalOpen(false);
    if (window.ethereum) {
      try {
        const balanceInWei = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest'],
        });
        const balanceInEth = (parseInt(balanceInWei, 16) / 1e18).toFixed(4);
        setWalletBalance(balanceInEth);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        setWalletBalance(null);
      }
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(null);
  };

  const sectionRefs = {
    marketplace: marketplaceRef,
    pillars: pillarsRef,
    pos: posRef
  };

  return (
    <div className="min-h-screen bg-dark-main text-gray-100 font-sans">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        walletAddress={walletAddress}
        walletBalance={walletBalance}
        onConnectClick={() => setIsWalletModalOpen(true)}
        onDisconnectClick={handleDisconnectWallet}
        onScrollTo={handleScrollTo}
        sectionRefs={sectionRefs}
      />
      <main>
        <Hero 
          onExploreClick={() => handleScrollTo(marketplaceRef)}
          onSellerClick={() => setIsSellerModalOpen(true)}
        />
        <Pillars ref={pillarsRef} />
        <FeaturedProducts 
          ref={marketplaceRef}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart} 
        />
        <POS ref={posRef} />
      </main>
      <Footer 
        onExploreClick={() => handleScrollTo(marketplaceRef)}
        onConnectClick={() => setIsWalletModalOpen(true)}
      />
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnectWallet}
      />
      <BecomeSellerModal
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
      />
    </div>
  );
};

export default App;