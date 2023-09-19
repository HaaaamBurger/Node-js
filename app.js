const fs = require('fs');
const path = require('path');

const mainFolderPath = path.join(__dirname, 'mainFolder')
fs.mkdir(mainFolderPath, (err) => err);

for (let i = 1; i < 6; i++) {
    const miniFolderPath = path.join(mainFolderPath, `miniFolder${i}`);
    fs.mkdir(miniFolderPath, (err) => err)
}

for (let j = 1; j < 6; j++) {
    const miniFilePath = path.join(mainFolderPath, `miniFile${j}.txt`);
    fs.appendFile(miniFilePath, `Hello file ${j}`, (err) => err)
}
const readFile1 = path.join(mainFolderPath, 'miniFile1.txt');

fs.stat(readFile1, (err, stats) => {
    if (err) throw new Error(err);
    console.log(stats.isFile())
})

fs.readdir(mainFolderPath, (err,files) => {
    if (err) throw new Error(err);

    for (let i = 0 ; i < files.length; i++) {
        const filePath = path.join(mainFolderPath, `${files[i]}`);

        fs.stat(filePath, (err, stats) => {
            if (err) throw new Error(err);

            if (stats.isFile()) {
                console.log(`FILE: ${files[i]}`);
            } else if (stats.isDirectory()){
                console.log(`FOLDER: ${files[i]}`)
            } else {
                console.log('Empty')
            }
        })
    }
})