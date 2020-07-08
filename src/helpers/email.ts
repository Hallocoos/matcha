var nodemailer = require('nodemailer');

export function sendNewUserEmail(data) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env["EMAILUSER"],
      pass: process.env["EMAILPASS"]
    }
  });
  var mailOptions = {
    from: process.env["EMAILUSER"],
    to: data.email,
    subject: 'Welcome to Matcha!',
    text: 'Your account has been created!\n' +
      'Please visit localhost:3000/matcha?verify=' + data.hash + ' to verify your account.'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error)
      return (error);
    console.log('Mail sent: ' + info.response);
  });
}

export function resetUserPassword(email, hash) {
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
      'Please visit localhost:3000/matcha?reset=' + hash + ' to reset your password.'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error)
      return (error);
    console.log('Mail sent: ' + info.response);
  });
}