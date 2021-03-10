const env=require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const mail=require('./mailer.js')
const PORT=process.env.PORT||8080;
app.use(cors())

app.get('/get',(req,res)=>{
    res.send("all okay")
})

app.post('/mail',(req,res)=>{
const{name,email,Message}=req.body;
  mail.mailer(name,email,Message);
  res.send("done");
})



app.listen(PORT,()=>{
    console.log('server is running at'+" "+PORT);
})