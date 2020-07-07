var nodemailer = require('nodemailer');

export async function sendNewUserEmail(data) {
  var transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.emailUser,
      pass: process.env.emailPass
    },
    logger: true,
    debug: true,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
  var mailOptions = await {
    from: process.env.emailUser,
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
      user: process.env.emailUser,
      pass: process.env.emailPass
    },
    logger: true,
    debug: true,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
  var mailOptions = {
    from: process.env.emailUser,
    to: email,
    subject: 'Password Reset Request',
    text: 'A password reset has been requested on this account!\n' +
      'Please visit localhost:3000/matcha?reset=' + hash + ' to reset your password.'
  };
  console.log(transporter);
  return await transporter.sendMail(mailOptions, async function (error, info) {
    if (error)
      return (false);
    await console.log('Mail sent: ' + info.response);
    return (true);
  });
}