
import React from 'react';
import { TwitterIcon, InstagramIcon, DiscordIcon } from './icons';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} className="text-gray-400 hover:text-white transition-colors duration-200">
      {children}
    </a>
);

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} className="text-gray-400 hover:text-brand-primary transition-colors duration-200">
      {children}
    </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-secondary border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#" className="text-2xl font-bold tracking-tighter text-white">
              aenzbi<span className="text-brand-primary">.</span>
            </a>
            <p className="text-gray-400 mt-4 text-sm max-w-xs">
              The unified platform for the future of digital and physical commerce.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Marketplace</h4>
            <div className="mt-4 space-y-3">
              <FooterLink href="#">Explore</FooterLink>
              <FooterLink href="#">Categories</FooterLink>
              <FooterLink href="#">How to Sell</FooterLink>
              <FooterLink href="#">Our Fees</FooterLink>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Crypto</h4>
            <div className="mt-4 space-y-3">
              <FooterLink href="#">Connect Wallet</FooterLink>
              <FooterLink href="#">Supported Chains</FooterLink>
              <FooterLink href="#">Tokenomics</FooterLink>
              <FooterLink href="#">NFTs</FooterLink>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Company</h4>
            <div className="mt-4 space-y-3">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Press</FooterLink>
              <FooterLink href="#">Support</FooterLink>
            </div>
          </div>
           <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Legal</h4>
            <div className="mt-4 space-y-3">
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} aenzbi Technologies Inc. All rights reserved.
            </p>
            <div className="flex space-x-5 mt-4 sm:mt-0">
                <SocialIcon href="#"><TwitterIcon className="h-6 w-6" /></SocialIcon>
                <SocialIcon href="#"><InstagramIcon className="h-6 w-6" /></SocialIcon>
                <SocialIcon href="#"><DiscordIcon className="h-6 w-6" /></SocialIcon>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
