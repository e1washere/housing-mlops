'use client';

import { useState } from 'react';
import { Thermometer, Tractor, Home, AlertCircle } from 'lucide-react';
import CoolingMap from './components/cooling/CoolingMap';
import SubsidyForm from './components/subsidy/SubsidyForm';
import ChatbotWidget from './components/chatbot/ChatbotWidget';
import Hero from './components/ui/Hero';
import FeatureCard from './components/ui/FeatureCard';

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState<'cooling' | 'subsidy' | 'rental' | null>(null);

  const features = [
    {
      id: 'cooling' as const,
      title: 'Mapa Sprzętu Chłodzącego',
      description: 'Znajdź klimatyzatory, baseny i parasole UV w czasie rzeczywistym',
      icon: Thermometer,
      color: 'from-blue-500 to-cyan-600',
      stats: '15,000+ produktów monitorowanych'
    },
    {
      id: 'subsidy' as const,
      title: 'Asystent Dopłat UE',
      description: 'Automatyczne wypełnianie formularzy TPD/2025 dla rolników',
      icon: Tractor,
      color: 'from-green-500 to-emerald-600',
      stats: '199 zł za raport'
    },
    {
      id: 'rental' as const,
      title: 'AI Chatbot Turystyczny',
      description: 'Obsługa rezerwacji w 3 językach dla wynajmujących',
      icon: Home,
      color: 'from-purple-500 to-pink-600',
      stats: '10% prowizji od rezerwacji'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        {/* Alert Banner */}
        <div className="mb-12 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">
                Alert pogodowy: Temperatura 40°C w lipcu 2025!
              </h3>
              <p className="text-red-700">
                Rząd wydał ostrzeżenia o ekstremalnych upałach. Przygotuj się z KlimaRatownik.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              isActive={activeFeature === feature.id}
              onClick={() => setActiveFeature(feature.id)}
            />
          ))}
        </div>

        {/* Active Feature Display */}
        <div className="mt-12">
          {activeFeature === 'cooling' && <CoolingMap />}
          {activeFeature === 'subsidy' && <SubsidyForm />}
          {activeFeature === 'rental' && <ChatbotWidget />}
        </div>

        {/* Benefits Section */}
        {!activeFeature && (
          <section className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Dlaczego KlimaRatownik?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">
                  Oszczędność Czasu
                </h3>
                <p className="text-gray-600">
                  Automatyczne skanowanie 3 platform e-commerce co 30 minut
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-green-600">
                  Gwarancja Najniższej Ceny
                </h3>
                <p className="text-gray-600">
                  Porównujemy ceny z Allegro, Amazon DE i Media Expert
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">
                  Wsparcie 24/7
                </h3>
                <p className="text-gray-600">
                  Chatbot AI obsługuje klientów w PL/EN/DE non-stop
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 KlimaRatownik - Ratujemy przed upałem i biurokracją</p>
          <p className="text-sm text-gray-400">
            Stworzone dla polskiego rynku | Płatności w PLN | Wsparcie lokalne
          </p>
        </div>
      </footer>
    </div>
  );
}