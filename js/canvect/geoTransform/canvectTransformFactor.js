function CVTransformFactor(){
  var self = this;
  this.value = null;
  this.startValue = null;
  this.tmpValue = null;

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
    this.tmpValue = new CVTransformPoint();
    this.tmpValue.init();
  }

  /**
  * Set the value factor
  * @param CVTransformPoint
  */
  this.setValue = function(x, y){
    this.value.setXY(x, y);
  }

  /**
  * Get the value factor
  * @param x
  * @param y
  */
  this.getValue = function(){
    return this.value;
  }

  /**
  * Set the temporary value factor
  * @param CVTransformPoint
  */
  this.setTmpValue = function(x, y){
    this.tmpValue.setXY(x, y);
  }

  /**
  * Get the temporary value factor
  * @param x
  * @param y
  */
  this.getTmpValue = function(){
    return this.tmpValue;
  }

  /**
  * Set the start value factor
  * @param x
  * @param y
  */
  this.setStartValue = function(x, y){
    this.startValue.setXY(x, y);
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
