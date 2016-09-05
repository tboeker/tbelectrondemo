# TB Electron Demo 

Demo einer Electron Anwendung

Inhalt kopiert aus dem Electron Quick Start <https://github.com/electron/electron-quick-start>

```bash
# Install dependencies
npm install 

#run the app
npm start

#build windows
npm run dist-win64

#upload windows to github
npm run upload-win64

#create patch release
npm run release-patch

#build osx
npm run dist-osx

```
## Parameter 

```bash

#für upload.js Führt keinen Upload durch, sonder Testet nur
SET GH_DEMO=true

#für upload.js Setzt das Token für die GitHub Auth.
SET GH_TOKEN=XXX

#password frü das win signing
SET CERT_PASSWORD=Password

export GH_TOKEN=XXX



``` 

## electron-builder

https://www.npmjs.com/package/electron-builder

http://electron.rocks/electron-builder-explained/


## electron-packager

https://github.com/electron-userland/electron-packager

electron-packager ./app --asar --platform win32 --arch x64 --out dist/

## electron-installer-windows

Die Options in packages.json.build.win sind die gleichen wie in diesem projekt???

,"remoteReleases": "https://github.com/tboeker/tbelectrondemo"

https://github.com/unindented/electron-installer-windows

electron-installer-windows --src dist/tbdemoelectron-win32-x64/ --dest dist/installers/ --remoteReleases dist/installers/ 
