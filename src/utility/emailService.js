import emailjs from "emailjs-com";

export const sendEmail = async (details) => {
  const emailResponse = await emailjs.send(
    process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
    process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
    details,
    process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
  );
  return emailResponse;
};
