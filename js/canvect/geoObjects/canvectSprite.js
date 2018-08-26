function CVSprite(){
  var self = this;
  this.lineSize = null;
  this.columnSize = null;
  this.currentFrame = null;
  this.frameSpeed = null;
  this.direction = null;
  this.animate = null;
  this.aimingLocation = null; //Where the sprite should be placed / moved
  this.imageScaling = null;

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
    this.aimingLocation = {x:0, y:0};
    this.imageScaling = {x:1, y:1};
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
  this.setDirection = function(dir){
    this.direction = dir;
  }

  /**
  * Scale the image if needed
  */
  this.setImageScaling = function(x, y){
    this.imageScaling.x = x;
    this.imageScaling.y = y;
  }

  /**
  * Set sprite aiming location
  */
  this.setAimingLocation = function(x, y){
    this.aimingLocation.x = x;
    this.aimingLocation.y = y;
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
      ctx.drawImage(this.image, (this.currentFrame*spriteElementWidth), (this.direction*spriteElementHeight), spriteElementWidth, spriteElementHeight, this.x, this.y, spriteElementWidth*this.imageScaling.x, spriteElementHeight*this.imageScaling.y);

      if(this.animate){
        this.currentFrame += this.frameSpeed;
        if(this.currentFrame >= this.columnSize) this.currentFrame = 0;

        if(this.x > this.aimingLocation.x) this.x--;
        else if(this.x < this.aimingLocation.x) this.x++;
        if(this.y > this.aimingLocation.y) this.y--;
        else if(this.y < this.aimingLocation.y) this.y++;
        if(Math.round(this.y) == Math.round(this.aimingLocation.y) && Math.round(this.x) == Math.round(this.aimingLocation.x)){
          this.y = this.aimingLocation.y;
          this.x = this.aimingLocation.x;
          this.animate = false;
          this.currentFrame = 0;
        }
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

  /**
  * Move the sprite to indicated coordinates
  */
  this.moveTo = function(x, y){
    this.aimingLocation.x = x;
    this.aimingLocation.y = y;
    this.currentFrame = 0;
    this.animate = true;
  }
}

CVImage.prototype = new CVImage();
CVImage.prototype.constructor = CVSprite;
