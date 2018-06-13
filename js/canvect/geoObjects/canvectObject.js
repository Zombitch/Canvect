function CVObject(){
  var self = this;
  this.name = null;
  this.strokeColor = null;
  this.fillColor = null;
  this.show = null;
  this.glowColor = null;

  CVBaseObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.baseInit = function(){
    this.attributes = Object.create(null);
    this.type = CVObjectType.OBJECT();
    this.show = true;
  }

  /**
  * Set object name
  * @param name
  */
  this.setName = function(name){
    this.name = name;
  }

  /**
  * Get object name
  * @return name
  */
  this.getName = function(){
    return this.name;
  }

  /**
  * Set object show
  * @param show
  */
  this.setShow = function(show){
    this.show = show;
  }

  /**
  * Get object show
  * @return show
  */
  this.getShow = function(){
    return this.show;
  }

  /**
  * Set stroke color
  * @param color
  */
  this.setStrokeColor = function(color){
    this.strokeColor = color;
  }

  /**
  * Get stroke color
  * @return color
  */
  this.getStrokeColor = function(){
    return this.strokeColor;
  }

  /**
  * Set fill color
  * @param color
  */
  this.setFillColor = function(color){
    this.fillColor = color;
  }

  /**
  * Get fill color
  * @return color
  */
  this.getFillColor = function(){
    return this.fillColor;
  }

  /**
  * Enable glowing
  * @param enable
  */
  this.setGlowColor = function(color){
    this.glowColor = color;
  }

  /**
  * Get glowing state
  * @return enableGlowing
  */
  this.getGlowColor = function(){
    return this.glowColor;
  }

  /**
  * Do things before drawing
  */
  this.preDraw = function(ctx){

    // Apply glow effect if needed
    if(this.glowColor != null){
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.glowColor;
    }
  }

  /**
  * Do thigs after drawing
  */
  this.postDraw = function(ctx){

    //Revert glowing effect
    if(this.glowColor != null){
      ctx.shadowBlur = 0;
      ctx.shadowColor = null;
    }
  }
}

CVObject.prototype = new CVBaseObject();
CVObject.prototype.constructor = CVObject;
