const express = require('express')
const app = express();
// require('./scheduler1')
require('./scheduler2')
app.use(express.json());


app.listen(3000,()=>{
    console.log('server listening at port : 3000');
})