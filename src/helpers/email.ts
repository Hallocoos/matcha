var nodemailer = require('nodemailer');

export async function sendNewUserEmail(data) {
  var transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env["EMAILUSER"],
      pass: process.env["EMAILPASS"]
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  var mailOptions = await {
    from: process.env["EMAILUSER"],
    to: data.email,
    subject: 'Welcome to Matcha!',
    text: 'Your account has been created!\n' +
      'Please visit localhost:3000/matcha?verify=' + data.hash + ' to verify your account.'
  };
  return await transporter.sendMail(mailOptions, async function (error, info) {
    if (error)
      return (false);
    await console.log('Mail sent: ' + info.response);
    return (true);
  });
}

export async function resetUserPassword(email, hash) {
  var transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env["EMAILUSER"],
      pass: process.env["EMAILPASS"]
    },
    logger: true,
    debug: true
  });
  var mailOptions = {
    from: process.env["EMAILUSER"],
    // to: email,
    to: "jordanrheeder@gmail.com",
    subject: 'Password Reset Request',
    text: 'A password reset has been requested on this account!\n' +
      'Please visit localhost:3000/matcha?reset=' + hash + ' to reset your password.'
  };
  return await transporter.sendMail(mailOptions, async function (error, info) {
    if (error)
      return (false);
    await console.log('Mail sent: ' + info.response);
    return (true);
  });
}

export function reportUser(data) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env["EMAILUSER"],
      pass: process.env["EMAILPASS"]
    }, logger: true,
    debug: true,
    tls: {
      rejectUnauthorized: false
    }
  });
  var mailOptions = {
    from: process.env["EMAILUSER"],
    to: data.email,
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