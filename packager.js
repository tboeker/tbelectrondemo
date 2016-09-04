var packager = require('electron-packager')

var options = {
    dir: "./app"
}

packager(options,
    function done_callback(err, appPaths) {
        if (err) {
            console.error(err)
            throw err
        }
    })