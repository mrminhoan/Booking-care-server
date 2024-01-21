import doctorService from "../services/DoctorService";
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let postInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {

        let response = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getScheduleDoctorByDate = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let date = req.query.date;
        let response = await doctorService.getScheduleDoctorByDate(doctorId, date);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let response = await doctorService.getExtraInforDoctorById(doctorId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let response = await doctorService.getProfileDoctorById(doctorId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
let getListPatientForDoctor = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let date = req.query.date;
        let response = await doctorService.getListPatientForDoctor(doctorId, date);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let postSendRemedy = async (req, res) => {
    try {
        let response = await doctorService.postSendRemedy(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    postInfoDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    getListPatientForDoctor,
    postSendRemedy
}