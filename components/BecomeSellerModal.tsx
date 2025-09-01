import React, { useState, FormEvent } from 'react';
import { XIcon } from './icons';

interface BecomeSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BecomeSellerModal: React.FC<BecomeSellerModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill out all fields.');
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }

    setError('');
    console.log('Seller interest form submitted:', { name, email });
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      // Reset state for next time
      setIsSubmitted(false);
      setName('');
      setEmail('');
    }, 3000);
  };

  const renderContent = () => {
    if (isSubmitted) {
      return (
        <div className="p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-5">
              <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-gray-300 max-w-sm">We've received your interest form and will get back to you soon.</p>
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Become a Seller</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><XIcon className="h-6 w-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <p className="text-center text-gray-400">
            Join our marketplace and start selling to a global audience. Fill out the form below to get started.
          </p>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-dark-secondary border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
              placeholder="Your Name or Company" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-secondary border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transform transition-transform duration-300 shadow-md"
          >
            Register Interest
          </button>
        </form>
      </>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card w-full max-w-md rounded-2xl shadow-2xl shadow-black/40 border border-gray-700/50 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default BecomeSellerModal;