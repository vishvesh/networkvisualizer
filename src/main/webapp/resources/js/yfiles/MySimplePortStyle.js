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
   * This class is an example of a custom port style based on the {@link yfiles.drawing.SimpleAbstractPortStyle} class.
   * The port is rendered as a circle.
   * @class demo.yfiles.graph.simplecustomstyle.MySimplePortStyle
   * @augments yfiles.drawing.SimpleAbstractPortStyle
   */
  /*public*/ exports.MySimplePortStyle = new yfiles.ClassDefinition(function() {
    /** @lends demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.prototype */
    return {
      '$extends': yfiles.drawing.SimpleAbstractPortStyle,
      
      'constructor': function() {
        yfiles.drawing.SimpleAbstractPortStyle.call(this, yfiles.drawing.EllipseVisual.$class);
      },
      
      /** @return {yfiles.drawing.EllipseVisual} */
      'createVisual': function(/*yfiles.graph.IPort*/ port, /*yfiles.drawing.IRenderContext*/ renderContext) {
        // create the ellipse
        var /*yfiles.drawing.EllipseVisual*/ visual = new yfiles.drawing.EllipseVisual.FromRectangleBounds(new yfiles.geometry.Rectangle(0, 0, demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.WIDTH, demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.HEIGHT));
        visual.setBrush(null, renderContext);
        visual.setPen(demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.ELLIPSE_STROKE, renderContext);
        // and arrange it
        var /*yfiles.geometry.PointD*/ location = yfiles.geometry.PointD.add(port.location.toPoint(), new yfiles.geometry.PointD(-demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.WIDTH * 0.5, -demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.HEIGHT * 0.5));
        visual.transform = new yfiles.geometry.Matrix2D.FromValues(1, 0, 0, 1, location.x, location.y);
        return visual;
      },
      
      /** @return {yfiles.drawing.EllipseVisual} */
      'updateVisual': function(/*yfiles.graph.IPort*/ port, /*yfiles.drawing.IRenderContext*/ renderContext, /*yfiles.drawing.EllipseVisual*/ oldVisual) {
        // arrange the old ellipse
        var /*yfiles.geometry.PointD*/ location = yfiles.geometry.PointD.add(port.location.toPoint(), new yfiles.geometry.PointD(-demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.WIDTH * 0.5, -demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.HEIGHT * 0.5));
        oldVisual.transform = new yfiles.geometry.Matrix2D.FromValues(1, 0, 0, 1, location.x, location.y);
        return oldVisual;
      },
      
      /**
       * Calculates the bounds of this port.
       * These are also used for arranging the visual, hit testing, visibility testing, and marquee box tests.
       */
      'getBounds': function(/*yfiles.graph.IPort*/ port, /*yfiles.canvas.ICanvasContext*/ canvasContext) {
        return yfiles.geometry.RectD.fromCenter(port.location.toPoint(), new yfiles.geometry.SizeD(demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.WIDTH, demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.HEIGHT));
      },
      
      /** @lends demo.yfiles.graph.simplecustomstyle.MySimplePortStyle */
      '$static': {
        /**
         * @type yfiles.system.Pen
         * @private
         */
        'ELLIPSE_STROKE': null,
        
        /**
         * the size of the port rendering - immutable
         * @type int
         * @private
         */
        'WIDTH': 4,
        
        /**
         * @type int
         * @private
         */
        'HEIGHT': 4,
        
        '$clinit': function() {
          demo.yfiles.graph.simplecustomstyle.MySimplePortStyle.ELLIPSE_STROKE = new yfiles.system.Pen.FromBrush(new yfiles.system.SolidColorBrush(yfiles.system.Color.fromArgb(80, 255, 255, 255)));
        }
        
      }
    };
  })


});});
