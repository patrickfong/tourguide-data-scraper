@echo off
REM start 259
REM end 8739
start cmd /c node app.js --start 259 --end 1300 --filename 300.csv ^> 300out.log
start cmd /c node app.js --start 1300 --end 2300 --filename 1300.csv ^> 1300out.log
start cmd /c node app.js --start 2300 --end 3300 --filename 2300.csv ^> 2300out.log
start cmd /c node app.js --start 3300 --end 4300 --filename 3300.csv ^> 3300out.log
start cmd /c node app.js --start 4300 --end 5301 --filename 4300.csv ^> 4300out.log
start cmd /c node app.js --start 5300 --end 6301 --filename 5300.csv ^> 5300out.log
start cmd /c node app.js --start 6300 --end 7301 --filename 6300.csv ^> 6300out.log
start cmd /c node app.js --start 7300 --end 8301 --filename 7300.csv ^> 7300out.log
start cmd /c node app.js --start 8300 --end 8740 --filename 8300.csv ^> 8300out.log