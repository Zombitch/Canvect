function CVSprite(){
  var self = this;
  this.lineSize = null;
  this.columnSize = null;


  CVPoint.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.type = CVObjectType.IMAGE();
    this.image = new Image();
  }

  /**
  * Set line size
  */
  this.setLineSize = function(size){
    this.lineSize = size;
  }

  /**
  * Set colomn size
  */
  this.setColumnSize = function(size){
    this.columnSize = size;
  }

  /**
  * Draw partial CVImage on the canvas.
  * @param ctx Canvas context
  */
  this.drawPartial = function(ctx){
    this.draw(ctx);
  }

  /**
  * Draw the CVImage on the canvas.
  * @param ctx Canvas context
  */
  this.draw = function(ctx){
    if(this.isImageLoaded == true){
      ctx.drawImage(this.image, this.x, this.y);
    }
  }
}

CVImage.prototype = new CVImage();
CVImage.prototype.constructor = CVSprite;
