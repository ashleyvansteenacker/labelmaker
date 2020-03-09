const querystring = require("querystring");
const https = require("https");
var department, qty, labeltype, side, sidetxt, etiquette;
let serial = "",
  optcode = "";

// Set hostname and location to post to (DLS)
var options = {
  hostname: "127.0.0.1",
  port: 41951,
  path: "/DYMO/DLS/Printing/PrintLabel2",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};
exports.create_get = function(req, res) {
  //Display index screen on get /
  res.render("home");
};

// Handle etiquette create on POST
exports.create_post = function(req, res) {
  var etiquette = {
    serial: req.body.serial
  };

  if (etiquette.serial.includes("/")) {
    //Serial contains '/'?
    etiquette_split = etiquette.serial.split("/"); //Split string into 2 arrays at the '/'

    if (etiquette_split[0] && etiquette_split[1]) {
      //Double check if it actually split
      serial = etiquette_split[0];
      optcode = etiquette_split[1];
    }
  }

  switch (
    parseInt(optcode) // Check optcode with dept. and apply settings for the dept.
  ) {
    case 20: //GLS
      department = "GlS";
      labeltype = 0; // small 0 big label 1
      qty = 1;
      side = 0;
      break;
    case 30: //FINI
      department = "FINI";
      labeltype = 0;
      qty = 1;
      side = 0;
      break;
    case 40: //HAB
      department = "HAB";
      labeltype = 1;
      qty = 2;
      side = 1;
      break;
    case 50: //CAPT
      department = "CAPT";
      labeltype = 1;
      qty = 1;
      side = 0;
      break;
    case 60: //PRCD
      department = "PRCD";
      labeltype = 1;
      qty = 1;
      side = 0;
      break;
    case 70: //TRAV
      department = "TRAV";
      labeltype = 1;
      qty = 1;
      side = 0;
      break;
    case 80: //TMBR
      department = "TMBR";
      labeltype = 0;
      qty = 1;
      side = 0;
      break;
    case 82: //GRIS
      department = "GRIS";
      labeltype = 1;
      qty = 1;
      side = 0;
      break;
    case 90: //PEIN
      department = "PEIN";
      labeltype = 1;
      qty = 1;
      side = 0;
      break;
    case 410: //MTT
      department = "MTT";
      labeltype = 0;
      qty = 1;
      side = 0;
      break;
    case 220: //CFT1
      department = "CFT1";
      labeltype = 0; //0 for testing 1 for prod
      qty = 1;
      side = 0;
      break;
    case 240: //CFT3
      department = "CFT3";
      labeltype = 0;
      qty = 1;
      side = 0;
      break;
    default:
      department = "See ASH";
      labeltype = 1;
      qty = 1;
      side = 0;
  }
  //console.log(department + " " + labeltype + "  " + qty + "  " + side); //uncomment to display debug info
  for (i = 0; i < qty; i++) {
    //Print the qty as defined
    var side;
    //console.log(i, qty);
    if (side === 1) {
      switch (i) {
        case 1:
          sidetxt = "Links/Gauche/Left";
          break;
        case 0:
          sidetxt = "Rechts/Droit/Right";
          break;
        default:
          sidetxt = " ";
      }
    } else {
      sidetxt = " ";
    }

    //#region  Template small label
    SmallLabel =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<DieCutLabel Version="8.0" Units="twips" MediaType="Default">' +
      "<PaperOrientation>Landscape</PaperOrientation>" +
      "<Id>LargeAddress</Id>" +
      "<PaperName>30321 Large Address</PaperName>" +
      "<DrawCommands>" +
      '<RoundRectangle X="0" Y="0" Width="2025" Height="5020" Rx="270" Ry="270"/>' +
      "</DrawCommands>" +
      "<ObjectInfo>" +
      "<TextObject>" +
      "<Name>Serial</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255"/>' +
      "<LinkedObjectName></LinkedObjectName>" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>AlwaysFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<StyledText>" +
      "<Element>" +
      "<String>" +
      serial +
      "</String>" +
      "<Attributes>" +
      '<Font Family="Myriad Pro" Size="13" Bold="True" Italic="False" Underline="False" Strikeout="False"/>' +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      "</Attributes>" +
      "</Element>" +
      "</StyledText>" +
      "</TextObject>" +
      '<Bounds X="322" Y="57.9999999999999" Width="4612.8" Height="1543.24076632653"/>' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<BarcodeObject>" +
      "<Name>QR</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      '<BackColor Alpha="255" Red="255" Green="255" Blue="255"/>' +
      "<LinkedObjectName></LinkedObjectName>" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<Text>" +
      serial +
      "</Text>" +
      "<Type>QRCode</Type>" +
      "<Size>Small</Size>" +
      "<TextPosition>None</TextPosition>" +
      '<TextFont Family="Helvetica" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False"/>' +
      '<CheckSumFont Family="Helvetica" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False"/>' +
      "<TextEmbedding>None</TextEmbedding>" +
      "<ECLevel>0</ECLevel>" +
      "<HorizontalAlignment>Center</HorizontalAlignment>" +
      '<QuietZonesPadding Left="0" Right="0" Top="0" Bottom="0"/>' +
      "</BarcodeObject>" +
      '<Bounds X="321.5997" Y="1257.228" Width="924.5033" Height="678.1752"/>' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<TextObject>" +
      "<Name>TEXT</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255"/>' +
      "<LinkedObjectName></LinkedObjectName>" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>ShrinkToFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<StyledText>" +
      "<Element>" +
      "<String>V0.3</String>" +
      "<Attributes>" +
      '<Font Family="Myriad Pro" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>' +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      "</Attributes>" +
      "</Element>" +
      "</StyledText>" +
      "</TextObject>" +
      '<Bounds X="1053.815" Y="1666.301" Width="533.0448" Height="219.8042"/>' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<TextObject>" +
      "<Name>Dept</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255"/>' +
      "<LinkedObjectName></LinkedObjectName>" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>ShrinkToFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<StyledText>" +
      "<Element>" +
      "<String>" +
      department +
      "</String>" +
      "<Attributes>" +
      '<Font Family="Myriad Pro" Size="24" Bold="True" Italic="False" Underline="False" Strikeout="False"/>' +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      "</Attributes>" +
      "</Element>" +
      "</StyledText>" +
      "</TextObject>" +
      '<Bounds X="1817.908" Y="1189.111" Width="948.5701" Height="611.153"/>' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<ShapeObject>" +
      "<Name>SHAPE</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255"/>' +
      "<LinkedObjectName></LinkedObjectName>" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<ShapeType>Rectangle</ShapeType>" +
      "<LineWidth>20</LineWidth>" +
      "<LineAlignment>LeftOrTop</LineAlignment>" +
      '<FillColor Alpha="0" Red="0" Green="0" Blue="0"/>' +
      "</ShapeObject>" +
      '<Bounds X="3017.12" Y="1339.2" Width="1657.857" Height="564.5245"/>' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<TextObject>" +
      "<Name>TEXT_1</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255"/>' +
      "<LinkedObjectName></LinkedObjectName>" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>ShrinkToFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<StyledText>" +
      "<Element>" +
      "<String>QC</String>" +
      "<Attributes>" +
      '<Font Family="Helvetica" Size="13" Bold="True" Italic="False" Underline="False" Strikeout="False"/>' +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      "</Attributes>" +
      "</Element>" +
      "</StyledText>" +
      "</TextObject>" +
      '<Bounds X="3080.33" Y="1369.781" Width="414.7002" Height="286.7712"/>' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<DateTimeObject>" +
      "<Name>DATE-TIME</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255"/>' +
      "<LinkedObjectName></LinkedObjectName>" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>ShrinkToFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<DateTimeFormat>DayMonthYear</DateTimeFormat>" +
      '<Font Family="Myriad Pro" Size="13" Bold="True" Italic="False" Underline="False" Strikeout="False"/>' +
      "<PreText></PreText>" +
      "<PostText></PostText>" +
      "<IncludeTime>True</IncludeTime>" +
      "<Use24HourFormat>True</Use24HourFormat>" +
      "</DateTimeObject>" +
      '<Bounds X="1464.529" Y="1648.721" Width="1406.32228571429" Height="286.7712"/>' +
      "</ObjectInfo>" +
      "</DieCutLabel>";
    //#endregion  Template small label

    //#region  Template Big label
    biglabel =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<DieCutLabel Version="8.0" Units="twips" MediaType="Default">' +
      "<PaperOrientation>Landscape</PaperOrientation>" +
      "<Id>Shipping</Id>" +
      "<IsOutlined>false</IsOutlined>" +
      "<PaperName>30323 Shipping</PaperName>" +
      "<DrawCommands>" +
      '<RoundRectangle X="0" Y="0" Width="3060" Height="5715" Rx="270" Ry="270" />' +
      "</DrawCommands>" +
      "<ObjectInfo>" +
      "<TextObject>" +
      "<Name>TEXT</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255" />' +
      "<LinkedObjectName />" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<GroupID>-1</GroupID>" +
      "<IsOutlined>False</IsOutlined>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>AlwaysFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<StyledText>" +
      "<Element>" +
      '<String xml:space="preserve">' +
      serial +
      "</String>" +
      "<Attributes>" +
      '<Font Family="Myriad Pro" Size="24" Bold="True" Italic="False" Underline="False" Strikeout="False" />' +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />' +
      "</Attributes>" +
      "</Element>" +
      "</StyledText>" +
      "</TextObject>" +
      '<Bounds X="307" Y="99.28005" Width="5323" Height="1935.202" />' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<BarcodeObject>" +
      "<Name>QR</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />' +
      '<BackColor Alpha="255" Red="255" Green="255" Blue="255" />' +
      "<LinkedObjectName />" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<GroupID>-1</GroupID>" +
      "<IsOutlined>False</IsOutlined>" +
      "<Text>" +
      serial +
      "</Text>" +
      "<Type>QRCode</Type>" +
      "<Size>Medium</Size>" +
      "<TextPosition>None</TextPosition>" +
      '<TextFont Family="Helvetica" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False" />' +
      '<CheckSumFont Family="Helvetica" Size="10" Bold="False" Italic="False" Underline="False" Strikeout="False" />' +
      "<TextEmbedding>None</TextEmbedding>" +
      "<ECLevel>0</ECLevel>" +
      "<HorizontalAlignment>Center</HorizontalAlignment>" +
      '<QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" />' +
      "</BarcodeObject>" +
      '<Bounds X="307" Y="1779.588" Width="1217.312" Height="1196.412" />' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<DateTimeObject>" +
      "<Name>DATE-TIME</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255" />' +
      "<LinkedObjectName />" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<GroupID>-1</GroupID>" +
      "<IsOutlined>False</IsOutlined>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>ShrinkToFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<DateTimeFormat>DayMonthYear</DateTimeFormat>" +
      '<Font Family="Myriad Pro" Size="13" Bold="True" Italic="False" Underline="False" Strikeout="False" />' +
      "<PreText />" +
      "<PostText />" +
      "<IncludeTime>True</IncludeTime>" +
      "<Use24HourFormat>True</Use24HourFormat>" +
      "</DateTimeObject>" +
      '<Bounds X="1358.29195918367" Y="2430.0591" Width="2100.804" Height="545.9409" />' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      '<ShapeObject Stroke="SolidLine">' +
      "<Name>SHAPE</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255" />' +
      "<LinkedObjectName />" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<GroupID>-1</GroupID>" +
      "<IsOutlined>False</IsOutlined>" +
      "<ShapeType>Rectangle</ShapeType>" +
      "<LineWidth>20</LineWidth>" +
      "<LineAlignment>LeftOrTop</LineAlignment>" +
      '<FillColor Alpha="0" Red="0" Green="0" Blue="0" />' +
      "</ShapeObject>" +
      '<Bounds X="3559.32495918367" Y="1887.33102040816" Width="1978.777" Height="1088.66897959184" />' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<TextObject>" +
      "<Name>TEXT_1</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255" />' +
      "<LinkedObjectName />" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<GroupID>-1</GroupID>" +
      "<IsOutlined>False</IsOutlined>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>ShrinkToFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<StyledText>" +
      "<Element>" +
      '<String xml:space="preserve">QC</String>' +
      "<Attributes>" +
      '<Font Family="Myriad Pro" Size="13" Bold="True" Italic="False" Underline="False" Strikeout="False" />' +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />' +
      "</Attributes>" +
      "</Element>" +
      "</StyledText>" +
      "</TextObject>" +
      '<Bounds X="3634.449" Y="1903.47126530612" Width="551.7728" Height="411.1175" />' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<TextObject>" +
      "<Name>Dept</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255" />' +
      "<LinkedObjectName />" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<GroupID>-1</GroupID>" +
      "<IsOutlined>False</IsOutlined>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>AlwaysFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<StyledText>" +
      "<Element>" +
      '<String xml:space="preserve">' +
      department +
      "</String>" +
      "<Attributes>" +
      '<Font Family="Helvetica" Size="13" Bold="True" Italic="False" Underline="False" Strikeout="False" />' +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />' +
      "</Attributes>" +
      "</Element>" +
      "</StyledText>" +
      "</TextObject>" +
      '<Bounds X="1394.91453061225" Y="2000.9387755102" Width="774.2684" Height="617.6643" />' +
      "</ObjectInfo>" +
      "<ObjectInfo>" +
      "<TextObject>" +
      "<Name>Side</Name>" +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />' +
      '<BackColor Alpha="0" Red="255" Green="255" Blue="255" />' +
      "<LinkedObjectName />" +
      "<Rotation>Rotation0</Rotation>" +
      "<IsMirrored>False</IsMirrored>" +
      "<IsVariable>False</IsVariable>" +
      "<GroupID>-1</GroupID>" +
      "<IsOutlined>False</IsOutlined>" +
      "<HorizontalAlignment>Left</HorizontalAlignment>" +
      "<VerticalAlignment>Middle</VerticalAlignment>" +
      "<TextFitMode>ShrinkToFit</TextFitMode>" +
      "<UseFullFontHeight>True</UseFullFontHeight>" +
      "<Verticalized>False</Verticalized>" +
      "<StyledText>" +
      "<Element>" +
      '<String xml:space="preserve">' +
      sidetxt +
      "</String>" +
      "<Attributes>" +
      '<Font Family="Helvetica" Size="16" Bold="False" Italic="False" Underline="False" Strikeout="False" />' +
      '<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />' +
      "</Attributes>" +
      "</Element>" +
      "</StyledText>" +
      "</TextObject>" +
      '<Bounds X="404.936430612245" Y="1573.46651020408" Width="2540" Height="514.40526122449" />' +
      "</ObjectInfo>" +
      "</DieCutLabel>";
    //#endregion

    // Check labeltype and select the right template
    if (labeltype === 0) {
      //console.log("small");
      var postData = querystring.stringify({
        printerName: "DYMO LabelWriter 450 Twin Turbo", //set printer name
        printParamsXml: "",
        labelXml: SmallLabel,
        labelSetXml: ""
      });
    } else {
      //	console.log("big");
      var postData = querystring.stringify({
        printerName: "DYMO LabelWriter 450 Twin Turbo", //set printer name
        printParamsXml: "",
        labelXml: biglabel,
        labelSetXml: ""
      });
    }

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Don't verify SSL cert (should fix later)
console.log(serial+" "+department);
    var req = https.request(options, res => {
      //console.log('statusCode:', res.statusCode); //uncomment to display debug info
      //console.log('headers:', res.headers); //uncomment to display debug info

      res.on("data", d => {
        process.stdout.write(d);
      });
    });

    req.on("error", e => {
      //console.error(e);
    });

    req.write(postData);
    req.end();
  }
  res.render("home");
};
