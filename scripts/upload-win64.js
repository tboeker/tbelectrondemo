//var glob = require("glob")
var glob = require("multi-glob").glob;
var ghReleaseAssets = require('gh-release-assets')
var publishRelease = require('publish-release')
var pkginfo = require('pkginfo')(module, 'version','name')

console.log("package version: ", module.exports.version)

var tag = "v" + module.exports.version
console.log("tag: ", tag)

var releaseName = "Release " + module.exports.name + " Version: " + module.exports.version 
console.log("releasename: ", releaseName)

var pattern1 = "dist/installers/win32-x64/RELEASES*"
console.log("pattern1", pattern1)
var pattern2 = "dist/installers/win32-x64/**/*" + module.exports.version + "*"
console.log("pattern2", pattern2)

//var pattern = "dist/installers/win32-x64/**/!(*.msi)"
//console.log("pattern", pattern)


var demo = false;

if (process.argv.indexOf("-demo") != -1) { //does our flag exist? 
    demo = process.argv[process.argv.indexOf("-demo") + 1]; //grab the next item
    console.log("demo in args found")
}
else {
    if (process.env.GIT_DEMO != null) {
        demo = process.env.GIT_DEMO
        console.log("demo in env found")
    }
}

var token;
if (process.argv.indexOf("-token") != -1) { //does our flag exist?


    token = process.argv[process.argv.indexOf("-token") + 1]; //grab the next item
    console.log("token in args found", token)

}
else {
    console.log("token not in args")

    if (process.env.GIT_TOKEN == null) {
        throw "token not in env GIT_TOKEN"
    }
    else {
        token = process.env.GIT_TOKEN;
        console.log("token in env found", token)
    }

}


glob([pattern1, pattern2], function (err, matches) {
//glob(pattern, function (err, matches) {

    if (err) throw err

    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.

    console.log("matches", matches)

    if (demo == false) {
        /* 
          ghReleaseAssets({
               url: "https://github.com/tboeker/tbelectrondemo",
               token: token,
               assets: matches
           }, function (err, assets) {
               console.log(assets)
           }                
           )
           
*/


        publishRelease({
            /*   owner = "tboeker",
             repo = "tbelectrondemo",
             tag = "v" + module.exports.version , */
            token: token,
            assets: matches,
            owner: "tboeker",
            repo: "tbelectrondemo",
            tag: tag,
            reuseRelease: true
           // name : releaseName

        }, function (err, release) {
            // `release`: object returned from github about the newly created release
            if (err) {
                console.error(err)
                throw err
            }
        })
    }
    else {
        console.log("demo, do not upload");
    }

    /*  matches.forEach(function (file) {
          console.log("file:", file)
 
 })*/

})


console.log("after")