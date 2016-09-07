var electronInstaller = require('electron-winstaller');
var pkginfo = require('pkginfo')(module, 'version', 'name')

console.log('package version: ', module.exports.version)

var exe = module.exports.name + '-' + module.exports.version + '-win32-setup-x64.exe'
console.log('exe name:', exe)

var certificateFile = './tbdemoelectron.pfx';
if (!process.env.CERT_PASSWORD) {
    console.log('no cert password');
    certificateFile = '';
}

var remoteReleases = 'https://github.com/tboeker/tbelectrondemo';
if (process.env.GH_REPO)
{
    console.log('remoteReleases', process.env.GH_REPO);
    remoteReleases = process.env.GH_REPO;
}

var options = {
    appDirectory: './dist/tbdemoelectron-win32-x64',
    outputDirectory: './dist/installer/win32-x64',
    loadingGif: './resources/install-spinner.gif',
    setupIcon: './resources/icon.ico',
    iconUrl: 'https://raw.githubusercontent.com/tboeker/tbelectrondemo/master/resources/icon.ico',
    setupExe: exe,
    noMsi: true,
    certificateFile: certificateFile,
    certificatePassword: process.env.CERT_PASSWORD || '',
    remoteToken: process.env.GH_TOKEN || '',
    remoteReleases : remoteReleases
};


resultPromise = electronInstaller.createWindowsInstaller(options);
resultPromise.then(() => console.log('It worked!'), (e) => console.log(`No dice: ${e.message}`));