/****************************************************************************
 **
 ** This file is part of yFiles for HTML 1.0.1.
 ** 
 ** yWorks proprietary/confidential. Use is subject to license terms.
 **
 ** Copyright (c) 2013 by yWorks GmbH, Vor dem Kreuzberg 28, 
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ***************************************************************************/
(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['yfiles/lang'],function(){
yfiles.module("demo.yfiles.layout.modules", function(exports) {
  /**
   * This class is an example for a custom style based on the {@link yfiles.drawing.SimpleAbstractLabelStyle}.
   * The typeface for the label text can be set. The label text is drawn with black letters inside a blue rounded rectangle.
   */
  /*public*/ exports.MySimpleLabelStyle = new yfiles.ClassDefinition(function() {
    return {
      '$extends': yfiles.drawing.SimpleAbstractLabelStyle,
      
      /**
       * Initializes a new instance of the {@link demo.yfiles.layout.modules.MySimpleLabelStyle} class using the "Arial" typeface.
       */
      'constructor': function() {
        yfiles.drawing.SimpleAbstractLabelStyle.call(this, yfiles.canvas.CanvasContainer.$class);
        var /*yfiles.bridge.Typeface*/ newTypeface = new yfiles.bridge.Typeface();
        {
          newTypeface.fontFamily = "Garamound";
          newTypeface.fontSize = 17;
        }
        this.typeface = newTypeface;
      },
      
      // #region Constructor
      // #endregion 
      // #region Properties
      /**
       * Backing field for below property 
       */
      '$typeface': null,
      
      /**
       * Gets or sets the typeface used for rendering the label text.
       */
      'typeface': {
        'get': function() {
          return this.$typeface;
        },
        'set': function(/*yfiles.bridge.Typeface*/ value) {
          this.$typeface = value;
        }
      },
      
      // #endregion 
      // #region Rendering
      /**
       * Creates the visual appearance of a label
       */
      '$render': function(/*yfiles.graph.ILabel*/ label, /*yfiles.canvas.CanvasContainer*/ container, /*yfiles.geometry.IOrientedRectangle*/ labelLayout, /*yfiles.drawing.IRenderContext*/ context) {
        // background rectangle
        var /*yfiles.drawing.RectVisual*/ rect;
        if (container.children.count > 0) {
          rect = /*(yfiles.drawing.RectVisual)*/container.children.get(0);
        } else {
          rect = new yfiles.drawing.RectVisual.FromRectangle(new yfiles.geometry.Rectangle(0, 0, labelLayout.width, labelLayout.height));
          container.add(rect);
        }
        rect.setArcRadius(labelLayout.width / 10);
        rect.setPen(yfiles.drawing.Pens.SKY_BLUE, context);
        rect.setBrush(demo.yfiles.layout.modules.MySimpleLabelStyle.FILL_BRUSH, context);

        var /*yfiles.drawing.TextVisual*/ textVisual;
        if (container.children.count > 1) {
          textVisual = /*(yfiles.drawing.TextVisual)*/container.children.get(1);
        } else {
          textVisual = new yfiles.drawing.TextVisual();
          container.add(textVisual);
        }
        // Textblock with label text
        var /*textType*/ textBlock = /*(textType)*/textVisual.svgElement;
        textBlock.textContent = label.text;
        textBlock.setAttributeNS(null, "font-family", this.typeface.fontFamily);
        textBlock.setAttributeNS(null, "font-style", yfiles.canvas.SVGExtensions.toSvgFontStyle(this.typeface.fontStyle));
        textBlock.setAttributeNS(null, "font-weight", yfiles.canvas.SVGExtensions.toSvgFontWeight(this.typeface.fontWeight));
        textBlock.setAttributeNS(null, "font-size", "" + this.typeface.fontSize);
        textBlock.setAttributeNS(null, "fill", yfiles.bridge.Colors.BLACK.toSvgColor());
        textBlock.setAttributeNS(null, "style", "dominant-baseline: central;");

        var /*yfiles.geometry.SizeD*/ textSize = yfiles.drawing.SimpleLabelStyleRenderer.measureTextForFont(label.text, this.typeface);

        var /*double*/ textPositionLeft = (labelLayout.width - textSize.$width) / 2;
        ;
        textVisual.transform = new yfiles.geometry.Matrix2D.FromValues(1, 0, 0, 1, textPositionLeft, labelLayout.height * 0.5);

        if (container.children.count > 2) {
          container.remove(container.children.get(2));
        }
      },
      
      /**
       * Creates the visual for a label to be drawn
       */
      'createVisual': function(/*yfiles.graph.ILabel*/ label, /*yfiles.drawing.IRenderContext*/ renderContext) {
        // This implementation creates a CanvasContainer and uses it for the rendering of the label.
        var /*yfiles.canvas.CanvasContainer*/ container = new yfiles.canvas.CanvasContainer();
        // Render the label
        this.$render(label, container, label.layout, renderContext);
        // move container to correct location
        this.arrangeByLayout(container, label.layout, true);
        // set data item
        container.svgElement.setAttribute("data-internalId", "MySimpleLabel");
        container.svgElement["data-item"] = label;
        return container;
      },
      
      // #endregion 
      // #region Rendering Helper Methods
      /**
       * Calculates the preferred size for the given label if this style is used for the rendering.
       */
      'getPreferredSize': function(/*yfiles.graph.ILabel*/ label) {
        return new yfiles.geometry.SizeD(60, 15);
      },
      
      // #endregion 
      '$static': {
        'FILL_BRUSH': null,
        
        '$clinit': function() {
          demo.yfiles.layout.modules.MySimpleLabelStyle.FILL_BRUSH = new yfiles.bridge.SolidColorBrush(yfiles.bridge.Color.fromArgb(255, 155, 226, 255));
        }
        
      }
    };
  })


});});
