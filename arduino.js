;(function(){
"use strict";

/**
 * socket.io
 */
var io = require("socket.io").listen(8081);


/**
 * JOHNNY-FIVE
 */
var five   = require("johnny-five"),
    board  = new five.Board(),
    angle  = 0;


/**
 * @param  {five}
 * @return {[type]}
 */
board.on("ready", function() {

  var led_11 = new five.Led(11),
      led_5  = new five.Led(5),
      sensor = new five.Sensor("A0");

  this.loop(3000, function() {
    // Whatever the last value was, write the opposite
    if( this.pins[11].value ){
      led_11.fadeOut();
      led_5.fadeIn();
    } else {
      led_11.fadeIn();
      led_5.fadeOut();
    }
  });

  angle = sensor.value;
  io.emit("onChangeColor", angle);

  sensor.scale(0, 180).on("change", function() {
    // console.log(this.value);
    angle = this.value;
    io.emit("onChangeColor", angle);
  });
});


/**
 * end no name function
 */
})();