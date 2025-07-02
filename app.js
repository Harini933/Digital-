const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // To serve index.html

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
  const { name, class: studentClass, room, indate, outdate, email, reason } = req.body;

  // Create email transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "harini8070@gmail.com", // your email
      pass: "sbdl qhpw xqou kapp"    // your app password
    }
  });

  // Prepare email message
  let mailOptions = {
    from: email,
    to: "harini.m.csd.2023@gmail.com", // teacher's email
    subject: "Hostel Gatepass Request",
    text: `Name: ${name}\nClass: ${studentClass}\nRoom: ${room}\nIn Date: ${indate}\nOut Date: ${outdate}\nEmail: ${email}\nReason: ${reason}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Gatepass request sent successfully!");
    }
  });
});

// Only one app.listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
