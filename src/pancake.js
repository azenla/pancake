(function (toApplyTo, name) {
   "use strict";
   if (!("jQuery" in window))
      throw new Error("pancakejs requires jQuery.");
   var pancake = toApplyTo[name] = {};

   pancake.Speech = function () {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
      if (!window.SpeechRecognition)
         throw new Error("Speech Recognition not available.");
      var handler = null;

      this.handler = function (val) {
         if (val)
            handler = val;
         else
            return handler;
      };

      var recognition = new window.SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = function (event) {
         var results = event.results;
         var result = results[0][0].transcript;
         if (handler)
            handler(result);
      };

      this.error = function (val) {
         recognition.onerror = val;
      };

      this.start = function (val) {
         recognition.onstart = val;
         recognition.start();
      };
      this.stop = function (val) {
         recognition.onstop = val;
         recognition.stop();
      };
   };

   /* Effects Access */
   pancake.applyEffects = function(obj) {
      obj.rotate = function (degrees) {
         var e = $(this);
         e.css("transition", "all 1s");
         e.css("transform", "rotateY(" + degrees + "deg)");
         setTimeout(function () {
            e.css("transform", "");
         }, 1000);
      };
      obj.tiltDown = function(degrees) {
         var e = $(this);
         e.css("transition", "all 1s");
         e.css("transform", "rotateX(-" + degrees + "deg)");
         e.data('tilted', !e.data('tilted'));
      };
      obj.tiltUp = function(degrees) {
         var e = $(this);
         e.css("transition", "all 1s");
         e.css("transform", "rotateX(" + degrees + "deg)");
         e.data('tilted', !e.data('tilted'));
      };
      obj.tiltToggle = function(degrees) {
         var e = $(this);
         if (e.data('tilted')) {
            e.tiltUp(degrees);
         } else {
            e.tiltDown(degrees);
         }
      };
   };

   pancake.speak = function (text, options) {
      if (!("speechSynthesis" in window)) {
         throw new Error("Speech Syntehesis not Supported");
      }
      options = options ? options : {
         lang: navigator.language
      };
      var utterance = new window.SpeechSynthesisUtterance(text);
      var keys = Object.keys(options);
      for (var i = 0; i < keys.length; i++) {
         var key = keys[i];
         utterance[key] = options[key];
      }
      window.speechSynthesis.speak(utterance);
   };

   /* Get Current Time */
   pancake.time = function () {
      return new Date().getTime();
   };

   pancake.userAgent = function () {
      var agent = navigator.userAgent;
      return {
         agent: agent,
         vendor: navigator.vendor,
         platform: navigator.platform
      };
   };

   /**
    * Different Browsers have different ways to detect information.
    */
   pancake.browser = function () {
      if (navigator.userAgent.indexOf("Chrome/") !== -1 && navigator.vendor.indexOf("Google") !== -1)
         return "Chrome";
      else if (navigator.userAgent.indexOf("Firefox") !== -1)
         return "Firefox";
      else if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.indexOf("Trident") !== -1)
         return "IE";
      else if (navigator.userAgent.indexOf("Opera") !== -1)
         return "Opera";
      else
         return "Unknown";
   };

   /**
    * Find all objects in an array that are considered true.
    */
   pancake.findAll = function (a) {
      var all = [];
      for (var i = 0; i < a.length; i++) {
         if (a[i])
            all.push(a[i]);
      }
   };

   /* jQuery Integration */
   pancake.applyEffects(window.jQuery.fn);

   /* Shortcut to new pancake.Speech() */
   pancake.speech = function () {
      return new pancake.Speech();
   };

   pancake.playAudio = function(url) {
      var audio = new Audio();
      audio.setAttribute("src", url);
      audio.setAttribute("controls", "");
      audio.play();
      return $(audio);
   };
})(window, "pancake");