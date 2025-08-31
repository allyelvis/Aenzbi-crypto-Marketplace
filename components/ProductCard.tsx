
import React from 'react';
import type { Product } from '../types';
import { EthIcon } from './icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-dark-card rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-700/50">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
        <div className="absolute top-3 right-3 bg-dark-main/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
          {product.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white truncate group-hover:text-brand-primary transition-colors duration-300">{product.name}</h3>
        <p className="text-sm text-gray-400 mt-1">by {product.seller}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-semibold text-white">${product.priceUSD.toFixed(2)}</p>
          <div className="flex items-center space-x-2 text-gray-300">
            <EthIcon className="h-5 w-5" />
            <span className="font-mono text-md">{product.priceETH.toFixed(3)}</span>
          </div>
        </div>
        <button className="mt-5 w-full bg-brand-primary text-white font-semibold py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
