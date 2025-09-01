import React, { useState, useMemo, useEffect, FormEvent } from 'react';
import type { CartItem } from '../types';
import { XIcon, TrashIcon, CartIcon, CreditCardIcon } from './icons';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'cart' | 'checkout' | 'processing' | 'success';

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onClearCart }) => {
  const [step, setStep] = useState<CheckoutStep>('cart');
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  const [paymentError, setPaymentError] = useState('');
  
  const totalUSD = useMemo(() => cartItems.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0), [cartItems]);

  useEffect(() => {
    if (isOpen) {
      if (cartItems.length > 0 || step !== 'success') {
          setStep('cart');
      }
      setPaymentDetails({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
      });
      setPaymentError('');
    }
  }, [isOpen, cartItems.length]);

  if (!isOpen) {
    return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({...prev, [name]: value}));
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { cardholderName, cardNumber, expiryDate, cvc } = paymentDetails;
    if (!cardholderName || !cardNumber || !expiryDate || !cvc) {
      setPaymentError('Please fill in all payment details.');
      return;
    }
    setPaymentError('');
    setStep('processing');
    setTimeout(() => {
        setStep('success');
    }, 3000);
  }
  
  const handleFinish = () => {
    onClearCart();
    onClose();
    setTimeout(() => {
        setStep('cart');
    }, 300);
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
                    </div>
                  </div>
                  <button onClick={() => setStep('checkout')} className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transform transition-transform duration-300 shadow-md">
                    Proceed to Checkout
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
      case 'checkout':
        return (
          <>
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Secure Checkout</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white"><XIcon className="h-6 w-6" /></button>
            </div>
            <form onSubmit={handlePaymentSubmit}>
              <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
                <div className="bg-dark-secondary p-4 rounded-lg flex justify-between items-center">
                    <span className="text-gray-300">Order Total</span>
                    <span className="text-xl font-bold text-white">${totalUSD.toFixed(2)}</span>
                </div>
                <div>
                  <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                  <input type="text" id="cardholderName" name="cardholderName" value={paymentDetails.cardholderName} onChange={handleInputChange} className="w-full bg-dark-secondary border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                  <div className="relative">
                    <input type="text" id="cardNumber" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleInputChange} className="w-full bg-dark-secondary border border-gray-600 rounded-lg p-3 pl-12 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none transition" placeholder="0000 0000 0000 0000" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCardIcon className="h-6 w-6 text-gray-400"/>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                    <input type="text" id="expiryDate" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleInputChange} className="w-full bg-dark-secondary border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none transition" placeholder="MM / YY" />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                    <input type="text" id="cvc" name="cvc" value={paymentDetails.cvc} onChange={handleInputChange} className="w-full bg-dark-secondary border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-primary focus:outline-none transition" placeholder="123" />
                  </div>
                </div>
                {paymentError && <p className="text-sm text-red-400 text-center">{paymentError}</p>}
              </div>
              <div className="p-6 border-t border-gray-700 bg-dark-secondary/50 grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setStep('cart')} className="w-full bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                  Back to Cart
                </button>
                <button type="submit" className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transform transition-transform duration-300 shadow-md">
                  Pay ${totalUSD.toFixed(2)}
                </button>
              </div>
            </form>
          </>
        );
      case 'processing':
          return (
              <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-6"></div>
                  <h3 className="text-2xl font-bold text-white mb-2">Processing Payment</h3>
                  <p className="text-gray-400 max-w-xs">Please wait while we securely process your transaction. Do not close this window.</p>
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
                  <h3 className="text-3xl font-bold text-white mb-2">Payment Successful!</h3>
                  <p className="text-gray-300 max-w-sm mb-8">Your order has been confirmed. A receipt has been sent to your email. Thank you for shopping with aenzbi!</p>
                  <button onClick={handleFinish} className="w-full max-w-xs bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transform transition-transform duration-300 shadow-md">
                      Finish
                  </button>
              </div>
          )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card w-full max-w-lg rounded-2xl shadow-2xl shadow-black/40 border border-gray-700/50 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default CartModal;