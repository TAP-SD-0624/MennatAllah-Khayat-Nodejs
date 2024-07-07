const fs = require('fs').promises;
const path = require('path');

async function readConfig() {
    const configPath = path.join(__dirname, 'config.json');
    try {
        const data = await fs.readFile(configPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading config file:', err);
        throw err;
    }
}

async function countWordsInFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const wordCount = data.split(/[\s!?,.0-9]+/).filter(word => word.length > 0).length;
        return wordCount;
    } catch (err) {
         console.error(`${filePath}: this file do not exist`);

    }
}

async function main() {
    try {
        const config = await readConfig();
        const filePromises = config.files.map(async (file) => {
            const wordCount = await countWordsInFile(file);
            console.log(`${file}: ${wordCount} words`);
        });
        await Promise.all(filePromises);
    } catch (err) {
        console.error('Error processing files:', err);
    }
}

main();
