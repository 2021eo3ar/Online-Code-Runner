const { exec } = require("child_process");
const path = require("path");
const fs = require('fs');

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

// const executeCpp = (filepath) => {
//     // C:\Users\Arnav Goutam\Downloads\Onine-Compiler\backend\codes\3f25fc5c-1e0c-4859-9959-1a6e320c7587.cpp
//     const jobId = path.basename(filepath).split(".")[0];
//     const outPath = path.join(outputPath, `${jobId}.out`);
//     return new Promise((resolve, reject) => {
//      exec(
//         `g++ "${filepath}" -o "${outPath}" && cd ${outputPath} && ./${jobId}.out`, 
//         (error, stdout, stderr) =>{
//             if(error){
//                 reject({error,stderr});
//             }
//             if(stderr){
//                 reject(stderr);
//             }
//             resolve(stdout);
//         }
//      );
//     });
// };

const executeCpp = (filepath) => {
    const jobId = path.basename(filepath, path.extname(filepath));
    const outPath = path.join(outputPath, `${jobId}.out`);
    
    return new Promise((resolve, reject) => {
        exec(
            `g++ "${filepath}" -o "${outPath}" && "${outPath}"`, 
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                } else {
                    resolve(stdout);
                }
            }
        );
    });
};


module.exports = {
    executeCpp
}


