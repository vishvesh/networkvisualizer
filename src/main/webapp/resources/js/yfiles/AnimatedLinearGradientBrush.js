/****************************************************************************
 **
 ** This file is part of yFiles for HTML 1.1.0.1.
 ** 
 ** yWorks proprietary/confidential. Use is subject to license terms.
 **
 ** Copyright (c) 2013 by yWorks GmbH, Vor dem Kreuzberg 28, 
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ***************************************************************************/
(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['yfiles/lang'],function(){
yfiles.module("demo.yfiles.graph.simplecustomstyle", function(exports) {
  /**
   * This class defines an animated linear gradient brush.
   * The linear gradient is interpreted globally, not in the bounding box 
   * of the edge. This is necessary since the bounding box can be empty if 
   * the edge is horizontal or vertical.
   * @class demo.yfiles.graph.simplecustomstyle.AnimatedLinearGradientBrush
   * @augments yfiles.system.LinearGradientBrush
   */
  /*public*/ exports.AnimatedLinearGradientBrush = new yfiles.ClassDefinition(function() {
    /** @lends demo.yfiles.graph.simplecustomstyle.AnimatedLinearGradientBrush.prototype */
    return {
      '$extends': yfiles.system.LinearGradientBrush,
      
      'constructor': function() {
        yfiles.system.LinearGradientBrush.call(this);
      },
      
      /**
       * the gradient offset
       * @type double
       * @private
       */
      '$offset': 0,
      
      /**
       * Overridden to set the gradient units
       */
      'toSvgGradient': function() {
        var /*SVGLinearGradientElement*/ gradient = /*(SVGLinearGradientElement)*/demo.yfiles.graph.simplecustomstyle.AnimatedLinearGradientBrush.$super.toSvgGradient.call(this);
        // set gradient units to userSpaceOnUse in order to be interpreted globally
        gradient.setAttributeNS(null, "gradientUnits", "userSpaceOnUse");

        var /*long*/ handle = 0;
        // get current timestamp
        var /*long*/ t = new Date().getTime();
        // create the animation callback
        var /*yfiles.lang.AnimationSupport.FrameRequestCallback*/ frameRequestCallback = null;
        frameRequestCallback = (function(/*long*/ time) {
          // calculate the milliseconds since the last animation frame
          var /*long*/ dt = time - t;
          t = time;
          // check if the gradient is still alive
          if (gradient.ownerDocument !== null && gradient.parentNode !== null) {
            // calculate the new offset
            this.$offset = (this.$offset + dt * demo.yfiles.graph.simplecustomstyle.AnimatedLinearGradientBrush.ANIMATION_SPEED) % 60;
            // ...and set the new transform
            gradient.setAttributeNS(null, "gradientTransform", new yfiles.geometry.Matrix2D.FromValues(1, 0, 0, 1, this.$offset, this.$offset).toSVGTransform());
            // re-start the animation
            handle = yfiles.lang.requestAnimationFrame(frameRequestCallback);
          } else {
            // if the gradient is dead, cancel the animation
            yfiles.lang.cancelRequestAnimationFrame(handle);
          }
        }).bind(this);
        // start the animation
        handle = yfiles.lang.requestAnimationFrame(frameRequestCallback);
        return gradient;
      },
      
      /** @lends demo.yfiles.graph.simplecustomstyle.AnimatedLinearGradientBrush */
      '$static': {
        /**
         * @type double
         * @private
         */
        'ANIMATION_SPEED': 0.05
        
      }
    };
  })


});});
