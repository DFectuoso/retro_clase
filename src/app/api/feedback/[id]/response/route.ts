import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: formId } = params;
    const body = await req.json();
    const { score, comment } = body;

    if (score === undefined || score < 0 || score > 10) {
      return NextResponse.json(
        { error: 'Score must be a number between 0 and 10' },
        { status: 400 }
      );
    }

    // Check if form exists
    const feedbackForm = await prisma.feedbackForm.findUnique({
      where: { id: formId },
    });

    if (!feedbackForm) {
      return NextResponse.json(
        { error: 'Feedback form not found' },
        { status: 404 }
      );
    }

    const response = await prisma.response.create({
      data: {
        score,
        comment: comment || null,
        formId,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error submitting response:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 