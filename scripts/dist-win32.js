var electronInstaller = require('electron-winstaller');
var pkginfo = require('pkginfo')(module, 'version', 'name')

console.log("package version: ", module.exports.version)

var exe = module.exports.name + "-" + module.exports.version + "-win32-setup-ia32.exe"
console.log("exe name:", exe)


resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: "./dist/tbdemoelectron-win32-ia32",
    outputDirectory: "./dist/installer/win32-ia32",
    loadingGif: "./resources/install-spinner.gif",
    setupIcon: "./resources/icon.ico",
    iconUrl: "https://raw.githubusercontent.com/tboeker/tbelectrondemo/master/resources/icon.ico",
    setupExe: exe,
    noMsi: true,
    certificateFile: process.env.CERTPASSWORD || "",
    certificatePassword: process.env.CERTPASSWORD || "",
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));

