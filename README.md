# label maker demo program for DYMO Labelwriter

### What does this demo app do?

It takes a barcode input such as (12345/678) trough a web interface and generates a label with the filtered input text and sends it to a Dymo printer.


### prerequisites

 - Download and do a full Dymo DLS install [Windows](http://download.dymo.com/dymo/Software/Win/DLS8Setup.8.7.2.exe) [Mac](http://download.dymo.com/dymo/Software/Mac/DLS8Setup.8.7.2.dmg)
 
 - Check that the Web service runs by visiting the  [diagnostic page](https://127.0.0.1:41951/DYMO/DLS/Printing/Check)
 - Make sure Node.js is installed 

### Run the demo:
    cd labelmaker
    npm install (install all dependencies)
    node app (starts app)

Open the  [browser window port 3000](http://localhost:3000/)

#### For info about sending requests to the Dymo web service see the Wiki.

[Sending requests to DLS](https://github.com/ashleyvansteenacker/labelmaker/wiki/Dymo-requests)
