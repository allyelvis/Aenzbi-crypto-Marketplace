import React, { useState, useMemo, useEffect } from 'react';
import type { CartItem } from '../types';
import { XIcon, TrashIcon, EthIcon, CopyIcon, CartIcon } from './icons';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'cart' | 'payment' | 'pending' | 'success';

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onClearCart }) => {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [isCopying, setIsCopying] = useState(false);
  
  const totalUSD = useMemo(() => cartItems.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0), [cartItems]);
  const totalETH = useMemo(() => cartItems.reduce((sum, item) => sum + item.product.priceETH * item.quantity, 0), [cartItems]);

  const paymentAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Placeholder

  useEffect(() => {
    if (isOpen) {
      // Reset to cart view whenever modal is opened, unless there are no items, then stay on success.
      if (cartItems.length > 0 || step !== 'success') {
          setStep('cart');
      }
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(paymentAddress).then(() => {
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    });
  };

  const handlePaymentConfirmation = () => {
    setStep('pending');
    setTimeout(() => {
        setStep('success');
    }, 3000);
  }
  
  const handleFinish = () => {
    onClearCart();
    onClose();
  }

  const renderContent = () => {
    switch(step) {
      case 'cart':
        return (
          <>
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <div className="flex items-center gap-4">
                 <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                 {cartItems.length > 0 && (
                    <button 
                        onClick={onClearCart} 
                        className="text-sm text-gray-400 hover:text-brand-accent transition-colors"
                    >
                        Clear All
                    </button>
                 )}
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white"><XIcon className="h-6 w-6" /></button>
            </div>
            {cartItems.length > 0 ? (
              <>
                <div className="p-6 space-y-4 overflow-y-auto max-h-[50vh]">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center space-x-4">
                      <img src={product.imageUrl} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-grow">
                        <p className="font-semibold text-white">{product.name}</p>
                        <p className="text-sm text-gray-400">${product.priceUSD.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center bg-dark-secondary rounded-full">
                        <button onClick={() => onUpdateQuantity(product.id, quantity - 1)} className="px-3 py-1 text-lg">-</button>
                        <span className="px-3">{quantity}</span>
                        <button onClick={() => onUpdateQuantity(product.id, quantity + 1)} className="px-3 py-1 text-lg">+</button>
                      </div>
                      <button onClick={() => onUpdateQuantity(product.id, 0)} className="text-gray-500 hover:text-brand-accent"><TrashIcon className="h-5 w-5"/></button>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-gray-700 bg-dark-secondary/50">
                  <div className="flex justify-between items-center text-lg mb-4">
                    <span className="text-gray-300">Total</span>
                    <div className="text-right">
                        <p className="font-bold text-white">${totalUSD.toFixed(2)}</p>
                        <p className="text-sm text-gray-400 font-mono flex items-center justify-end"><EthIcon className="h-4 w-4 mr-1.5"/>{totalETH.toFixed(4)}</p>
                    </div>
                  </div>
                  <button onClick={() => setStep('payment')} className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transform transition-transform duration-300 shadow-md">
                    Proceed to Payment
                  </button>
                </div>
              </>
            ) : (
              <div className="p-16 text-center text-gray-400 flex flex-col items-center justify-center min-h-[300px]">
                  <CartIcon className="w-16 h-16 mb-4 text-gray-600" />
                  <p className="text-lg font-semibold text-white mb-2">Your cart is empty.</p>
                  <p className="max-w-xs mb-6">Looks like you haven't added anything yet. Let's find something for you!</p>
                  <button 
                      onClick={onClose} 
                      className="bg-brand-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-brand-primary/90 transition-colors"
                  >
                      Continue Shopping
                  </button>
              </div>
            )}
          </>
        );
      case 'payment':
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ethereum:${paymentAddress}?value=${totalETH.toFixed(8)}&bgcolor=374151&color=ffffff&qzone=1`;
        return (
          <>
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Pay with Crypto</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white"><XIcon className="h-6 w-6" /></button>
            </div>
            <div className="p-8 text-center flex flex-col items-center">
                <p className="text-gray-300 mb-2">Send the exact amount to the address below</p>
                <div className="flex items-center justify-center font-mono text-2xl font-bold text-white my-3">
                    <EthIcon className="h-7 w-7 mr-2"/>
                    <span>{totalETH.toFixed(6)}</span>
                </div>
                <div className="bg-dark-secondary p-4 rounded-lg my-4">
                  <img src={qrCodeUrl} alt="Payment QR Code" className="w-48 h-48 rounded-md border-4 border-dark-card" />
                </div>
                <p className="text-gray-400 text-sm mb-2">Or copy the address manually:</p>
                <div className="relative w-full max-w-sm">
                    <input type="text" readOnly value={paymentAddress} className="w-full bg-dark-secondary border border-gray-600 rounded-lg p-3 pr-12 text-center font-mono text-sm text-gray-300"/>
                    <button onClick={handleCopyToClipboard} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white bg-dark-card rounded-md">
                        <CopyIcon className="h-5 w-5"/>
                    </button>
                </div>
                 {isCopying && <p className="text-sm text-green-400 mt-2">Address copied to clipboard!</p>}
            </div>
            <div className="p-6 border-t border-gray-700 bg-dark-secondary/50 grid grid-cols-2 gap-4">
                 <button onClick={() => setStep('cart')} className="w-full bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                    Back to Cart
                  </button>
                  <button onClick={handlePaymentConfirmation} className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transform transition-transform duration-300 shadow-md">
                    I Have Sent The Payment
                  </button>
            </div>
          </>
        );
        case 'pending':
            return (
                <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Confirming Transaction</h3>
                    <p className="text-gray-400">Please wait while we confirm your payment on the blockchain. This may take a moment.</p>
                </div>
            );
        case 'success':
            return (
                 <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Payment Confirmed!</h3>
                    <p className="text-gray-300 max-w-sm mb-8">Your order has been successfully processed. Thank you for shopping with aenzbi!</p>
                    <button onClick={handleFinish} className="w-full max-w-xs bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transform transition-transform duration-300 shadow-md">
                        Finish
                    </button>
                </div>
            )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card w-full max-w-2xl rounded-2xl shadow-2xl shadow-black/40 border border-gray-700/50 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default CartModal;