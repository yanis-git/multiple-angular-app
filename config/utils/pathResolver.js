const path = require('path');
const projectPath = path.resolve(__dirname, '../../');
module.exports = (relPath) => {
    if(relPath) {
        return path.resolve(projectPath, relPath);
    }
    else {
        return projectPath;
    }
};
