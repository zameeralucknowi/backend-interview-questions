const express = require('express')
const cluster = require('cluster')
const os = require('os');

const totalCPUs = os.cpus().length; // 8 core cpu

if(cluster.isPrimary){
    for(let i=0;i<totalCPUs;i++){
        cluster.fork()  // creating 8 worker processess 
    }
}
else{

    const app = express();

    app.get('/',(req,res)=>{
        return res.status(200).json({
            msg : `Hello from express - ${process.pid} port`
        })
    })

    app.listen(8000,()=>{
        console.log('server listening on port : 8000')
    })

}

