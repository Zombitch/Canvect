function CVTransformPoint(){
  var self = this;
  this.x = null;
  this.y = null;

  CVBaseObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.setXY(0, 0);
  }

  /**
  *  Set X position
  * @param posX
  */
  this.setX = function(posX){
    this.x = posX;
  }

  /**
  *  Get X position
  * @return posX
  */
  this.getX = function(){
    return this.x;
  }

  /**
  *  Set Y position
  * @param posY
  */
  this.setY = function(posY){
    this.y = posY;
  }

  /**
  *  Get Y position
  * @return posY
  */
  this.getY = function(){
    return this.y;
  }

  /**
  *  Set both X and Y position
  * @param posX
  * @param posY
  */
  this.setXY = function(posX, posY){
    this.y = posY;
    this.x = posX;
  }
}

CVTransformPoint.prototype = new CVBaseObject();
CVTransformPoint.prototype.constructor = CVTransformPoint;
