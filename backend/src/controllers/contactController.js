const nodemailer = require('nodemailer')

// Enviar mensaje a Email (kinesiologo)
const sendMessageController = async (user) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'fisiosport28@gmail.com',
            pass: process.env.pass,
        },
    });

    const mailOptions = {
        from: 'FisioSport <fisiosport28@gmail.com>',
        to: 'marianxtorres@gmail.com', // CAMBIARLO POR EL DEL KINESIOLOG
        subject: `¡Alguien se quiere poner en contacto contigo!`,
        html: `
        <html>
        <head>
    <style>
        body {
            width: 90%;
            padding: 0;
            margin: 0 ;
        }

    #containerEmail {
        width: 90%;
        background-color: #447DBF;
        padding: 20px;
        margin: 0 auto;
        
    }
    

    
    #logo {
        background-color: #0a488f;
        width: 100%;
        height: 150px;
        border-radius: 10px;
        margin: auto;
        padding-top: 5%;
    }
    
    #logo img {
        width: 60%;
        height: 100px;
        
    }
    
    #content {
        background-color: white;
        width: 100%;
        text-align: left;
        border-radius: 10px;
        margin-top: 10px;
        padding: 20px;
        box-sizing: border-box;
    }
    
    #content p {
        font-size: 15px;
        margin: 0;
        margin-bottom: 4px;
    }
    
    #content p strong {
        color: #0a488f;
    }
    </style>
</head>
<body>
            
            <div id="containerEmail">
                

                    <div id="logo">
                        <img src="https://res.cloudinary.com/djdqwkavb/image/upload/v1701916319/logo_uvqziq.png" />
                    </div>

                    <div id="content">
                        <p>¡Hola Christian!</p>
                        <p>Te han contactado a través de la sección de contacto de la FisioSport.</p>
                        <p>Aquí están los detalles:</p>
                        <p><strong>Nombre:</strong> </p>
                        <p>${user.name + ' ' + user.lastname}</p>
                        <p><strong>Email:</strong> </p>
                        <p>${user.email}</p>
                        <p><strong>Mensaje:</strong></p>
                        <p>${user.asunto}</p>
                    </div>
               

            </div>
            </body>
            </html>`


    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo al cliente:', error);
    }
}

module.exports = {
    sendMessageController
}