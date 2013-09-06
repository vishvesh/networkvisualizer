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
   * This class is an example for a custom edge style based on {@link yfiles.drawing.SimpleAbstractEdgeStyle}.
   * The {@link yfiles.drawing.ArrangeVisual}s created by this instance are of type {@link yfiles.canvas.CanvasContainer}
   * so this is used as the generic type parameter.
   * @class demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle
   * @augments yfiles.drawing.SimpleAbstractEdgeStyle
   */
  /*public*/ exports.MySimpleEdgeStyle = new yfiles.ClassDefinition(function() {
    /** @lends demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.prototype */
    return {
      '$extends': yfiles.drawing.SimpleAbstractEdgeStyle,
      
      /**
       * Initializes a new instance of the {@link demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle} class with
       * a {@link demo.yfiles.graph.simplecustomstyle.MySimpleArrow custom arrow}.
       */
      'constructor': function() {
        yfiles.drawing.SimpleAbstractEdgeStyle.call(this, yfiles.canvas.CanvasContainer.$class);
        this.arrows = new demo.yfiles.graph.simplecustomstyle.MySimpleArrow();
        this.pathThickness = 3;
      },
      
      // #region Constructor
      // #endregion 
      // #region Properties
      /**
       * Backing field for below property 
       * @type double
       * @private
       */
      '$pathThickness': 0,
      
      /**
       * Gets or sets the thickness of the edge
       * @type double
       */
      'pathThickness': {
        '$meta': function() {
          return [yfiles.system.DefaultValueAttribute.With(3.0), yfiles.system.TypeAttribute(yfiles.lang.Number.$class)];
        },
        'get': function() {
          return this.$pathThickness;
        },
        'set': function(/*double*/ value) {
          this.$pathThickness = value;
        }
      },
      
      /**
       * Backing field for below property 
       * @type yfiles.drawing.IArrow
       * @private
       */
      '$arrows': null,
      
      /**
       * Gets or sets the arrows drawn at the beginning and at the end of the edge.
       * @type yfiles.drawing.IArrow
       */
      'arrows': {
        '$meta': function() {
          return [yfiles.system.TypeAttribute(yfiles.drawing.IArrow.$class)];
        },
        'get': function() {
          return this.$arrows;
        },
        'set': function(/*yfiles.drawing.IArrow*/ value) {
          this.$arrows = value;
        }
      },
      
      // #endregion 
      // #region Rendering
      /**
       * Creates the visual for an edge.
       */
      'createVisual': function(/*yfiles.graph.IEdge*/ edge, /*yfiles.drawing.IRenderContext*/ renderContext) {
        // This implementation creates a CanvasContainer and uses it for the rendering of the edge.
        var /*yfiles.canvas.CanvasContainer*/ visual = new yfiles.canvas.CanvasContainer();
        // Get the necessary data for rendering of the edge
        var /*demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache*/ cache = this.$createRenderDataCache(renderContext, edge);
        // Render the edge
        this.$render(renderContext, edge, visual, cache);
        return visual;
      },
      
      /**
       * Re-renders the edge using the old visual for performance reasons.
       */
      'updateVisual': function(/*yfiles.graph.IEdge*/ edge, /*yfiles.drawing.IRenderContext*/ renderContext, /*yfiles.canvas.CanvasContainer*/ oldVisual) {
        // get the data with which the oldvisual was created
        var /*demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache*/ oldCache = oldVisual.getRenderDataCache(demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache.$class);
        // get the data for the new visual
        var /*demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache*/ newCache = this.$createRenderDataCache(renderContext, edge);

        // check if something changed
        if (newCache.$equals(oldCache)) {
          // nothing changed, return the old visual
          return oldVisual;
        }
        // something changed - re-render the visual
        oldVisual.children.clear();
        this.$render(renderContext, edge, oldVisual, newCache);
        return oldVisual;
      },
      
      /**
       * Creates an object containing all necessary data to create an edge visual
       * @private
       */
      '$createRenderDataCache': function(/*yfiles.drawing.IRenderContext*/ context, /*yfiles.graph.IEdge*/ edge) {
        // Get the owner node's color
        var tmp;
        var /*yfiles.graph.INode*/ owner = (yfiles.graph.INode.isInstance((tmp = edge.sourcePort.owner))) ? /*(yfiles.graph.INode)*/tmp : null;
        var /*yfiles.system.Color*/ color = (/*(demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle)*/owner.style).getNodeColor(owner);

        var /*yfiles.graph.IGraphSelection*/ selection = context.canvas !== null ? context.canvas.lookup(yfiles.graph.IGraphSelection.$class) : null;
        var /*boolean*/ selected = selection !== null && selection.isSelected(edge);
        return new demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache(this.pathThickness, selected, color, this.getPath(edge), this.arrows);
      },
      
      /**
       * Creates the visual appearance of an edge
       * @private
       */
      '$render': function(/*yfiles.drawing.IRenderContext*/ context, /*yfiles.graph.IEdge*/ edge, /*yfiles.canvas.CanvasContainer*/ container, /*demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache*/ cache) {
        // store information with the visual on how we created it
        container.setRenderDataCache(cache);

        var /*yfiles.drawing.GeneralPath*/ gp = /*(yfiles.drawing.GeneralPath)*/cache.generalPath.clone();
        var /*yfiles.drawing.PathVisual*/ path = new yfiles.drawing.PathVisual.FromPathTransformAndFillMode(gp, null, yfiles.drawing.FillMode.NEVER);

        demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.ANIMATED_PATH_STROKE.thickness = cache.pathThickness;
        demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.PATH_STROKE.thickness = cache.pathThickness;
        demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.PATH_STROKE.brush = new yfiles.system.SolidColorBrush(cache.color);
        if (cache.selected) {
          // Fill for selected state
          path.setPen(demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.ANIMATED_PATH_STROKE, context);
        } else {
          // Fill for non-selected state
          path.setPen(demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.PATH_STROKE, context);
        }

        container.add(path);

        // add the arrows to the container
        demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.$super.addArrows.call(this, context, container, edge, gp, cache.arrows, cache.arrows);
      },
      
      // #endregion 
      // #region Rendering Helper Methods
      /**
       * Creates a {@link yfiles.drawing.GeneralPath} from the edge's bends
       * @param {yfiles.graph.IEdge} edge The edge to create the path for.
       * @return {yfiles.drawing.GeneralPath} A {@link yfiles.drawing.GeneralPath} following the edge
       */
      'getPath': function(/*yfiles.graph.IEdge*/ edge) {
        // Create a general path from the locations of the ports and the bends of the edge.
        /*final*/ var /*yfiles.lang.Reference<yfiles.drawing.GeneralPath>*/ path = {
          'value': new yfiles.drawing.GeneralPath()
        };
        path.value.moveToPoint(edge.sourcePort.location);
        var /*yfiles.util.IEnumerator*/ tmpEnumerator;
        for (tmpEnumerator = edge.bends.getEnumerator(); tmpEnumerator.moveNext(); ) {
          var /*yfiles.graph.IBend*/ bend = tmpEnumerator.current;
          {
            path.value.lineToPoint(bend.location);
          }
        }
        path.value.lineToPoint(edge.targetPort.location);

        // shorten the path in order to provide room for drawing the arrows.
        demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.$super.cropPath.call(this, edge, this.arrows, this.arrows, path);
        return path.value;
      },
      
      /**
       * Determines whether the visual representation of the edge has been hit at the given location.
       * Overridden method to include the {@link demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle#pathThickness} and the HitTestRadius specified in the context
       * in the calculation.
       */
      'isHit': function(/*yfiles.graph.IEdge*/ edge, /*yfiles.geometry.PointD*/ p, /*yfiles.canvas.ICanvasContext*/ canvasContext) {
        // Use the convenience method in GeneralPath
        return this.getPath(edge).pathContains(p, canvasContext.hitTestRadius + this.pathThickness * 0.5);
      },
      
      // #endregion 
      /**
       * This implementation of the look up provides a custom implementation of the 
       * {@link yfiles.model.ISelectionInstaller} interface that better suits to this style.
       */
      'lookup': function(/*yfiles.graph.IEdge*/ edge, /*yfiles.lang.Class*/ type) {
        if (type === yfiles.model.ISelectionInstaller.$class) {
          return new demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.MySelectionInstaller();
        } else {
          return demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.$super.lookup.call(this, edge, type);
        }
      },
      
      /** @lends demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle */
      '$static': {
        /**
         * the default stroke for rendering the path
         * @type yfiles.system.Pen
         * @private
         */
        'PATH_STROKE': null,
        
        /**
         * @type yfiles.system.Pen
         * @private
         */
        'ANIMATED_PATH_STROKE': null,
        
        /**
         * This customized {@link yfiles.model.ISelectionInstaller} overrides the
         * pen property to be <code>null</code>, so that no edge path is rendered if the edge is selected.
         */
        'MySelectionInstaller': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.drawing.EdgeSelectionRenderer,
            
            'constructor': function() {
              yfiles.drawing.EdgeSelectionRenderer.call(this);
            },
            
            /** @return {yfiles.system.Pen} */
            'getPen': function(/*yfiles.model.IInstallerContext*/ context, /*yfiles.graph.IEdge*/ edge) {
              return null;
            }
            
          };
        }),
        
        /**
         * Saves the data which is necessary for the creation of an edge
         */
        'RenderDataCache': new yfiles.ClassDefinition(function() {
          return {
            
            'constructor': function(/*double*/ pathThickness, /*boolean*/ selected, /*yfiles.system.Color*/ color, /*yfiles.drawing.GeneralPath*/ generalPath, /*yfiles.drawing.IArrow*/ arrows) {
              this.pathThickness = pathThickness;
              this.selected = selected;
              this.color = color;
              this.generalPath = generalPath;
              this.arrows = arrows;
            },
            
            /**
             * Backing field for below property 
             * @type double
             * @private
             */
            '$pathThickness': 0,
            
            /** @type double */
            'pathThickness': {
              'get': function() {
                return this.$pathThickness;
              },
              'set': function(/*double*/ value) {
                this.$pathThickness = value;
              }
            },
            
            /**
             * Backing field for below property 
             * @type boolean
             * @private
             */
            '$selected': false,
            
            /** @type boolean */
            'selected': {
              'get': function() {
                return this.$selected;
              },
              'set': function(/*boolean*/ value) {
                this.$selected = value;
              }
            },
            
            /**
             * Backing field for below property 
             * @type yfiles.system.Color
             * @private
             */
            '$color': null,
            
            /** @type yfiles.system.Color */
            'color': {
              'get': function() {
                return this.$color;
              },
              'set': function(/*yfiles.system.Color*/ value) {
                this.$color = value;
              }
            },
            
            /**
             * Backing field for below property 
             * @type yfiles.drawing.GeneralPath
             * @private
             */
            '$generalPath': null,
            
            /** @type yfiles.drawing.GeneralPath */
            'generalPath': {
              'get': function() {
                return this.$generalPath;
              },
              'set': function(/*yfiles.drawing.GeneralPath*/ value) {
                this.$generalPath = value;
              }
            },
            
            /**
             * Backing field for below property 
             * @type yfiles.drawing.IArrow
             * @private
             */
            '$arrows': null,
            
            /** @type yfiles.drawing.IArrow */
            'arrows': {
              'get': function() {
                return this.$arrows;
              },
              'set': function(/*yfiles.drawing.IArrow*/ value) {
                this.$arrows = value;
              }
            },
            
            /**
             * Check if this instance is equals to another {@link demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache} object
             */
            '$equals': function(/*demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache*/ other) {
              return other.pathThickness === this.pathThickness && other.selected === this.selected && yfiles.system.Color.equals(other.color, this.color) && yfiles.lang.Object.equals(other.arrows, this.arrows) && (/*(yfiles.system.IEquatable<yfiles.drawing.GeneralPath>)*/other.generalPath).equalsTyped(this.generalPath);
            },
            
            /** @return {boolean} */
            'equals': function(/*Object*/ obj) {
              if (yfiles.lang.Object.referenceEquals(null, obj)) {
                return false;
              }
              if (yfiles.lang.getType(obj) !== demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache.$class) {
                return false;
              }
              return this.$equals(/*(demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.RenderDataCache)*/obj);
            }
            
          };
        }),
        
        '$clinit': function() {
          demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.PATH_STROKE = new yfiles.system.Pen.FromBrush(new yfiles.system.SolidColorBrush(yfiles.system.Colors.BLACK));

          var /*demo.yfiles.graph.simplecustomstyle.AnimatedLinearGradientBrush*/ newAnimatedLinearGradientBrush;
          {
            newAnimatedLinearGradientBrush = new demo.yfiles.graph.simplecustomstyle.AnimatedLinearGradientBrush();
            var /*yfiles.system.GradientStop*/ newGradientStop;
            {
              newGradientStop = new yfiles.system.GradientStop();
              newGradientStop.color = yfiles.system.Color.fromArgb(255, 255, 215, 0);
              newGradientStop.offset = 0;
            }
            newAnimatedLinearGradientBrush.gradientStops.add(newGradientStop);
            var /*yfiles.system.GradientStop*/ newGradientStop1;
            {
              newGradientStop1 = new yfiles.system.GradientStop();
              newGradientStop1.color = yfiles.system.Color.fromArgb(255, 255, 245, 30);
              newGradientStop1.offset = 0.5;
            }
            newAnimatedLinearGradientBrush.gradientStops.add(newGradientStop1);
            var /*yfiles.system.GradientStop*/ newGradientStop2;
            {
              newGradientStop2 = new yfiles.system.GradientStop();
              newGradientStop2.color = yfiles.system.Color.fromArgb(255, 255, 215, 0);
              newGradientStop2.offset = 1;
            }
            newAnimatedLinearGradientBrush.gradientStops.add(newGradientStop2);
            newAnimatedLinearGradientBrush.startPoint = new yfiles.geometry.PointD(0, 0);
            newAnimatedLinearGradientBrush.endPoint = new yfiles.geometry.PointD(30, 30);
            newAnimatedLinearGradientBrush.spreadMethod = yfiles.system.GradientSpreadMethod.REPEAT;
          }
          var /*demo.yfiles.graph.simplecustomstyle.AnimatedLinearGradientBrush*/ animatedBrush = newAnimatedLinearGradientBrush;
          animatedBrush.freeze();
          demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle.ANIMATED_PATH_STROKE = new yfiles.system.Pen.FromBrush(animatedBrush);
        }
        
      }
    };
  })


});});
