function CVTransformFactor(){
  var self = this;
  this.value = null;
  this.startValue = null;

  CVBaseObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.value = new CVTransformPoint();
    this.value.init();
    this.startValue = new CVTransformPoint();
    this.startValue.init();
  }

  /**
  * Set the value factor
  * @param CVTransformPoint
  */
  this.setValue = function(val){
    this.value = val;
  }

  /**
  * Get the value factor
  * @return CVTransformPoint
  */
  this.getValue = function(){
    return this.value;
  }

  /**
  * Set the start value factor
  * @param CVTransformPoint
  */
  this.setStartValue = function(val){
    this.startValue = val;
  }

  /**
  * Get the start value factor
  * @return CVTransformPoint
  */
  this.getStartValue = function(){
    return this.startValue;
  }
}

CVTransformFactor.prototype = new CVBaseObject();
CVTransformFactor.prototype.constructor = CVTransformFactor;
