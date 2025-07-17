import { transporter } from "../config/emailConfig.js";

export const seendEmail = async (userEmail, userName) => {
    try {
        const mailOption = {
            from: '"TicketApp" jhomelmedina2@gmail.com',
            to: userEmail,
            subject: 'Bienvenido a ticketApp',
            html: `
                <h1>¡Hola, ${userName}!</h1>
                <p>¡Gracias por registrarte en nuestra aplicación! Estamos emocionados de tenerte con nosotros.</p>
                <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                <br>
                <p>Saludos cordiales,</p>
                <p>El Equipo de Tu Aplicación</p>`
        };

        let info = await transporter.sendMail(mailOption)
        console.log('mensaje Enviado', info.messageId)

        return true;
    } catch (error) {
        console.error('error al enviar el email de registro', error)
        return false
    }
}