import { NextRequest, NextResponse } from 'next/server';
import { generateTPD2025Form, validateFarmerData } from '../../../lib/subsidyEngine';
import { FarmerData } from '../../../types';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate the farmer data
    const validation = validateFarmerData(data);
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        errors: validation.errors
      }, { status: 400 });
    }
    
    // Create complete farmer data object
    const farmerData: FarmerData = {
      id: `FARMER-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      farmDetails: {
        registrationNumber: data.farmDetails.registrationNumber,
        totalArea: data.farmDetails.totalArea,
        affectedArea: data.farmDetails.affectedArea,
        gpsCoordinates: data.farmDetails.gpsCoordinates,
        cropType: data.farmDetails.cropType,
        estimatedLoss: data.farmDetails.estimatedLoss
      },
      documents: [{
        id: `DOC-${Date.now()}`,
        type: 'TPD_2025',
        status: 'GENERATED',
        generatedAt: new Date()
      }]
    };
    
    // Generate the PDF
    const pdfBuffer = await generateTPD2025Form(farmerData);
    
    // In production, this would save to storage and return a secure URL
    // For demo, we'll return success status
    return NextResponse.json({
      success: true,
      reportId: farmerData.documents![0].id,
      farmerId: farmerData.id,
      message: 'Raport TPD/2025 został wygenerowany pomyślnie',
      paymentRequired: true,
      amount: 199
    });
    
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Błąd podczas generowania raportu'
    }, { status: 500 });
  }
}