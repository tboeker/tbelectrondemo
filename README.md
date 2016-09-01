# TB Electron Demo 

Demo einer Electron Anwendung

* Inhalt kopiert aus dem Electron Quick Start <https://github.com/electron/electron-quick-start>

```bash
# Install dependencies
npm install 

#run the app
npm start

#build windows
npm run dist-win64

#build osx
npm run dist-osx
```

"postversion": "git push && git push --tags",

## electron-builder

https://www.npmjs.com/package/electron-builder

http://electron.rocks/electron-builder-explained/


## electron-packager

https://github.com/electron-userland/electron-packager

electron-packager ./app --asar --platform win32 --arch x64 --out dist/

## electron-installer-windows

https://github.com/unindented/electron-installer-windows

electron-installer-windows --src dist/tbdemoelectron-win32-x64/ --dest dist/installers/ --remoteReleases dist/installers/ 

http://woshub.com/how-to-create-self-signed-certificate-with-powershell/

```powershell

# run as administrator

New-SelfSignedCertificate -DnsName "tbdemoelectron.tboeker.de" -CertStoreLocation "cert:\LocalMachine\My"

# thumprint kopieren

$CertPassword = ConvertTo-SecureString -String "Pa$$word01" -Force –AsPlainText

Export-PfxCertificate -Cert cert:\LocalMachine\My\6DECDB35F2816D8229560C8AF51DEED8191A432D  -FilePath tbdemoelectron.pfx -Password $CertPassword


```