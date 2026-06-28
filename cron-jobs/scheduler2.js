const nodeCron = require('node-cron');
const path = require('path');
const fs = require('fs');
const invoices = require('./data/invoices.json');

const archiveInvoicesTask = () => {
    console.log('Running archival task :' + new Date());
    try {
        const result = invoices.reduce((acc,invoice)=>{
            if(invoice.status==='paid'){
                acc.paidInvoice.push(invoice);
            }
            else{
                acc.pendingInvoice.push(invoice)
            }
            return acc;
        },{paidInvoice:[],pendingInvoice:[]})

        const {paidInvoice,pendingInvoice} = result;

        fs.writeFileSync(
            path.join(__dirname,'./','data','archive.json'),
            JSON.stringify(paidInvoice),
            'utf-8'
        )

        console.log('paidinvoices',paidInvoice)

        fs.writeFileSync(
            path.join(__dirname,'./','data','invoices.json'),
            JSON.stringify(pendingInvoice),
            'utf-8'
        )

          console.log('pending invoices',pendingInvoice)
    } catch (error) {
        console.log(error)
    }
    console.log('Ending archival task')
}

nodeCron.schedule('*/5 * * * * *', archiveInvoicesTask)

