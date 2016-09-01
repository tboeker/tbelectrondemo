var glob = require("glob")
var ghReleaseAssets = require('gh-release-assets')

//var pattern = "dist/installers/win32-x64/RELEASES*"
var pattern = "dist/installers/win32-x64/**/!(*.msi)"


var demo = false;
if(process.argv.indexOf("-demo") != -1){ //does our flag exist?
 
    
    demo = process.argv[process.argv.indexOf("-demo") + 1]; //grab the next item
    console.log("demo in args found")
    
}

var token;
if(process.argv.indexOf("-token") != -1){ //does our flag exist?
 
    
    token = process.argv[process.argv.indexOf("-token") + 1]; //grab the next item
    console.log("token in args found", token)
    
}
else
{
    console.log("token not in args")

    if (process.env.GIT_TOKEN == null)
    {
        throw "token not in env GIT_TOKEN"        
    }
    else
    {
        token = process.env.GIT_TOKEN ;
        console.log("token in env found", token)
    }

}


console.log("pattern", pattern)

glob(pattern, function (err, matches) {

    if (err) throw err

    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.

    console.log("matches", matches)

    if (demo == false)
    {
        ghReleaseAssets({
            url: "https://github.com/tboeker/tbelectrondemo",
            token: token,
            assets: matches
        }, function (err, assets) {
            console.log(assets)
        })
    }
    else{
        console.log("demo, do not do");
    }

  /*  matches.forEach(function (file) {
        console.log("file:", file)
*/
       /* publishRelease({
            token: '2430747d4f72ccf90d61ff6e40bddbeaf99ca259',
            assets: [file]

        }, function (err, release) {
            // `release`: object returned from github about the newly created release
            if (err) throw err

        })*/

   /* })*/

})


console.log("after")