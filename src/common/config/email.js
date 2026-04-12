import { Resend } from "resend";
import ApiError from "../utils/api-error.js";

const resend = new Resend("re_h7yaTQi2_6gwZtKBifq1dv7w3ZbfBQVbj");

const verifyEmail = async ({ sendTo, subject, html }) => {
  try {
    // const { data  , error} = await resend.batch.send([
    //   {
    //     from: 'Acme <onboarding@resend.dev>',
    //     to: sendTo,
    //     subject: subject,
    //     html: html,
    //   },
    // ]);
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["tanvirislam9425@gmail.com"],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw ApiError.serviceUnavailable("Failed to send email via Resend");
    }

    return data;
  } catch (error) {
    console.error("Email Sending Catch Error:", error);
    throw ApiError.serviceUnavailable("Email service is currently down");
  }
};

export default verifyEmail;
