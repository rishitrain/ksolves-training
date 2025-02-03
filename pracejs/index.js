require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const ejs = require("ejs");  
const path = require("path");
const cron = require("node-cron");   

const app = express();
app.use(express.json());  

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,  
    },
});

 cron.schedule("50 15 * * *", async () => {
    try {
         const to = "pranavchaurasia1812@gmail.com";
        const subject = "Daily Email";
        const name = "User";

        const templatePath = path.join(__dirname, "views", "emailTemplate.ejs");
        
        if (typeof templatePath !== "string") {
            throw new Error("Invalid template path");
        }

        const emailHTML = await ejs.renderFile(templatePath, { name });

        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            html: emailHTML
        };

        await transporter.sendMail(mailOptions);
        console.log("Daily email sent successfully!");
    } catch (error) {
        console.error("Error sending cron email:", error);
    }
});

app.post("/sendemail", async (req, res) => {
    const { to, subject, name } = req.body;

    if (!to || !subject || !name) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const templatePath = path.join(__dirname, "views", "emailTemplate.ejs");
        
        if (typeof templatePath !== "string") {
            throw new Error("Invalid template path");
        }

        const emailHTML = await ejs.renderFile(templatePath, { name });

        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            html: emailHTML
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: "Email sent successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
