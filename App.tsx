import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import ConnectWalletModal from './components/ConnectWalletModal';
import type { Product, CartItem } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

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

  const handleConnectWallet = (address: string) => {
    setWalletAddress(address);
    setIsWalletModalOpen(false);
  };

  const handleDisconnectWallet = () => {
    setWalletAddress(null);
  };


  return (
    <div className="min-h-screen bg-dark-main text-gray-100 font-sans">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        walletAddress={walletAddress}
        onConnectClick={() => setIsWalletModalOpen(true)}
        onDisconnectClick={handleDisconnectWallet}
      />
      <main>
        <Hero />
        <Pillars />
        <FeaturedProducts 
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart} 
        />
      </main>
      <Footer />
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
    </div>
  );
};

export default App;