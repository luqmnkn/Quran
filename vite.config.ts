import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { Resend } from 'resend';

// Local dev memory store for rate limiting mocks
const localRateLimiter = new Map<string, { count: number; firstRequestTime: number }>();

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'dev-serverless-api-mock',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/send-email') && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });

              req.on('end', async () => {
                try {
                  const data = JSON.parse(body || '{}');
                  const { fullName, email, phone, country, courseInterest, message, website, botField } = data;

                  // Honeypot spam interceptor
                  if (website || botField) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      status: 'success',
                      message: 'Thank you for contacting QuranRise. We have received your inquiry and sent a confirmation email to your inbox.',
                      botIntercepted: true
                    }));
                    return;
                  }

                  // Required fields validation
                  if (!fullName || !email || !phone) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      status: 'error',
                      message: 'Validation Error: Full Name, Email, and Phone Number are required fields.'
                    }));
                    return;
                  }

                  // Simple email regex structure check
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(email)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      status: 'error',
                      message: 'Validation Error: Invalid email format structure.'
                    }));
                    return;
                  }

                  // Local simple rate limiter check
                  const now = Date.now();
                  const rateLimitKey = String(email).trim();
                  const windowMs = 10 * 60 * 1000;
                  const limit = 4;
                  
                  const record = localRateLimiter.get(rateLimitKey);
                  if (record) {
                    if (now - record.firstRequestTime > windowMs) {
                      localRateLimiter.set(rateLimitKey, { count: 1, firstRequestTime: now });
                    } else {
                      if (record.count >= limit) {
                        res.writeHead(429, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                          status: 'error',
                          message: 'Too many submission attempts. Please try again in 10 minutes or text us on WhatsApp.'
                        }));
                        return;
                      }
                      record.count += 1;
                    }
                  } else {
                    localRateLimiter.set(rateLimitKey, { count: 1, firstRequestTime: now });
                  }

                  // Check environment configs
                  const apiKey = process.env.RESEND_API_KEY;
                  if (!apiKey) {
                    console.info("=== LOCAL DEV SERVERLESS INTERCEPT (NO RESEND KEY) ===");
                    console.info("Data Captured:", data);
                    console.info("========================================= ");
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      status: 'success',
                      message: 'Thank you for contacting QuranRise. We have received your inquiry and sent a confirmation email to your inbox.',
                      sandbox: true,
                      details: 'Sandbox mode active in local development. Configure RESEND_API_KEY in .env to deliver real emails.'
                    }));
                    return;
                  }

                  // Live Resend Email Send Trigger
                  const resend = new Resend(apiKey);
                  const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
                  const toEmail = process.env.EMAIL_TO || "elijahjames1024@gmail.com";

                  // Short simple HTML for local debug send
                  const ownerResult = await resend.emails.send({
                    from: fromEmail,
                    to: toEmail,
                    subject: "New QuranRise Inquiry Received (Local Dev)",
                    html: `<h3>New Lead Received (Local Dev Mode)</h3><p>Name: ${fullName}</p><p>Email: ${email}</p><p>Phone: ${phone}</p>`
                  });

                  if (ownerResult.error) {
                    throw new Error("Resend failed: " + JSON.stringify(ownerResult.error));
                  }

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    status: 'success',
                    message: 'Thank you for contacting QuranRise. We have received your inquiry and sent a confirmation email to your inbox.'
                  }));

                } catch (err: any) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    status: 'error',
                    message: 'Serverless Mock API processing error: ' + err.message
                  }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
