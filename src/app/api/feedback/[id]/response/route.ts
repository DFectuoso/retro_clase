import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper to mask sensitive info for logging
function maskSecret(secret: string | undefined): string {
  if (!secret) return 'undefined';
  if (secret.length <= 8) return '****';
  return secret.substring(0, 4) + '****' + secret.slice(-4);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // IMPORTANT: Await params before using them
    const { id: formId } = await params;
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

    // Send email notification if the form creator provided an email
    if (feedbackForm.email) {
      console.log(`[Email] Attempting to send email to: ${feedbackForm.email}`);
      console.log(`[Email] RESEND_API_KEY exists: ${!!process.env.RESEND_API_KEY}`);
      console.log(`[Email] RESEND_API_KEY (masked): ${maskSecret(process.env.RESEND_API_KEY)}`);
      
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.get('host')}`;
        const resultsUrl = `${baseUrl}/${formId}/results`;
        
        console.log(`[Email] Results URL: ${resultsUrl}`);
        
        // Note: Make sure this email domain is verified in your Resend account
        // Common issue: Using an unverified domain in the 'from' field
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@descubre.vc';
        console.log(`[Email] Using from email: ${fromEmail}`);
        
        const emailParams = {
          from: fromEmail,
          to: feedbackForm.email,
          subject: `Nuevo feedback para: ${feedbackForm.name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #0F2642;">¡Nuevo feedback recibido!</h1>
              <p>Acabas de recibir una nueva respuesta para <strong>${feedbackForm.name}</strong>.</p>
              
              <div style="margin: 20px 0; padding: 20px; border-radius: 8px; background-color: #f8f9fa; border-left: 4px solid #E3562A;">
                <h3 style="margin-top: 0;">Detalles de la respuesta:</h3>
                <p><strong>Puntuación:</strong> ${score}/10</p>
                ${comment ? `<p><strong>Comentario:</strong> "${comment}"</p>` : ''}
                <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
              </div>
              
              <p>Puedes ver todos los resultados <a href="${resultsUrl}" style="color: #E3562A; text-decoration: none; font-weight: bold;">haciendo clic aquí</a>.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                <p>Este es un email automático, por favor no respondas a este mensaje.</p>
              </div>
            </div>
          `,
        };
        
        console.log(`[Email] Sending with params:`, JSON.stringify({
          from: emailParams.from,
          to: emailParams.to,
          subject: emailParams.subject
        }));
        
        const emailResult = await resend.emails.send(emailParams);
        console.log(`[Email] Success! Email sent with response:`, JSON.stringify(emailResult));
      } catch (emailError) {
        console.error('[Email] Error sending email notification:', emailError);
        if (emailError instanceof Error) {
          console.error('[Email] Error message:', emailError.message);
          console.error('[Email] Error stack:', emailError.stack);
        } else {
          console.error('[Email] Unknown error type:', typeof emailError);
        }
      }
    } else {
      console.log(`[Email] No email address found for form ID: ${formId}`);
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error submitting response:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
} 