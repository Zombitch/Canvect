function CVPoint(){
  var self = this;
  this.x = null;
  this.y = null;

  CVObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.type = CVObjectType.POINT();
  }

  this.isSet = function(){
    return this.x != null && this.y != null;
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

  /**
  * Check if a point is insde the rectangle or not
  * @param x X point to check
  * @param y Y point to check
  */
  this.isPointInside = function(x, y){
    return (x == this.x && y == this.y);
  }

  /**
  * Draw the CVPoint on the canvas
  * @param ctx Canvas context
  */
  this.drawPartial = function(ctx){
    this.draw(ctx);
  }

  /**
  * Draw the CVPoint on the canvas
  * @param ctx Canvas context
  */
  this.draw = function(ctx){
    if(this.strokeColor != null){
      ctx.strokeStyle = this.strokeColor;
      ctx.strokeRect(this.x, this.y, 1, 1);
    }
  }
}

CVPoint.prototype = new CVObject();
CVPoint.prototype.constructor = CVPoint;
