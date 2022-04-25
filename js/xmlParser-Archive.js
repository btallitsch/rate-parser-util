//Add your parameters here
 params = product //gets params from rateArray.js

  /* Start Test Parameters */
  //querystring parameters are used to test the unit with invalid xml from the testFiles folder
 var  queryString = {}
  queryString.get = function(name) {
    'use strict';
    var qs = document.location.search.substring(1).split('&'),
      i = qs.length - 1,
      r = false,
      v,
      m,
      s;
    name = encodeURIComponent(name) + '=';
    for (i; i > -1; i--) {
      v = qs[i];
      m = v.indexOf(name);
      if (-1 !== m) {
        s = v.substring(m + name.length, v.length);
        try {
          r = decodeURIComponent(s);
        } catch(e) {
          r = s;
        }
        break;
      }
    }
    var path;
    switch(r) {
      case "invalid": //invalid XML
          path= "/testFiles/invalid.xml";
          break;
      case "blank": // blank XML
          path= "/testFiles/blank.xml";
          break;
      case "non-numeric": // non-numeric XML
          path= "/testFiles/non-numeric.xml";
          break;
      default:
          break
    }
    return path;
  };

//check if url parameters are being passed else pass Ally URL
var xmlURL = queryString.get('test') || "https://www.ally.com/apps/global/xml/rates.xml",
rateValue = [],
parseRates = function() {
	var x= new XMLHttpRequest();
  	try
  	{
	    x.open("GET", xmlURL);
	    x.timeout = 5000;
	    x.responseType = "msxml-document";// Internet Explorer
	    x.send(null);
	    x.onreadystatechange = function () {
	      	if (x.readyState == 4 && x.status == 200)
	      	{
	        	if(x.responseXML!=null)
	        	{
	          		var doc = x.responseXML;
	          		//create rate array
	            	//loop through requested parameters
		          	for (var i = 0; i < params.length; i++) 
		          	{
		            	//find rate node and get rate value
		            	var getrate;
		            	getrate = doc.evaluate ? doc.evaluate("//product/term[@id='"+params[i].termId+"']/rate[@min='"+params[i].min+"' and @max='"+params[i].max+"']/apy/text()", doc, null, 0, null).iterateNext() : doc.selectNodes("//product/term[@id='"+params[i].termId+"']/rate[@min='"+params[i].min+"' and @max='"+params[i].max+"']/apy/text()")[0];
		                
			            //validate rate
			            if(getrate!=null)
			            {
			                if (doc.evaluate) // Firefox, Opera, Google Chrome and Safari
			                {
			                  if (getrate.textContent.length != 0 && getrate.textContent.indexOf(".") != -1) {
			                      //add rate to array
			                      rateValue.push(parseFloat(getrate.textContent).toFixed(2));
			                      window.console && console.log && console.log("Term= " + params[i].termId + ", Min=" + params[i].min + ", Max=" + params[i].max + ", Rate=" + rateValue[i] + "%");

			                  }
			                  
			              	}
			                else // Internet Explorer
			                {
			                  	if (getrate.text.length != 0 && getrate.text.indexOf(".") != -1) {
			                      	//add rate to array
			                      	rateValue.push(parseFloat(getrate.text).toFixed(2));
			                      	window.console && console.log && console.log("Term= " + params[i].termId + ", Min=" + params[i].min + ", Max=" + params[i].max + ", Rate=" + rateValue[i] + "%");
								}
			                }
			          	}
			          	else
			          	{
			            	break;
			          	}
	        		}
        		}
      			
      		}
    		
    	};
  	}
  	catch(e){
    	window.console && console.error && console.error("Parsing error:" + e.message);
    	//fallback();   
  	}
};

