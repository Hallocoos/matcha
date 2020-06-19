var nodemailer = require('nodemailer');
// import * from 'nodemailer';

export function sendNewUserEmail(data) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.emailUser,
      pass: process.env.emailPass
    }
  });
  var mailOptions = {
    from: process.env.emailUser,
    to: data.email,
    subject: 'Welcome to Matcha!',
    text: 'Your account has been created!'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return (error);
    }
    console.log('Mail sent: ' + info.response);
  });
}