const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const constant = require("../config/constants");

/**
 * 
 * {
 *  template: "",
 *  to:"",
 * subject: "",
 * data: {},
 * attachment: []
 * }
 * 
 * SOCIAL_REGSITER: "socialregister.html",
 * 
 * 
 */
module.exports = {
  async send(from, to, subject, text, html, template, context, attachments) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: constant.SMTP.HOST,
      port: constant.SMTP.PORT,
      secure: constant.SMTP.SECURE,
      auth: {
        user: constant.SMTP.USERNAME,
        pass: constant.SMTP.PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      },
      sendMail: true
    });
    var options = {
      viewEngine: {
        extname: '.html', // handlebars extension
        partialsDir: 'views/email/partials', // location of your subtemplates aka. header, footer etc
        layoutsDir: 'views/email/layout', // location of handlebars templates
        defaultLayout: 'main.html', // name of main template
      },
      viewPath: 'views/email',
      extName: '.html'
    };
    transporter.use('compile', hbs(options));
    var message = {
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
      attachments: attachments,
      template: template,
      context: context
    };
    let sent = await transporter.sendMail(message);
    return sent.accepted.length > 0;
  }
};

/**
 * app.get('/',async (req,res,next)=>{
    await email.sendMail('anujjhawar28@gmail.com', //from
    'anujrocking2009@gmail.com',  //to
    'Sending EmailWith Template', //subject
    null,  //text
    null,  //html
    'index', //template-name
    {title : "This is Title Main Page", firstName : "Anuj Jhawar"},  // context
    null  //attchments object
  ).catch((err) => {
    console.log(err.message);
  });
  res.send("Mail Sent Successfully..!!")
});
 */