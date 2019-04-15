const querystring = require('querystring');                                                                                                                                                                                                
const https = require('https');

 ///// Setup template
labelstart='<?xml version="1.0" encoding="utf-8"?>'+
'<DieCutLabel Version="8.0" Units="twips">'+
	'<PaperOrientation>Landscape</PaperOrientation>'+
	'<Id>LargeAddress</Id>'+
	'<IsOutlined>false</IsOutlined>'+
	'<PaperName>30321 Large Address</PaperName>'+
	'<DrawCommands>'+
		'<RoundRectangle X="0" Y="0" Width="2025" Height="5020" Rx="270" Ry="270" />'+
    '</DrawCommands>'
    
labelobject0= '<ObjectInfo>'+
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
			'<TextFitMode>ShrinkToFit</TextFitMode>'+
			'<UseFullFontHeight>True</UseFullFontHeight>'+
			'<Verticalized>False</Verticalized>'+
			'<StyledText>'+
				'<Element>'
				
			labelatribute0='<Attributes>'+
						'<Font Family="Arial" Size="72" Bold="True" Italic="False" Underline="False" Strikeout="False" />'+
						'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />'+
					'</Attributes>'+
				'</Element>'+
			'</StyledText>'+
		'</TextObject>'+
		'<Bounds X="322" Y="195.000000000001" Width="4613" Height="1236" />'+
    '</ObjectInfo>'

    labelobject1='<ObjectInfo>'+
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
				'<Element>'
					
					labelatribute1='<Attributes>'+
						'<Font Family="Arial" Size="24" Bold="False" Italic="False" Underline="False" Strikeout="False" />'+
						'<ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />'+
					'</Attributes>'+
				'</Element>'+
			'</StyledText>'+
        '</TextObject>'
        
	labelend='<Bounds X="338.999999999999" Y="1460" Width="4512" Height="479.999999999999" />'+
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


var etiquetteclean = etiquette.serial.substr(0).slice(0, -4); //Clean string (remove /220 or /330)
for (i = 0; i < 2; i++) {
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
    'printerName': 'DYMO LabelWriter 450', //set printer name
    'printParamsXml':'',
    'labelXml' : labelstart+labelobject0+'<String xml:space="preserve">'+etiquetteclean+'</String>'+
    labelatribute0+labelobject1+'<String xml:space="preserve">'+side+'</String>'+labelatribute1+labelend,
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

