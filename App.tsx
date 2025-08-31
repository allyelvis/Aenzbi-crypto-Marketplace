
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-dark-main text-gray-100 font-sans">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <main>
        <Hero />
        <Pillars />
        <FeaturedProducts searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
