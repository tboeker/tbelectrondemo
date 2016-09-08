const pkginfo = require('pkginfo')(module, 'version', 'name', 'productName', 'build');
const tasks = require('./electronTasks.js');

var build = module.exports.build;

var options = {
    platform: 'win32',
    arch: 'x64'
};


tasks.packElectron(options,

    function (err) {
        if (err) {
            console.error(err);
            throw err;
        }

        console.log(':packElectron: createWinstaller')       
        
        tasks.createWinstaller(options, function (err) {
            if (err) {
                console.error(err);
                throw err;
            }

            console.log(':packElectron: succeeded')
        }

        );
    }

);


