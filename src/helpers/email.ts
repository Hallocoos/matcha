import User from "../models/userModel";
var nodemailer = require('nodemailer');

export function sendNewUserEmail(data: User) {
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
    text: 'Your account has been created!\n' +
      'Please visit localhost:3000/verify/' + data.hash + ' to verify your account.'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error)
      return (error);
    console.log('Mail sent: ' + info.response);
  });
}

export function resetUserPassword(email, hash) {
  console.log(email, hash);
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
    to: email,
    subject: 'Password Reset Request',
    text: 'A password reset has been requested on this account!\n' +
      'Please visit localhost:3000/resetPassword/' + hash + ' to reset your password.'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error)
      return (error);
    console.log('Mail sent: ' + info.response);
  });
}