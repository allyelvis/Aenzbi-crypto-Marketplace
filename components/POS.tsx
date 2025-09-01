import React, { useState } from 'react';
import { CreditCardIcon, SyncIcon, DevicesIcon } from './icons';

interface FeatureProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-dark-card bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-brand-primary" />
        </div>
        <div>
            <h4 className="text-lg font-bold text-white">{title}</h4>
            <p className="text-gray-400 mt-1">{description}</p>
        </div>
    </div>
);

const POS = React.forwardRef<HTMLElement>((props, ref) => {
    const [demoRequested, setDemoRequested] = useState(false);

    const handleRequestDemo = () => {
        setDemoRequested(true);
        setTimeout(() => setDemoRequested(false), 4000);
    };

    return (
        <section ref={ref} className="py-20 sm:py-24 bg-dark-main">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl blur-xl opacity-20"></div>
                        <img 
                            src="https://picsum.photos/seed/pos/800/1000" 
                            alt="POS System Interface"
                            className="relative w-full h-auto max-w-md mx-auto rounded-2xl shadow-2xl shadow-black/30 border-4 border-dark-card"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white">
                            A Unified <span className="text-brand-primary">Point-of-Sale</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl">
                            Empower your physical store with our cross-platform POS application. Accept payments, manage inventory, and sync seamlessly with your online marketplace.
                        </p>
                        <div className="mt-10 space-y-8">
                            <Feature 
                                icon={CreditCardIcon}
                                title="Hybrid Payments"
                                description="Accept traditional fiat currencies and a wide range of cryptocurrencies in a single transaction."
                            />
                             <Feature 
                                icon={SyncIcon}
                                title="Real-time Inventory Sync"
                                description="Every in-store sale instantly updates your online inventory, preventing overselling."
                            />
                             <Feature 
                                icon={DevicesIcon}
                                title="Cross-Platform Support"
                                description="Run your POS on any tablet or smartphone, whether it's iOS, Android, or a web browser."
                            />
                        </div>
                        <div className="mt-12">
                            <button
                                onClick={handleRequestDemo}
                                className={`w-full sm:w-auto font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg ${
                                    demoRequested
                                    ? 'bg-green-500 text-white cursor-not-allowed'
                                    : 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:scale-105 transform'
                                }`}
                            >
                                {demoRequested ? 'Request Sent!' : 'Request a Demo'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});


export default POS;