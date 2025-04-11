var log_prefix = "GCX widget-plugin: ";
var bPlay = false;
var v_firstName= "";
var v_lastName= "";
var v_customerEmail= "";
var v_customerPhone= "";

  (function (g, e, n, es, ys) {


    g['_genesysJs'] = e;
    console.log('G ' + g.toString());

    g[e] = g[e] || function () {
      console.log('before push');
      (g[e].q = g[e].q || []).push(arguments)
      console.log('after push ' + arguments);

    };
    g[e].t = 1 * new Date();
    g[e].c = es;
    ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
  })(window, 'Genesys', 'https://apps.mypurecloud.ie/genesys-bootstrap/genesys.min.js', {
    environment: 'prod-euw1',
    deploymentId: '5a3fc715-79f9-47ba-808c-5184b7d66e54',
    debug: false
  });

  Genesys("subscribe", "Launcher.ready" , function(o){
    console.log(log_prefix + ' The queue works. Launcher Ready');
   });

Genesys("subscribe", "Launcher.visible", function(){console.log(log_prefix + ' Launcher Visible');});

Genesys("subscribe", "Launcher.hidden", function(){console.log(log_prefix + ' Launcher Hidden');});

Genesys("subscribe", "Conversations.ready", function(){
    v_firstName= cx_getElement("nome");
    v_lastName= cx_getElement("cognome");
    v_customerEmail= cx_getElement("email");
    v_customerPhone= cx_getElement("telefono");
    Genesys("command", "Database.set", {
    messaging: { customAttributes:
       { firstName: v_firstName,
         lastName: v_lastName,
         customerEmail: v_customerEmail,
         customerPhone: v_customerPhone }}},
    function(data){ /* fulfilled, returns data */}, function(){ /* rejected */ });
    console.log(log_prefix + ' Conversation Ready');
});


Genesys("subscribe", "Conversations.opened", function(){console.log(log_prefix + ' Conversation Opened');});

Genesys("subscribe", "Conversations.started", function(){console.log(log_prefix + ' Conversation Started');});

Genesys("subscribe", "Conversations.closed", function(){console.log(log_prefix + ' Conversation Closed');});

Genesys("subscribe", "Messenger.cleared", function(){console.log(log_prefix + ' Messanger Cleared');});

Genesys("subscribe", "Messenger.closed", function(){
  console.log(log_prefix + ' Messanger Closed');
  bPlay = true;
  }
);

Genesys("subscribe", "Database.ready", function() {
  console.log(log_prefix, "Database plugin is ready.")
});

Genesys("subscribe", "Messenger.opened", function(){
  console.log(log_prefix + ' Messanger Opened');
  bPlay = false;
  }
);

Genesys("subscribe", "MessagingService.started", function({data}){
  console.log(log_prefix + ' MessagingService Started ' + data)
});


var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

Genesys("subscribe", "MessagingService.messagesReceived", function({ data }) {
    console.log(log_prefix + ' MessagingService Received ' + data);

//All arguments are optional:
    //if(bPlay) beep(250, 320, 1, "sawtooth", "");

});

Genesys("subscribe", "MessagingService.conversationCleared", function({data}){
    console.log(log_prefix + ' MessagingService conversationCleared ' + data);
    window.location.target = "_self";
    window.location.href = window.location.href;
});

Genesys("subscribe", "MessagingService.ready", function({data}){
    console.log(log_prefix + ' MessagingService Ready ' + data);
});


/*
   Genesys('subscribe', 'MessagingService.ready', () => {
     Genesys(
       'command',
       'MessagingService.sendMessage',
       { message: 'Genesys' },
       (data) => {
         data ? console.log(data) : null;
         console.log('Message sent');
       },
       (error) => {
         error ? console.log(error) : null;
         console.log('Error sending message');
       }
     );
   });
*/
Genesys("command", "Launcher.show",
{},
    function() {
      console.log(log_prefix + ' Launcher.show');
        /*fulfilled callback*/
    },
    function() {
        /*rejected callback*/
    }
);

   Genesys('subscribe', 'Messenger.ready', function () {
     console.log(log_prefix +  ' Messenger Ready');
  Genesys(
    'command',
    'Messenger.open',
    {},
    () => {
     console.log(log_prefix +  ' Messenger Opened');
    },
    (error) => {
     console.log("Couldn't open messenger.", error);
    }
  );
});


function cx_getElement(id) {
	var evalue = document.getElementById(id).value;
	console.log(log_prefix + ' ' + evalue);
	return evalue;
}

//duration of the tone in milliseconds. Default is 500
//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone
function beep(duration, frequency, volume, type, callback) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (volume){gainNode.gain.value = volume;}
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}
    if (callback){oscillator.onended = callback;}

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + ((duration || 500) / 1000));
};
