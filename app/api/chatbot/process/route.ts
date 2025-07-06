import { NextRequest, NextResponse } from 'next/server';
import { processChatMessage } from '../../../lib/chatbot';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, propertyId } = await request.json();
    
    if (!message || !conversationId) {
      return NextResponse.json({
        success: false,
        error: 'Message and conversationId are required'
      }, { status: 400 });
    }
    
    // Process the message through our chatbot
    const response = await processChatMessage(
      message,
      conversationId,
      propertyId
    );
    
    // In production, this would also:
    // - Save to conversation history
    // - Trigger any necessary actions (bookings, notifications)
    // - Update analytics
    
    return NextResponse.json({
      success: true,
      response,
      conversationId
    });
    
  } catch (error) {
    console.error('Chatbot processing error:', error);
    return NextResponse.json({
      success: false,
      error: 'Błąd podczas przetwarzania wiadomości'
    }, { status: 500 });
  }
}