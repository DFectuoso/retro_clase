import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // IMPORTANT: Await params before using them
    const { id: formId } = await params;

    // First, check if the form exists
    const feedbackForm = await prisma.feedbackForm.findUnique({
      where: { id: formId },
    });

    if (!feedbackForm) {
      return NextResponse.json(
        { error: 'Feedback form not found' },
        { status: 404 }
      );
    }

    // Get all responses for this form
    const responses = await prisma.response.findMany({
      where: { formId },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate statistics
    const totalResponses = responses.length;
    
    if (totalResponses === 0) {
      return NextResponse.json({
        form: feedbackForm,
        stats: {
          totalResponses: 0,
          averageScore: 0,
          npsBreakdown: {
            promoters: 0,
            passives: 0, 
            detractors: 0
          },
          npsScore: 0
        },
        responses: []
      });
    }
    
    const totalScore = responses.reduce((sum, response) => sum + response.score, 0);
    const averageScore = totalScore / totalResponses;
    
    // Calculate NPS (Net Promoter Score)
    const promoters = responses.filter(r => r.score >= 9).length;
    const passives = responses.filter(r => r.score >= 7 && r.score <= 8).length;
    const detractors = responses.filter(r => r.score <= 6).length;
    
    const promotersPercentage = (promoters / totalResponses) * 100;
    const detractorsPercentage = (detractors / totalResponses) * 100;
    const npsScore = Math.round(promotersPercentage - detractorsPercentage);

    return NextResponse.json({
      form: feedbackForm,
      stats: {
        totalResponses,
        averageScore,
        npsBreakdown: {
          promoters,
          passives,
          detractors
        },
        npsScore
      },
      responses
    });
  } catch (error) {
    console.error('Error fetching feedback results:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 