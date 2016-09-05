var packager = require('electron-packager')
var pkginfo = require('pkginfo')(module, 'version', 'name')

console.log("package version: ", module.exports.version)


var options = {
    dir: "./app",
    out : "./dist",
    platform: "win32",
    arch: "x64,ia32",    
    overwrite : true,
    icon : "./resources/icon.ico",
    "app-copyright" : "2016 (C) TB",
    "build-version" : module.exports.version,
    win32metadata: {
        CompanyName: "TB CompanyName",
        ProductName: "TB Electron Demo ProductName"

    }
}

packager(options,
    function done_callback(err, appPaths) {
        if (err) {
            console.error(err)
            throw err
        }

        console.log("Created Files:", appPaths);
    })