const express=require('express');


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Cross-origin
app.use(require('cors')());

//Routes
app.use('/user',require('./routes/user'));
app.use('/chatroom',require('./routes/chatroom'));
app.use('/personal',require('./routes/personal'));

//Error handlers
const errorHandlers=require('./handlers/errorHandlers');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);

if(process.env.ENV==="DEVELOPMENT"){
    app.use(errorHandlers.developmentErrors);
}
else{
    app.use(errorHandlers.productionErrors);
}

module.exports=app;