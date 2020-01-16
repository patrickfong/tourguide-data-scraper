# tourguide-data-scraper

A custom written program to retrieve data from a remote website.

The program takes three parameters
--start     the index to start at
--end       the index to end at
--filename  the output file name (CSV)

For example:
node app.js --start 259 --end 1300 --filename 300.csv

You can start multiple processes to download data concurrently to reduce the amount of time needed.

See multistart.bat for an example.  

It is up to you to divide up the load by strategically specifying start and end indicies for each process.

See combine.bat for how to merge the resulting CSV files.