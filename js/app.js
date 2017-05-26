function getUrlParameters(parameter, staticURL, decode){
   	var str = window.location.href;
   	var n = str.indexOf("?");
   	if (n > -1) {
       	var currLocation = (staticURL.length)? staticURL : window.location.search,
        parArr = currLocation.split("?")[1].split("&"),
        returnBool = true;
       
       	for(var i = 0; i < parArr.length; i++){
            parr = parArr[i].split("=");
            if(parr[0] == parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
            }else{
                returnBool = false;            
            }
        }
       
       	if(!returnBool) return false;
   	}  else {
       return false;
   	}
}

function installapp() {
    if (window.navigator.mozApps) {
        var manifest_url = window.location.origin + '/manifest.webapp.php';
      
        // instalamos la aplicacion
        var request_install = window.navigator.mozApps.install(manifest_url);

        request_install.onsuccess = function() {
           // perfecto, se ha instalado la aplicacion
        };
        request_install.onerror = function() {
            alert(this.error.name);
        };
    }
}


function checkInstalled() {
    if (window.navigator.mozApps) {
	    var manifest_url = window.location.origin + '/manifest.webapp.php';
	    var request = window.navigator.mozApps.checkInstalled(manifest_url);

	    request.onsuccess = function() {
	        if (request.result) {
	            // esta instalada
	        } else {
	            // no esta instalada
	            installapp();
	        }
	    };
	    request.onerror = function() {
	        alert(this.error.message);
	    };
  	}
}


function init ( )
{
  timeDisplay = document.createTextNode ( "" );
  document.getElementById("clock").appendChild ( timeDisplay );
}

function initClock()
{
  var currentTime = new Date ( );

  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );
  
  displayBinary(currentSeconds,'s');
  displayBinary(currentMinutes,'m');
  displayBinary(currentHours,'h');

  var showdecimal = localStorage.getItem('showdecimal');
  
  if (showdecimal=="1") {
	  currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
	  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
	  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
	  $('span.decimalSecondLabel').html(currentSeconds);
	  $('span.decimalMinuteLabel').html(currentMinutes);
	  $('span.decimalHourLabel').html(currentHours); 
  }
} 

function updateClock()
{
  var currentTime = new Date ( );

  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );
  
  displayBinary(currentSeconds,'s');
  if (currentSeconds==0) {
		displayBinary(currentMinutes,'m');
		if (currentMinutes==0) {
			displayBinary(currentHours,'h');
		}
  }
  
  
  var showdecimal = localStorage.getItem('showdecimal');
  
  if (showdecimal=="1") {
	  currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
	  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
	  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
	  
	  $('span.decimalSecondLabel').html(currentSeconds);
	  $('span.decimalMinuteLabel').html(currentMinutes);
	  $('span.decimalHourLabel').html(currentHours); 
  }
     
}

function displayBinary(value,type) {
var value_binario = value.toString(2);
	if (value_binario.length < 6) {
	    var n = (6 - value_binario.length);
		var zeros = '';
		for (var i=0;i<n;i++)
		{
			zeros = zeros + '0';
		}
		value_binario = '' + zeros + value_binario.toString();
	}
	
	
	var orientation = localStorage.getItem('orientation');
	for (var i=0;i<value_binario.length;i++)
	{
		//alert(i);
		if (parseInt(value_binario[i]) > 0) {
		       $('#table_container_'+orientation+' div#'+type+i).removeClass( 'circle0' ).addClass('circle1');
		} else {
		       $('#table_container_'+orientation+' div#'+type+i).removeClass( 'circle1' ).addClass('circle0');
		}
	}
}


function checkDisplayEffectFakeRow(row) {
        var orientation = localStorage.getItem('orientation');
		setTimeout(
				function(){
					$('#table_container_'+orientation+' div#h'+row).removeClass( 'circle0' ).addClass('circle1');
					setTimeout(
							function(){
								$('#table_container_'+orientation+' div#m'+row).removeClass( 'circle0' ).addClass('circle1');
							    $('#table_container_'+orientation+' div#h'+row).removeClass( 'circle1' ).addClass('circle0');
								setTimeout(
									function(){
										$('#table_container_'+orientation+' div#s'+row).removeClass( 'circle0' ).addClass('circle1');
										$('#table_container_'+orientation+' div#m'+row).removeClass( 'circle1' ).addClass('circle0');
										setTimeout(
												function(){
													$('#table_container_'+orientation+' div#s'+row).removeClass( 'circle1' ).addClass('circle0');
												} 
												,200);
									} 
									,200);
								
							} 
							,200); 
				} 
				,200); 	
}

function checkDisplayEffectFake() {
        for (var i=0;i<6;i++)
		{
			setTimeout('checkDisplayEffectFakeRow('+i+')',i*200);
		}
}

$(function() { 
              
	$('#select1').change(function()
	{	   
	   var color =  $(this).val();
	   localStorage.setItem('color',color);
	});
	
	$('#select2').change(function()
	{	   
	   var shape =  $(this).val();
	   localStorage.setItem('shape',shape);
	});
		
	$('select#flip-1').change(function () {
		
		var showdecimal =  $(this).val();
		if (showdecimal=="1") {
			initClock();
		} else {
		    $('span.decimalSecondLabel').html('second');
			$('span.decimalMinuteLabel').html('minute');
			$('span.decimalHourLabel').html('hour'); 
		}
		localStorage.setItem('showdecimal',showdecimal);	
	});	 
	
});


