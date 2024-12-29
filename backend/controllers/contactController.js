// const Contact = require("../models/Contact");
// const nodemailer = require("nodemailer");

// exports.saveContactForm = async (req, res) => {
//     const { name, email, subject, message } = req.body;

//     try {
//         const newContact = new Contact({ name, email, subject, message });
//         await newContact.save();

//         // Send email notification (optional)
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "your-email@gmail.com",
//                 pass: "your-email-password",
//             },
//         });

//         const mailOptions = {
//             from: email,
//             to: "your-email@gmail.com",
//             subject: Contact Form: ${subject},
//             text: Name: ${name}\nEmail: ${email}\nMessage: ${message},
//         };

//         transporter.sendMail(mailOptions, (err, info) => {
//             if (err) {
//                 console.error("Error sending email:", err);
//             } else {
//                 console.log("Email sent: " + info.response);
//             }
//         });

//         res.status(200).json({ message: "Message sent successfully!" });
//     } catch (error) {
//         console.error("Error saving contact:", error);
//         res.status(500).json({ message: "Error saving message", error });
//     }
// };