import { createClient } from "@supabase/supabase-js";

const {
  SUPABASE_URL = "YOUR_SUPABASE_URL",
  SUPABASE_SERVICE_ROLE_KEY = "YOUR_SUPABASE_SERVICE_ROLE_KEY",
  RESEND_API_KEY = "YOUR_RESEND_API_KEY",
  CONTACT_FROM_EMAIL = "onboarding@resend.dev",
  CONTACT_TO_EMAIL = "findmydevice1731@gmail.com",
} = process.env;

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { success: false, message: "Method not allowed." });
  }

  if (
    SUPABASE_URL === "YOUR_SUPABASE_URL" ||
    SUPABASE_SERVICE_ROLE_KEY === "YOUR_SUPABASE_SERVICE_ROLE_KEY" ||
    RESEND_API_KEY === "YOUR_RESEND_API_KEY"
  ) {
    return json(res, 500, {
      success: false,
      message: "Server environment variables are not configured.",
    });
  }

  const { name = "", email = "", company = "", message = "" } = req.body ?? {};

  const payload = {
    name: String(name).trim(),
    email: String(email).trim(),
    company: String(company).trim(),
    message: String(message).trim(),
  };

  if (!payload.name) {
    return json(res, 400, { success: false, message: "Name is required." });
  }

  if (!payload.email || !validateEmail(payload.email)) {
    return json(res, 400, { success: false, message: "A valid email is required." });
  }

  if (!payload.message || payload.message.length < 10) {
    return json(res, 400, {
      success: false,
      message: "Message must be at least 10 characters.",
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  try {
    const { error: insertError } = await supabase.from("contacts").insert([payload]);

    if (insertError) {
      throw new Error(insertError.message || "Failed to save contact.");
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: payload.email,
        subject: `New contact form submission from ${payload.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Company:</strong> ${payload.company || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p>${payload.message}</p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.json().catch(() => null);
      throw new Error(
        resendError?.message ||
          resendError?.error ||
          "Saved the contact, but failed to send the email.",
      );
    }

    return json(res, 200, {
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    return json(res, 500, {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message.",
    });
  }
}
