/* vars */
var ua, iphone, android, androidOld, win, mozilla, lastHash;


function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', 
            function() {
                callback(WebViewJavascriptBridge)
            }, 
        false)
    }
}


function init() {

    ua = navigator.userAgent;
    iphone = ua.match(/(iPhone|iPod|iPad)/) != null;
    android = ua.match(/Android/) != null;
    mozilla = ua.match(/Mozilla/) != null;    
    androidOld = /android 2\.3/i.test(ua);
    win = $(window);
    lastHash = window.location;

    if (iphone) {
        loadScript( "//uygulamam-genelltd.netdna-ssl.com/js/nativeiOS.min.js", function() {

            connectWebViewJavascriptBridge(function(bridge) {
                bridge.init(function(message, responseCallback) {})

              
                bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) { debugOn(); })

                // Inline gonderme
                //var data = 'Örnek inline gönderme' 
                //bridge.send(data, function(responseData) {})
            })


        }); 


    }

}
init();

function sendBridge(data) {
    if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.send(data, function(responseData) {})
    }    
}

/* native functions */
function showToastShort(message) {
    if (android)
        JSInterface.showToastShort(message);
    if (iphone) {
        sendBridge({"method":"showMessageShort", "message":message});
        
    }
}

function showToastLong(message) {
    if (android) 
        JSInterface.showToastLong(message);
    if (iphone) { 
        sendBridge({"method":"showMessageShort", "message":message});
    }
}


function showDialog(alertMessage) {
    if (android) {
        JSInterface.showDialog(alertMessage);
    }
    if (iphone) {
        sendBridge({"method":"showDialog", "message":alertMessage});
    }

    if(remoteDebug) { 
        console.log("showDialog");
    }   
}

function showThatDialog(alertMessage) {
    if (android) {        
        JSInterface.showThatDialog(alertMessage);        
    }
    else if (iphone) {
        sendBridge({"method":"showDialog", "message":alertMessage});
    }
    else if(mozilla) {
        console.log(alertMessage);
    }
}

function closeDialog() {
    if (android) {
        JSInterface.closeDialog();
    }
    if (iphone) {
        sendBridge({"method":"closeDialog"});
    }
    if(remoteDebug) { 
        console.log("closeDialog");
    }        
}

function clearHistory() {
    if (android)
        JSInterface.clearHistory()
}
function closeKeyboard() {
    if (android)
        JSInterface.closeKeyboard()
}

function openMap(xPoint, yPoint, label) {
    if (android)
        JSInterface.openMap(xPoint, yPoint, label);
    if (iphone)
        sendBridge({"method":"openMap", "xPoint":xPoint, "yPoint":yPoint, "label":label});

    if(!android && !iphone) {
        window.parent.showAlert("Önizleme ekranında bu özellik çalışmamaktadır.");
    }
}

function openLocation(location) {
    var url = 'https://maps.google.com/maps?q=' + location + '&num=1&t=h&z=15';
    openBrowser('maps', url);
}

function openBrowser(service, url) {	
    if (android) {
        if (typeof JSInterface.openBrowser == 'function') { 
            JSInterface.openBrowser(url);       
        }
        else if (typeof JSInterface.myBrowser == 'function') { 
            JSInterface.myBrowser(url);       
        }
    }         
    else if (iphone)
        sendBridge({"method":"openBrowser", "service":service, "url":url});

    if(!android && !iphone) {
        window.parent.showAlert("Önizleme ekranında bu özellik çalışmamaktadır.");
    }
}

function feedsURL(url) {
		
    if (android) {   
        if (typeof JSInterface.openBrowser == 'function') { 
            JSInterface.openBrowser(url);       
        }
        else if (typeof JSInterface.myBrowser == 'function') { 
            JSInterface.myBrowser(url);       
        }
    }
    else if (iphone) {
        sendBridge({"method":"feedsURL", "url":url});
    }
    
    if(!android && !iphone) {
        window.parent.showAlert("Önizleme ekranında bu özellik çalışmamaktadır.");
    }
}

function mySocial(service, url) {
        
    if (android) {   
        if (typeof JSInterface.mySocial == 'function') { 
            JSInterface.mySocial(service, url);       
        }
        else if (typeof JSInterface.openBrowser == 'function') { 
            JSInterface.openBrowser(url);       
        }
    }
    else if (iphone) {
        sendBridge({"method":"openBrowser", "service":service, "url":url});
    }
    
    if(!android && !iphone) {
        window.parent.showAlert("Önizleme ekranında bu özellik çalışmamaktadır.");
    }
}

function call(number) {
    if (android)
        JSInterface.call(number);
    if (iphone)
        sendBridge({"method":"call", "number":number});

    if(!android && !iphone) {
        window.parent.showAlert("Önizleme ekranında bu özellik çalışmamaktadır.");
    }
}

function email(email, title) {
    if (android)
        JSInterface.email(email, title);
    if (iphone)
        sendBridge({"method":"email", "email":email, "title":title});

    if(!android && !iphone) {
        window.parent.showAlert("Önizleme ekranında bu özellik çalışmamaktadır.");
    }
}

function browserRefresh() {
    if (android)
        JSInterface.browserRefresh();
    if (iphone)
        sendBridge({"method":"browserRefresh"});
}

function checkSetting(rel,set){
	if(android)
		JSInterface.checkSetting(rel,set);
	if(iphone) 
        sendBridge({"method":"checkSetting", "rel":rel, "set":set});
}

function setSetting(){
        
        showToastLong('Uygulama Hazirlaniyor. Bekleyiniz.');

        setTimeout('checkSetting(\'facebook\', 1);', 2000);
        setTimeout('checkSetting(\'twitter\', 1);', 4000);
        setTimeout('checkSetting(\'instagram\', 1);', 6000);    
}

function goBack() {
    if (android) {
        window.self.history.back();
    }
    else if (iphone) {
        sendBridge({"method":"goBack"});
    }

    if(!android && !iphone) {
        window.parent.showAlert("Önizleme ekranında bu özellik çalışmamaktadır.");
    }
}

function restart() {
    if (android) JSInterface.restart();
}


function trackPageView(page) {
    if (android) {
        //JSInterface.trackPageView(page);
    }
    if (iphone) {
        //sendBridge({"method":"trackPageView", "page":page});
    }

    if(remoteDebug) { 
        console.log("trackPageView:"+page);
    }   
}