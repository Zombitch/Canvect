function CVRectangle(){
  var self = this;
  this.x = null;
  this.y = null;
  this.width = null;
  this.height = null;

  CVObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.type = CVObjectType.RECTANGLE();
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
  *  Set width size
  * @param w
  */
  this.setWidth = function(w){
    this.width = w;
  }

  /**
  *  Get width size
  * @return width
  */
  this.getWidth = function(){
    return this.width;
  }

  /**
  *  Set height size
  * @param h
  */
  this.setHeight = function(h){
    this.height = w;
  }

  /**
  *  Get height position
  * @return height
  */
  this.getHeight = function(){
    return this.height;
  }

  /**
  *  Set both width and height position
  * @param w
  * @param h
  */
  this.setWidthAndHeight = function(w, h){
    this.width = w;
    this.height = h;
  }

  /**
  *  Set both width and height position
  * @param w
  * @param h
  */
  this.computePositionAndSize = function(x1, y1, x2, y2){
    this.setXY(x1, y1);
    this.setWidthAndHeight(x2-x1, y2-y1);
  }

  /**
  * Check if a point is insde the rectangle or not
  * @param x X point to check
  * @param y Y point to check
  */
  this.isPointInside = function(x, y){
    return (x >= this.x && y >= this.y && x <= this.x+this.width &&  y <= this.y+this.height);
  }

  /**
  * Draw partial CVRectangle on the canvas.
  * This means the system will try to draw something with available data even if all data are not set.
  * For instance, if the rectangle does not specify width or height, then it will display a point
  * @param ctx Canvas context
  */
  this.drawPartial = function(ctx){
    this.preDraw(ctx);

    if(this.strokeColor != null){
      ctx.strokeStyle = this.strokeColor;

      //If no width or no height then just draw point
      if(this.width == null || this.height == null){
        ctx.strokeRect(this.x, this.y, 1, 1);
      }else{
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
    }

    if(this.fillColor != null){
      ctx.fillStyle = this.fillColor;
      if(this.glow.color != null) this.runGlowEffect(ctx);
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  /**
  * Draw the CVRectangle on the canvas.
  * @param ctx Canvas context
  */
  this.draw = function(ctx){
    this.preDraw(ctx);

    if(this.strokeColor != null){
      ctx.strokeStyle = this.strokeColor;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    if(this.fillColor != null){
      ctx.fillStyle = this.fillColor;
      if(this.glow.color != null) this.runGlowEffect(ctx);
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

CVRectangle.prototype = new CVObject();
CVRectangle.prototype.constructor = CVRectangle;
