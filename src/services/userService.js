const db = require("../models/index");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        delete user.password
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User is not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in out system. Pls try other email`;
            }
            resolve(userData);
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: email } });

            if (user) {
                resolve(true);
            }
            else {

                resolve(false);
            }
        } catch (error) {
            reject(error)
        }
    })
}

let handleGetAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== "ALL") {
                users = db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error);
        }
    })
}

let hashUserPassword = (password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check email is exist

            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already used'
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.role,
                    phonenumber: data.phoneNumber,
                    positionId: data.position,
                    image: data.avatar
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                });
            }

        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundUser = await db.User.findOne({ where: { id: id } });
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't existed `
                })
            } else {
                await db.User.destroy({ where: { id: id } });
                resolve({
                    errCode: 0,
                    message: `The user is deleted`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.role || !data.gender || !data.position) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.role;
                user.positionId = data.position;
                user.gender = data.gender;
                user.phonenumber = data.phoneNumber;
                user.image = data.avatar;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update User succeeds'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User Not Found'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing require parameters"
                });
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });

                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            };


        } catch (error) {
            console.log("Get all code service error", error)
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin,
    handleGetAllUser,
    createNewUser,
    deleteUser,
    updateUserData,
    getAllCodeService
}