import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  stats: string;
  isActive: boolean;
  onClick: () => void;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  color,
  stats,
  isActive,
  onClick
}: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300
        ${isActive 
          ? 'ring-4 ring-blue-500 shadow-2xl transform scale-105' 
          : 'hover:shadow-lg hover:transform hover:scale-102'
        }
        bg-white
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 rounded-xl`} />
      
      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${color} mb-4`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        
        <div className="text-sm font-semibold text-gray-700">
          {stats}
        </div>
      </div>
    </div>
  );
}