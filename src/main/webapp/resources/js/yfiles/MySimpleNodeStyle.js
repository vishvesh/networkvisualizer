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
   * A very simple implementation of an {@link yfiles.drawing.INodeStyle}
   * that uses the convenience class {@link yfiles.drawing.SimpleAbstractNodeStyle}
   * as the base class.
   * @class demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle
   * @augments yfiles.drawing.SimpleAbstractNodeStyle
   */
  /*public*/ exports.MySimpleNodeStyle = new yfiles.ClassDefinition(function() {
    /** @lends demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.prototype */
    return {
      '$extends': yfiles.drawing.SimpleAbstractNodeStyle,
      
      'constructor': function() {
        yfiles.drawing.SimpleAbstractNodeStyle.call(this, yfiles.canvas.CanvasContainer.$class);
        this.nodeColor = yfiles.system.Color.fromArgb(200, 0, 130, 180);
      },
      
      // #region Node Color
      /**
       * Backing field for below property 
       * @type yfiles.system.Color
       * @private
       */
      '$nodeColor': null,
      
      /**
       * Gets or sets the fill color of the node.
       * @type yfiles.system.Color
       */
      'nodeColor': {
        '$meta': function() {
          return [yfiles.system.DefaultValueAttribute.ConvertedFrom(yfiles.system.Color.$class, "#C80082B4"), yfiles.system.TypeAttribute(yfiles.system.Color.$class)];
        },
        'get': function() {
          return this.$nodeColor;
        },
        'set': function(/*yfiles.system.Color*/ value) {
          this.$nodeColor = value;
        }
      },
      
      /**
       * Determines the color to use for filling the node.
       * This implementation uses the {@link demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle#nodeColor} property unless
       * the {@link yfiles.support.ITagOwner#tag} of the {@link yfiles.graph.INode} is of type {@link yfiles.system.Color}, 
       * in which case that color overrides this style's setting.
       * @param {yfiles.graph.INode} node The node to determine the color for.
       * @return {yfiles.system.Color} The color for filling the node.
       */
      'getNodeColor': function(/*yfiles.graph.INode*/ node) {
        // the color can be obtained from the "business data" that can be associated with
        // each node, or use the value from this instance.
        return node.tag instanceof yfiles.system.Color ? /*(yfiles.system.Color)*/node.tag : this.nodeColor;
      },
      
      // #endregion 
      // #region Constructor
      '$createDropShadow': function(/*yfiles.canvas.ICanvasContext*/ ctx) {
        var /*HTMLCanvasElement*/ canvas = /*(HTMLCanvasElement)*/window.document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        var /*CanvasContext*/ context = canvas.getContext("2d");
        context.fillStyle = "rgb(0, 0, 0)";
        context.globalAlpha = 0.5;
        context.beginPath();
        context.arc(32, 32, 16, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        yfiles.drawing.ImageSupport.gaussianBlurWithThetaAndSize(canvas, 2, 9);

        var /*SVGImageElement*/ image = window.document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttribute("width", "64");
        image.setAttribute("height", "64");
        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", canvas.toDataURL("image/png"));

        demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.dropShadowDefsSupport = new demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.DropShadowDefsSupport(image);
      },
      
      // #endregion 
      // #region Rendering
      /**
       * Creates the visual for a node.
       */
      'createVisual': function(/*yfiles.graph.INode*/ node, /*yfiles.drawing.IRenderContext*/ renderContext) {
        if (demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.dropShadowDefsSupport === null) {
          this.$createDropShadow(renderContext);
        }
        // This implementation creates a CanvasContainer and uses it for the rendering of the node.
        var /*yfiles.canvas.CanvasContainer*/ visual = new yfiles.canvas.CanvasContainer();
        // Get the necessary data for rendering of the edge
        var /*demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache*/ cache = this.$createRenderDataCache(renderContext, node);
        // Render the node
        this.$render(renderContext, node, visual, cache);
        // set the location
        visual.transform = new yfiles.geometry.Matrix2D.FromValues(1, 0, 0, 1, node.layout.x, node.layout.y);
        return visual;
      },
      
      /**
       * Re-renders the node using the old visual for performance reasons.
       */
      'updateVisual': function(/*yfiles.graph.INode*/ node, /*yfiles.drawing.IRenderContext*/ renderContext, /*yfiles.canvas.CanvasContainer*/ oldVisual) {
        // get the data with which the oldvisual was created
        var /*demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache*/ oldCache = oldVisual.getRenderDataCache(demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache.$class);
        // get the data for the new visual
        var /*demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache*/ newCache = this.$createRenderDataCache(renderContext, node);

        // check if something changed except for the location of the node
        if (!newCache.$equals(oldCache)) {
          // something changed - re-render the visual
          oldVisual.children.clear();
          this.$render(renderContext, node, oldVisual, newCache);
        }
        // make sure that the location is up to date
        oldVisual.transform = new yfiles.geometry.Matrix2D.FromValues(1, 0, 0, 1, node.layout.x, node.layout.y);
        return oldVisual;
      },
      
      /**
       * Creates an object containing all necessary data to create a visual for the node
       * @private
       */
      '$createRenderDataCache': function(/*yfiles.drawing.IRenderContext*/ renderContext, /*yfiles.graph.INode*/ node) {
        // If Tag is set to a Color, use it as background color of the node
        var /*yfiles.system.Color*/ c = (node.tag instanceof yfiles.system.Color) ? /*(yfiles.system.Color)*/node.tag : yfiles.system.Color.fromArgb(200, 0, 130, 180);

        var /*yfiles.collections.List<yfiles.geometry.PointD>*/ labelLocations = new yfiles.collections.List/*<yfiles.geometry.PointD>*/();
        // Remember center points of labels to draw label edges, relative the node's top left corner
        var /*yfiles.util.IEnumerator*/ tmpEnumerator;
        for (tmpEnumerator = node.labels.getEnumerator(); tmpEnumerator.moveNext(); ) {
          var /*yfiles.graph.ILabel*/ label = tmpEnumerator.current;
          {
            var /*yfiles.geometry.PointD*/ labelCenter = label.layout.getCenter();
            labelLocations.add(yfiles.geometry.PointD.subtract(labelCenter, node.layout.getTopLeft()));
          }
        }
        return new demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache(c, node.layout.toSize(), labelLocations);
      },
      
      /**
       * Actually creates the visual appearance of a node given the values provided by {@link demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache}.
       * This renders the node and the edges to the labels and adds the visuals to the <code>container</code>.
       * All items are arranged as if the node was located at (0,0). {@link demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle#createVisual} and {@link demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle#updateVisual}
       * finally arrange the container so that the drawing is translated into the final position.
       * @private
       */
      '$render': function(/*yfiles.drawing.IRenderContext*/ renderContext, /*yfiles.graph.INode*/ node, /*yfiles.canvas.CanvasContainer*/ container, /*demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache*/ cache) {
        // store information with the visual on how we created it
        container.setRenderDataCache(cache);

        // draw the dropshadow
        this.$drawShadow(renderContext, container, cache.size);
        // draw edges to node labels
        this.$renderLabelEdges(node, renderContext, container, cache);

        // Create inner container for node visualizations
        var /*yfiles.canvas.CanvasContainer*/ nodeContainer = new yfiles.canvas.CanvasContainer();
        container.children.add(nodeContainer);

        // determine the color to use for the rendering
        var /*yfiles.system.Color*/ color = this.getNodeColor(node);

        // the size of node
        var /*yfiles.geometry.SizeD*/ nodeSize = cache.size;

        var /*yfiles.drawing.EllipseVisual*/ shape = new yfiles.drawing.EllipseVisual.FromRectangleBounds(new yfiles.geometry.Rectangle(0, 0, nodeSize.width, nodeSize.height));

        // max and min needed for reflection effect calculation
        var /*double*/ max = Math.max(nodeSize.width, nodeSize.height);
        var /*double*/ min = Math.min(nodeSize.width, nodeSize.height);
        // Create Background gradient from specified background color
        var /*yfiles.system.LinearGradientBrush*/ newLinearGradientBrush;
        {
          newLinearGradientBrush = new yfiles.system.LinearGradientBrush();
          var /*yfiles.system.GradientStop*/ newGradientStop;
          {
            newGradientStop = new yfiles.system.GradientStop();
            newGradientStop.color = yfiles.system.Color.fromArgb(/*(byte)*/Math.max(0, color.a - 50), ((/*(byte)*/Math.min(255, color.r * 1.4)) | 0), ((/*(byte)*/Math.min(255, color.g * 1.4)) | 0), ((/*(byte)*/Math.min(255, color.b * 1.4)) | 0));
            newGradientStop.offset = 0;
          }
          newLinearGradientBrush.gradientStops.add(newGradientStop);
          var /*yfiles.system.GradientStop*/ newGradientStop1;
          {
            newGradientStop1 = new yfiles.system.GradientStop();
            newGradientStop1.color = color;
            newGradientStop1.offset = 0.5;
          }
          newLinearGradientBrush.gradientStops.add(newGradientStop1);
          var /*yfiles.system.GradientStop*/ newGradientStop2;
          {
            newGradientStop2 = new yfiles.system.GradientStop();
            newGradientStop2.color = yfiles.system.Color.fromArgb(/*(int)*/Math.max(0, color.a - 50), ((/*(int)*/Math.min(255, color.r * 1.7)) | 0), ((/*(int)*/Math.min(255, color.g * 1.7)) | 0), ((/*(int)*/Math.min(255, color.b * 1.7)) | 0));
            newGradientStop2.offset = 1;
          }
          newLinearGradientBrush.gradientStops.add(newGradientStop2);
          newLinearGradientBrush.startPoint = new yfiles.geometry.PointD(0, 0);
          newLinearGradientBrush.endPoint = new yfiles.geometry.PointD(0.5 / (nodeSize.width / max), 1 / (nodeSize.height / max));
          newLinearGradientBrush.spreadMethod = yfiles.system.GradientSpreadMethod.PAD;
        }
        var /*yfiles.system.LinearGradientBrush*/ brush = newLinearGradientBrush;
        brush.freeze();
        shape.setBrush(brush, renderContext);

        // Create light reflection effects
        var /*yfiles.drawing.EllipseVisual*/ reflection1 = new yfiles.drawing.EllipseVisual.FromRectangleBounds(new yfiles.geometry.Rectangle(0, 0, min / 10, min / 10));
        reflection1.setBrush(yfiles.system.Brushes.WHITE, renderContext);
        var /*yfiles.drawing.EllipseVisual*/ reflection2 = new yfiles.drawing.EllipseVisual.FromRectangleBounds(new yfiles.geometry.Rectangle(0, 0, min / 7, min / 7));
        reflection2.setBrush(yfiles.system.Brushes.ALICE_BLUE, renderContext);

        var /*yfiles.drawing.GeneralPath*/ reflection3Path = new yfiles.drawing.GeneralPath();
        var /*yfiles.geometry.Point*/ startPoint = new yfiles.geometry.Point(nodeSize.width / 2.5, nodeSize.height / 10 * 9);
        var /*yfiles.geometry.Point*/ endPoint = new yfiles.geometry.Point(nodeSize.width / 10 * 9, nodeSize.height / 2.5);
        var /*yfiles.geometry.Point*/ ctrlPoint1 = new yfiles.geometry.Point(startPoint.x + (endPoint.x - startPoint.x) / 2, nodeSize.height);
        var /*yfiles.geometry.Point*/ ctrlPoint2 = new yfiles.geometry.Point(nodeSize.width, startPoint.y + (endPoint.y - startPoint.y) / 2);
        var /*yfiles.geometry.Point*/ ctrlPoint3 = new yfiles.geometry.Point(ctrlPoint1.x, ctrlPoint1.y - nodeSize.height / 10);
        var /*yfiles.geometry.Point*/ ctrlPoint4 = new yfiles.geometry.Point(ctrlPoint2.x - nodeSize.width / 10, ctrlPoint2.y);

        reflection3Path.moveToPoint(startPoint);
        reflection3Path.cubicToPoints(ctrlPoint1, ctrlPoint2, endPoint);
        reflection3Path.cubicToPoints(ctrlPoint4, ctrlPoint3, startPoint);

        var /*yfiles.drawing.PathVisual*/ reflection3 = new yfiles.drawing.PathVisual.FromPathTransformAndFillMode(reflection3Path, null, yfiles.drawing.FillMode.ALWAYS);

        reflection3.setBrush(yfiles.system.Brushes.ALICE_BLUE, renderContext);

        // place the reflections
        reflection1.transform = new yfiles.geometry.Matrix2D.FromValues(1, 0, 0, 1, nodeSize.width / 5, nodeSize.height / 5);
        reflection2.transform = new yfiles.geometry.Matrix2D.FromValues(1, 0, 0, 1, nodeSize.width / 4.9, nodeSize.height / 4.9);
        // and add all to the container for the node
        nodeContainer.children.add(shape);
        nodeContainer.children.add(reflection2);
        nodeContainer.children.add(reflection1);
        nodeContainer.children.add(reflection3);
      },
      
      /**
       * Draws the pre-rendered dropshadow image at the given size.
       * @private
       */
      '$drawShadow': function(/*yfiles.canvas.ICanvasContext*/ ctx, /*yfiles.canvas.CanvasContainer*/ visual, /*yfiles.geometry.SizeD*/ size) {
        /*final*/ var /*int*/ tileSize = 32;
        /*final*/ var /*int*/ tileSize2 = 16;
        /*final*/ var /*int*/ offsetY = 2;
        /*final*/ var /*int*/ offsetX = 2;

        var /*double*/ xScaleFactor = size.width / tileSize;
        var /*double*/ yScaleFactor = size.height / tileSize;

        var /*string*/ defsId = ctx.getDefsId(demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.dropShadowDefsSupport);
        var /*yfiles.drawing.UseVisual*/ imageCompleteImage = new yfiles.drawing.UseVisual.WithId(defsId);
        imageCompleteImage.transform = new yfiles.geometry.Matrix2D.FromValues(xScaleFactor, 0, 0, yScaleFactor, offsetX - tileSize2 * xScaleFactor, offsetY - tileSize2 * yScaleFactor);
        visual.add(imageCompleteImage);
      },
      
      /**
       * Draws the edge-like connectors from a node to its labels
       * @private
       */
      '$renderLabelEdges': function(/*yfiles.graph.INode*/ node, /*yfiles.drawing.IRenderContext*/ renderContext, /*yfiles.canvas.CanvasContainer*/ container, /*demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache*/ cache) {
        if (node.labels.count > 0) {
          var /*yfiles.graph.BendList*/ bends = new yfiles.graph.BendList();
          // Create a SimpleEdge which will be used as a dummy for the rendering
          var /*yfiles.graph.SimpleEdge*/ simpleEdge = new yfiles.graph.SimpleEdge.FromLabelsPortsAndBends(yfiles.support.EmptyListEnumerable.INSTANCE, null, null, bends);
          // Assign the style
          var /*demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle*/ newMySimpleEdgeStyle;
          {
            newMySimpleEdgeStyle = new demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle();
            newMySimpleEdgeStyle.pathThickness = 2;
          }
          simpleEdge.style = newMySimpleEdgeStyle;

          // Create a SimpleNode which provides the sourceport for the edge but won't be drawn itself
          var /*yfiles.graph.SimpleNode*/ newSimpleNode;
          {
            newSimpleNode = new yfiles.graph.SimpleNode.WithLabelsLayoutAndPorts(yfiles.support.EmptyListEnumerable.INSTANCE, yfiles.geometry.ImmutableRectangle.EMPTY, yfiles.support.EmptyListEnumerable.INSTANCE);
            newSimpleNode.layout = new yfiles.geometry.RectD(0, 0, node.layout.width, node.layout.height);
            newSimpleNode.style = node.style;
          }
          var /*yfiles.graph.SimpleNode*/ sourceDummyNode = newSimpleNode;


          // Set sourceport to the port of the node using a dummy node that is located at the origin.
          simpleEdge.sourcePort = new yfiles.graph.SimplePort.WithParameterAndOwner(yfiles.drawing.NodeScaledPortLocationModel.NODE_CENTER_ANCHORED, sourceDummyNode);

          // Create a SimpleNode which provides the targetport for the edge but won't be drawn itself
          var /*yfiles.graph.SimpleNode*/ targetDummyNode = new yfiles.graph.SimpleNode.WithLabelsLayoutAndPorts(yfiles.support.EmptyListEnumerable.INSTANCE, yfiles.geometry.ImmutableRectangle.EMPTY, yfiles.support.EmptyListEnumerable.INSTANCE);

          // Create port on targetDummynode for the label target
          targetDummyNode.ports = new yfiles.support.SingletonList/*<yfiles.graph.IPort>*/(new yfiles.graph.SimplePort.WithParameterAndOwner(yfiles.drawing.NodeScaledPortLocationModel.NODE_CENTER_ANCHORED, targetDummyNode));
          simpleEdge.targetPort = new yfiles.graph.SimplePort.WithParameterAndOwner(yfiles.drawing.NodeScaledPortLocationModel.NODE_CENTER_ANCHORED, targetDummyNode);

          // Render one edge for each label
          var /*yfiles.util.IEnumerator*/ tmpEnumerator;
          for (tmpEnumerator = cache.labelLocations.getListEnumerator(); tmpEnumerator.moveNext(); ) {
            var /*yfiles.geometry.PointD*/ labelLocation = tmpEnumerator.current;
            {
              // move the dummy node to the location of the label
              targetDummyNode.layout = yfiles.geometry.Rectangle.create(labelLocation.x, labelLocation.y, 0, 0);

              // now create the visual using the style interface:
              var /*yfiles.drawing.IEdgeStyleRenderer*/ renderer = simpleEdge.style.renderer;
              var /*yfiles.drawing.IVisualCreator*/ creator = renderer.getVisualCreator(simpleEdge, simpleEdge.style);
              var /*yfiles.drawing.Visual*/ element = creator.createVisual(renderContext);
              if (element !== null) {
                container.add(element);
              }
            }
          }
        }
      },
      
      // #endregion 
      // #region Rendering Helper Methods
      /**
       * Gets the outline of the node, an ellipse in this case
       * This allows for correct edge path intersection calculation, among others.
       */
      'getOutline': function(/*yfiles.graph.INode*/ node) {
        var /*yfiles.geometry.RectD*/ rect = node.layout.toRectD();
        var /*yfiles.drawing.GeneralPath*/ outline = new yfiles.drawing.GeneralPath();
        outline.appendEllipse(rect.rectDtoRect(), false);
        return outline;
      },
      
      /**
       * Get the bounding box of the node
       * This is used for bounding box calculations and includes the visual shadow.
       */
      'getBounds': function(/*yfiles.graph.INode*/ node, /*yfiles.canvas.ICanvasContext*/ canvasContext) {
        var /*yfiles.geometry.RectD*/ bounds = node.layout.toRectD();
        // expand bounds to include dropshadow
        bounds.width = bounds.width + 3;
        bounds.height = bounds.height + 3;
        return bounds;
      },
      
      /**
       * Overridden to take the connection lines to the label into account.
       * Otherwise label intersection lines might not be painted if the node is outside 
       * of the clipping bounds.
       */
      'isVisible': function(/*yfiles.graph.INode*/ node, /*yfiles.geometry.RectD*/ clip, /*yfiles.canvas.ICanvasContext*/ canvasContext) {
        if (demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.$super.isVisible.call(this, node, clip.clone(), canvasContext)) {
          return true;
        }
        // check for labels connection lines 
        clip = clip.getEnlarged(10);
        var /*yfiles.util.IEnumerator*/ tmpEnumerator;
        for (tmpEnumerator = node.labels.getEnumerator(); tmpEnumerator.moveNext(); ) {
          var /*yfiles.graph.ILabel*/ label = tmpEnumerator.current;
          {
            if (clip.intersectsLine(node.layout.getRectangleCenter(), label.layout.getCenter())) {
              return true;
            }
          }
        }
        return false;
      },
      
      /**
       * Hit test which considers HitTestRadius specified in CanvasContext
       * @return {boolean} True if p is inside node.
       */
      'isHit': function(/*yfiles.graph.INode*/ node, /*yfiles.geometry.PointD*/ p, /*yfiles.canvas.ICanvasContext*/ canvasContext) {
        return yfiles.geometry.GeomSupport.ellipseContains(node.layout.toRectD(), p, canvasContext.hitTestRadius);
      },
      
      /**
       *   
       * Checks if a node is inside a certain box. Considers HitTestRadius.
       * @return {boolean} True if the box intersects the elliptical shape of the node. Also true if box lies completely inside node.
       */
      'isInBox': function(/*yfiles.graph.INode*/ node, /*yfiles.geometry.RectD*/ box, /*yfiles.canvas.ICanvasContext*/ canvasContext) {
        // early exit if not even the bounds are contained in the box
        if (!demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.$super.isInBox.call(this, node, box.clone(), canvasContext)) {
          return false;
        }

        var /*double*/ eps = canvasContext.hitTestRadius;

        var /*yfiles.drawing.GeneralPath*/ outline = this.getOutline(node);
        if (outline === null) return false;

        if (outline.intersects(box, eps)) {
          return true;
        }
        if (outline.pathContains(box.topLeft, eps) && outline.pathContains(box.bottomRight, eps)) {
          return true;
        }
        return (box.rectDcontainsPointD(node.layout.toRectD().topLeft) && box.rectDcontainsPointD(node.layout.toRectD().bottomRight));
      },
      
      /**
       * Exact geometric check whether a point p lies inside the node. This is important for intersection calculation, among others.
       */
      'isInside': function(/*yfiles.graph.INode*/ node, /*yfiles.geometry.PointD*/ point) {
        return yfiles.geometry.GeomSupport.ellipseContains(node.layout.toRectD(), point, 0);
      },
      
      // #endregion 
      /** @lends demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle */
      '$static': {
        /**
         * support instance that handles the defs element of the pre-rendered dropshadow image;
         * @type demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.DropShadowDefsSupport
         * @private
         */
        'dropShadowDefsSupport': null,
        
        'DropShadowDefsSupport': new yfiles.ClassDefinition(function() {
          return {
            
            '$with': [yfiles.drawing.IDefsSupport],
            
            'constructor': function(/*Element*/ image) {
              this.$image = image;
            },
            
            /**
             * @type Element
             * @private
             */
            '$image': null,
            
            /** @return {SVGElement} */
            'createDefsElement': function(/*yfiles.canvas.ICanvasContext*/ context) {
              return /*(SVGElement)*/this.$image;
            },
            
            /** @return {boolean} */
            'accept': function(/*yfiles.canvas.ICanvasContext*/ ctx, /*Node*/ node, /*string*/ id) {
              if (node instanceof Element) {
                return yfiles.drawing.SvgDefsUtil.isUseReference(/*(Element)*/node, id);
              }
              return false;
            },
            
            'updateDefsElement': function(/*SVGElement*/ oldElement, /*yfiles.canvas.ICanvasContext*/ context) {}
            
          };
        }),
        
        /**
         * Saves the data which is necessary for the creation of a node
         */
        'RenderDataCache': new yfiles.ClassDefinition(function() {
          return {
            
            'constructor': function(/*yfiles.system.Color*/ color, /*yfiles.geometry.SizeD*/ size, /*yfiles.collections.List<yfiles.geometry.PointD>*/ labelLocations) {
              this.$init();
              this.color = color;
              this.size = size.clone();
              this.labelLocations = labelLocations;
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
             * @type yfiles.geometry.SizeD
             * @private
             */
            '$size': null,
            
            /** @type yfiles.geometry.SizeD */
            'size': {
              'get': function() {
                return this.$size;
              },
              'set': function(/*yfiles.geometry.SizeD*/ value) {
                this.$size = value;
              }
            },
            
            /**
             * Backing field for below property 
             * @type yfiles.collections.List
             * @private
             */
            '$labelLocations': null,
            
            /**
             * Center points of the node's labels relative to the node's top left corner
             * @type yfiles.collections.List
             */
            'labelLocations': {
              'get': function() {
                return this.$labelLocations;
              },
              'set': function(/*yfiles.collections.List<yfiles.geometry.PointD>*/ value) {
                this.$labelLocations = value;
              }
            },
            
            /** @return {boolean} */
            '$equals': function(/*demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache*/ other) {
              return yfiles.system.Color.equals(other.color, this.color) && other.size.equalsSizeD(this.size) && this.$listsAreEqual(this.labelLocations, other.labelLocations);
            },
            
            /**
             * Helper method to decide if two lists are equals
             * @private
             * @template T
             */
            '$listsAreEqual': function(/*yfiles.collections.List<T>*/ list1, /*yfiles.collections.List<T>*/ list2) {
              if (list1.count !== list2.count) {
                return false;
              }
              for (var /*int*/ i = 0; i < list1.count; i++) {
                if (!yfiles.lang.Object.equals(list1.get(i), list2.get(i))) {
                  return false;
                }
              }
              return true;
            },
            
            /** @return {boolean} */
            'equals': function(/*Object*/ obj) {
              if (yfiles.lang.Object.referenceEquals(null, obj)) {
                return false;
              }
              if (yfiles.lang.getType(obj) !== demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache.$class) {
                return false;
              }
              return this.$equals(/*(demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle.RenderDataCache)*/obj);
            },
            
            '$init': function() {
              this.$size = yfiles.geometry.SizeD.createDefault();
            }
            
          };
        })
        
      }
    };
  })


});});
