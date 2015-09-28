var remoteDebug=true;
var flag = false;

/*

function httpsDebugOn() {

	loadScript( "https://editor.dilarakocak.com.tr/target/target-script-min.js#anonymous", function() { });  
	remoteDebug=true;
	console.log("Remote Debug On");

	window.WeinreServerURL="https://editor.dilarakocak.com.tr/";

}

httpsDebugOn(); 

*/

function showLoading() {
	if(flag==false) {
			showDialog('Yükleniyor...'); 
			flag=true;		
	}	
}	

function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);
    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(value) {
	if (value==false) {
		closeDialog(); 
    	flag=false;
	}	 

	if (value==true) { 
		showLoading();
	}
}

onReady(function () {
    show(true);
    show(false);
});

$( document ).ready(function() {
	$( "a" ).each(function( index ) {
    	var href = $( this ).attr("href");
    	if (typeof href !== typeof undefined && href !== false) {
    		var hrefAttr = href.search("javascript:");           
      		if(hrefAttr==-1) {
        		$( this ).attr("onclick", "showLoading()");	
        	}    
    	}
	});
});
