const express = require('express')
const app = express();
const MAX_REQUESTS=5;
const MAX_TIME=10*1000;

const ipStore= new Map();


// fixed window counting algo
function rateLimiter(req,res,next){
    const ip = req.ip;
    const now = Date.now();
    if(!ipStore.has(ip)){
        ipStore.set(ip,{count:1,windowStart:now});
        return next();
    }

    const record = ipStore.get(ip)
    if(now - record.windowStart >= MAX_TIME){
        ipStore.set(ip,{count:1,windowStart:now});
        return next();
    }

    if(record.count > MAX_REQUESTS){
        return res.status(429).json({
            msg : `only 5 reqs allowed per 10 secs per IP - ${req.ip} `
        })
    }
    record.count += 1;
    return next();
}

app.use(rateLimiter)

app.get('/',(req,res)=>{
    return res.status(200).json({
        msg:'hello from express'
    })
});

app.listen(3000,()=>{
    console.log('server listening on port : 3000')
})