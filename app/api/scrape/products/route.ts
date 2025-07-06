import { NextResponse } from 'next/server';
import { scrapeCoolingProducts } from '../../../lib/scraper';

export async function GET() {
  try {
    // In production, this would be cached and run on a schedule
    const products = await scrapeCoolingProducts();
    
    return NextResponse.json({
      success: true,
      products: products.slice(0, 50), // Limit to 50 products for demo
      totalCount: products.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Scraping error:', error);
    
    // Return mock data if scraping fails
    const mockProducts = [
      {
        id: 'demo-1',
        name: 'Klimatyzator przenośny Electrolux EXP26U338CW',
        price: 2499,
        currency: 'PLN',
        availability: 'IN_STOCK',
        store: 'MEDIA_EXPERT',
        storeUrl: 'https://www.mediaexpert.pl/klimatyzatory',
        imageUrl: 'https://placehold.co/300x300/e3f2fd/1976d2?text=AC+Unit',
        lastUpdated: new Date(),
        category: 'AC_UNIT',
        location: {
          city: 'Warszawa',
          deliveryTime: '1-2 dni'
        }
      },
      {
        id: 'demo-2',
        name: 'Basen ogrodowy Intex 366x76cm',
        price: 899,
        currency: 'PLN',
        availability: 'LOW_STOCK',
        store: 'ALLEGRO',
        storeUrl: 'https://allegro.pl/oferta/basen-ogrodowy',
        imageUrl: 'https://placehold.co/300x300/e8f5e9/4caf50?text=Pool',
        lastUpdated: new Date(),
        category: 'PORTABLE_POOL',
        location: {
          city: 'Kraków',
          deliveryTime: '2-3 dni'
        }
      },
      {
        id: 'demo-3',
        name: 'Parasol ogrodowy UV50+ 3m',
        price: 349,
        currency: 'PLN',
        availability: 'IN_STOCK',
        store: 'AMAZON_DE',
        storeUrl: 'https://www.amazon.de/parasol',
        imageUrl: 'https://placehold.co/300x300/fff3e0/ff9800?text=Umbrella',
        lastUpdated: new Date(),
        category: 'UV_UMBRELLA',
        location: {
          city: 'Berlin',
          deliveryTime: '5-7 dni'
        }
      },
      {
        id: 'demo-4',
        name: 'Wentylator stojący Dyson AM07',
        price: 1899,
        currency: 'PLN',
        availability: 'IN_STOCK',
        store: 'MEDIA_EXPERT',
        storeUrl: 'https://www.mediaexpert.pl/wentylatory',
        imageUrl: 'https://placehold.co/300x300/f3e5f5/9c27b0?text=Fan',
        lastUpdated: new Date(),
        category: 'FAN',
        location: {
          city: 'Warszawa',
          deliveryTime: '1-2 dni'
        }
      },
      {
        id: 'demo-5',
        name: 'Mata chłodząca dla zwierząt 90x50cm',
        price: 89,
        currency: 'PLN',
        availability: 'OUT_OF_STOCK',
        store: 'ALLEGRO',
        storeUrl: 'https://allegro.pl/oferta/mata-chlodzaca',
        imageUrl: 'https://placehold.co/300x300/e1f5fe/00bcd4?text=Cooling+Mat',
        lastUpdated: new Date(),
        category: 'COOLING_MAT',
        location: {
          city: 'Poznań',
          deliveryTime: '3-4 dni'
        }
      }
    ];
    
    return NextResponse.json({
      success: true,
      products: mockProducts,
      totalCount: mockProducts.length,
      lastUpdated: new Date().toISOString(),
      isDemo: true
    });
  }
}