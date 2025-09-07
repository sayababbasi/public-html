// const nodemailer = require("nodemailer");

// exports.handler = async (event) => {
//   try {
//     const { name, email, message } = JSON.parse(event.body);

//     let transporter = nodemailer.createTransport({
//     //   host: process.env.SMTP_HOST,
//     //   port: process.env.SMTP_PORT,
//     //   secure: false,
//     //   auth: {
//     //     user: process.env.SMTP_USER,
//     //     pass: process.env.SMTP_PASS,
//     //   },


//       host: smtp.gmail.com,
//        port: process.env.SMTP_PORT,
//       secure: false,
//       auth: {
//         user: "contact.revoticai@gmail.com",
//         pass: "pmqr ldra ztqs ezho",
//       },
//     });

//     await transporter.sendMail({
//       from: `"${name}" <${email}>`,
//       to: process.env.SMTP_USER,
//       subject: "New Contact Form Submission",
//       text: message,
//       html: `
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Message:</b> ${message}</p>
//       `,
//     });

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ success: true, message: "Message sent!" }),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ success: false, error: error.message }),
//     };
//   }
// };

const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_USER,
      subject: "New Contact Form Submission",
      text: message,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Message sent!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
