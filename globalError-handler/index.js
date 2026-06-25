const express = require('express')
const app = express();


app.use(express.json())

app.get('/movies',(req,res,next)=>{
    try {
        const token = req?.cookies?.token;
        if(!token){
            const err = new Error('unathorized token not provided');
            err.status=401;
            throw err;
        }

        return res.status(200).json({
            msg : 'all movies'
        })
    } catch (error) {
        next(error)
    }
})

app.all('/{*splat}',(req,res,next)=>{
    const err = new Error(`cannot find url- ${req.originalUrl} on the  server`);
    err.status=404;
    next(err)
})

app.use((err,req,res,next)=>{
    err.status = err.status || 500;
    err.message = err.message || 'Internal Error';
    return res.status(err.status).json({
        msg : err.message
    })
})

app.listen(5000,()=>{
    console.log('server listening on port : 5000')
})