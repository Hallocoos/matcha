var nodemailer = require('nodemailer');

export function sendNewUserEmail(data) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env["EMAILUSER "],
      pass: process.env["EMAILPASS "]
    }
  });
  var mailOptions = {
    from: process.env["EMAILUSER "],
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
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env["EMAILUSER "],
      pass: process.env["EMAILPASS "]
    }
  });
  var mailOptions = {
    from: process.env["EMAILUSER "],
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

export function reportUser(data) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env["EMAILUSER "],
      pass: process.env["EMAILPASS "]
    }, logger: true,
    debug: true,
    tls: {
      rejectUnauthorized: false
    }
  });
  var mailOptions = {
    from: process.env["EMAILUSER "],
    to: "jordanrheeder@gmail.com",
    subject: 'Report user ' + data.email,
    text: 'Terminate this account\n' +
        'Please visit http://localhost:3000/terminate/' + data.hash + ' to kill the account.'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      return (error);
    }
    console.log("Mail sent: " + info.response);
  });
}