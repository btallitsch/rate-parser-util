//Add your parameters here
 rateParams = allyProductArray //gets rateParams from rateArray.js

var xmlURL = "https://www.ally.com/apps/global/xml/rates.xml" /*URL to XML feed*/,
rateValue = [],
parseRates = function() {
	var x= new XMLHttpRequest();
  	try
  	{
	    x.open("GET", xmlURL);
	    x.timeout = 5000;
	    // Internet Explorer
	    if (!(window.ActiveXObject) && "ActiveXObject" in window) {
			x.responseType = "msxml-document";
		}
	    x.send(null);
	    x.onreadystatechange = function () {
	      	if (x.readyState == 4 && x.status == 200)
	      	{
	        	if(x.responseXML!=null)
	        	{
	          		var doc = x.responseXML;
	          		//create rate array
	            	//loop through requested parameters
		          	for (var i = 0; i < rateParams.length; i++) 
		          	{
		            	//find rate node and get rate value
		            	var getrate;
		            	getrate = doc.evaluate ? doc.evaluate("//product/term[@id='"+rateParams[i].termId+"']/rate[@min='"+rateParams[i].min+"' and @max='"+rateParams[i].max+"']/apy/text()", doc, null, 0, null).iterateNext() : doc.selectNodes("//product/term[@id='"+rateParams[i].termId+"']/rate[@min='"+rateParams[i].min+"' and @max='"+rateParams[i].max+"']/apy/text()")[0];
		                
			            //validate rate
			            if(getrate!=null)
			            {
			                if (doc.evaluate) // Firefox, Opera, Google Chrome and Safari
			                {
			                  if (getrate.textContent.length != 0 && getrate.textContent.indexOf(".") != -1) {
			                      //add rate to array
			                      rateValue.push(getrate.textContent);
			                      window.console && console.log && console.log("Term= " + rateParams[i].termId + ", Min=" + rateParams[i].min + ", Max=" + rateParams[i].max + ", Rate=" + rateValue[i] + "%");

			                  }
			                  
			              	}
			                else // Internet Explorer
			                {
			                  	if (getrate.text.length != 0 && getrate.text.indexOf(".") != -1) {
			                      	//add rate to array
			                      	rateValue.push(getrate.text);
			                      	window.console && console.log && console.log("Term= " + rateParams[i].termId + ", Min=" + rateParams[i].min + ", Max=" + rateParams[i].max + ", Rate=" + rateValue[i] + "%");
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

