declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

/**
 * Tracks a successful lead form submission to Google Tag Manager via the dataLayer.
 * Fired only after successful validation and storage/submitting of the lead.
 *
 * @param formData Record containing the user-provided form fields
 */
export const trackLeadSubmission = (
  formData: Record<string, any>
) => {
  // Ensure window.dataLayer is initialized safely
  window.dataLayer = window.dataLayer || [];

  // Construct structured tracking payload gracefully omitting missing fields
  window.dataLayer.push({
    event: "lead_form_submit",
    name: formData.name || formData.fullName || "",
    email: formData.email || "",
    phone: formData.phone || "",
    country: formData.country || "",
    city: formData.city || "",
    plan: formData.plan || "",
    gender: formData.gender || "",
    age: formData.age || "",
    course: formData.course || formData.courseInterest || "",
    message: formData.message || "",
    submission_time: new Date().toISOString()
  });

  console.log("Successfully pushed 'lead_form_submit' to GTM dataLayer:", {
    name: formData.name || formData.fullName || "",
    email: formData.email || "",
    course: formData.course || formData.courseInterest || ""
  });
};
