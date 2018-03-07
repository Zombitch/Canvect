function CVImage(){
  var self = this;
  this.filepath = null;
  this.image = null;
  this.isImageLoaded = false;

  CVObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.type = CVObjectType.IMAGE();
    this.image = new Image();
  }

  /**
  * Set filepath
  * @param filepath Path to the file image
  */
  this.setFilePath = function(filepath){
    this.filepath = filepath;
  }

  /**
  * Get filepath attributes
  * @return String Path to the file image
  */
  this.getFilePath = function(){
    return this.filepath;
  }

  /**
  * Load image into memory
  * @param filepath Path to the file image
  */
  this.loadImage = function(filepath){
    this.setFilePath(filepath);

    this.image.onload = function() {
        self.isImageLoaded = true;
        self.release();
    }

    this.image.src = this.filepath;
  }

  /**
  * Free image from memory
  */
  this.release = function(){
    URL.revokeObjectURL(this.image);
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
      ctx.drawImage(this.image,10,10);
    }
  }
}

CVImage.prototype = new CVObject();
CVImage.prototype.constructor = CVImage;
