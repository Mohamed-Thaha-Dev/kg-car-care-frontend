export type WhatsAppEnquiryData = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
};

const WHATSAPP_NUMBER = "919751003567";

export function sendWhatsAppEnquiry({
  name,
  phone,
  email,
  service,
  message,
}: WhatsAppEnquiryData) {
  const whatsappMessage = `
*KG CAR SERVICE — NEW ENQUIRY*

━━━━━━━━━━━━━━━━━━━━
*CUSTOMER DETAILS* :

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
━━━━━━━━━━━━━━━━━━━━
*SERVICE REQUIRED* :

${service}
━━━━━━━━━━━━━━━━━━━━
*CUSTOMER ENQUIRY* :

${message}
━━━━━━━━━━━━━━━━━━━━
*KG Car Service*
Sent from website enquiry form
  `.trim();

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=` +
    encodeURIComponent(whatsappMessage);

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}