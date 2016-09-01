# TB Electron Demo 

Demo einer Electron Anwendung

* Inhalt kopiert aus dem Electron Quick Start <https://github.com/electron/electron-quick-start>

```bash
# Install dependencies
npm install 

#run the app
npm start

#build windows
npm run dist-win

#build osx
npm run dist-osx
```

## electron-builder

https://www.npmjs.com/package/electron-builder

http://electron.rocks/electron-builder-explained/


## electron-packager

https://github.com/electron-userland/electron-packager

electron-packager ./app --asar --platform win32 --arch x64 --out dist/

## electron-installer-windows

https://github.com/unindented/electron-installer-windows

electron-installer-windows --src dist/tbdemoelectron-win32-x64/ --dest dist/installers/ --remoteReleases dist/installers/ 