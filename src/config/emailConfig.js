import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'jhomelmedina2@gmail.com',
        pass: 'lwqa xbml liok yzvw'
    },
});

transporter.verify().then(() => {
    console.log("Listo para enviar emails")
})
