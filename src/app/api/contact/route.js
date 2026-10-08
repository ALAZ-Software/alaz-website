import { NextResponse } from 'next/server';
import { saveInquiry } from '@/lib/db';
import { sendInquiryNotification } from '@/lib/mailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { project_type, project_name, brief, timeline, budget, name, email, company, locale } = body;

    // Basic validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!brief || brief.trim().length < 10) {
      return NextResponse.json({ error: 'Brief must be at least 10 characters' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const inquiryData = {
      project_type: (project_type || '').trim(),
      project_name: (project_name || '').trim(),
      brief: brief.trim(),
      timeline: (timeline || '').trim(),
      budget: (budget || '').trim(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      ip_address: ip,
    };
    const lang = locale === 'tr' ? 'tr' : 'en';

    // 1. Save to Hostinger MySQL Database (if configured)
    const dbResult = await saveInquiry(inquiryData);

    // 2. Send via Hostinger SMTP (if configured)
    const mailResult = await sendInquiryNotification(inquiryData, lang);

    // If neither the database nor the mailbox received the brief, the visitor must know; a silent 200 loses the lead.
    if (!dbResult.saved && !mailResult.sent) {
      console.error('[API /api/contact] Inquiry could not be stored or mailed', { db: dbResult, mail: mailResult });
      return NextResponse.json({ error: 'We could not record your brief right now. Please email hello@alaz.pro.' }, { status: 503 });
    }

    return NextResponse.json({
      success: true,
      dbSaved: dbResult.saved,
      emailSent: mailResult.sent,
    });
  } catch (error) {
    console.error('[API /api/contact] Error processing submission:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request' },
      { status: 500 }
    );
  }
}
