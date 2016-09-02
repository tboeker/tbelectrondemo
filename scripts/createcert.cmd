 makecert -sv tbdemoelectron_private_key.pvk -n "CN=tbdemoelectron" tbdemoelectron.cer -b 01/01/2016 -e 01/01/2026 -r
 
 pvk2pfx -pvk tbdemoelectron_private_key.pvk -spc tbdemoelectron.cer -pfx tbdemoelectron.pfx -po Password