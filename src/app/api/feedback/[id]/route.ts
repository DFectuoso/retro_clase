import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const feedbackForm = await prisma.feedbackForm.findUnique({
      where: { id },
    });

    if (!feedbackForm) {
      return NextResponse.json(
        { error: 'Feedback form not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(feedbackForm);
  } catch (error) {
    console.error('Error fetching feedback form:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 