export const resetPasswordFormat = (name, email, otp) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Reset OTP</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }

            .message {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .otp-box {
                display: inline-block;
                background-color: #f5f5f5;
                padding: 15px 30px;
                border-radius: 8px;
                font-size: 24px;
                font-weight: bold;
                letter-spacing: 6px;
                margin-top: 10px;
            }

            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }

            .highlight {
                font-weight: bold;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="message">Password Reset OTP</div>
            <div class="body">
                <p>Hey <span class="highlight">${name}</span>,</p>
                <p>You requested to reset the password for your account: <span class="highlight">${email}</span>.</p>
                <p>Use the OTP below to reset your password:</p>
                
                <div class="otp-box">${otp}</div>

                <p>This OTP is valid for a limited time. Do not share it with anyone.</p>
                <p>If you didn’t request a password reset, you can safely ignore this email.</p>
            </div>
            <div class="support">
                Need help? Contact our support team.
            </div>
        </div>
    </body>
    </html>`;
};
