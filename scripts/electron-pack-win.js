const pkginfo = require('pkginfo')(module, 'version', 'name', 'productName', 'build');
const tasks = require('./electronTasks.js');

var build = module.exports.build;

var options = {   
    platform: 'win32',
    arch: 'x32,x64'
};

tasks.packElectron(options);