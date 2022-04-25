(function(window, undefined) {
  'use strict';
  var document = window.document
  
  //Display fallback
  function fallback()
  {
    var fallbackDiv = document.getElementById('fallback');
    setTimeout(function(){ fadeIn(document.getElementById("rate_container"));fallbackDiv.style.display = 'inline'; }, 100);
 }

 function fadeIn(el) {
    if(el)
    {
      el.style.opacity = 0;
      var last = +new Date();
      var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 500;
        last = +new Date();
        if (+el.style.opacity < 1) {
          setTimeout(tick, 20)
        }
      };

      tick();
    }
  }

  parseRates(); // Get rate from xmlParser

  setTimeout(function(){  displayRate(); }, 4000); //display rate

  function displayRate()
  {

    //Validate rate and display value.
    if(rateValue && rateValue.length!=0 && rateValue.length==rateParams.length)
    {
      for (var i = 0; i < rateValue.length; i++) 
      {
        try{
          //display rate in equivilant div
          var rateDiv,rateContainer,rateSpan;
          rateDiv = document.getElementById("darate"+i);
          rateSpan = rateDiv.getElementsByTagName('span')[0];
          rateContainer = document.getElementById("rate_container");
          rateSpan.innerHTML=rateValue[i];
          rateDiv.style.display='inline';

          setTimeout(function(){ fadeIn(rateContainer);fadeIn(rateDiv);rateDiv.style.display='inline'; }, 100);    
   
        }
        catch(e) {
          //Error locating HTML elements
          window.console && console.error && console.error("Error locating HTML elements: "+e.message.replace('"rate"+i',"rate"+i) + " "+e.sourceURL + " line "+e.line);
          //Display fallback
          fallback();   
          
          //re-hide rate divs
          for (var y = 0; y < i; y++) 
          {
            if(document.getElementById("rate" + y)!=null){
              rateDiv = document.getElementById("rate" + y);
              rateDiv.style.display="none";
              
            }
          }
          break;
        }
      }
     
    }
    else
    {
   
      fallback();   
      window.console && console.error && console.error("Parsing error: Invalid XML");
    }
  }


 

}(this));






    
