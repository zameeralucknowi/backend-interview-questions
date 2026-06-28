const nodeCron = require('node-cron')

const task = () =>{
    console.log('running my first scheduled task at :'+ new Date());
}

nodeCron.schedule('*/2 * * * * *',task);