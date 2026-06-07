import { Resend } from "resend";

// Serverless-friendly rate limiting memory cache
// Standard Javascript Map that persists across lambda warm events
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();

// Simple CORS header configuration helper
const setCorsHeaders = (res: any) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
};

/**
 * Serverless Server Function for Lead Form Email Automations
 * Handles secure validations, sanitizations, spam protection, and dual Resend delivery.
 * Compatibility: Designed for Vercel, Netlify, Hostinger (Node.js/serverless routing), and Railway.
 */
export default async function handler(req: any, res: any) {
  // 1. Setup CORS for remote serverless configurations
  setCorsHeaders(res);

  // Handle preflight OPTIONS requests gracefully
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Enforce POST method only
  if (req.method !== "POST") {
    res.status(405).json({
      status: "error",
      message: "Method Not Allowed. Only POST requests are accepted."
    });
    return;
  }

  try {
    const { fullName, email, phone, country, courseInterest, message, website, botField } = req.body || {};

    // 2. Form Security & Honeypot Trap detection
    if (website || botField) {
      console.warn("[SECURITY] Honeypot trigger. Silent ignore on suspected spam bot.");
      res.status(200).json({
        status: "success",
        message: "Thank you for contacting QuranRise. We have received your inquiry and sent a confirmation email to your inbox.",
        botIntercepted: true
      });
      return;
    }

    // 3. Strict Server-side input validation and sanitization
    if (!fullName || !email || !phone) {
      res.status(400).json({
        status: "error",
        message: "Validation Error: Full Name, Email, and Phone Number are required fields."
      });
      return;
    }

    // Clean inputs to avoid script injection & trim excess lengths
    const cleanName = String(fullName).replace(/<[^>]*>/g, "").trim().substring(0, 100);
    const cleanEmail = String(email).trim().substring(0, 150);
    const cleanPhone = String(phone).replace(/[^0-9+\s()-]/g, "").trim().substring(0, 30);
    const cleanCountry = country ? String(country).replace(/<[^>]*>/g, "").trim().substring(0, 80) : "Not Specified";
    const cleanCourse = courseInterest ? String(courseInterest).replace(/<[^>]*>/g, "").trim().substring(0, 80) : "noorani-qaida";
    const cleanMessage = message ? String(message).replace(/<[^>]*>/g, "").trim().substring(0, 1500) : "No custom message provided.";

    // Robust validation of email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      res.status(400).json({
        status: "error",
        message: "Validation Error: Invalid email format structure."
      });
      return;
    }

    // 4. Rate Limiting Protection (Sliding 10-minute window)
    const rateLimitKey = cleanEmail;
    const now = Date.now();
    const windowMs = 10 * 60 * 1000; // 10 minutes
    const limit = 4; // Max 4 submissions per 10 mins from same email

    const record = rateLimitMap.get(rateLimitKey);
    if (record) {
      if (now - record.firstRequestTime > windowMs) {
        rateLimitMap.set(rateLimitKey, { count: 1, firstRequestTime: now });
      } else {
        if (record.count >= limit) {
          console.warn(`[SECURITY] Rate Limit Blocked address: ${rateLimitKey}`);
          res.status(429).json({
            status: "error",
            message: "Too many submission attempts. Please try again in 10 minutes or text us on WhatsApp."
          });
          return;
        }
        record.count += 1;
      }
    } else {
      rateLimitMap.set(rateLimitKey, { count: 1, firstRequestTime: now });
    }

    // Capture environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const toEmail = process.env.EMAIL_TO || "elijahjames1024@gmail.com";

    // 5. Build Owner HTML Email Template
    const ownerHtml = `
      <div style="font-family: sans-serif; padding: 25px; color: #0A1A14; max-width: 600px; margin: auto; border: 1px solid #ECECE6; border-radius: 12px; background-color: #ffffff;">
        <h2 style="border-bottom: 2px solid #C8A24A; padding-bottom: 12px; color: #0A1A14; font-size: 20px; font-weight: 800;">New QuranRise Inquiry Received</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; width: 150px; color: #526B62; font-size: 13px;">Full Name:</td>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; color: #0A1A14; font-size: 14px; font-weight: 600;">${cleanName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; color: #526B62; font-size: 13px;">Email Address:</td>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-size: 14px;"><a href="mailto:${cleanEmail}" style="color: #C8A24A; text-decoration: none; font-weight: 600;">${cleanEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; color: #526B62; font-size: 13px;">Phone Number:</td>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-size: 14px; font-weight: 600; color: #0A1A14;">${cleanPhone}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; color: #526B62; font-size: 13px;">Country:</td>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; color: #0A1A14; font-size: 14px;">${cleanCountry}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; color: #526B62; font-size: 13px;">Selected Course:</td>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; color: #0A1A14; font-size: 14px; text-transform: capitalize; font-weight: 600;">${cleanCourse.replace("-", " ")}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; color: #526B62; font-size: 13px; vertical-align: top;">Message:</td>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; white-space: pre-wrap; font-style: italic; color: #4E625A; font-size: 13px; line-height: 1.5; background-color: #FAFAF8; border-radius: 8px;">"${cleanMessage}"</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; color: #526B62; font-size: 13px;">Submitted:</td>
            <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; color: #7B9B8E; font-size: 13px;">${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
          </tr>
        </table>
      </div>
    `;

    // 6. Build User Confirmation HTML Email Template
    const userHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ECECE6; border-radius: 16px; overflow: hidden; background-color: #FAFAF8;">
        <div style="background-color: #0A1A14; padding: 30px; text-align: center;">
          <h1 style="color: #D8BB72; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px;">QuranRise</h1>
          <p style="color: #89A296; margin: 5px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Learn Quran Online with Certified Tutors</p>
        </div>
        
        <div style="padding: 35px; color: #153428; background-color: #ffffff;">
          <p style="font-size: 16px; font-weight: 600; color: #0A1A14; margin-top: 0;">Assalamu Alaikum ${cleanName},</p>
          
          <p style="font-size: 14px; line-height: 1.6; color: #4E625A;">
            Thank you for contacting <strong>QuranRise</strong>.
          </p>
          
          <p style="font-size: 14px; line-height: 1.6; color: #4E625A;">
            We have successfully received your inquiry and our team will contact you shortly.
          </p>
          
          <p style="font-size: 14px; line-height: 1.6; color: #4E625A; margin-top: 20px; font-weight: bold;">
            Our goal is to help students learn:
          </p>
          
          <ul style="font-size: 14px; line-height: 1.8; color: #4E625A; padding-left: 20px; margin-top: 5px;">
            <li><strong>Quran Reading:</strong> Foundational phonetics and letters.</li>
            <li><strong>Tajweed Rules:</strong> Proper pacing and rhythm models.</li>
            <li><strong>Memorization:</strong> Step-by-step personalized Hifz tracks.</li>
            <li><strong>Daily Duas:</strong> Essential everyday Muslim supplications.</li>
            <li><strong>Islamic Basics:</strong> Comprehensive baseline concepts.</li>
          </ul>

          <div style="background-color: #FAFAF5; border-left: 4px solid #C8A24A; padding: 15px; margin: 25px 0; border-radius: 6px;">
            <p style="margin: 0; font-size: 13px; font-weight: 700; color: #8A6B20;">
              Urgent question?
            </p>
            <p style="margin: 5px 0 0 0; font-size: 13px; line-height: 1.4; color: #526B62;">
              Feel free to ping our academic coordinator directly on WhatsApp: 
              <a href="https://wa.me/447700900077" style="color: #25D366; font-weight: bold; text-decoration: underline;">Chat on WhatsApp</a>.
            </p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #4E625A; margin-bottom: 25px;">
            Thank you for choosing QuranRise.
          </p>

          <p style="font-size: 13px; color: #7B9B8E; margin: 0; padding-top: 15px; border-top: 1px solid #F2F2EC;">
            Best Regards,<br>
            <strong style="color: #0A1A14; font-weight: bold;">QuranRise Team</strong>
          </p>
        </div>
        
        <div style="background-color: #0A1A14; padding: 25px; text-align: center;">
          <p style="color: #89A296; font-size: 11px; margin: 0;">
            © 2026 QuranRise Academy. All rights reserved.
          </p>
        </div>
      </div>
    `;

    // 7. Check if API Key exists. If not, trigger clean sandbox testing mode logger.
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined in serverless environment variables.");
      console.info("=== SANDBOX LOGGING DETECTED (NO RESEND API KEY CONFIGURED) ===");
      console.info(`Lead Email: ${cleanEmail}`);
      console.info(`Name: ${cleanName}`);
      console.info(`Course: ${cleanCourse}`);
      console.info("===============================================================");
      
      res.status(200).json({
        status: "success",
        message: "Thank you for contacting QuranRise. We have received your inquiry and sent a confirmation email to your inbox.",
        sandbox: true,
        details: "Serverless Sandbox active. To deliver live emails, set RESEND_API_KEY, EMAIL_FROM, and EMAIL_TO on your environment."
      });
      return;
    }

    // 8. Initiate actual live sending via Resend SDK
    const resend = new Resend(apiKey);

    // Email to Academy Owner
    const ownerFeedback = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "New QuranRise Inquiry Received",
      html: ownerHtml
    });

    if (ownerFeedback.error) {
      console.error("Owner notification via Resend failed:", ownerFeedback.error);
      res.status(500).json({ status: "error", message: "Resend SDK was unable to route owner notification." });
      return;
    }

    // Email to Student/User confirmation
    const userFeedback = await resend.emails.send({
      from: fromEmail,
      to: cleanEmail,
      subject: "Thank You for Contacting QuranRise",
      html: userHtml
    });

    if (userFeedback.error) {
      console.warn("User status confirmation via Resend failed:", userFeedback.error);
    }

    res.status(200).json({
      status: "success",
      message: "Thank you for contacting QuranRise. We have received your inquiry and sent a confirmation email to your inbox."
    });

  } catch (error: any) {
    console.error("FATAL: Unhandled serverless execution error:", error);
    res.status(500).json({
      status: "error",
      message: "An internal serverless error occurred. Try again or contact us via WhatsApp."
    });
  }
}
