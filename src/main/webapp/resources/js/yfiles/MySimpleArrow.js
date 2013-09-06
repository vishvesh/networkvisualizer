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
   * @class demo.yfiles.graph.simplecustomstyle.MySimpleArrow
   * @augments yfiles.drawing.IArrow
   * @augments yfiles.drawing.IVisualCreator
   * @augments yfiles.drawing.IBoundsProvider
   */
  /*public*/ exports.MySimpleArrow = new yfiles.ClassDefinition(function() {
    /** @lends demo.yfiles.graph.simplecustomstyle.MySimpleArrow.prototype */
    return {
      
      '$with': [yfiles.drawing.IArrow, yfiles.drawing.IVisualCreator, yfiles.drawing.IBoundsProvider],
      
      /**
       * Initializes a new instance of the {@link demo.yfiles.graph.simplecustomstyle.MySimpleArrow} class.
       */
      'constructor': function() {
        this.$init();
        this.thickness = 2.0;
      },
      
      // these variables hold the state for the flyweight pattern
      // they are populated in GetPaintable and used in the implementations of the IVisualCreator interface.
      /**
       * @type yfiles.geometry.PointD
       * @private
       */
      '$anchor': null,
      
      /**
       * @type yfiles.geometry.PointD
       * @private
       */
      '$direction': null,
      
      /**
       * @type yfiles.drawing.GeneralPath
       * @private
       */
      '$arrowFigure': null,
      
      /**
       * @type double
       * @private
       */
      '$thickness': 0,
      
      // #region Constructor
      // #endregion 
      // #region Properties
      /**
       * Returns the length of the arrow, i.e. the distance from the arrow's tip to
       * the position where the visual representation of the edge's path should begin.
       * Always returns 0
       * @type double
       */
      'length': {
        '$meta': function() {
          return [yfiles.system.TypeAttribute(yfiles.lang.Number.$class)];
        },
        'get': function() {
          return 0;
        }
      },
      
      /**
       * Gets the cropping length associated with this instance.
       * Always returns 1
       * This value is used by {@link yfiles.drawing.IEdgeStyle}s to let the
       * edge appear to end shortly before its actual target.
       * @type double
       */
      'cropLength': {
        '$meta': function() {
          return [yfiles.system.TypeAttribute(yfiles.lang.Number.$class)];
        },
        'get': function() {
          return 1;
        }
      },
      
      /**
       * Backing field for below property 
       * @type double
       * @private
       */
      '$thickness1': 0,
      
      /**
       * Gets or sets the thickness of the arrow
       * @type double
       */
      'thickness': {
        '$meta': function() {
          return [yfiles.system.DefaultValueAttribute.With(2.0), yfiles.system.TypeAttribute(yfiles.lang.Number.$class)];
        },
        'get': function() {
          return this.$thickness1;
        },
        'set': function(/*double*/ value) {
          this.$thickness1 = value;
        }
      },
      
      // #endregion 
      // #region IArrow Members
      /**
       * Gets an {@link yfiles.drawing.IVisualCreator} implementation that will create
       * the {@link yfiles.drawing.ArrangeVisual} for this arrow
       * at the given location using the given direction for the given edge.
       * @param {yfiles.graph.IEdge} edge the edge this arrow belongs to
       * @param {boolean} atSource whether this will be the source arrow
       * @param {yfiles.geometry.PointD} anchor the anchor point for the tip of the arrow
       * @param {yfiles.geometry.PointD} direction the direction the arrow is pointing in
       * @return {yfiles.drawing.IVisualCreator} 
       * Itself as a flyweight.
       */
      'getPaintable': function(/*yfiles.graph.IEdge*/ edge, /*boolean*/ atSource, /*yfiles.geometry.PointD*/ anchor, /*yfiles.geometry.PointD*/ direction) {
        this.$configureThickness(edge);
        this.$anchor = anchor;
        this.$direction = direction;
        return this;
      },
      
      /**
       * Gets an {@link yfiles.drawing.IBoundsProvider} implementation that can yield
       * this arrow's bounds if painted at the given location using the
       * given direction for the given edge.
       * @param {yfiles.graph.IEdge} edge the edge this arrow belongs to
       * @param {boolean} atSource whether this will be the source arrow
       * @param {yfiles.geometry.PointD} anchor the anchor point for the tip of the arrow
       * @param {yfiles.geometry.PointD} direction the direction the arrow is pointing in
       * @return {yfiles.drawing.IBoundsProvider} 
       * an implementation of the {@link yfiles.drawing.IBoundsProvider} interface that can
       * subsequently be used to query the bounds. Clients will always call
       * this method before using the implementation and may not cache the instance returned.
       * This allows for applying the flyweight design pattern to implementations.
       */
      'getBoundsProvider': function(/*yfiles.graph.IEdge*/ edge, /*boolean*/ atSource, /*yfiles.geometry.PointD*/ anchor, /*yfiles.geometry.PointD*/ direction) {
        // Get the edge's thickness
        var tmp;
        var /*demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle*/ style = ((tmp = edge.style) instanceof demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle) ? /*(demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle)*/tmp : null;

        if (style !== null) {
          this.$thickness = style.pathThickness;
        } else {
          this.$thickness = this.thickness;
        }
        this.$anchor = anchor;
        this.$direction = direction;
        return this;
      },
      
      // #endregion 
      // #region Rendering
      /**
       * This method is called by the framework to create a {@link yfiles.drawing.ArrangeVisual}
       * that will be included into the {@link yfiles.drawing.IRenderContext}.
       * @param {yfiles.drawing.IRenderContext} ctx The context that describes where the visual will be used.
       * @return {yfiles.drawing.Visual} 
       * The arrow visual to include in the canvas object visual tree./>.
       * @see demo.yfiles.graph.simplecustomstyle.MySimpleArrow#updateVisual
       */
      'createVisual': function(/*yfiles.drawing.IRenderContext*/ ctx) {
        // Create a new Path to draw the arrow
        if (this.$arrowFigure === null) {
          this.$arrowFigure = new yfiles.drawing.GeneralPath();
          this.$arrowFigure.moveTo(new yfiles.geometry.PointD(7, -this.$thickness / 2));
          this.$arrowFigure.lineTo(new yfiles.geometry.PointD(7, this.$thickness / 2));
          this.$arrowFigure.cubicTo(new yfiles.geometry.PointD(5, this.$thickness / 2), new yfiles.geometry.PointD(1.5, this.$thickness / 2), new yfiles.geometry.PointD(-1, this.$thickness * 1.666));
          this.$arrowFigure.cubicTo(new yfiles.geometry.PointD(0, this.$thickness * 0.833), new yfiles.geometry.PointD(0, -this.$thickness * 0.833), new yfiles.geometry.PointD(-1, -this.$thickness * 1.666));
          this.$arrowFigure.cubicTo(new yfiles.geometry.PointD(1.5, -this.$thickness / 2), new yfiles.geometry.PointD(5, -this.$thickness / 2), new yfiles.geometry.PointD(7, -this.$thickness / 2));
          this.$arrowFigure.close();
        }

        var /*yfiles.drawing.PathVisual*/ p = new yfiles.drawing.PathVisual.FromPathTransformAndFillMode(this.$arrowFigure, null, yfiles.drawing.FillMode.ALWAYS);
        p.setBrush(demo.yfiles.graph.simplecustomstyle.MySimpleArrow.PATH_FILL, ctx);

        // Remember thickness for update
        p.setRenderDataCache(new demo.yfiles.graph.simplecustomstyle.MySimpleArrow.RenderDataCache(this.$thickness));

        // Rotate arrow and move it to correct position
        //      p.Transform = new Matrix2D(direction.X, direction.Y, -direction.Y, direction.X, anchor.X, anchor.Y);
        p.transform = new yfiles.geometry.Matrix2D.FromValues(-this.$direction.x, this.$direction.y, -this.$direction.y, -this.$direction.x, this.$anchor.x, this.$anchor.y);
        return p;
      },
      
      /**
       * This method updates or replaces a previously created {@link yfiles.drawing.ArrangeVisual} for inclusion
       * in the {@link yfiles.drawing.IRenderContext}.
       * The {@link yfiles.canvas.CanvasControl} uses this method to give implementations a chance to
       * update an existing Visual that has previously been created by the same instance during a call
       * to {@link demo.yfiles.graph.simplecustomstyle.MySimpleArrow#createVisual}. Implementation may update the <code>oldVisual</code>
       * and return that same reference, or create a new visual and return the new instance or <code>null</code>.
       * @param {yfiles.drawing.IRenderContext} ctx The context that describes where the visual will be used in.
       * @param {yfiles.drawing.Visual} oldVisual The visual instance that had been returned the last time the {@link demo.yfiles.graph.simplecustomstyle.MySimpleArrow#createVisual}
       * method was called on this instance.
       * @return {yfiles.drawing.Visual} 
       * 	<code>oldVisual</code>, if this instance modified the visual, or a new visual that should replace the
       * existing one in the canvas object visual tree.
       * @see demo.yfiles.graph.simplecustomstyle.MySimpleArrow#createVisual
       * @see yfiles.canvas.ICanvasObjectDescriptor
       * @see yfiles.canvas.CanvasControl
       */
      'updateVisual': function(/*yfiles.drawing.IRenderContext*/ ctx, /*yfiles.drawing.Visual*/ oldVisual) {
        // get thickness of old arrow
        var /*double*/ oldThickness = oldVisual.getRenderDataCache(demo.yfiles.graph.simplecustomstyle.MySimpleArrow.RenderDataCache.$class).value;
        // if thickness has changed
        if (oldThickness !== this.$thickness) {
          // re-render arrow
          return (/*(yfiles.drawing.IVisualCreator)*/this).createVisual(ctx);
        } else {
          var /*yfiles.drawing.PathVisual*/ p = (oldVisual instanceof yfiles.drawing.PathVisual) ? /*(yfiles.drawing.PathVisual)*/oldVisual : null;
          if (p !== null) {
            p.transform = new yfiles.geometry.Matrix2D.FromValues(this.$direction.x, this.$direction.y, -this.$direction.y, this.$direction.x, this.$anchor.x, this.$anchor.y);
            return p;
          }

          return (/*(yfiles.drawing.IVisualCreator)*/this).createVisual(ctx);
        }
      },
      
      // #endregion 
      // #region Rendering Helper Methods
      /**
       * Returns the bounds of the arrow for the current flyweight configuration.
       */
      'getBounds': function(/*yfiles.canvas.ICanvasContext*/ ctx) {
        return new yfiles.geometry.RectD(this.$anchor.x - 8 - this.$thickness, this.$anchor.y - 8 - this.$thickness, 16 + this.$thickness * 2, 16 + this.$thickness * 2);
      },
      
      // #endregion 
      /**
       * Configures the thickness to use for the next visual creation.
       * @param {yfiles.graph.IEdge} edge The edge to read the thickness from.
       * @private
       */
      '$configureThickness': function(/*yfiles.graph.IEdge*/ edge) {
        // Get the edge's thickness
        var tmp;
        var /*demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle*/ style = ((tmp = edge.style) instanceof demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle) ? /*(demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle)*/tmp : null;
        var /*double*/ oldThickness = this.$thickness;
        if (style !== null) {
          this.$thickness = style.pathThickness;
        } else {
          this.$thickness = this.thickness;
        }
        // see if the old arrow figure needs to be invalidated...
        if (this.$thickness !== oldThickness) {
          this.$arrowFigure = null;
        }
      },
      
      '$init': function() {
        this.$anchor = yfiles.geometry.PointD.createDefault();
        this.$direction = yfiles.geometry.PointD.createDefault();
      },
      
      /** @lends demo.yfiles.graph.simplecustomstyle.MySimpleArrow */
      '$static': {
        /**
         * @type yfiles.system.LinearGradientBrush
         * @private
         */
        'PATH_FILL': null,
        
        'RenderDataCache': new yfiles.ClassDefinition(function() {
          return {
            
            'constructor': function(/*double*/ d) {
              this.value = d;
            },
            
            /**
             * Backing field for below property 
             * @type double
             * @private
             */
            '$value': 0,
            
            /** @type double */
            'value': {
              'get': function() {
                return this.$value;
              },
              'set': function(/*double*/ value) {
                this.$value = value;
              }
            }
            
          };
        }),
        
        '$clinit': function() {
          var /*yfiles.system.LinearGradientBrush*/ newLinearGradientBrush;
          {
            newLinearGradientBrush = new yfiles.system.LinearGradientBrush();
            newLinearGradientBrush.startPoint = new yfiles.geometry.PointD(0, 0);
            newLinearGradientBrush.endPoint = new yfiles.geometry.PointD(0, 1);
            newLinearGradientBrush.spreadMethod = yfiles.system.GradientSpreadMethod.REPEAT;
            var /*yfiles.system.GradientStop*/ newGradientStop;
            {
              newGradientStop = new yfiles.system.GradientStop();
              newGradientStop.color = yfiles.system.Color.fromArgb(255, 180, 180, 180);
              newGradientStop.offset = 0;
            }
            newLinearGradientBrush.gradientStops.add(newGradientStop);
            var /*yfiles.system.GradientStop*/ newGradientStop1;
            {
              newGradientStop1 = new yfiles.system.GradientStop();
              newGradientStop1.color = yfiles.system.Color.fromArgb(255, 50, 50, 50);
              newGradientStop1.offset = 0.5;
            }
            newLinearGradientBrush.gradientStops.add(newGradientStop1);
            var /*yfiles.system.GradientStop*/ newGradientStop2;
            {
              newGradientStop2 = new yfiles.system.GradientStop();
              newGradientStop2.color = yfiles.system.Color.fromArgb(255, 150, 150, 150);
              newGradientStop2.offset = 1;
            }
            newLinearGradientBrush.gradientStops.add(newGradientStop2);
          }
          demo.yfiles.graph.simplecustomstyle.MySimpleArrow.PATH_FILL = newLinearGradientBrush;
          demo.yfiles.graph.simplecustomstyle.MySimpleArrow.PATH_FILL.freeze();
        }
        
      }
    };
  })


});});
