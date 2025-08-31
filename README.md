# aenzbi Marketplace

A modern e-commerce, crypto, and POS platform prototype, showcasing a unified ecosystem for merchants to sell goods, accept diverse payments, and manage their online and offline presence from a single, intuitive dashboard. This project is a frontend prototype built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern & Responsive UI:** Built with Tailwind CSS for a sleek, mobile-first design that looks great on any device.
- **Component-Based Architecture:** Developed with React, ensuring a modular, scalable, and maintainable codebase.
- **Dynamic Product Filtering:** Real-time search functionality allows users to instantly filter featured products by name.
- **Clear Project Vision:** The UI clearly communicates the three core pillars of the platform: E-commerce, Crypto & Blockchain, and a Global POS System.
- **Interactive Product Cards:** Visually appealing cards for products with hover effects and clear pricing in both USD and ETH.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm (or your favorite package manager) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd aenzbi-marketplace
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Start the development server:**
    ```sh
    npm run dev
    ```

The application should now be running on your local development server.

## 📂 Project Structure

The project follows a standard React application structure, organizing files by feature and type.

```
/
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   └── index.tsx      # SVG icons as React components
│   │   ├── FeaturedProducts.tsx # Displays filtered products
│   │   ├── Footer.tsx
│   │   ├── Header.tsx         # Contains navigation and search bar
│   │   ├── Hero.tsx
│   │   ├── Pillars.tsx
│   │   └── ProductCard.tsx
│   ├── App.tsx                # Main application component and state management
│   ├── index.tsx              # React entry point
│   └── types.ts               # Shared TypeScript types
├── index.html                 # Main HTML file
└── metadata.json              # App metadata
```

## 🛠️ Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that enhances developer experience and code quality.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development and customization.

## 🔮 Future Enhancements

This prototype lays the groundwork for the full aenzbi vision. Future development phases include:

- **Connect Wallet Functionality:** Integrating with wallets like MetaMask to enable crypto transactions.
- **Full E-commerce Flow:** Implementing product detail pages, shopping cart, and a complete checkout process.
- **NFT Marketplace:** Building out the dedicated section for listing and trading NFTs.
- **Seller Dashboard:** Creating an interface for merchants to manage their products, orders, and storefront.
- **Global POS Integration:** Developing the companion mobile app and syncing its data with the marketplace.
