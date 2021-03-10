const nodeMailer=require('nodemailer');
const {google}=require('googleapis');
const Oauth2=google.auth.OAuth2;

exports.mailer=function(name,email,Message){
    const Oauth2Client=new Oauth2(
      process.env.clientId,
      process.env.clientSecret,
      "https://developers.google.com/oauthplayground"

    );
    Oauth2Client.setCredentials({
        refresh_token:process.env.ref_tkn
    })

    const accesstoken=Oauth2Client.getAccessToken();

    const mailTransporter=nodeMailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user:"cricketraid200@gmail.com",
            clientId:process.env.clientId,
            clientSecret:process.env.clientSecret,
            refreshToken:process.env.ref_tkn,
            accessToken:accesstoken
        }
    });

    const mailOptions={
        from:"cricketraid200@gmail.com",
       to:"cricketraid200@gmail.com",
       subject:"Portfolio Message",
       generateTextFromHTML:true,
       html:`<p>Hi I am ${name}.</p><p>My email is ${email}</p><p>${Message}</p>`
    }

    mailTransporter.sendMail(mailOptions,(err,data)=>{
        if(err){return console.log("not sent")}
        else{console.log("sent")}
    })
}