var electronInstaller = require('electron-winstaller');
var pkginfo = require('pkginfo')(module, 'version', 'name')

console.log("package version: ", module.exports.version)

var exe = module.exports.name + "-" + module.exports.version + "-win32-setup-x64.exe"
console.log("exe name:", exe)

var certificateFile = "./tbdemoelectron.pfx";
if (!process.env.CERT_PASSWORD) {
    certificateFile = "";
}


resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: "./dist/tbdemoelectron-win32-x64",
    outputDirectory: "./dist/installer/win32-x64",
    loadingGif: "./resources/install-spinner.gif",
    setupIcon: "./resources/icon.ico",
    iconUrl: "https://raw.githubusercontent.com/tboeker/tbelectrondemo/master/resources/icon.ico",
    setupExe: exe,
    noMsi: true,
    certificateFile: certificateFile,
    certificatePassword: process.env.CERT_PASSWORD || "",
    remoteToken: process.env.GH_TOKEN || "",
    remoteReleases : "https://github.com/tboeker/tbelectrondemo"
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));


/*

var createInstaller = require('electron-installer-squirrel-windows')

var opts = {
    path: "./dist/tbdemoelectron-win32-x64",
    out: "./dist/installer2/win32-x64",
    loadingGif: "./resources/install-spinner.gif",
    setupIcon: "./resources/icon.ico",
    iconUrl: "https://raw.githubusercontent.com/tboeker/tbelectrondemo/master/resources/icon.ico",
    setupExe: exe,
    noMsi: true,
    authors :"TB"
}

createInstaller(opts, function done(err) {

    if (err) {
        console.error(err)
        throw err
    }

    console.log("it worked 2");

})

*/
