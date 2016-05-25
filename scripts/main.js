//Events
$('#start_1').on('click', function() {
   timer1.startChrono();
});

$('#start_2').on('click', function() {
    timer2.startChrono();
});

$('#stop_1').on('click', function() {
    timer1.stopChrono();
});

$('#stop_2').on('click', function() {
    timer2.stopChrono();
});

$('#pause_2').on('click', function() {
    timer2.pauseChrono();
});

$('#start_3').on('click', function() {
   timer3.startChrono();
});

$('#stop_3').on('click', function() {
    timer3.stopChrono();
});

//Callbacks
var callbackWhenCountdownStop = function() {
    $('#callback_countdown').css('display', 'block');
}

//TIMERS DEFINITIONS
var timer1 = new ChronoJs(),
    timer2 = new ChronoJs(),
    timer3 = new ChronoJs();

timer1.initialize({
    'options': {
        'forward': true,
        'elementDom': '#timer_without_seconds',
        'seconds': false
    }
});

timer2.initialize({
    'options': {
        'forward': true,
        'elementDom': '#timer_with_seconds',
        'seconds': true
    }
});

timer3.initialize({
    'options': {
        'forward': false,
        'elementDom': '#forward_timer_in_seconds',
        'seconds': false,
        'timeStart': 30, //Seconds to 0
        'callback': callbackWhenCountdownStop
    }
});