
import React from 'react';
import type { Pillar } from '../types';
import { StoreIcon, BlockchainIcon, PosIcon } from './icons';

const pillarsData: Pillar[] = [
  {
    title: 'E-commerce Marketplace',
    description: 'A modern, multi-vendor hub with AI personalization, secure checkout, and rich product listings for physical and digital goods.',
    icon: StoreIcon,
  },
  {
    title: 'Crypto & Blockchain',
    description: 'Integrated non-custodial wallets, smart contract escrows, NFT support, and tokenized loyalty points for enhanced security and transparency.',
    icon: BlockchainIcon,
  },
  {
    title: 'Global POS System',
    description: 'A cross-platform app for physical stores to accept hybrid payments (fiat & crypto) with real-time inventory sync to the marketplace.',
    icon: PosIcon,
  },
];

const PillarCard: React.FC<{ pillar: Pillar }> = ({ pillar }) => {
  const Icon = pillar.icon;
  return (
    <div className="bg-dark-secondary p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 border border-gray-700/50">
      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-card bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20">
        <Icon className="h-8 w-8 text-brand-primary" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{pillar.title}</h3>
      <p className="text-gray-400 leading-relaxed">{pillar.description}</p>
    </div>
  );
};

const Pillars: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-dark-main">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white">
                An Interconnected Ecosystem
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Built on three core pillars to revolutionize commerce.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillarsData.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
