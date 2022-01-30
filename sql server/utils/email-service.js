require('dotenv').config();

const nodemailer = require('nodemailer');

module.exports = class Nodemailer {

  static transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, 
  auth: {
      user: process.env.NM_USERNAME, 
      pass: process.env.NM_PASSWORD, 
  },
  });


  static async sendMail(mailOptions) {
    await Nodemailer.transporter.sendMail(mailOptions,function (err,data) {
      if(err){
          console.log('Error occured',err);
      }
      else{
          console.log('Email sent');
      }
  })

  }

}


