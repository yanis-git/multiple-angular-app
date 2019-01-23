const fs = require('fs');
const path = require('path');

module.exports = (folder, manifest) => {
    const manifestPath = path.resolve(folder, manifest);

    if(!fs.existsSync(manifestPath)) return false;

    const files = JSON.parse(
        fs.readFileSync(
            manifestPath
        )
    );
    
    for (key in files) {
        fs.unlinkSync(path.resolve(folder, files[key]));
    }
    fs.unlinkSync(manifestPath);
};