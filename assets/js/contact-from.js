// // // import nodemailer from "nodemailer";

// // // export async function handler(event, context) {
// // //   if (event.httpMethod !== "POST") {
// // //     return { statusCode: 405, body: "Method Not Allowed" };
// // //   }

// // //   const data = JSON.parse(event.body);
// // //   const { name, email, number, address, website, social, message } = data;

// // //   // configure mail transporter (use Gmail SMTP)
// // //   let transporter = nodemailer.createTransport({
// // //     service: "gmail",
// // //     auth: {
// // //       user: "contact.revoticai@gmail.com", // your email
// // //       pass: process.env.GMAIL_APP_PASSWORD, // app password (not normal login pwd)
// // //     },
// // //   });

// // //   // email options
// // //   let mailOptions = {
// // //     from: `"${name}" <${email}>`,
// // //     to: "contact.revoticai@gmail.com",
// // //     subject: `📩 New Contact Form Submission from ${name}`,
// // //     html: `
// // //       <h2>New Contact Form Submission</h2>
// // //       <p><strong>Name:</strong> ${name}</p>
// // //       <p><strong>Email:</strong> ${email}</p>
// // //       <p><strong>Phone:</strong> ${number}</p>
// // //       <p><strong>Address:</strong> ${address}</p>
// // //       <p><strong>Website:</strong> ${website}</p>
// // //       <p><strong>Social:</strong> ${social}</p>
// // //       <p><strong>Message:</strong><br>${message}</p>
// // //     `,
// // //   };

// // //   try {
// // //     await transporter.sendMail(mailOptions);
// // //     return { statusCode: 200, body: "✅ Message sent successfully!" };
// // //   } catch (error) {
// // //     return { statusCode: 500, body: `❌ Error: ${error.message}` };
// // //   }
// // // }


// // // netlify/functions/contact.js
// // const nodemailer = require("nodemailer");
// // const querystring = require("querystring");

// // // small helper to escape HTML
// // const escapeHtml = (s = "") =>
// //   String(s).replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[m]));

// // const transporter = nodemailer.createTransport({
// //   host: "smtp.gmail.com",
// //   port: 465,
// //   secure: true,
// //   auth: {
// //     user: process.env.GMAIL_USER,           // e.g. contact.revoticai@gmail.com
// //     pass: process.env.GMAIL_APP_PASSWORD,   // Gmail App Password (NOT your login pwd)
// //   },
// // });

// // exports.handler = async (event) => {
// //   // CORS + methods
// //   if (event.httpMethod === "OPTIONS") {
// //     return {
// //       statusCode: 200,
// //       headers: {
// //         "Access-Control-Allow-Origin": "*",
// //         "Access-Control-Allow-Methods": "POST,OPTIONS",
// //         "Access-Control-Allow-Headers": "Content-Type",
// //       },
// //       body: "",
// //     };
// //   }
// //   if (event.httpMethod !== "POST") {
// //     return { statusCode: 405, headers: { Allow: "POST, OPTIONS" }, body: "Method Not Allowed" };
// //   }

// //   // Parse body (JSON or form-encoded)
// //   let data = {};
// //   const ct = event.headers["content-type"] || event.headers["Content-Type"] || "";
// //   try {
// //     data = ct.includes("application/json")
// //       ? JSON.parse(event.body || "{}")
// //       : querystring.parse(event.body || "");
// //   } catch {
// //     return { statusCode: 400, body: "Bad Request" };
// //   }

// //   const clean = (x) => String(x || "").trim();
// //   const name    = clean(data.name);
// //   const email   = clean(data.email);
// //   const number  = clean(data.number);
// //   const address = clean(data.address);
// //   const website = clean(data.website);
// //   const social  = clean(data.social);
// //   const message = clean(data.message);
// //   const interests = Array.isArray(data.interests) ? data.interests : [];

// //   if (!name || !email || !message) {
// //     return {
// //       statusCode: 422,
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ ok: false, error: "Missing required fields (name, email, message)" }),
// //     };
// //   }

// //   const html = `
// //   <div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#111">
// //     <h2 style="margin:0 0 12px">New Contact Form Submission</h2>
// //     <p><strong>Name:</strong> ${escapeHtml(name)}</p>
// //     <p><strong>Email:</strong> ${escapeHtml(email)}</p>
// //     ${number  ? `<p><strong>Phone:</strong> ${escapeHtml(number)}</p>` : ""}
// //     ${address ? `<p><strong>Address:</strong> ${escapeHtml(address)}</p>` : ""}
// //     ${website ? `<p><strong>Website:</strong> ${escapeHtml(website)}</p>` : ""}
// //     ${social  ? `<p><strong>Social:</strong> ${escapeHtml(social)}</p>` : ""}
// //     ${interests.length ? `<p><strong>Interests:</strong> ${interests.map(escapeHtml).join(", ")}</p>` : ""}
// //     <hr style="margin:16px 0;border:none;border-top:1px solid #eee" />
// //     <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
// //   </div>`;

// //   const text = [
// //     `New Contact Form Submission`,
// //     `Name: ${name}`,
// //     `Email: ${email}`,
// //     number  ? `Phone: ${number}` : null,
// //     address ? `Address: ${address}` : null,
// //     website ? `Website: ${website}` : null,
// //     social  ? `Social: ${social}` : null,
// //     interests.length ? `Interests: ${interests.join(", ")}` : null,
// //     ``,
// //     message,
// //   ].filter(Boolean).join("\n");

// //   const mail = {
// //     from: `"Revotic AI Website" <${process.env.GMAIL_USER}>`,
// //     to: process.env.GMAIL_TO || process.env.GMAIL_USER, // default: send to your own inbox
// //     replyTo: email,                                      // reply goes to the sender
// //     subject: `📩 New Contact — ${name}`,
// //     text,
// //     html,
// //   };

// //   try {
// //     await transporter.sendMail(mail);
// //     return {
// //       statusCode: 200,
// //       headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
// //       body: JSON.stringify({ ok: true, message: "Message sent successfully." }),
// //     };
// //   } catch (err) {
// //     // Tip: check Netlify → Functions → Logs if you hit an error
// //     return {
// //       statusCode: 500,
// //       headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
// //       body: JSON.stringify({ ok: false, error: err.message }),
// //     };
// //   }
// // };


// // assets/js/contact-from.js
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("contact-form");
//   const chips = document.querySelectorAll(".tp-contact-category-btn");
//   const respEl = document.querySelector(".ajax-response");
//   const submitBtn = form.querySelector('button[type="submit"]');

//   // Make chips selectable
//   chips.forEach(chip => {
//     chip.style.cursor = "pointer";
//     chip.addEventListener("click", () => chip.classList.toggle("active"));
//   });

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const interests = Array.from(
//       document.querySelectorAll(".tp-contact-category-btn.active")
//     ).map(el => el.textContent.trim());

//     const payload = {
//       name:   (form.elements["name"]?.value || "").trim(),
//       email:  (form.elements["email"]?.value || "").trim(),
//       number: (form.elements["number"]?.value || "").trim(),
//       address:(form.elements["address"]?.value || "").trim(),
//       website:(form.elements["website"]?.value || "").trim(),
//       social: (form.elements["social"]?.value || "").trim(),
//       message:(form.elements["message"]?.value || "").trim(),
//       interests
//     };

//     if (!payload.name || !payload.email || !payload.message) {
//       respEl.textContent = "Please fill name, email, and message.";
//       return;
//     }

//     submitBtn.disabled = true;
//     respEl.textContent = "Sending...";

//     try {
//       const r = await fetch("/.netlify/functions/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const data = await r.json().catch(() => ({}));

//       if (r.ok && data.ok !== false) {
//         respEl.textContent = "✅ Thank you! Your message has been sent.";
//         form.reset();
//         document.querySelectorAll(".tp-contact-category-btn.active")
//           .forEach(el => el.classList.remove("active"));
//       } else {
//         respEl.textContent = "❌ " + (data.error || "Failed to send. Please try again.");
//       }
//     } catch (err) {
//       respEl.textContent = "❌ Network error. Please try again.";
//     } finally {
//       submitBtn.disabled = false;
//     }
//   });
// });


// assets/js/contact-from.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const respEl = document.querySelector(".ajax-response");
  const chips = document.querySelectorAll(".tp-contact-category-btn");
  const submitBtn = form.querySelector('button[type="submit"]');

  // Make chips selectable
  chips.forEach(chip => {
    chip.style.cursor = "pointer";
    chip.addEventListener("click", () => chip.classList.toggle("active"));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    respEl.textContent = "";

    const payload = {
      name:   (form.elements["name"]?.value || "").trim(),
      email:  (form.elements["email"]?.value || "").trim(),
      number: (form.elements["number"]?.value || "").trim(),
      address:(form.elements["address"]?.value || "").trim(),
      topic:  (form.elements["topic"]?.value || "").trim(),
      social: (form.elements["social"]?.value || "").trim(),
      message:(form.elements["message"]?.value || "").trim(),
      interests: Array.from(document.querySelectorAll(".tp-contact-category-btn.active")).map(x => x.textContent.trim())
    };

    if (!payload.name || !payload.email || !payload.message) {
      respEl.textContent = "Please complete name, email and message fields.";
      return;
    }

    // Determine endpoint:
    // if window.REVOTIC_BACKEND is set use it (local testing), otherwise use relative path '/contact-form' (same origin for production).
    const base = (window.REVOTIC_BACKEND || "").replace(/\/$/, "");
    const endpoint = (base || "") + "/contact-form";

    submitBtn.disabled = true;
    respEl.textContent = "Sending...";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        respEl.textContent = "Your Message Send Successfuly...";
        form.reset();
        document.querySelectorAll(".tp-contact-category-btn.active").forEach(c => c.classList.remove("active"));
      } else {
        respEl.textContent = "Failed to send. " + (json.error || res.statusText || "Try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      respEl.textContent = "Opps! try again...";
    } finally {
      submitBtn.disabled = false;
    }
  });
});
