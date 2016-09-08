const pkginfo = require('pkginfo')(module, 'version', 'name', 'productName', 'build');
const tasks = require('./electronTasks.js');

var build = module.exports.build;

var options = {   
    platform: 'win32',
    arch: 'ia32,x64',
    appIconPath :  build.win.appIconPath
};

tasks.packElectron(options);