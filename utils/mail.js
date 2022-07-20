"use strict";
var nodemailer = require('nodemailer');



module.exports = {
    sendingMail: sendingMail
};


function sendingMail(data) {
    return new Promise(function(resolve, reject) {
        
        // create reusable transporter object using the default SMTP transport
        var attachment = {};
        var transporter = nodemailer.createTransport({
            // sets automatically host, port and connection security settings  //we can use other services like "Yahoo"
             service: "gmail",
            host: "smtp.yandex.com", // hostname can use server.massmediums.com
           // port: 465,
            //secure: true, // true for 465, false for other ports
            auth: {
                // type: 'OAuth2',
                user: process.env.EMAIL,
                pass:process.env.PSWDEMAIL
                // clientId: config.mail.client_id,
                // clientSecret: config.mail.client_secret,
                // refreshToken: config.mail.refresh_token,
                // accessToken: accessToken
            },
          //pool: true,
           // buffer: true
                //    logger: true, // log to console
                //    debug: true // include SMTP traffic in the logs
        });

        // verify connection configuration
        transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });

        var mailOptions = {};
        // var attachment = {};

        mailOptions = {
            from: 'lancitounsi@gmail.com' , // sender address.  Must be the same as authenticated user if using Gmail.
            to: 'lancitounsi@gmail.com', // list of receivers
            subject: data.subject, // Subject line
            html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml">' +
                '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
                '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>' +
                '<style type="text/css">.sym-email{color:#333;font:14px/130% Arial,Helvetica,sans-serif;margin:0;padding:20px}.sym-email p{display:block;margin:0 0 10px;padding:0}hr{border:0;border-top:1px solid #aaa;margin:25px 0;height:1px}</style>' +
                '</head><body><div class="sym-email">' + getTamplate(data) + '</div></body></html>' // html body
        };

        // if (settingsDoc.globalBCC) {
        //   mailOptions.bcc = settingsDoc.globalBCC;
        // }

        // attachment = {
        //   filename: 'ShippingLabel',
        //   path: path.resolve(__dirname, '../barcode_documents/pdf/' + data.itemId + '.pdf'),
        //   contentType: 'application/pdf'
        // };
        //   if (attachment) {
        //     mailOptions.attachments = [attachment];
        //   }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(err, info) {

            console.log(process.env.EMAIL
                ,"pass" , process.env.PSWDEMAIL);
            if (err) {
                console.log('Error occurred when sending mail..');
                console.log(err.message);
                reject(err);
                return;
            } else {
                console.log('Message sent successfully!');
                console.log('Message sent: ' + info);
                resolve(info);
            }
            transporter.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
        });
    });
}

function getTamplate(data) {
     
    return '<h1 style="text-align:center;" >Email from Contact-us TESTMANIA  </h1> <br/>' + '<div><p>' +

    '<h2> Name  :'+data.name+'</h2>'+
    '<h2> Email from :'+data.emailAddress+'</h2>'+
    '<h2> Phone number  :'+data.phone+'</h2>'+
    '<h2> Message  : </h2> <h3>'+data.msg+'</h3>'
        

}