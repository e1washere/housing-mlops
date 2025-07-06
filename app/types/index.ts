// Cooling Products Types
export interface CoolingProduct {
  id: string;
  name: string;
  price: number;
  currency: 'PLN' | 'EUR';
  availability: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  store: 'ALLEGRO' | 'AMAZON_DE' | 'MEDIA_EXPERT';
  storeUrl: string;
  imageUrl?: string;
  lastUpdated: Date;
  category: 'AC_UNIT' | 'PORTABLE_POOL' | 'UV_UMBRELLA' | 'FAN' | 'COOLING_MAT';
  specifications?: Record<string, string>;
  location?: {
    city: string;
    deliveryTime: string;
  };
}

// Subsidy Types
export interface FarmerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  farmDetails: {
    registrationNumber: string;
    totalArea: number; // hectares
    affectedArea: number; // hectares
    gpsCoordinates: {
      lat: number;
      lng: number;
    };
    cropType: string[];
    estimatedLoss: number; // PLN
  };
  documents?: {
    id: string;
    type: 'TPD_2025' | 'SUPPORTING_DOC';
    status: 'PENDING' | 'GENERATED' | 'SUBMITTED';
    url?: string;
    generatedAt?: Date;
  }[];
}

// Chat Types
export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  language: 'pl' | 'en' | 'de';
  timestamp: Date;
  metadata?: {
    bookingId?: string;
    action?: 'BOOKING' | 'COMPLAINT' | 'INQUIRY';
  };
}

export interface RentalBooking {
  id: string;
  propertyId: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  numberOfGuests: number;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  guestContact: {
    email: string;
    phone: string;
    language: 'pl' | 'en' | 'de';
  };
}

// User/Subscription Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'FARMER' | 'RENTAL_HOST' | 'CONSUMER';
  subscription?: {
    type: 'COOLING_ALERTS' | 'SUBSIDY_ASSISTANT' | 'RENTAL_CHATBOT';
    status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
    validUntil: Date;
    price: number;
  };
  telegramChatId?: string;
  createdAt: Date;
}

// Alert Types
export interface CoolingAlert {
  id: string;
  userId: string;
  product: CoolingProduct;
  alertType: 'PRICE_DROP' | 'BACK_IN_STOCK' | 'NEW_PRODUCT';
  sentAt: Date;
  channel: 'EMAIL' | 'TELEGRAM' | 'SMS';
}

// Payment Types
export interface PaymentIntent {
  id: string;
  userId: string;
  amount: number;
  currency: 'PLN';
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED';
  productType: 'SUBSCRIPTION' | 'SUBSIDY_REPORT' | 'BOOKING_COMMISSION';
  metadata: Record<string, any>;
  createdAt: Date;
}