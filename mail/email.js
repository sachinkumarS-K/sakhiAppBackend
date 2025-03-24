export const resetPasswordFormat = (name, email, url) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
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
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }

            /* Fixing button styling */
            .button {
                background: #FF4742;
                border: none;
                border-radius: 6px;
                padding: 12px 20px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                display: inline-block;
                margin-top: 10px;
            }

            .button a {
                color: white;
                text-decoration: none;
                font-family: Arial, sans-serif;
            }

            .button:hover {
                background: #e03d36;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="message">Password Reset Request</div>
            <div class="body">
                <p>Hey <span class="highlight">${name}</span>,</p>
                <p>You requested to reset the password for your account: <span class="highlight">${email}</span>.</p>
                <p>Click the button below to reset your password:</p>
                
                <a class="button" href="${url}">Reset Password</a>
                
                <p>If you did not request this change, please ignore this email or contact us immediately.</p>
            </div>
            <div class="support">
                If you have any questions, feel free to reach out. We are here to help!
            </div>
        </div>
    </body>
    </html>`;
};
