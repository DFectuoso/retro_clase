import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const feedbackForm = await prisma.feedbackForm.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(feedbackForm, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback form:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 