const fs = require('fs').promises;

// reads the file asynchronously - callback way

// fs.readFile('candidate.jsonl',{encoding:'utf-8'},(err,data)=>{
//     if(err){
//         console.log('error while reading the file',err)
//     }
//     else{
//         const result={};
//         const records = data.trim().split('\n')
//         records.forEach((item)=>{
//             if(!item.trim()) return;
//             const formattedRecord = JSON.parse(item)
//             const role = formattedRecord.role;
//             if(result[role]){
//                 result[role] = result[role] + 1;
//             }
//             else{
//                 result[role] = 1;
//             }
//         })        
//         Object.entries(result).forEach(([role,count])=>{
//             console.log(`role is ${role} and count is ${count}`)
//         })
//     }
// })

// reads file asyncronously - promise way

async function fileReader(){
    try {
       const data = await fs.readFile('candidate.jsonl',{encoding:'utf-8'}) 
       const records = data.trim().split('\n')
       const result = {};
       records.forEach((item)=>{
            if(!item.trim()) return;
            const formattedRecord = JSON.parse(item);
            const role = formattedRecord.role;
            if(result[role]){
                result[role] = result[role] + 1;
            }
            else{
                result[role] = 1;
            }
       })
       Object.entries(result).forEach(([role,count])=>{
        console.log(`role - ${role} and count - ${count}`)
       })
    } catch (error) {
        console.log(error)
    }
}

fileReader()

// fs.readFileSync - reads the file synchronously
//  by blocking the event loop does not need async/await 