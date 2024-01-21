const nodemailer = require("nodemailer");
require('dotenv').config();

let sendSimpleEmail = async (dataSend) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const info = await transporter.sendMail({
            from: '"Bệnh viên nhân dân Gia Định" <minhhoangv190200@gmail.com>', // sender address
            to: dataSend.receiverEmail, // list of receivers
            subject: "THÔNG TIN ĐẶT LỊCH KHÁM BỆNH", // Subject line
            text: "Hello world?", // plain text body
            html: getBodyHTMLEmail(dataSend), // html body
        });
    } catch (error) {
        console.log(error)
    }
}

let getBodyHTMLEmail = (dataSend) => {
    try {
        let result = '';
        if (dataSend.language === 'vi') {
            result =
                `
                    <h3>Xin chào ${dataSend.receiverEmail}</h3>
                    <p>Bạn đã đặt lịch thành công</p>
                    <p>Thông tin lịch khám bệnh: </p>
                    <p><b>Thời gian: ${dataSend.time}</b></p>
                    <p><b>Bác sĩ: ${dataSend.doctorName}</b></p>
                    <p>Nếu thông tin trên chính xác. Bạn vui lòng truy cập vào đường link bên dưới để xác nhận. Hoặc nếu thông tin trên đang không chính xác, vui lòng liên hệ 0123456789</p>
                    <a href=${dataSend.redirectLink}>Click here</a>
                    <p>Xin chân thành cảm ơn</p>
                `
        }

        if (dataSend.language === 'en') {
            result =
                `
                <h3>Dear ${dataSend.receiverEmail}</h3>
                <p>You have successfully booked your appointment</p>
                <p>TMedical examination schedule information: </p>
                <p><b>Time: ${dataSend.time}</b></p>
                <p><b>Doctor: ${dataSend.doctorName}</b></p>
                <p>If the above information is correct. Please visit the link below to confirm. Or if the above information is incorrect, please contact us: 0123456789</p>
                <a href=${dataSend.redirectLink}>Click here</a>
                <p>Sincerely thank</p>
            `
        }
        return result
    } catch (error) {
        console.log(error)
        return ''
    }

}


let getBodyHTMLRemedy = (dataSend) => {
    try {
        let result = '';
        if (dataSend.language === 'vi') {
            // <h3>Xin chào ${dataSend.receiverEmail}</h3>
            result =
                `
                    <h3>Xin chào ${dataSend.patientName}</h3>
                    <p>Bạn đã đặt lịch thành công</p>
                    <p>Thông tin hóa đơn được gửi trong file đính kèm</p>

                    <p>Xin chân thành cảm ơn</p>
                `
        }

        if (dataSend.language === 'en') {
            // <h3>Dear ${dataSend.receiverEmail}</h3>
            result =
                `
                <h3>Dear ${dataSend.patientName}</h3>
                <p>Information sent in attachment</p>
                <p>Sincerely thank</p>
            `
        }
        return result
    } catch (error) {
        console.log(error)
        return ''
    }
}
let sendAttachment = (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const info = await transporter.sendMail({
                from: '"Bệnh viên nhân dân Gia Định" <minhhoangv190200@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh", // Subject line
                text: "Hello world?", // plain text body
                html: getBodyHTMLRemedy(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${dataSend}-${new Date().getTime()}.png`,
                        content: dataSend.imageBase64.split('base64,')[1],
                        encoding: 'base64'
                    }
                ]
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    })

}


module.exports = {
    sendSimpleEmail,
    sendAttachment
}