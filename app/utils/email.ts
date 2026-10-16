import nodemailer from "nodemailer";

/**
 * Mailer utility for Hotel Luxora.
 * Uses SMTP settings from environment variables.
 */

const port = Number(process.env.EMAIL_SERVER_PORT) || 465;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: port,
  secure: port === 465,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendAdminBookingNotification(booking: any) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_SERVER_USER;
  const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER;
  const bccEmail = process.env.BCC_EMAIL || "vijendrajat693@gmail.com";

  // Verify core configuration
  const requiredEnv = [
    'EMAIL_SERVER_HOST',
    'EMAIL_SERVER_USER',
    'EMAIL_SERVER_PASSWORD'
  ];

  const missing = requiredEnv.filter(k => !process.env[k]);

  if (missing.length > 0) {
    console.warn(`[EmailService] Missing required configuration: ${missing.join(', ')}. Skipping notification.`);
    return;
  }

  if (!adminEmail) {
    console.warn("[EmailService] No ADMIN_EMAIL or EMAIL_SERVER_USER configured. Skipping notification.");
    return;
  }

  const checkInDate = new Date(booking.checkIn).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const checkOutDate = new Date(booking.checkOut).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; color: #333;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #D4A857; margin: 0; font-size: 24px;">New Booking Received</h1>
        <p style="color: #666; font-size: 14px;">Hotel Luxora – Administration Alert</p>
      </div>

      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
        <h2 style="font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-top: 0; color: #D4A857;">Booking Summary</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #777; width: 150px;">Reference:</td>
            <td style="padding: 8px 0; font-weight: bold;">${booking.bookingRef}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777;">Guest Name:</td>
            <td style="padding: 8px 0;">${booking.guestName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777;">Contact:</td>
            <td style="padding: 8px 0;">${booking.guestPhone} / ${booking.guestEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777;">Dates:</td>
            <td style="padding: 8px 0;">${checkInDate} to <br/>${checkOutDate} (${booking.nights} nights)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777;">Room:</td>
            <td style="padding: 8px 0;">${booking.roomTypeName} ${booking.roomNumber ? `(Room ${booking.roomNumber})` : ""}</td>
          </tr>
          <tr>
            <td style="padding: 20px 0 8px; color: #777; font-size: 16px;">Total Amount:</td>
            <td style="padding: 20px 0 8px; font-size: 20px; font-weight: bold; color: #D4A857;">₹${booking.grandTotal?.toLocaleString()}</td>
          </tr>
        </table>
      </div>

      ${booking.specialRequests ? `
      <div style="margin-bottom: 25px;">
        <p style="color: #777; font-size: 13px; margin-bottom: 5px;">Special Requests:</p>
        <p style="padding: 10px; background: #fff8eb; border-left: 3px solid #D4A857; font-style: italic; font-size: 14px; margin: 0;">"${booking.specialRequests}"</p>
      </div>
      ` : ""}

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999;">This is an automated notification from your property management system.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      bcc: bccEmail,
      subject: `New Booking: ${booking.guestName} (${booking.bookingRef})`,
      html: htmlContent,
      text: `New booking received from ${booking.guestName}. Ref: ${booking.bookingRef}. Check-in: ${booking.checkIn}, Check-out: ${booking.checkOut}, Room: ${booking.roomTypeName}, Total: ₹${booking.grandTotal}.`,
    });
    console.log(`[EmailService] Notification sent for booking ${booking.bookingRef}`);
  } catch (error: any) {
    console.error(`[EmailService] Failed to send notification for ${booking.bookingRef}:`);
    console.error("Error details:", error?.message || error);
    if (error?.code) console.error("Error code:", error.code);
    if (error?.command) console.error("SMTP Command:", error.command);
  }
}

export async function sendContactEnquiryNotification(enquiry: {
  name: string;
  email: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  message?: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_SERVER_USER;
  const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER;
  const bccEmail = process.env.BCC_EMAIL || "vijendrajat693@gmail.com";

  if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
    console.warn("[EmailService] Missing SMTP config. Skipping enquiry notification.");
    return;
  }

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; color: #333;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #D4A857; margin: 0; font-size: 24px;">New Enquiry / Message</h1>
        <p style="color: #666; font-size: 14px;">Hotel Luxora – Website Inquiry</p>
      </div>

      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
        <h2 style="font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-top: 0; color: #D4A857;">Customer Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #777; width: 140px;">Name:</td>
            <td style="padding: 8px 0; font-weight: bold;">${enquiry.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${enquiry.email}" style="color: #D4A857;">${enquiry.email}</a></td>
          </tr>
          ${enquiry.phone ? `
          <tr>
            <td style="padding: 8px 0; color: #777;">Phone:</td>
            <td style="padding: 8px 0;"><a href="tel:${enquiry.phone}" style="color: #333; text-decoration: none;">${enquiry.phone}</a></td>
          </tr>` : ""}
          ${enquiry.checkIn || enquiry.checkOut ? `
          <tr>
            <td style="padding: 8px 0; color: #777;">Dates:</td>
            <td style="padding: 8px 0;">${enquiry.checkIn || "N/A"} to ${enquiry.checkOut || "N/A"}</td>
          </tr>` : ""}
          ${enquiry.guests ? `
          <tr>
            <td style="padding: 8px 0; color: #777;">Guests:</td>
            <td style="padding: 8px 0;">${enquiry.guests}</td>
          </tr>` : ""}
        </table>
      </div>

      ${enquiry.message ? `
      <div style="margin-bottom: 25px;">
        <p style="color: #777; font-size: 13px; margin-bottom: 5px; font-weight: bold;">Message / Enquiry:</p>
        <p style="padding: 12px; background: #fff8eb; border-left: 3px solid #D4A857; font-size: 14px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${enquiry.message}</p>
      </div>` : ""}

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999;">Automated inquiry received via Hotel Luxora website.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      bcc: bccEmail,
      replyTo: enquiry.email,
      subject: `New Enquiry from ${enquiry.name}`,
      html: htmlContent,
      text: `New enquiry received from ${enquiry.name} (${enquiry.email}, ${enquiry.phone || 'No phone'}). Message: ${enquiry.message || 'No message'}`,
    });
    console.log(`[EmailService] Contact enquiry sent for ${enquiry.name}`);
  } catch (error: any) {
    console.error(`[EmailService] Failed to send contact enquiry for ${enquiry.name}:`, error?.message || error);
  }
}
