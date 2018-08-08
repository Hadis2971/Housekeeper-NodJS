const express = require("express"),
      router = express.Router(),
      nodemailer = require("nodemailer");


router.get("/send", (req, res) => {
    res.render("emailSender");
});      

router.post("/send", (req, res) => {
    const output = ` 
    <h3>Email Send From: ${req.body.recipientsEmail}</h3>
    <h3>Message:</h3>
    <p>${req.body.emailMsg}</p>
    `

    let transporter = nodemailer.createTransport({
        /*'smtp.gmail.com' / 'hotmail'*/
        host: "",
        port: 465,
        secure: true,
        auth: {
            user: "",
            pass: ""
        },
        tls: {
            rejectUnauthorized:false
        }
    });

    
    let mailOptions = {
        from: '"" <>',
        to: '',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: output 
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render("emailSender", {msg: "Email has been sent!!!"});
    });
});

module.exports = router;


