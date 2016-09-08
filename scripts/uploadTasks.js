const assert = require('assert');
const glob = require('multi-glob').glob;
const publishRelease = require('publish-release');
const pkginfo = require('pkginfo')(module, 'version', 'name');
const _ = require('lodash');

module.exports.options = function () {

    var buildOptions = {
        platform: 'platform: win32',
        arch: 'architectur: x64,ia32',

        filePatterns: [
            'dist/installer/win32-x64/RELEASES*',
            'dist/installer/win32-x64/**/*1.3.4*.exe',
            'dist/installer/win32-x64/**/*{version}*.nupkg',
            'dist/**/*1.3.4*'
        ],
        repoOwner: 'owner of github repository',
        repoName: 'name of github repository'

    };
    return buildOptions;
};


module.exports.uploadFiles = function (opts) {
    assert(opts, '::uploadFiles: no opts');    
    assert(opts.filePatterns, '::uploadFiles: opts, no filePatterns');
    assert(opts.repoOwner, '::uploadFiles: opts, no repoOwner');
    assert(opts.repoName, '::uploadFiles: opts, no repoName');
    assert(opts.platform, '::uploadFiles: opts, no platform');
    assert(opts.arch, '::uploadFiles: opts, no arch');

    var tag = 'v' + module.exports.version;

    console.log("::uploadFiles");

    var demo = false;

    if (process.env.GH_DEMO != null) {      
        console.log('::uploadFiles: demo in env GH_DEMO found:', process.env.GH_DEMO);
        demo =  (process.env.GH_DEMO == 'true');
        console.log('::uploadFiles: demo value:', demo);
    }

    var token;
    if (process.env.GH_TOKEN == null) {
        throw '::uploadFiles: token not in env GH_TOKEN';
    }
    else {
        token = process.env.GH_TOKEN;
        console.log('::uploadFiles: token in env GH_TOKEN found', token);
    }

    var patterns = _.map(opts.filePatterns, function (p) {

        return p.replace('{version}', module.exports.version)
                .replace('{platform}', opts.platform)
                .replace('{arch}', opts.arch)

        ;    
    });

    glob(patterns, function (err, matches) {
        if (err)
            throw err;

        console.log('::uploadFiles: matches', matches);

        if (demo == false) {
            publishRelease({
                token: token,
                assets: matches,
                owner: opts.repoOwner,
                repo: opts.repoName,
                tag: tag,
                reuseRelease: true

            }, function (err, release) {
                if (err) {
                    console.error(err);
                    throw err;
                }

                console.log('::uploadFiles: upload finished');
            })
        }
        else {
            console.log('::uploadFiles: demo mode, do not upload');
        }


    });
};
