(function(exports){

  var rucsok = function() {

  };
  var functionKeyWords = ["we", "do", "anything", "productive"];

  var propertyKeyWords = ["have", "nothing", "to"];

  propertyKeyWords.forEach(function(key) {
    rucsok.prototype[key] = new rucsok();
  });

  functionKeyWords.forEach(function(key) {
    rucsok.prototype[key] = function() { return this; }
  });

  $R = new rucsok();

  exports.rucsok = rucsok;

})(window)

;(function(rucsok){

  // helper watevers
  
  var Maybe = function(value) {

    var Nothing = {
      bind: function(fn) { 
        return this; 
      },
      isNothing: function() { 
        return fn.call(this);
      },
      val: function() { 
        throw new Error("cannot call val() nothing"); 
      },
      maybe: function(def, fn) {
        return def;
      }
    };

    var Just = function(value) { 
      return {
        bind: function(fn) { 
          return Maybe(fn.call(this, value));
        },
        isNothing: function() { 
          return false; 
        },
          val: function() { 
            return value;
          },
          maybe: function(def, fn) {
            return fn.call(this, value);
          }
        };
    };

   if (typeof value === 'undefined' ||   value === null ||  (typeof value.isNothing !== 'undefined' && value.isNothing()))
    {
      return Nothing;
    }

    return Just(value);
  };

  function createIframeFromUrl(url){
    var iframe = document.createElement('iframe');
    iframe.src = encodeURI(url);
    return iframe;    
  }

  // api

  var rucsokFactory = function(elem){

    var r = {};

    r["rucsify"] = function(options){
      
      var rucssult = Maybe(options)
        .bind(function(o){
          return o['url'];
        })
        .maybe("Valamit elszámolhattál!", function(url){
          var iframe = createIframeFromUrl(url);         
          iframe.width = elem.clientWidth;
          iframe.height = elem.clientHeight;
          elem.appendChild(iframe); 
          return "Rücsifed!";
        });        

       console.log(rucssult);
    }

    return r;

  }

  // rewrite zsquery

  window.$ = function(id){
    var elem = document.querySelector(id);
    return rucsokFactory(elem);
  }

})(window.rucsok || {});

