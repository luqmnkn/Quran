import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

// Simple in-memory rate limiting map
// Tracks IP / Email address: { count, firstRequestTime }
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API router/routes FIRST before Vite to avoid proxying
  app.post("/api/send-email", async (req, res) => {
    try {
      const { fullName, email, phone, country, courseInterest, message, website, botField } = req.body;

      // 1. Spam protection & Honeypot detection
      // If honeypot fields are filled, silently succeed (spam bot honey trap)
      if (website || botField) {
        console.warn("Honeypot hit detected! Silently ignoring bot spam.");
        return res.status(200).json({
          status: "success",
          message: "Thank you for contacting QuranRise. We have received your inquiry and sent a confirmation email to your inbox.",
          sandbox: true,
          details: "Spam check cleared (honeypot)."
        });
      }

      // 2. Input validation & sanitization
      if (!fullName || !email || !phone) {
        return res.status(400).json({
          status: "error",
          message: "Full Name, Email Address, and Phone Number are required fields."
        });
      }

      const cleanName = String(fullName).replace(/<[^>]*>/g, "").trim().substring(0, 100);
      const cleanEmail = String(email).trim().substring(0, 150);
      const cleanPhone = String(phone).replace(/[^0-9+\s()-]/g, "").trim().substring(0, 30);
      const cleanCountry = country ? String(country).replace(/<[^>]*>/g, "").trim().substring(0, 80) : "Not Specified";
      const cleanCourse = courseInterest ? String(courseInterest).replace(/<[^>]*>/g, "").trim().substring(0, 80) : "noorani-qaida";
      const cleanMessage = message ? String(message).replace(/<[^>]*>/g, "").trim().substring(0, 1500) : "No message provided.";

      // Basic regex check for email
      if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid email address structure."
        });
      }

      // 3. Simple Rate Limiting (IP or Email-based sliding window)
      // Max 4 submissions per 10 minutes from same email
      const rateLimitKey = cleanEmail;
      const now = Date.now();
      const windowMs = 10 * 60 * 1000; // 10 minutes
      const limit = 4;

      const record = rateLimitMap.get(rateLimitKey);
      if (record) {
        if (now - record.firstRequestTime > windowMs) {
          // Reset window
          rateLimitMap.set(rateLimitKey, { count: 1, firstRequestTime: now });
        } else {
          if (record.count >= limit) {
            console.warn(`Rate limit design block for: ${rateLimitKey}`);
            return res.status(429).json({
              status: "error",
              message: "Too many submission attempts. Please try again in 10 minutes or contact us directly on WhatsApp."
            });
          }
          record.count += 1;
        }
      } else {
        rateLimitMap.set(rateLimitKey, { count: 1, firstRequestTime: now });
      }

      // Environment configs
      const apiKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
      const toEmail = process.env.EMAIL_TO || "elijahjames1024@gmail.com"; 

      console.log(`Processing lead inquiry for ${cleanName} (${cleanEmail})`);

      // Prepare Owner HTML Email Content
      const ownerHtml = `
        <div style="font-family: sans-serif; padding: 25px; color: #0A1A14; max-width: 600px; margin: auto; border: 1px solid #ECECE6; border-radius: 12px; background-color: #ffffff;">
          <h2 style="border-bottom: 2px solid #C8A24A; padding-bottom: 12px; color: #0A1A14; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">New QuranRise Inquiry Received</h2>
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
              <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; color: #526B62; font-size: 13px;">Course Interest:</td>
              <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; color: #0A1A14; font-size: 14px; text-transform: capitalize; font-weight: 600;">${cleanCourse.replace("-", " ")}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; color: #526B62; font-size: 13px; vertical-align: top;">Message:</td>
              <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; white-space: pre-wrap; font-style: italic; color: #4E625A; font-size: 13px; line-height: 1.5; background-color: #FAFAF8; border-radius: 8px; margin: 4px 0;">"${cleanMessage}"</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; font-weight: bold; color: #526B62; font-size: 13px;">Submission Date:</td>
              <td style="padding: 12px; border-bottom: 1px solid #F2F2EC; color: #7B9B8E; font-size: 12px; font-family: monospace;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <div style="margin-top: 30px; text-align: center; font-size: 11px; color: #7B9B8E; border-top: 1px solid #F2F2EC; padding-top: 15px;">
            Logged securely by QuranRise Automations Engine • IP: ${req.ip || "Unknown"}
          </div>
        </div>
      `;

      // Prepare User Confirmation HTML Email Content
      const userHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ECECE6; border-radius: 16px; overflow: hidden; background-color: #FAFAF8;">
          <div style="background-color: #0A1A14; padding: 30px; text-align: center;">
            <h1 style="color: #D8BB72; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px;">QuranRise</h1>
            <p style="color: #89A296; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px;">Learn Quran Online with Certified Tutors</p>
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
              <li><strong>Quran Reading:</strong> Perfect foundational phonetics and correct letters.</li>
              <li><strong>Tajweed rules:</strong> Master natural Arabic accents and pronunciation.</li>
              <li><strong>Memorization (Hifz):</strong> Guided personal sessions with certified teachers.</li>
              <li><strong>Daily Duas:</strong> Nurture essential daily practices and invocations.</li>
              <li><strong>Islamic Basics:</strong> Comprehensive character and custom development.</li>
            </ul>

            <div style="background-color: #FAFAF5; border-left: 4px solid #C8A24A; padding: 15px; margin: 25px 0; border-radius: 6px;">
              <p style="margin: 0; font-size: 13px; font-weight: 700; color: #8A6B20;">
                Have urgent questions?
              </p>
              <p style="margin: 5px 0 0 0; font-size: 13px; line-height: 1.4; color: #526B62;">
                If you have urgent questions, please contact us through WhatsApp: 
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
            <p style="color: #526B62; font-size: 10px; margin: 5px 0 0 0;">
              You received this email because you booked a trial on our website.
            </p>
          </div>
        </div>
      `;

      // 4. Lazy-initialize Resend SDK client
      if (!apiKey) {
        console.warn("RESEND_API_KEY environment variable is not defined.");
        console.log("=== SIMULATED OWNER NOTIFICATION EMAIL ===");
        console.log(`From: ${fromEmail}`);
        console.log(`To: ${toEmail}`);
        console.log(`Subject: New QuranRise Inquiry Received`);
        console.log(`HTML Body Snippet: ${ownerHtml.substring(0, 300)}...`);
        console.log("==========================================");

        console.log("=== SIMULATED USER CONFIRMATION EMAIL ===");
        console.log(`From: ${fromEmail}`);
        console.log(`To: ${cleanEmail}`);
        console.log(`Subject: Thank You for Contacting QuranRise`);
        console.log(`HTML Body Snippet: ${userHtml.substring(0, 300)}...`);
        console.log("=========================================");

        return res.status(200).json({
          status: "success",
          message: "Thank you for contacting QuranRise. We have received your inquiry and sent a confirmation email to your inbox.",
          sandbox: true,
          details: "API simulated in local Sandbox mode since RESEND_API_KEY is not configured yet. Set RESEND_API_KEY on your settings to enable live email delivery!"
        });
      }

      // Initialize Resend
      const resend = new Resend(apiKey);

      // Email 1: Send to Owner
      const ownerEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: "New QuranRise Inquiry Received",
        html: ownerHtml
      });

      if (ownerEmailResponse.error) {
        console.error("Error sending owner email via Resend:", ownerEmailResponse.error);
        throw ownerEmailResponse.error;
      }

      // Email 2: Send to User
      const userEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: cleanEmail,
        subject: "Thank You for Contacting QuranRise",
        html: userHtml
      });

      if (userEmailResponse.error) {
        console.error("Error sending user status email via Resend:", userEmailResponse.error);
      }

      return res.status(200).json({
        status: "success",
        message: "Thank you for contacting QuranRise. We have received your inquiry and sent a confirmation email to your inbox."
      });

    } catch (error: any) {
      console.error("Fatal error during lead processing:", error);
      return res.status(500).json({
        status: "error",
        message: "An internal error occurred while processing your trial booking. Please try again or chat with us over WhatsApp."
      });
    }
  });

  // Serve Vite in dev, static files in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[QuranRise Server] Running successfully on port ${PORT}`);
  });
}

startServer();
