import nodemailer from 'nodemailer';

export function getMailer() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendInquiryNotification(data, lang = 'en') {
  const transporter = getMailer();
  if (!transporter) {
    console.warn('[MAIL] Hostinger SMTP credentials (SMTP_USER, SMTP_PASS) not configured.');
    return { sent: false, reason: 'SMTP not configured' };
  }

  const notificationTarget = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'hello@alaz.pro';
  const fromAddress = `"ALAZ" <${process.env.SMTP_USER}>`;

  // 1. Studio notification email
  const notificationHtml = `
    <div style="background-color: #0c0c0c; color: #ededed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background: #141414; border: 1px solid #282828; padding: 32px;">
        <div style="font-family: monospace; font-size: 11px; letter-spacing: 0.1em; color: #888; border-bottom: 1px solid #282828; padding-bottom: 12px; margin-bottom: 24px;">
          ALAZ // YENİ PROJE TALEBİ
        </div>
        
        <h2 style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 16px 0; letter-spacing: -0.03em;">
          ${escapeHtml(data.project_name || 'İsimsiz Proje')}
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; font-family: monospace; font-size: 11px; color: #777; width: 140px;">MÜŞTERİ:</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #fff;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-family: monospace; font-size: 11px; color: #777;">E-POSTA:</td>
            <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #fff; text-decoration: underline;">${escapeHtml(data.email)}</a></td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 8px 0; font-family: monospace; font-size: 11px; color: #777;">ŞİRKET:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #ccc;">${escapeHtml(data.company)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; font-family: monospace; font-size: 11px; color: #777;">PROJE TÜRÜ:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #ccc;">${escapeHtml(data.project_type || 'Belirtilmedi')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-family: monospace; font-size: 11px; color: #777;">ZAMAN PLANI:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #ccc;">${escapeHtml(data.timeline || 'Belirtilmedi')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-family: monospace; font-size: 11px; color: #777;">BÜTÇE ARALIĞI:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #ccc;">${escapeHtml(data.budget || 'Belirtilmedi')}</td>
          </tr>
        </table>

        <div style="border-top: 1px solid #282828; padding-top: 20px; margin-top: 20px;">
          <div style="font-family: monospace; font-size: 11px; color: #888; margin-bottom: 8px;">PROJE ÖZETİ & DETAYLAR:</div>
          <div style="background: #090909; border: 1px solid #222; padding: 16px; font-size: 14px; color: #ddd; white-space: pre-wrap; line-height: 1.6;">
            ${escapeHtml(data.brief)}
          </div>
        </div>

        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #222; font-family: monospace; font-size: 10px; color: #555;">
          GÖNDERİLME ZAMANI: ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}
        </div>
      </div>
    </div>
  `;

  // 2. Client confirmation auto-reply, in the language the form was filled in.
  const copy = lang === 'tr'
    ? { header: 'ALAZ · YAZILIM STÜDYOSU', title: 'Özetiniz bize ulaştı.', hello: 'Merhaba', body: (name) => `<strong>"${name}"</strong> hakkındaki özetinizi bir mühendis okuyacak ve bir iş günü içinde size doğrudan cevap vereceğiz. Acilse bu e-postaya yanıt vermeniz yeterli.`, subject: 'Özetinizi aldık — ALAZ' }
    : { header: 'ALAZ · SOFTWARE STUDIO', title: 'Your brief has arrived.', hello: 'Hi', body: (name) => `An engineer will read your brief for <strong>"${name}"</strong> and reply to you directly within one business day. If it is urgent, just reply to this email.`, subject: 'We received your brief — ALAZ' };
  const confirmationHtml = `
    <div style="background-color: #0c0c0c; color: #ededed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; line-height: 1.6;">
      <div style="max-width: 560px; margin: 0 auto; background: #141414; border: 1px solid #282828; padding: 32px;">
        <div style="font-family: monospace; font-size: 11px; letter-spacing: 0.1em; color: #888; border-bottom: 1px solid #282828; padding-bottom: 12px; margin-bottom: 24px;">
          ${copy.header}
        </div>
        <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 16px 0;">
          ${copy.title}
        </h2>
        <p style="font-size: 14px; color: #bbb; line-height: 1.7; margin-bottom: 20px;">
          ${copy.hello} <strong>${escapeHtml(data.name)}</strong>,<br/><br/>
          ${copy.body(escapeHtml(data.project_name || (lang === 'tr' ? 'projeniz' : 'your project')))}
        </p>
        <div style="border-top: 1px solid #282828; padding-top: 16px; font-family: monospace; font-size: 10px; color: #555;">
          ALAZ &bull; <a href="https://alaz.pro" style="color: #888; text-decoration: none;">alaz.pro</a> &bull; hello@alaz.pro &bull; İzmir · New York
        </div>
      </div>
    </div>
  `;

  try {
    // Send to Studio
    await transporter.sendMail({
      from: fromAddress,
      to: notificationTarget,
      replyTo: data.email,
      subject: `[ALAZ] New brief: ${data.project_name || 'Untitled'} — ${data.name}`,
      html: notificationHtml,
    });

    // Send auto-reply to client
    try {
      await transporter.sendMail({
        from: fromAddress,
        to: data.email,
        subject: copy.subject,
        html: confirmationHtml,
      });
    } catch (clientMailErr) {
      console.warn('[MAIL] Could not send confirmation to client:', clientMailErr.message);
    }

    return { sent: true };
  } catch (error) {
    console.error('[MAIL] Error sending email via Hostinger SMTP:', error);
    return { sent: false, error: error.message };
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
