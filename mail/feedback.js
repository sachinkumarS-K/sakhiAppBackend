export const contactUsResponseFormat = (name) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Thank You for Contacting Us</title>
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
    
            .button {
                background: #007BFF;
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
                background: #0056b3;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="message">Thank You for Reaching Out!</div>
            <div class="body">
                <p>Hey <span class="highlight">${name}</span>,</p>
                <p>We appreciate you contacting us. Our support team has received your message and will get back to you as soon as possible.</p>
                <p>Meanwhile, feel free to browse our <a href="https://sakhi-app-frontend.vercel.app" class="highlight">Help Center</a> for quick answers.</p>
            </div>
            <div class="support">
                If you have any urgent concerns, please reach out to our support team.
            </div>
        </div>
    </body>
    </html>`;
};
