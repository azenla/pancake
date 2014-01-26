(function(toApplyTo, objName) {
   "use strict";
   
   /* Check for jQuery in context */
   if (!("jQuery" in window))
      throw new Error("Pancake requires jQuery.");
      
   /* Begin Pan Component */
   
   /**
    * Implementation of String.contains()
    */
   String.prototype.contains = function(text) {
      return this.indexOf(text) !== -1;
   };
   /* End Pan Component */
   
   /* Begin Batter Component */
   var pancake = toApplyTo[objName] = {};

   /**
    * Create a Getter for an Object
    */
   pancake.createGetter = function(obj) {
      return function() {
         return obj;
      };
   };

   /**
    * Speech Recognition Helper
    */
   pancake.Speech = function() {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
      if (!window.SpeechRecognition)
         throw new Error("Speech Recognition not available.");
      var handler = null;

      this.handler = function(val) {
         if (val)
            handler = val;
         else
            return handler;
      };

      var recognition = new window.SpeechRecognition();
      
      recognition.continuous = true;
      
      recognition.lang = navigator.language;
      
      recognition.onresult = function(event) {
         var results = event.results;
         var result = results[0][0].transcript;
         if (handler)
            handler(result);
      };

      this.error = function(val) {
         recognition.onerror = val;
      };

      this.start = function(val) {
         recognition.onstart = val;
         recognition.start();
      };
      
      this.stop = function(val) {
         recognition.onstop = val;
         recognition.stop();
      };
      
      this.recognizer = pancake.createGetter(recognition);
   };

   /**
    * Speak text using Web Speech API
    */
   pancake.speak = function(text, options) {
      if (!("speechSynthesis" in window)) {
         throw new Error("Speech Syntehesis not Supported");
      }
      options = options ? options : {
         lang: navigator.language
      };
      var utterance = new window.SpeechSynthesisUtterance(text);
      var keys = Object.keys(options);
      for (var i = 0; i < keys.length; i++)
         utterance[keys[i]] = options[keys[i]];
      window.speechSynthesis.speak(utterance);
   };

   /**
    * Get Current Time
    */
   pancake.time = function() {
      return new Date().getTime();
   };

   /**
    * User Agent Information
    */
   pancake.userAgent = function() {
      return {
         agent: navigator.userAgent,
         vendor: navigator.vendor,
         platform: navigator.platform,

      };
   };

   /**
    * Detect Brower Name using navigator.* APIs
    */
   pancake.browserName = function() {
      if (navigator.userAgent.contains("Chrome/") && navigator.vendor.contains("Google"))
         return "Chrome";
      else if (navigator.userAgent.contains("Firefox"))
         return "Firefox";
      else if (navigator.userAgent.contains("MSIE") || navigator.userAgent.contains("Trident"))
         return "IE";
      else if (navigator.userAgent.contains("Opera"))
         return "Opera";
      else if (navigator.userAgent.contains("Safari"))
         return "Safari";
      else
         return "Unknown";
   };

   /**
    * Pancake Browser Detection
    */
   pancake.browser = function(browserName) {
      var info = {
         name: pancake.browserName(),
         platform: navigator.platform,
         vendor: navigator.vendor,
         version: "Unknown"
      };
      
      if (browserName)
         return info.name.toLowerCase() === browserName.toLowerCase();
         
      if (info.name === "Chrome") {
         info.version = navigator.appVersion.match(/Chrome\/(.*?) /)[1];
         info.webkitVersion = navigator.appVersion.match(/AppleWebKit\/(.*?) /)[1];
      } else if (info.name === "Firefox") {
         info.version = navigator.appVersion.match(/Firefox\/(.*?) /)[1];
      } else if (info.name === "Safari") {
         info.version = navigator.appVersion.match(/Safari\/(.*?) /)[1];
         info.webkitVersion = navigator.appVersion.match(/AppleWebKit\/(.*?) /)[1];
      }
      
      return info;
   };

   /**
    * Find all objects in an array that are considered true.
    */
   pancake.findAll = function(a) {
      var all = [];
      for (var i = 0; i < a.length; i++) {
         if (a[i])
            all.push(a[i]);
      }
   };
   
   /**
    * Create a new Speech Accessor
    */
   pancake.speech = function() {
      return new pancake.Speech();
   };
   
   /**
    * HTML Import API
    */
   pancake.import = function(url) {
      if (!("import" in document.createElement("link")))
         throw new Error("HTML Imports not Supported");
      var link = document.createElement("link");
      link.rel = "import";
      link.href = url;
      document.head.appendElement(link);
   };

   /**
    * Play Audio Files
    */
   pancake.playAudio = function(url) {
      var audio = new Audio();
      audio.setAttribute("src", url);
      audio.setAttribute("controls", "");
      audio.play();
      return $(audio);
   };
   
   pancake.createWorker = function(script) {
      return new Worker(script);
   };
   /* End Batter Component */

   /* Begin Syrup Component */
   (function(obj) {
      obj.rotate = function(degrees) {
         var e = $(this);
         e.css("transition", "all 1s");
         e.css("transform", "rotateY(" + degrees + "deg)");
         setTimeout(function() {
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
   })(window.jQuery.fn);
   /* End Syrup Component */
   
   /* Begin Butter Component */
   /* End Butter Component */
})(window, "pancake");