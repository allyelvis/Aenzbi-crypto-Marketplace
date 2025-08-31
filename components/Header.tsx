import React, { useState } from 'react';
import { SearchIcon, WalletIcon, MenuIcon, XIcon, CartIcon } from './icons';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="text-gray-300 hover:text-white transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
    {children}
  </a>
);

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, cartItemCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark-secondary/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold tracking-tighter text-white">
              aenzbi<span className="text-brand-primary">.</span>
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink href="#">Marketplace</NavLink>
            <NavLink href="#">NFTs</NavLink>
            <NavLink href="#">Crypto</NavLink>
            <NavLink href="#">POS</NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-dark-card border border-gray-600 rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
             <button onClick={onCartClick} className="relative text-gray-300 hover:text-white p-2">
              <CartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-brand-accent text-white text-xs font-semibold transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="flex items-center bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-2 px-4 rounded-full hover:scale-105 transform transition-transform duration-300 shadow-md">
              <WalletIcon className="h-5 w-5 mr-2" />
              Connect Wallet
            </button>
          </div>
          <div className="md:hidden flex items-center">
             <button onClick={onCartClick} className="relative text-gray-300 hover:text-white p-2 mr-2">
              <CartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-brand-accent text-white text-xs font-semibold transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink href="#">Marketplace</NavLink>
          <NavLink href="#">NFTs</NavLink>
          <NavLink href="#">Crypto</NavLink>
          <NavLink href="#">POS</NavLink>
           <div className="pt-4 pb-2">
            <button className="w-full flex items-center justify-center bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-2 px-4 rounded-full hover:scale-105 transform transition-transform duration-300 shadow-md">
              <WalletIcon className="h-5 w-5 mr-2" />
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;