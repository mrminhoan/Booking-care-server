const db = require("../models/index");
const CRUDServices = require("../services/CRUDServices");
const { createNewUser } = require("../services/CRUDServices")
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', { data: JSON.stringify(data) })
    } catch (error) {
        console.log(error)
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await createNewUser(req.body);
    console.log({ message })
    return res.send('Post crud from server')
}

let displayGetCURD = async (req, res) => {
    let users = await CRUDServices.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: users
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId);
        return res.render('editCRUD.ejs', { userData })
    } else {
        return res.send("User Not Found")
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDServices.updateUserData(data);
    return res.render('displayCRUD.ejs', { dataTable: allUser });
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if(id){
        await CRUDServices.deleteUserById(id);
        return res.send("Delete user successfully");
    }else{
        return res.send("User Not Found");
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCURD: displayGetCURD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}