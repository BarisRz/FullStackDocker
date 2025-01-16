const generateHtmlContent = (type, username = "default", token) => {
  if (type === "emailConfirmation") {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #333333;
        }
        p {
          color: #555555;
          line-height: 1.5;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .button:link, .button:visited {
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>Bienvenue, ${username} !</h1>
        <p>Merci de vous être inscrit. Veuillez vérifier votre adresse e-mail en cliquant sur le lien ci-dessous (expire dans 15 minutes) :</p>
        <a href=${`${process.env.FRONTEND_URL}/verify-email?token=${token}`} class="button">Vérifier mon e-mail</a>
        <p>Si vous ne parvenez pas à cliquer sur le bouton, utilisez ce lien :</p>
        <p><a href=${`${process.env.FRONTEND_URL}/verify-email?token=${token}`}>${`${process.env.FRONTEND_URL}/verify-email?token=${token}`}</a></p>
        <p>Merci,</p>
        <p>Lorga</p>
        <p>Ce site a été créé dans le cadre d'un projet personnel pour m'entraîner et améliorer mes compétences en développement web. Bien que j'ai pris soin de respecter les normes de sécurité et de confidentialité, il est important de noter que ce site est destiné à des fins d'apprentissage uniquement.
    
        Veuillez ne pas divulguer d'informations sensibles ou confidentielles lors de son utilisation. Merci de votre compréhension et de votre coopération ! 😊</p>
      </div>
    </body>
    </html>
    `;
  } else {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #333333;
        }
        p {
          color: #555555;
          line-height: 1.5;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .button:link, .button:visited {
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h1>Ne partagez pas le lien!</h1>
        <p>Veuillez réinitialiser votre adresse mot de passe en cliquant sur le lien ci-dessous (expire dans 15 minutes) :</p>
        <a href=${`${process.env.FRONTEND_URL}/reset-password?token=${token}`} class="button">Changer mon mot de passe</a>
        <p>Si vous ne parvenez pas à cliquer sur le bouton, utilisez ce lien :</p>
        <p><a href=${`${process.env.FRONTEND_URL}/reset-password?token=${token}`}>${`${process.env.FRONTEND_URL}/reset-password?token=${token}`}</a></p>
        <p>Lorga</p>
        <p>Ce site a été créé dans le cadre d'un projet personnel pour m'entraîner et améliorer mes compétences en développement web. Bien que j'ai pris soin de respecter les normes de sécurité et de confidentialité, il est important de noter que ce site est destiné à des fins d'apprentissage uniquement.
    
        Veuillez ne pas divulguer d'informations sensibles ou confidentielles lors de son utilisation. Merci de votre compréhension et de votre coopération ! 😊</p>
      </div>
    </body>
    </html>
    `;
  }
};

module.exports = generateHtmlContent;
