# TB Electron Demo 

Demo einer Electron Anwendung

Inhalt kopiert aus dem Electron Quick Start <https://github.com/electron/electron-quick-start>

```bash
# Install dependencies
npm install 

#run the app
npm start

#build windows x64
npm run electron:dist:win64

#upload windows x64 to github
npm run electron:upload:win64

#build windows x32
npm run electron:dist:win32

#upload windows x32 to github
npm run electron:upload:win32

#create patch release
npm run release:patch

#create minor release
npm run release:minor

#create major release
npm run release:major




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

## electron-installer

https://github.com/electron/windows-installer

## electron-installer-windows

Die Options in packages.json.build.win sind die gleichen wie in diesem projekt???

,"remoteReleases": "https://github.com/tboeker/tbelectrondemo"

https://github.com/unindented/electron-installer-windows

electron-installer-windows --src dist/tbdemoelectron-win32-x64/ --dest dist/installers/ --remoteReleases dist/installers/ 


## installation

die dateien werden in den ordner installiert: 

cd %LOCALAPPDATA%\tbdemoelectron 

npm run pack-win
xcopy dist\tbdemoelectron-win32-x64\*.* %LOCALAPPDATA%\tbdemoelectron\app-1.0.36 /Y /S
%LOCALAPPDATA%\tbdemoelectron\app-1.0.36\tbdemoelectron.exe

