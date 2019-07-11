const querystring = require('querystring');                                                                                                                                                                                                
const https = require('https');

// Template for S0722430 Dymo
Label01= '<?xml version="1.0" encoding="utf-8"?>'+
'<DieCutLabel Version="8.0" Units="twips">'+
'<PaperOrientation>Landscape</PaperOrientation>'+
 	'<Id>Shipping</Id>'+
	'<IsOutlined>false</IsOutlined>'+
	'<PaperName>30323 Shipping</PaperName>'+
	'<DrawCommands>'+
		'<RoundRectangle X="0" Y="0" Width="3060" Height="5715" Rx="270" Ry="270" />'+
	'</DrawCommands>'+
	'<ObjectInfo>'+
	'<AddressObject>'+
			'<Name>Serial</Name>'+
			'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />'+
			'<BackColor Alpha="0" Red="255" Green="255" Blue="255" />'+
			'<LinkedObjectName />'+
			'<Rotation>Rotation0</Rotation>'+
			'<IsMirrored>False</IsMirrored>'+
			'<IsVariable>True</IsVariable>'+
			'<GroupID>-1</GroupID>'+
			'<IsOutlined>False</IsOutlined>'+
			'<HorizontalAlignment>Left</HorizontalAlignment>'+
			'<VerticalAlignment>Middle</VerticalAlignment>'+
			'<TextFitMode>AlwaysFit</TextFitMode>'+
			'<UseFullFontHeight>True</UseFullFontHeight>'+
			'<Verticalized>False</Verticalized>'+
			'<StyledText>'+
				'<Element>'
					
Label02='<Attributes>'+
						'<Font Family="DIN Pro" Size="22" Bold="True" Italic="False" Underline="False" Strikeout="False" />'+
						'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />'+
					'</Attributes>'+
				'</Element>'+
			'</StyledText>'+
			'<ShowBarcodeFor9DigitZipOnly>True</ShowBarcodeFor9DigitZipOnly>'+
			'<BarcodePosition>Suppress</BarcodePosition>'+
			'<LineFonts>'+
				'<Font Family="DIN Pro" Size="22" Bold="True" Italic="False" Underline="False" Strikeout="False" />'+
			'</LineFonts>'+
		'</AddressObject>'+
		'<Bounds X="307" Y="57.9999999999999" Width="5265" Height="1452.86358511838" />'+
	'</ObjectInfo>'+
	'<ObjectInfo>'+
		'<BarcodeObject>'+
			'<Name>BARCODE</Name>'+
			'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />'+
			'<BackColor Alpha="0" Red="255" Green="255" Blue="255" />'+
			'<LinkedObjectName />'+
			'<Rotation>Rotation0</Rotation>'+
			'<IsMirrored>False</IsMirrored>'+
			'<IsVariable>False</IsVariable>'+
			'<GroupID>-1</GroupID>'+
			'<IsOutlined>False</IsOutlined>'
			
Label03='<Type>Code39</Type>'+
			'<Size>Medium</Size>'+
			'<TextPosition>Bottom</TextPosition>'+
			'<TextFont Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />'+
			'<CheckSumFont Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />'+
			'<TextEmbedding>None</TextEmbedding>'+
			'<ECLevel>0</ECLevel>'+
			'<HorizontalAlignment>Center</HorizontalAlignment>'+
			'<QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" />'+
		'</BarcodeObject>'+
		'<Bounds X="856.808342728297" Y="1312.23449830891" Width="4253.6877113867" Height="676.708004509583" />'+
	'</ObjectInfo>'+
	'<ObjectInfo>'+
		'<TextObject>'+
			'<Name>TEXT</Name>'+
			'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />'+
			'<BackColor Alpha="0" Red="255" Green="255" Blue="255" />'+
			'<LinkedObjectName />'+
			'<Rotation>Rotation0</Rotation>'+
			'<IsMirrored>False</IsMirrored>'+
			'<IsVariable>False</IsVariable>'+
			'<GroupID>-1</GroupID>'+
			'<IsOutlined>False</IsOutlined>'+
			'<HorizontalAlignment>Left</HorizontalAlignment>'+
			'<VerticalAlignment>Top</VerticalAlignment>'+
			'<TextFitMode>AlwaysFit</TextFitMode>'+
			'<UseFullFontHeight>True</UseFullFontHeight>'+
			'<Verticalized>False</Verticalized>'+
			'<StyledText>'+
				'<Element>'
		Label04='<Attributes>'+
						'<Font Family="DIN Pro" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />'+
						'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />'+
					'</Attributes>'+
				'</Element>'+
			'</StyledText>'+
		'</TextObject>'+
		'<Bounds X="307" Y="2117.46561443066" Width="2308.5456595265" Height="373.664036076664" />'+
	'</ObjectInfo>'+
	'<ObjectInfo>'+
		'<ShapeObject Stroke="SolidLine">'+
			'<Name>SHAPE</Name>'+
			'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />'+
			'<BackColor Alpha="0" Red="255" Green="255" Blue="255" />'+
			'<LinkedObjectName />'+
			'<Rotation>Rotation0</Rotation>'+
			'<IsMirrored>False</IsMirrored>'+
			'<IsVariable>False</IsVariable>'+
			'<GroupID>-1</GroupID>'+
			'<IsOutlined>False</IsOutlined>'+
			'<ShapeType>Rectangle</ShapeType>'+
			'<LineWidth>15</LineWidth>'+
			'<LineAlignment>Center</LineAlignment>'+
			'<FillColor Alpha="0" Red="255" Green="255" Blue="255" />'+
		'</ShapeObject>'+
		'<Bounds X="2750" Y="1995.55806087936" Width="2880" Height="940.789177001127" />'+
	'</ObjectInfo>'+
	'<ObjectInfo>'+
		'<TextObject>'+
			'<Name>TEXT_1</Name>'+
			'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />'+
			'<BackColor Alpha="0" Red="255" Green="255" Blue="255" />'+
			'<LinkedObjectName />'+
			'<Rotation>Rotation0</Rotation>'+
			'<IsMirrored>False</IsMirrored>'+
			'<IsVariable>False</IsVariable>'+
			'<GroupID>-1</GroupID>'+
			'<IsOutlined>False</IsOutlined>'+
			'<HorizontalAlignment>Left</HorizontalAlignment>'+
			'<VerticalAlignment>Top</VerticalAlignment>'+
			'<TextFitMode>ShrinkToFit</TextFitMode>'+
			'<UseFullFontHeight>True</UseFullFontHeight>'+
			'<Verticalized>False</Verticalized>'+
			'<StyledText>'+
				'<Element>'+
					'<String xml:space="preserve">QC Stamp</String>'+
					'<Attributes>'+
						'<Font Family="DIN Pro" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />'+
						'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />'+
					'</Attributes>'+
				'</Element>'+
			'</StyledText>'+
		'</TextObject>'+
		'<Bounds X="4529.30101465614" Y="2623.29199549041" Width="1022.77339346111" Height="330.372040586247" />'+
	'</ObjectInfo>'+
	'<ObjectInfo>'+
		'<TextObject>'+
			'<Name>SOFTVer</Name>'+
			'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />'+
			'<BackColor Alpha="0" Red="255" Green="255" Blue="255" />'+
			'<LinkedObjectName />'+
			'<Rotation>Rotation0</Rotation>'+
			'<IsMirrored>False</IsMirrored>'+
			'<IsVariable>False</IsVariable>'+
			'<GroupID>-1</GroupID>'+
			'<IsOutlined>False</IsOutlined>'+
			'<HorizontalAlignment>Left</HorizontalAlignment>'+
			'<VerticalAlignment>Top</VerticalAlignment>'+
			'<TextFitMode>ShrinkToFit</TextFitMode>'+
			'<UseFullFontHeight>True</UseFullFontHeight>'+
			'<Verticalized>False</Verticalized>'+
			'<StyledText>'+
				'<Element>'+
					'<String xml:space="preserve">V0.1</String>'+
					'<Attributes>'+
						'<Font Family="DIN Pro" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />'+
						'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />'+
					'</Attributes>'+
				'</Element>'+
			'</StyledText>'+
		'</TextObject>'+
		'<Bounds X="307" Y="2849.66178128523" Width="628.816234498316" Height="120" />'+
	'</ObjectInfo>'+
'</DieCutLabel>'

// Set hostname and location to post to
var options = {
    hostname: '127.0.0.1',
    port: 41951,
    path: '/DYMO/DLS/Printing/PrintLabel2',
    method: 'POST',
    headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
               }
  };
exports.create_get = function(req, res) { //Display index screen on get /
    res.render('home');

};

// Handle etiquette create on POST
exports.create_post = function(req, res) {
    var etiquette = {
        serial : req.body.serial
    }


var etiquetteclean = etiquette.serial.substr(0).slice(0, -4); //Clean string (remove /220 or /330) // For structure
//var etiquetteclean = etiquette.serial.substr(13); //Clean string (remove Product prefix for Depanage)
console.log(etiquetteclean);
for (i = 0; i <  2; i++) {
var side
    switch(i) {
        case 1:
         side='Links/Gauche/Left'
          break;
        case 0:
	      side='Rechts/Droit/Right'
          break;
        default:
         
      }


var postData = querystring.stringify({
    'printerName': 'DYMO LabelWriter 450 Turbo', //set printer name
	'printParamsXml':'',
	'labelXml': Label01+'<String xml:space="preserve">'+etiquetteclean+'</String>'+Label02+'<Text>'+etiquette.serial+'</Text>'+Label03+'<String xml:space="preserve">'+side+'</String>'+Label04 ,
    'labelSetXml':''
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";  // Don't verify SSL cert

var req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  
  req.write(postData);
  req.end();

}
res.render('home')
}

