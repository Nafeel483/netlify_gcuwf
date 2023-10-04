const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: 'nafii1241@gmail.com',
    pass: 'Nafeel1122@'
  }
});
const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: "template",
    layoutsDir: "template",
    defaultLayout: "campaign.hbs"
  },
  viewPath: "template",
  extName: ".hbs"
};
transporter.use("compile", hbs(handlebarOptions));
const sendEmail = async (id, recieverEmail) => {
  try {
    const mailOptions = {
      to: recieverEmail,
      from: process.env.FROM_EMAIL,
      subject: "Apply Successfully",
      template: "campaign",
      context: {
        id: id
      }
    };
    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (err) {
    console.log("The Email Error", err)
    return false;
  }
};

module.exports = {
  sendEmail
};
