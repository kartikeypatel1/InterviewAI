const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
app.use(cookieParser());
app.use(express.json())
/* requires all the routes here*/
const authRoutes=require('./routes/auth.routes');
//using all the routes here
app.use('/api/auth',authRoutes);
module.exports=app;