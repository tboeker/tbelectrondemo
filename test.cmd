
call npm run pack-win
xcopy dist\tbdemoelectron-win32-x64\*.* %LOCALAPPDATA%\tbdemoelectron\app-1.0.36 /Y /S
%LOCALAPPDATA%\tbdemoelectron\app-1.0.36\tbdemoelectron.exe

