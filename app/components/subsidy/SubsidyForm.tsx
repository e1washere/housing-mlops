'use client';

import React, { useState } from 'react';
import { FileText, Download, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { FarmerData } from '../../types';
import toast, { Toaster } from 'react-hot-toast';

export default function SubsidyForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FarmerData>>({
    name: '',
    email: '',
    phone: '',
    farmDetails: {
      registrationNumber: '',
      totalArea: 0,
      affectedArea: 0,
      gpsCoordinates: { lat: 0, lng: 0 },
      cropType: [],
      estimatedLoss: 0
    }
  });

  const cropTypes = [
    'Pszenica', 'Żyto', 'Jęczmień', 'Owies', 'Kukurydza',
    'Rzepak', 'Ziemniaki', 'Buraki cukrowe', 'Warzywa', 'Owoce'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FarmerData] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCropToggle = (crop: string) => {
    const currentCrops = formData.farmDetails?.cropType || [];
    if (currentCrops.includes(crop)) {
      handleInputChange('farmDetails.cropType', currentCrops.filter(c => c !== crop));
    } else {
      handleInputChange('farmDetails.cropType', [...currentCrops, crop]);
    }
  };

  const generateReport = async () => {
    try {
      const response = await fetch('/api/subsidy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success('Raport wygenerowany! Przejdź do płatności.');
        setStep(4);
      } else {
        toast.error('Błąd podczas generowania raportu');
      }
    } catch (error) {
      toast.error('Wystąpił błąd. Spróbuj ponownie.');
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleInputChange('farmDetails.gpsCoordinates', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast.success('Lokalizacja pobrana!');
        },
        () => toast.error('Nie udało się pobrać lokalizacji')
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <Toaster position="top-right" />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Asystent Dopłat UE - Formularz TPD/2025</h2>
        
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`flex-1 text-center ${num <= step ? 'text-green-600' : 'text-gray-400'}`}
            >
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 
                ${num <= step ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                {num < step ? <CheckCircle className="h-6 w-6" /> : num}
              </div>
              <span className="text-sm">
                {num === 1 && 'Dane osobowe'}
                {num === 2 && 'Dane gospodarstwa'}
                {num === 3 && 'Szacowanie strat'}
                {num === 4 && 'Płatność'}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Personal Data */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Krok 1: Dane osobowe</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Imię i nazwisko</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Jan Kowalski"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="jan@gospodarstwo.pl"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+48 123 456 789"
              />
            </div>
            
            <button
              onClick={() => setStep(2)}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Dalej
            </button>
          </div>
        )}

        {/* Step 2: Farm Data */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Krok 2: Dane gospodarstwa</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Numer rejestracyjny gospodarstwa</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.farmDetails?.registrationNumber}
                onChange={(e) => handleInputChange('farmDetails.registrationNumber', e.target.value)}
                placeholder="PL12345678"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Całkowita powierzchnia (ha)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.farmDetails?.totalArea}
                  onChange={(e) => handleInputChange('farmDetails.totalArea', parseFloat(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Powierzchnia dotknięta suszą (ha)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.farmDetails?.affectedArea}
                  onChange={(e) => handleInputChange('farmDetails.affectedArea', parseFloat(e.target.value))}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Współrzędne GPS</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.000001"
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.farmDetails?.gpsCoordinates.lat}
                  onChange={(e) => handleInputChange('farmDetails.gpsCoordinates', {
                    ...formData.farmDetails?.gpsCoordinates,
                    lat: parseFloat(e.target.value)
                  })}
                  placeholder="Szerokość"
                />
                <input
                  type="number"
                  step="0.000001"
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.farmDetails?.gpsCoordinates.lng}
                  onChange={(e) => handleInputChange('farmDetails.gpsCoordinates', {
                    ...formData.farmDetails?.gpsCoordinates,
                    lng: parseFloat(e.target.value)
                  })}
                  placeholder="Długość"
                />
                <button
                  onClick={getLocation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Rodzaje upraw (zaznacz wszystkie)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {cropTypes.map(crop => (
                  <label key={crop} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.farmDetails?.cropType.includes(crop)}
                      onChange={() => handleCropToggle(crop)}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm">{crop}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
              >
                Wstecz
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Dalej
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Loss Estimation */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Krok 3: Szacowanie strat</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Podaj szacunkowe straty spowodowane suszą w lipcu 2025 (temperatura 40°C)
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Szacowane straty finansowe (PLN)</label>
              <input
                type="number"
                step="100"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.farmDetails?.estimatedLoss}
                onChange={(e) => handleInputChange('farmDetails.estimatedLoss', parseFloat(e.target.value))}
                placeholder="50000"
              />
            </div>
            
            {formData.farmDetails?.estimatedLoss && formData.farmDetails?.affectedArea ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Wstępna kalkulacja dopłaty:</h4>
                <p className="text-blue-700">
                  Maksymalna dopłata: {(formData.farmDetails.estimatedLoss * 0.7).toLocaleString('pl-PL')} PLN
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  (70% szacowanych strat zgodnie z przepisami UE)
                </p>
              </div>
            ) : null}
            
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
              >
                Wstecz
              </button>
              <button
                onClick={generateReport}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Generuj raport
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <h3 className="text-2xl font-bold">Raport TPD/2025 gotowy!</h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-700 mb-4">
                Twój raport został wygenerowany i jest gotowy do pobrania po opłaceniu.
              </p>
              <div className="text-3xl font-bold text-green-600 mb-2">199 PLN</div>
              <p className="text-sm text-gray-600">Jednorazowa opłata</p>
            </div>
            
            <button
              className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition inline-flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              Zapłać i pobierz raport
            </button>
            
            <p className="text-sm text-gray-600">
              Po opłaceniu otrzymasz raport PDF gotowy do złożenia w ARiMR
            </p>
          </div>
        )}
      </div>
    </div>
  );
}