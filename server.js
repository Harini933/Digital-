const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // To serve index.html

app.post('/submit', (req, res) => {
  const { name, class: studentClass, room, indate, outdate, email, reason } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harini8070@gmail.com',
      pass: 'sbdl qhpw xqou kapp'
    }
  });

  let mailOptions = {
    from: email,
    to: 'harini.m.csd.2023@gmail.com',
    subject: 'New Gatepass Request',
    text: `Name: ${name}\nClass: ${studentClass}\nRoom No: ${room}\nIn Date: ${indate}\nOut Date: ${outdate}\nEmail: ${email}\nReason: ${reason}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Gatepass request submitted successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use(bodyParser.urlencoded({ extended: true }));

// Serve form file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submit
app.post("/submit", (req, res) => {
  const { name, class: studentClass, room, inDate, outDate, email } = req.body;

  // Create email transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "'harini8070@gmail.com'", //  Change to your email
      pass: "sbdl qhpw xqou kapp",  //  Change to your app password
    },
  });

  // Prepare email message
  let mailOptions = {
    from: email,
    to: "harini.m.csd.2023@gmail.com", // Change to teacher's email
    subject: "Hostel Gatepass Request",
    text: `Name: ${name}\nClass: ${studentClass}\nRoom: ${room}\nIn Date: ${inDate}\nOut Date: ${outDate}\nStudent Email: ${email}`
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

// Start server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

