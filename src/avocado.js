(function() { 'use strict';

  /**
   * Avocado Class constructor
   */
  var Avocado = function() {
    this.initialize();
  };

  Avocado.prototype.initialize = function() {
    this.targeting = {};
  };

  /**
   * _parseTargetValues
   * type: private
   * description: Adjusts the value to be accessible by Avocado's key/value 
   * targeting methods
   */ 
  Avocado.prototype._parseTargetValues = function(value) {
    if(!value) {
      return false;
    }

   if(Array.isArray(value)) {
      return value;
    }

    if(typeof value === 'string') {
      value = value.replace(' ', '').split(',');
      return value;
    }

    if(typeof value === 'number') {
      return [].push(value);
    }

    return false;
  };


  /**
   * setTargeting
   * type: public
   * description: Used to set key/value targeting keywords for units
   */ 
  Avocado.prototype.setTargeting = function(key, value) {
    var values = this._parseTargetValues(value);

    if(!key | !values) {
      return false;
    }

    if(!this.targeting[key]) {
      this.targeting[key] = {
        key: key,
        values: values
      };
    } else {
      this.targeting[key].values = [].concat(this.targeting[key].values, values);
    }

    return this.targeting[key];
  };

  // Starting up Avocado!
  window.Avocado = new Avocado();
})();
