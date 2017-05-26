window.addEventListener("resize", function() {
	// Get screen size (inner/outerWidth, inner/outerHeight)
	if (window.innerWidth > window.innerHeight) {
		localStorage.setItem('orientation','h');
		$('div#table_container_v').hide();
		$('div#table_container_h').fadeIn('slow');
	} else {
		localStorage.setItem('orientation','v');
		$('div#table_container_h').hide();
		$('div#table_container_v').fadeIn('slow');
	}
	initClock();
}, false);

$(document).bind("mobileinit", function() { 
    $.mobile.defaultPageTransition = "fade";
});


/************************************************************* INICIO ******************/
$(document).on('pageinit', '#inicio',  function() {
	var color = getUrlParameters('color',"",true);
	if (color) {
		localStorage.setItem('color',color);
		$('div#config_theme').hide();
	} else {
		color = 'default';
		color = localStorage.getItem('color');
		if (color == null) {
			color = 'default';
			localStorage.setItem('color',color);
		}
    }

	var shape = getUrlParameters('shape',"",true);
	  
	if (shape) {
		localStorage.setItem('shape',shape);
		$('div#config_theme').hide();
	} else {
		shape = localStorage.getItem('shape');
		if (shape == null) {
			shape = 'circles';
			localStorage.setItem('shape',shape);
		}
    }
	  
	  var showdecimal = localStorage.getItem('showdecimal');
  
    	if (showdecimal == null) {		   
		     localStorage.setItem('showdecimal', 0);
        }
	
    
	if (window.outerWidth > window.outerHeight) {
			localStorage.setItem('orientation','h');	
			$('div#table_container_v').hide();
			$('div#table_container_h').fadeIn('slow');
			checkDisplayEffectFake();

			setTimeout(function () {
				initClock();
				setInterval('updateClock()', 1000 );
			}		
			,2000); 
		} else {
			localStorage.setItem('orientation','v');

			$('div#table_container_h').hide();
			$('div#table_container_v').fadeIn('slow');
			checkDisplayEffectFake();
			setTimeout(function () {
				initClock();
				setInterval('updateClock()', 1000 );
			}		
			,2000); 
		}

	   var install = getUrlParameters('install',"",true);
	  
	   if (install) {
           checkInstalled();
	   }
	
	//setInterval('updateClock()', 1000 );        
		
});


$(document).on('pageshow', '#inicio',  function() {
		 color = localStorage.getItem('color');
		 var shape = localStorage.getItem('shape');
		 $('body').removeClass('default gamewatch graylime matte tron cleverdj fxosnews phosphor beige blue cyan fuchsia gold gray greenyellow lime orange pink red white yellow').addClass(color);
		 $('div#inicio').removeClass('squares rounded circles').addClass(shape);
});


/*************************************************************  OPTIONS ******************/
$(document).on('pageshow', '#options',  function() {  

		var color = localStorage.getItem('color');
		$('#select1 option').prop('selected', false);
		$('#select1 option[value="'+color+'"]').prop('selected', true);
		
		var shape = localStorage.getItem('shape');
		$('#select2 option').prop('selected', false);
		$('#select2 option[value="'+shape+'"]').prop('selected', true);
		
		var showdecimal = localStorage.getItem('showdecimal');
		$('select#flip-1 option[value="'+showdecimal+'"]').prop("selected", "selected");
		
		$('#select1').selectmenu('refresh');
		$('#select2').selectmenu('refresh');
		$('select#flip-1').slider('refresh');	
		
});