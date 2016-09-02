var glob = require("multi-glob").glob;
var publishRelease = require('publish-release')
var pkginfo = require('pkginfo')(module, 'version', 'name')

console.log("package version: ", module.exports.version)

var tag = "v" + module.exports.version
console.log("tag: ", tag)

var releaseName = "Release " + module.exports.name + " Version: " + module.exports.version
console.log("releasename: ", releaseName)

var pattern1 = "dist/win/RELEASES*"
console.log("pattern1", pattern1)
var pattern2 = "dist/win/**/*" + module.exports.version + "*.exe"
console.log("pattern2", pattern2)
var pattern3 = "dist/win/**/*" + module.exports.version + "*.nupkg"
console.log("pattern3", pattern3)

//var pattern = "dist/installers/win32-x64/**/!(*.msi)"
//console.log("pattern", pattern)

var demo = false;

if (process.argv.indexOf("-demo") != -1) { //does our flag exist? 
    demo = process.argv[process.argv.indexOf("-demo") + 1]; //grab the next item
    console.log("demo in args found")
}
else {
    if (process.env.GH_DEMO != null) {
        demo = process.env.GH_DEMO
        console.log("demo in env GH_DEMO found")
    }
}

var token;
if (process.argv.indexOf("-token") != -1) { //does our flag exist?


    token = process.argv[process.argv.indexOf("-token") + 1]; //grab the next item
    console.log("token in args found", token)

}
else {
    console.log("token not in args")

    if (process.env.GH_TOKEN == null) {
        throw "token not in env GH_TOKEN"
    }
    else {
        token = process.env.GH_TOKEN;
        console.log("token in env GH_TOKEN found", token)
    }

}


glob([pattern1, pattern2, pattern3], function (err, matches) {
    if (err) throw err

    console.log("matches", matches)

    if (demo == false) {
        publishRelease({
            token: token,
            assets: matches,
            owner: "tboeker",
            repo: "tbelectrondemo",
            tag: tag,
            reuseRelease: true

        }, function (err, release) {
            if (err) {
                console.error(err)
                throw err
            }
        })
    }
    else {
        console.log("demo, do not upload");
    }


})


console.log("after")