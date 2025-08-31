
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-dark-secondary py-20 sm:py-32">
       <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
       <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-tr from-brand-primary/30 via-transparent to-brand-secondary/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '6s' }}
       ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter text-white leading-tight">
          The Future of Commerce,
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary">
            Unified & Decentralized.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
          aenzbi is your all-in-one platform for e-commerce, crypto payments, and global POS. Sell anything, anywhere, to anyone.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg"
          >
            Explore Marketplace
          </a>
          <a
            href="#"
            className="w-full sm:w-auto bg-dark-card text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-700/80 transform transition-all duration-300 border border-gray-600"
          >
            Become a Seller
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
