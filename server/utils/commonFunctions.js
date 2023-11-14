const generateRandomCode = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

const generateVerificationCodeEmail = (verificationCode) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        padding: 20px;
        }

        .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
        color: #007BFF;
        }

        p {
        line-height: 1.6;
        }

        .verification-code {
        font-size: 24px;
        font-weight: bold;
        color: #28a745;
        }

        footer {
        margin-top: 20px;
        text-align: center;
        color: #777;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h2>Password Reset</h2>
        <p>Your password reset verification code is:</p>
        <p class="verification-code">${verificationCode}</p>
        <footer>
        <p>This email was sent as part of a password reset request. If you did not request this, please ignore this email.</p>
        </footer>
    </div>
    </body>
    </html>
  `;
};

const generateVerifyRegistrationEmail = (token) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          padding: 20px;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h2 {
          color: #007BFF;
        }
    
        p {
          line-height: 1.6;
        }
    
        a {
          color: #007BFF;
        }
    
        footer {
          margin-top: 20px;
          text-align: center;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Password Reset</h2>
        <p>Click <a href="${process.env.APP_HOST}/change-password?token=${token}" target="_blank">here</a> to reset your password.</p>
        <footer>
          <p>This link will expire after a certain period for security reasons.</p>
        </footer>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  generateRandomCode,
  generateVerificationCodeEmail,
  generateVerifyRegistrationEmail,
};