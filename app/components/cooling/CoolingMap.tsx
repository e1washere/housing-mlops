'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Package, Clock, AlertTriangle } from 'lucide-react';
import { CoolingProduct } from '../../types';
import toast, { Toaster } from 'react-hot-toast';

export default function CoolingMap() {
  const [products, setProducts] = useState<CoolingProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStore, setSelectedStore] = useState<string>('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'ALL', label: 'Wszystkie' },
    { value: 'AC_UNIT', label: 'Klimatyzatory' },
    { value: 'FAN', label: 'Wentylatory' },
    { value: 'PORTABLE_POOL', label: 'Baseny' },
    { value: 'UV_UMBRELLA', label: 'Parasole UV' },
    { value: 'COOLING_MAT', label: 'Maty chłodzące' }
  ];

  const stores = [
    { value: 'ALL', label: 'Wszystkie sklepy' },
    { value: 'ALLEGRO', label: 'Allegro' },
    { value: 'MEDIA_EXPERT', label: 'Media Expert' },
    { value: 'AMAZON_DE', label: 'Amazon DE' }
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scrape/products');
      const data = await response.json();
      setProducts(data.products || []);
      toast.success('Produkty zaktualizowane!');
    } catch (error) {
      toast.error('Błąd podczas pobierania produktów');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'ALL' && product.category !== selectedCategory) return false;
    if (selectedStore !== 'ALL' && product.store !== selectedStore) return false;
    if (product.price > maxPrice) return false;
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const subscribeToAlerts = () => {
    toast.success('Zapisano na alerty! Premium: 49 zł/miesiąc');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <Toaster position="top-right" />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Mapa Sprzętu Chłodzącego</h2>
        
        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj produktu..."
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          
          <select
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            {stores.map(store => (
              <option key={store.value} value={store.value}>{store.label}</option>
            ))}
          </select>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Max:</span>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-semibold">{maxPrice} zł</span>
          </div>
        </div>

        {/* Alert Subscription */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">
                  Otrzymuj alerty o dostępności!
                </h3>
                <p className="text-sm text-yellow-700">
                  Natychmiastowe powiadomienia Telegram gdy produkt wróci do sprzedaży
                </p>
              </div>
            </div>
            <button
              onClick={subscribeToAlerts}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
            >
              Subskrybuj (49 zł/mies.)
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Skanowanie sklepów...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Brak produktów spełniających kryteria</p>
          </div>
        )}
        
        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Odświeżanie...' : 'Odśwież produkty'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: CoolingProduct }) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'IN_STOCK': return 'text-green-600';
      case 'LOW_STOCK': return 'text-yellow-600';
      case 'OUT_OF_STOCK': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'IN_STOCK': return 'Dostępny';
      case 'LOW_STOCK': return 'Ostatnie sztuki';
      case 'OUT_OF_STOCK': return 'Niedostępny';
      default: return 'Sprawdź';
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600">
            {product.price} zł
          </span>
          <span className={`text-sm font-semibold ${getAvailabilityColor(product.availability)}`}>
            {getAvailabilityText(product.availability)}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{product.location?.city} • {product.location?.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Zaktualizowano: {new Date(product.lastUpdated).toLocaleTimeString('pl-PL')}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <a
            href={product.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Zobacz w {product.store}
          </a>
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50 transition">
            ⭐
          </button>
        </div>
      </div>
    </div>
  );
}