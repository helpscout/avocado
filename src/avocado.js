(function() { 'use strict';

  /**
   * AvocadoUnit Class constructor
   */
  var AvocadoUnit = function(options) {
    // Default attributes
    this.Avocado = false;
    this.el = false;

    this.options = {
      id: false,
      content: false
    };

    this.initialize(options);
  };

  /**
   * initialize
   * Type: Public
   * Description: Creates the individual promo unit!
   */
  AvocadoUnit.prototype.initialize = function(options) {
    // Extend the unit's default options
    this.options = this._extend(this.options, options);

    this.Avocado = this.options.Avocado;
    var id = this.options.id;

    // Avocado and options.id is required
    if (!this.Avocado || !id) {
      return false;
    }

    // Defining the DOM element
    this.getEl();

    // DOM element required
    if (!this.el) {
      return false;
    }

    // Render the unit's content into the DOM
    this.render();

    return this;
  };

  /**
   * _extend
   * Type: Private
   * Description: Native shallow extend method for objects used in AvocadoUnit.
   */
  AvocadoUnit.prototype._extend = function(object) {
    // Define default object
    object = object || {};

    if (typeof object !== 'object') {
      object = {};
    }

    // Native object extending
    for (var i = 1; i< arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          object[key] = arguments[i][key];
        }
      }
    }

    return object;
  };

  /**
   * _hasTargetKey
   * Type: Private
   * Description: Loops through the targeting key/value pairs set on Avocado
   * and the individual unit to determine a match.
   */
  AvocadoUnit.prototype._hasTargetKey = function(key) {
    var self = this;
    var status = false;
    var targeting = self.Avocado.targeting[key];
    var unitTargeting = self.options.targeting[key];

    if (!targeting || !targeting.values) {
      return status;
    }

    // Reassign targeting to get values
    targeting = targeting.values;

    // Normalize unit targeting
    if (typeof unitTargeting === 'string') {
      unitTargeting = unitTargeting.toLowerCase().split(',');
    }

    unitTargeting.forEach(function(value) {
      if (targeting.indexOf(value) <= -1) {
        return;
      }
      status = true;
    });

    return status;
  };


  /**
   * createEl
   * Type: Public
   * Description: Creates the avocado unit if $el method is initialized
   */
  AvocadoUnit.prototype.createEl = function(query) {
    var _el;
    var _parent;
    var unitElement;

    if (!query) {
      return false;
    }
  
    // Get the target element from the DOM
    _el = document.querySelector(query);
    if (!_el) {
      return false;
    }
    
    // Creating the new unit
    var unitElement = document.createElement('div');
    unitElement.setAttribute('data-avocado-unit-id', this.options.id);

    // Inserting it after the specified target
    _parent = _el.parentNode;

    if (_parent.lastChild === _el) {
      _parent.appendChild(unitElement);
    } else {
      _parent.insertBefore(unitElement, _el.nextSibling);
    }
  
    // Returning the newly created unit
    return unitElement;
  };

  /**
   * getEl
   * Type: Public
   * Description: Creates / defines the element to target in the DOM
   */
  AvocadoUnit.prototype.getEl = function() {
    // Targeting method 1:
    // jQuery-like targeting
    if (this.options.$el && typeof this.options.$el === 'string') {
      this.el = this.createEl(this.options.$el);
    }

    // Targeting method 2:
    // Finding the avocado ID
    if (this.options.id && typeof this.options.id === 'string') {
      this.el = document.querySelector('[data-avocado-unit-id="' + this.options.id + '"]');
    }


    return this.el;
  };


  /**
   * isActive
   * Type: Public
   * Description: Returns a boolean to indicate if the AvocadoUnit is valid.
   */
  AvocadoUnit.prototype.isActive = function() {
    return this.el && this.options.id;
  };

  /**
   * isTargeted
   * Type: Public
   * Description: Returns a boolean that indicates if the AvocadoUnit
   * can be rendered based on targeting values.
   */
  AvocadoUnit.prototype.isTargeted = function() {
    // Avocado is required
    if(!this.Avocado) {
      return false;
    }

    var status = false;
    var targeting = this.options.targeting;

    // No targeting set on Avocado
    // In this case, always render
    if(!targeting) {
      status = true;
      return status;
    }
    // Cross check all targeting values set on Avocado and the specific unit
    for (var key in targeting) {
      status = this._hasTargetKey(key);
    }

    return status;
  };

  /**
   * render
   * Type: Public
   * Description: Injects the Unit's content into the DOM, if applicable.
   */
  AvocadoUnit.prototype.render = function() {
    var el = this.el;
    var content = this.options.content;

    if(!el) {
      return false;
    }

    if(this.isTargeted()) {
      // Rendering the content into the DOM
      el.innerHTML = content;
    }

    return this;
  };



  /**
   * Avocado Class constructor
   */
  var Avocado = function() {
    // Default attributes
    this.targeting = {};
    this.units = [];

    this.initialize();
  };

  /**
   * initialize
   * type: public
   * description: Createes Avocado!
   */
  Avocado.prototype.initialize = function() {
    return this;
  };

  /**
   * _parseTargetValues
   * type: private
   * description: Adjusts the value to be accessible by Avocado's key/value
   * targeting methods.
   */
  Avocado.prototype._parseTargetValues = function(value) {
    if (!value) {
      return false;
    }

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'string') {
      value = value.toLowerCase().split(',');
      return value;
    }

    if (typeof value === 'number') {
      return [].push(value);
    }

    return false;
  };


  /**
   * setTargeting
   * type: public
   * description: Used to set key/value targeting keywords for units.
   */
  Avocado.prototype.setTargeting = function(key, value) {
    var values = this._parseTargetValues(value);

    if (!key | !values) {
      return false;
    }

    // Normalize the key
    key = key.toLowerCase;

    if (!this.targeting[key]) {
      this.targeting[key] = {
        key: key,
        values: values
      };
    } else {
      this.targeting[key].values = [].concat(this.targeting[key].values, values);
    }

    return this.targeting[key];
  };


  /**
   * defineUnit
   * type: public
   * description: Creates a promo unit and adds it to the unit collection.
   */
  Avocado.prototype.defineUnit = function(options) {
    if(!options || typeof options !== 'object') {
      return false;
    }

    options.Avocado = this;

    // Create the unit
    var unit = new AvocadoUnit(options);

    // Add unit to the unit collection
    if(unit && unit.isActive()) {
      this.units.push(unit);
    }

    // Returning the unit
    return unit;
  };


  // Starting up Avocado!
  window.Avocado = new Avocado();
})();
