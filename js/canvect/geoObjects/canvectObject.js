function CVObject(){
  var self = this;
  this.name = null;
  this.strokeColor = null;
  this.fillColor = null;
  this.lineWidth = null
  this.show = null;
  this.glow = null;

  CVBaseObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.baseInit = function(){
    this.attributes = Object.create(null);
    this.type = CVObjectType.OBJECT();
    this.show = true;
    this.lineWidth = 1;
    this.glow = {
      color:null,
      intensity:0,
      maxIntensity:0
    };
  }

  /**
  * Load data from JSON
  * @param data Json data
  */
  this.load = function(data){
    var self = this;
    Object.keys(data).forEach(function (key) {
      self[key] = data[key];
    });
  }

  /**
  * Set line width
  * @param width
  */
  this.setLineWidth = function(width){
    this.lineWidth = width;
  }

  /**
  * Return line width
  */
  this.getLineWidth = function(){
    return this.lineWidth;
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
  this.setGlow = function(color, intensityValue){
    this.glow = {
      color:color,
      intensity:intensityValue,
      maxIntensity:intensityValue,
      factor : 1
    };
  }

  /**
  * Get glowing state
  * @return enableGlowing
  */
  this.getGlow = function(){
    return this.glow;
  }

  /**
  * Run glow effect system
  * @param ctx Canvas context
  */
  this.runGlowEffect = function(ctx){
    ctx.shadowBlur = this.glow.intensity;
    ctx.shadowColor = this.glow.color;

    this.glow.intensity -= this.glow.factor;

    if(this.glow.intensity == 0 || this.glow.intensity == this.glow.maxIntensity){
      this.glow.factor *= -1;
    }
  }

  /**
  * Stroke and fill the path
  * @param ctx Canvas context
  */
  this.applyColor = function(ctx){
    if(this.strokeColor != null){
      ctx.strokeStyle = this.strokeColor;
      ctx.stroke();
    }

    if(this.fillColor != null){
      ctx.fillStyle = this.fillColor;
      if(this.glow.color != null) this.runGlowEffect(ctx);
      ctx.fill();
    }
  }

  /**
  * Clear some value before drawing
  * @param ctx Canvas context
  */
  this.preDraw = function(ctx){
    ctx.shadowBlur = null;
    ctx.shadowColor = null;
  }
}

CVObject.prototype = new CVBaseObject();
CVObject.prototype.constructor = CVObject;
