import type React from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface Product {
  id: number;
  name: string;
  seller: string;
  priceUSD: number;
  priceETH: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Pillar {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}