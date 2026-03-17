const { WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY" } = process.env;

const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const parseBody = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { success: false, message: "Method not allowed." });
  }

  if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
    return json(res, 500, {
      success: false,
      message: "WEB3FORMS_ACCESS_KEY is not configured on the server.",
    });
  }

  const requestBody = parseBody(req.body);
  const {
    name = "",
    email = "",
    company = "",
    message = "",
  } = requestBody;

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
    return json(res, 400, {
      success: false,
      message: "A valid email is required.",
    });
  }

  if (!payload.message || payload.message.length < 10) {
    return json(res, 400, {
      success: false,
      message: "Message must be at least 10 characters.",
    });
  }

  try {
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("company", payload.company);
    formData.append("message", payload.message);

    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const rawResponse = await web3formsResponse.text();
    let data = null;

    if (rawResponse) {
      try {
        data = JSON.parse(rawResponse);
      } catch {
        console.error("Web3Forms non-JSON response", {
          status: web3formsResponse.status,
          bodyPreview: rawResponse.slice(0, 300),
        });
        throw new Error("Web3Forms returned an invalid response.");
      }
    }

    if (!web3formsResponse.ok || !data?.success) {
      console.error("Web3Forms request failed", {
        status: web3formsResponse.status,
        response: data,
      });
      throw new Error(data?.message || "Web3Forms could not process the message.");
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
