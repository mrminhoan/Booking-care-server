const express = require("express")

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs")
    // Config nơi để lấy các file giao diện. Lấy trong thư mục views
    app.set("views", "./src/views");
};

module.exports = configViewEngine;