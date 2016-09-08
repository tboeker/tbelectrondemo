const packager = require('electron-packager');
const winstaller = require('electron-winstaller');

const pkginfo = require('pkginfo')(module, 'version', 'name', 'build', 'productName', 'author', 'description');
const assert = require('assert');

var build = module.exports.build;

module.exports.options = function () {
    return {
        platform: 'platform: win32',
        arch: 'architectur: x64,ia32',
        appIconPath : 'app icon'
    };
}

module.exports.createWinstaller = function (opts, callback) {
    assert(opts, '::createWinstaller: no opts');

    console.log('::createWinstaller');

    var exe = module.exports.name + '-' + module.exports.version + '-' + opts.platform + '-setup-' + opts.arch + '.exe'
    console.log('::createWinstaller:exe name:', exe)

    var certificatePassword = '';
    var certificateFile = build.win.certificateFile;

    certificatePassword = build.win.certificatePassword || certificatePassword;
    certificatePassword = process.env.CERT_PASSWORD || certificatePassword;

    if (certificatePassword == '') {
        console.log('::createWinstaller:no cert password found');
        certificateFile = '';
    }

    var remoteReleases = '';//https://github.com/tboeker/tbelectrondemo';
    if (process.env.GH_REPO) {
        console.log('remoteReleases', process.env.GH_REPO);
        remoteReleases = process.env.GH_REPO;
    }

    var options = {
        appDirectory: build.outDirectory + '/' + module.exports.name + '-' + opts.platform + '-' + opts.arch,
        outputDirectory: build.outDirectory + '/installer/' + opts.platform + '-' + opts.arch,
        loadingGif: build.win.loadingGif,
        setupIcon: build.win.setupIcon,
        iconUrl: build.win.iconUrl,
        authors: module.exports.author,
        description: module.exports.description,
        setupExe: exe,
        noMsi: true,
        certificateFile: certificateFile,
        certificatePassword: certificatePassword,
        remoteToken: process.env.GH_TOKEN || '',
        remoteReleases: remoteReleases
    };

    console.log('::createWinstaller: options:', options);

    resultPromise = winstaller.createWindowsInstaller(options);
    resultPromise.then(() => {

        console.log('::createWinstaller:setup created')

        if (callback) {
            callback(undefined);
        }
    }, (err) => {
        if (callback) callback(err)
    });


}


module.exports.packElectron = function (opts, callback) {
    assert(opts, '::packElectron: no opts');

    console.log('::packElectron');

    var options = {
        name: module.exports.name,
        dir: build.appDirectory,
        out: build.outDirectory,
        platform: opts.platform,
        arch: opts.arch,
        overwrite: true,
        icon: opts.appIconPath,
        'app-copyright': build.appCopyright,
        'build-version': module.exports.version,
        win32metadata: {
            CompanyName: build.companyName,
            ProductName: module.exports.productName

        }
    };

    console.log('::packElectron: options:', options);

    packager(options,

        function (err, appPaths) {

            if (err) {
                console.error(err);
                throw err;
            }
            console.log('::packElectron: created files', appPaths);
            if (callback) {

                if (err)
                    callback(err);

                callback(undefined);
            }


        });
};



