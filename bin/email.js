const nodemailer = require('nodemailer');
const user = "ecommercepwa1@gmail.com";
const password = "123456xD"


const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : user ,
        pass : password
    },
    tls : {
        rejectUnautorized : false
    }
});

module.exports = transporter;

// ecommercepwa1@gmail.com
//123456xD