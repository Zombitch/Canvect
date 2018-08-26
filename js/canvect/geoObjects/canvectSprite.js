function CVSprite(){
  var self = this;
  this.lineSize = null;
  this.columnSize = null;
  this.currentFrame = null;
  this.frameSpeed = null;
  this.direction = null;
  this.animate = null;

  CVImage.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.type = CVObjectType.IMAGE();
    this.image = new Image();
    this.currentFrame = 0;
    this.direction = 0;
    this.frameSpeed = 1;
    this.animate = false;
  }

  /**
  * Set line size
  */
  this.setLineSize = function(size){
    this.lineSize = size;
  }

  /**
  * Set sprite direction (in fact it means select the line we will display)
  */
  this.setLineSize = function(size){
    this.lineSize = size;
  }

  /**
  * Set if the sprite should animate or not
  */
  this.setAnimate = function(shouldAnimate){
    this.animate = shouldAnimate;
  }

  /**
  * Set current frame
  */
  this.setCurrentFrame = function(frame){
    this.currentFrame = frame;
  }

  /**
  * Set frame speed
  */
  this.setFrameSpeed = function(frameSpeed){
    this.frameSpeed = frameSpeed;
  }

  /**
  * Set colomn size
  */
  this.setColumnSize = function(size){
    this.columnSize = size;
  }

  /**
  * Stop animating the sprite and display given frame
  */
  this.stopAtFrame = function (frameNumber){
    this.animate = false;
    this.currentFrame = frame;
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
      var spriteElementWidth = (this.image.width / this.columnSize);
      var spriteElementHeight = (this.image.height / this.lineSize);
      ctx.drawImage(this.image, (this.currentFrame*spriteElementWidth), (this.direction*spriteElementHeight), spriteElementWidth, spriteElementHeight, this.x, this.y, spriteElementWidth, spriteElementHeight);

      if(this.animate){
        this.currentFrame += this.frameSpeed;
        if(this.currentFrame >= this.columnSize) this.currentFrame = 0;
      }
    }
  }

  /**
  * Draw a part of CVImage on the canvas.
  * @param ctx Canvas context
  */
  this.drawCell = function(ctx, columnNumber, lineNumber){
    if(this.isImageLoaded == true){
      var spriteElementWidth = (this.image.width / this.columnSize);
      var spriteElementHeight = (this.image.height / this.lineSize);
      ctx.drawImage(this.image, columnNumber*spriteElementWidth, lineNumber*spriteElementHeight, spriteElementWidth, spriteElementHeight, this.x, this.y, spriteElementWidth, spriteElementHeight);
    }
  }
}

CVImage.prototype = new CVImage();
CVImage.prototype.constructor = CVSprite;
