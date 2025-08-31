
import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Quantum Core Headset',
    seller: 'NeuroTech',
    priceUSD: 299.99,
    priceETH: 0.085,
    imageUrl: 'https://picsum.photos/seed/tech1/600/600',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Kinetic Weave Jacket',
    seller: 'AtmoWear',
    priceUSD: 450.0,
    priceETH: 0.127,
    imageUrl: 'https://picsum.photos/seed/fashion1/600/600',
    category: 'Apparel',
  },
  {
    id: 3,
    name: 'Chrono-shard (NFT)',
    seller: 'DigitalRealms',
    priceUSD: 1750.0,
    priceETH: 0.495,
    imageUrl: 'https://picsum.photos/seed/nft1/600/600',
    category: 'NFTs',
  },
  {
    id: 4,
    name: 'Hydro-Synth Plant Pot',
    seller: 'EcoGrowth',
    priceUSD: 79.5,
    priceETH: 0.022,
    imageUrl: 'https://picsum.photos/seed/home1/600/600',
    category: 'Home Goods',
  },
   {
    id: 5,
    name: 'Aero-Strider Sneakers',
    seller: 'Momentum',
    priceUSD: 189.99,
    priceETH: 0.054,
    imageUrl: 'https://picsum.photos/seed/fashion2/600/600',
    category: 'Apparel',
  },
  {
    id: 6,
    name: 'Data-Orb Assistant',
    seller: 'CortexAI',
    priceUSD: 129.0,
    priceETH: 0.036,
    imageUrl: 'https://picsum.photos/seed/tech2/600/600',
    category: 'Electronics',
  },
  {
    id: 7,
    name: 'Celestial Ring (NFT)',
    seller: 'ArtBlocks',
    priceUSD: 5200.0,
    priceETH: 1.47,
    imageUrl: 'https://picsum.photos/seed/nft2/600/600',
    category: 'NFTs',
  },
  {
    id: 8,
    name: 'Auto-Brew Coffee Machine',
    seller: 'MorningCo',
    priceUSD: 220.0,
    priceETH: 0.062,
    imageUrl: 'https://picsum.photos/seed/home2/600/600',
    category: 'Home Goods',
  },
];

interface FeaturedProductsProps {
  searchQuery: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ searchQuery }) => {
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 sm:py-24 bg-dark-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white">
            Featured Products
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Discover trending items from our top sellers across all categories.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-lg py-16">
              <p>No products found for "{searchQuery}".</p>
              <p className="text-sm mt-2">Try searching for something else.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
