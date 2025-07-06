'use client';

import React, { useState } from 'react';
import { Send, MessageSquare, Globe, TrendingUp } from 'lucide-react';
import { ChatMessage } from '../../types';
import toast, { Toaster } from 'react-hot-toast';

export default function ChatbotWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      conversationId: 'demo',
      role: 'assistant',
      content: 'Witam! Jestem asystentem rezerwacji. Obsługuję gości w języku polskim, angielskim i niemieckim. Jak mogę pomóc?',
      language: 'pl',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      conversationId: 'demo',
      role: 'user',
      content: input,
      language: 'pl',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chatbot/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationId: 'demo'
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        ...data.response,
        timestamp: new Date()
      }]);
    } catch (error) {
      toast.error('Błąd podczas przetwarzania wiadomości');
    } finally {
      setIsTyping(false);
    }
  };

  const exampleMessages = [
    'I would like to book a room for 3 nights',
    'Chciałbym zarezerwować pokój na weekend',
    'Ich möchte ein Zimmer für 5 Personen buchen',
    'Mam problem z rezerwacją',
    'What is the price per night?'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <Toaster position="top-right" />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">AI Chatbot Turystyczny</h2>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Obsługa non-stop</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Języki obsługi</div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">10%</div>
                <div className="text-sm text-gray-600">Prowizja</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="border rounded-lg">
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString('pl-PL')}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border px-4 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Napisz wiadomość..."
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Example Messages */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-2">Przykładowe wiadomości:</p>
          <div className="flex flex-wrap gap-2">
            {exampleMessages.map((msg, idx) => (
              <button
                key={idx}
                onClick={() => setInput(msg)}
                className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Funkcje chatbota:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Automatyczne wykrywanie języka</li>
              <li>✓ Obsługa rezerwacji w czasie rzeczywistym</li>
              <li>✓ Rozpatrywanie skarg i reklamacji</li>
              <li>✓ Informacje o cenach i dostępności</li>
              <li>✓ Integracja z kalendarzem rezerwacji</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Model cenowy:</h3>
            <div className="space-y-3">
              <div className="bg-purple-50 rounded p-3">
                <div className="font-semibold text-purple-800">10% prowizji</div>
                <div className="text-sm text-purple-600">Od każdej potwierdzonej rezerwacji</div>
              </div>
              <p className="text-sm text-gray-600">
                Płacisz tylko za skuteczne rezerwacje. Brak opłat abonamentowych!
              </p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                Aktywuj chatbota
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}