# QuranRise - Google Sheets Form Setup & Hostinger Migration Guide

This project is now configured as a **100% Serverless, Static Website**. You do not need any persistent Node.js, Express, or Vercel server. It compiles down to standard static files (HTML, JS, CSS) that can be easily uploaded directly to **Hostinger Premium Web Hosting**.

At the same time, all student sign-up forms push data automatically to a **Google Spreadsheet** which appends rows and immediately triggers custom email alerts using Google's built-in cloud automation.

---

## 🚀 Part 1: How to Set Up Your Google Spreadsheet & Apps Script (2 Minutes)

1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Set the sheet name to **QuranRise Leads** (or anything you prefer).
3. In the top menu, go to **Extensions** -> **Apps Script**.
4. Delete any code in the editor, and paste the following complete script:

```javascript
/**
 * QuranRise Google Sheets Automation Script
 * Receives form POST inquiries, appends to Spreadsheet, and sends email alerts.
 */

function doPost(e) {
  var origin = "*";
  var headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  // Handle preflight CORS requests gracefully
  if (e.parameter.options === "true") {
    return ContentService.createTextOutput("")
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeaders(headers);
  }

  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // 1. Log submission values and check honeypot security
    if (data.website || data.botField) {
      console.warn("Spam Bot Intercepted!");
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Thank you for contacting QuranRise."
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
    }

    // 2. Open active sheet and write submission data
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Student Name", "Email", "Phone Number", "Country", "Course Selected", "Custom Message"]);
    }

    sheet.appendRow([
      new Date().toLocaleString(),
      data.fullName || "Not Provided",
      data.email || "Not Provided",
      data.phone || "Not Provided",
      data.country || "Not Specified",
      data.courseInterest || "Noorani Qaida",
      data.message || "None"
    ]);

    // 3. Email Alert to School Administrator (Spreadsheet Owner)
    var schoolOwnerEmail = Session.getActiveUser().getEmail(); // Auto-detects your Google Email
    var adminSubject = "🔔 New QuranRise Student Lead: " + (data.fullName || "Ahmad");
    var adminHtml = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ECECE6; border-radius: 8px; max-width: 600px; color: #0A1A14;">
        <h2 style="color: #C8A24A; border-bottom: 2px solid #C8A24A; padding-bottom: 8px;">New Trial Class Inquiry received!</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email Address:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone / WhatsApp:</strong> ${data.phone}</p>
        <p><strong>Country:</strong> ${data.country}</p>
        <p><strong>Course Intended:</strong> ${data.courseInterest}</p>
        <p><strong>Student Message:</strong><br><label style="font-style: italic; color: #526B62;">"${data.message}"</label></p>
        <hr style="border: 0; border-top: 1px dashed #A6C0B5; margin: 20px 0;">
        <p style="font-size: 11px; color: #8A6B20;">This submission has been saved directly to your Google Spreadsheet calendar log.</p>
      </div>
    `;

    MailApp.sendEmail({
      to: schoolOwnerEmail,
      subject: adminSubject,
      htmlBody: adminHtml
    });

    // 4. Confirmation Email to the Student
    if (data.email && !data.email.endsWith("@quranrise-trial.com")) {
      var studentSubject = "Assalamu Alaikum! Your Free Quran Session request at QuranRise";
      var studentHtml = `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #ECECE6; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0A1A14; padding: 25px; text-align: center; color: #D8BB72;">
            <h1 style="margin: 0; font-size: 24px;">QuranRise Academy</h1>
            <p style="margin: 5px 0 0 0; font-size: 11px; color: #89A296; text-transform: uppercase;">Learn Arabic & Tajweed Online</p>
          </div>
          <div style="padding: 25px; color: #153428;">
            <p>Assalamu Alaikum <strong>${data.fullName}</strong>,</p>
            <p>Thank you for booking a trial Quran lecture. Our administrator will message you on WhatsApp or Email within 2 to 4 hours to arrange your placement evaluation.</p>
            <p>We look forward to embarking on this beautiful journey of learning with you!</p>
            <br>
            <p>Wassalam,<br><strong>QuranRise Tutors team</strong></p>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: data.email,
        subject: studentSubject,
        htmlBody: studentHtml
      });
    }

    var output = { status: "success", message: "Inquiry automated successfully!" };
    return ContentService.createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);

  } catch (error) {
    var errorOutput = { status: "error", message: error.toString() };
    return ContentService.createTextOutput(JSON.stringify(errorOutput))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "Sheet API is Active!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Click **Save** (disk icon) in the Apps Script menu.
6. Click **Deploy** -> **New Deployment**.
7. Under "Select type", click the **Gear icon** and choose **Web app**.
8. Configure:
   - **Description**: QuranRise Leads API
   - **Execute as**: **Me** (your Gmail address)
   - **Who has access**: **Anyone** (this is critical so the React website forms can send POST requests).
9. Click **Deploy**.
10. Google will ask you to authorize permissions. Click **Authorize access**, choose your Gmail account, click **Advanced** -> **Go to Untitled project (unsafe)**, and grant the permissions.
11. **Copy the "Web app URL"** displayed at the end. It looks like:
    `https://script.google.com/macros/s/AKfycbz.../exec`

---

## 🛠️ Part 2: Update Your Environment Variables

Once you have your Google web app URL:

1. Create or edit a `.env` file in your project root.
2. Define the pointing endpoint like this:
   ```env
   VITE_API_URL=https://script.google.com/macros/s/AKfycbz.../exec
   ```
*(Note: If `VITE_API_URL` is kept empty, the website runs in an elegant local Sandbox Simulation mode. It stores leads locally in the browser cache so you can test submissions seamlessly offline!)*

---

## 📦 Part 3: Deploy to Hostinger Premium Hosting

Because the website now compiles into simple, static files, deploying to Hostinger is incredibly easy:

### Method A: Build and Drag-and-Drop (Easiest)
1. Run the build command in your terminal to compile the code:
   ```bash
   npm run build
   ```
2. This creates a directory named `dist/` containing your production static build.
3. Log in to your **Hostinger hPanel**.
4. Go to **File Manager** for your domain name.
5. Navigate to the `public_html` directory.
6. **Drag and drop** the contents of the `dist/` folder directly inside `public_html`.
7. Your QuranRise website is now live!

### Method B: Git Integration (Automatic)
1. Commit and push your code to a repository on GitHub, GitLab, or Bitbucket.
2. In your **Hostinger hPanel**, go to the **Git** section under your website.
3. Link your Repository URL and branch (e.g., `main`).
4. Set the build to pull automatically. Your applet is ready to run.

---

## 🧼 Part 4: Cleaned-up Dependencies
We cleaned up the following unnecessary tools and backends from your `package.json` to keep your hosting fast and clutter-free:
- **Express / @types/express**: Removed entirely as no central node server is hosted anymore.
- **Resend**: Removed as Google Apps Script uses Google's secure built-in mail delivery network for free.
- **esbuild / tsx**: Removed as backend JavaScript bundlers are no longer required.
