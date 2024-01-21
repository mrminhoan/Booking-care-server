const express = require("express")
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine")
const initWebRoutes = require("./route/web");
const connectDB = require("./config/connectDB");
const cors = require('cors');
require('dotenv').config();

let app = express();
// Fix Cors error
// app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, X-Requested-With");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
})

// Config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

connectDB();

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend NodeJs is running on port:" + port);
})