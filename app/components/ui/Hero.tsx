import React from 'react';
import { Sun, Shield, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            KlimaRatownik
          </h1>
          <p className="text-2xl mb-8 text-blue-100">
            Ratujemy przed upałem i biurokracją
          </p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Sun className="h-8 w-8 text-yellow-300" />
              <span className="text-lg">40°C Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-green-300" />
              <span className="text-lg">EU Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-pink-300" />
              <span className="text-lg">30% więcej turystów</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">15,000+</div>
              <div className="text-sm">Produktów chłodzących</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">87,000</div>
              <div className="text-sm">Rolników w grupie FB</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">Wsparcie AI</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}