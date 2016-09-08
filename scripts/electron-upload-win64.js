const pkginfo = require('pkginfo')(module, 'version', 'name', 'build');
const tasks = require('./uploadTasks.js');

var build = module.exports.build;

//console.log('demoOptions:', tasks.options());

var uploadOptions = {
    filePatterns: [
        "dist/installer/{platform}-{arch}/RELEASES*",
        "dist/installer/{platform}-{arch}/**/*{version}*.exe",
        "dist/installer/{platform}-{arch}/**/*{version}*.nupkg",
        "dist/**/*{version}*"
    ],
    repoOwner: build.releaseRepoOwner,
    repoName: build.releaseRepoWin64,
    platform: 'win32',
    arch: 'x64'
};

tasks.uploadFiles(uploadOptions);
