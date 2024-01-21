const db = require("../models/index");
require('dotenv').config();
const _ = require('lodash');
import { v4 as uuidv4 } from 'uuid';

import emailService from "./emailService"

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT_APP_LOCAL}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email
                || !data.doctorId
                || !data.timeType
                || !data.date
                || !data.fullName
                || !data.selectedGender
                || !data.address
            ) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing parameters"
                })
            } else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)

                })
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        address: data.address,
                        gender: data.selectedGender,
                        firstName: data.fullName
                    },
                })

                // Create A booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        },
                        defaults: {
                            statusId: 'S1',
                            patientId: user[0].id,
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        },
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save user succeed"
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameters"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Update the appointment succeed"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or doest not exist"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment
}