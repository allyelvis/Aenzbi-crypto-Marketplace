
import type React from 'react';

export interface Product {
  id: number;
  name: string;
  seller: string;
  priceUSD: number;
  priceETH: number;
  imageUrl: string;
  category: string;
}

export interface Pillar {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
