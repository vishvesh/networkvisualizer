(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['yfiles/lang'],function(){
  yfiles.module("demo.yfiles.layout.modules", function(exports) {
    /**
     * This class is an example of a custom port style based on the {@link yfiles.drawing.SimpleAbstractPortStyle} class.
     * The port is rendered as a circle.
     */
    /*public*/ exports.StatusPortStyle = new yfiles.ClassDefinition(function() {
      return {
        '$extends': yfiles.drawing.SimpleAbstractPortStyle,

        'constructor': function() {
          yfiles.drawing.SimpleAbstractPortStyle.call(this, yfiles.drawing.DefaultVisual.$class);
        },

        'createVisual': function(/*yfiles.graph.IPort*/ port, /*yfiles.drawing.IRenderContext*/ renderContext) {
          if(!demo.yfiles.layout.modules.StatusPortStyle.$initialized) {
            this.initialize(renderContext);
          }

          // create a use element
          var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
          // set href
            //YWORKS6: getImageId also needs the graph to determine the adjacent edges.
          var imageId = this.getImageId(renderContext.canvas.graph, port);
          use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + imageId);
          use["data-image-id"] = imageId;
          // and arrange it
          var /*yfiles.geometry.PointD*/ location = yfiles.geometry.PointD.add(port.location.toPoint(), new yfiles.geometry.PointD(-demo.yfiles.layout.modules.StatusPortStyle.WIDTH * 0.5, -demo.yfiles.layout.modules.StatusPortStyle.HEIGHT * 0.5));
          use.setAttributeNS(null, "transform", "translate(" + location.$x + " " + location.$y + ")");

          // return a visual wrapper for the use
          return new yfiles.drawing.DefaultVisual(use);
        },

        'updateVisual': function(/*yfiles.graph.IPort*/ port, /*yfiles.drawing.IRenderContext*/ renderContext, /*yfiles.drawing.EllipseVisual*/ oldVisual) {
          var use = oldVisual.svgElement;
          // arrange the old use
          var /*yfiles.geometry.PointD*/ location = yfiles.geometry.PointD.add(port.location.toPoint(), new yfiles.geometry.PointD(-demo.yfiles.layout.modules.StatusPortStyle.WIDTH * 0.5, -demo.yfiles.layout.modules.StatusPortStyle.HEIGHT * 0.5));
          if (use.transform.baseVal.numberOfItems == 1) {
            // set the translate directly on the transform object, this is faster than setAttribute
            use.transform.baseVal.getItem(0).setTranslate(location.$x, location.$y);
          } else {
            use.setAttributeNS(null, "transform", "translate(" + location.$x + " " + location.$y + ")");
          }
          // only set href if image id has changed
            //YWORKS6: getImageId also needs the graph to determine the adjacent edges.
          var imageId = this.getImageId(renderContext.canvas.graph, port);
          if (use["data-image-id"] != imageId) {
            use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + imageId);
            use["data-image-id"] = imageId;
          }
          return oldVisual;
        },

        /**
         * Calculates the bounds of this port.
         * These are also used for arranging the visual, hit testing, visibility testing, and marquee box tests.
         */
        'getBounds': function(/*yfiles.graph.IPort*/ port, /*yfiles.canvas.ICanvasContext*/ canvasContext) {
          return yfiles.geometry.RectD.fromCenter(port.location.toPoint(), new yfiles.geometry.SizeD(demo.yfiles.layout.modules.StatusPortStyle.WIDTH, demo.yfiles.layout.modules.StatusPortStyle.HEIGHT));
        },

          // YWORKS6
        'getImageId': function(/*yfiles.graph.IGraph*/graph, /*yfiles.graph.IPort*/ port) {
            var edges = graph.edgesAtPort(port).getEnumerator();
            while(edges.moveNext()) {
                var edge = edges.current;
                if (edge.tag && edge.tag.floworder) {
                    if (edge.tag.floworder == 2 && edge.sourcePort == port) {
                        return "image_up";
                    } else {
                        return "image_down";
                    }
                }
            }
            return "image_default";

//          var status = port.tag.opStatus;
//          switch (status) {
//            case 'up':
//              return "image_up";
//            case 'down':
//              return "image_down";
//            default:
//              return "image_default";
//          }
        },

        'initialize': function(/*yfiles.drawing.IRenderContext*/ ctx) {
          // get defs element of main svg
          var defs = ctx.canvas.div.getElementsByTagName("defs").item(0);

          // create the image sources for the ports
          var imageUp = document.createElementNS("http://www.w3.org/2000/svg", "image");
          imageUp.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "images/socket_simple_black.png");
          imageUp.setAttributeNS(null, "width", demo.yfiles.layout.modules.StatusPortStyle.WIDTH);
          imageUp.setAttributeNS(null, "height", demo.yfiles.layout.modules.StatusPortStyle.HEIGHT);
          imageUp.setAttributeNS(null, "id", "image_up");
          var imageDown = document.createElementNS("http://www.w3.org/2000/svg", "image");
          imageDown.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "images/socket_simple_red.png");
          imageDown.setAttributeNS(null, "width", demo.yfiles.layout.modules.StatusPortStyle.WIDTH);
          imageDown.setAttributeNS(null, "height", demo.yfiles.layout.modules.StatusPortStyle.HEIGHT);
          imageDown.setAttributeNS(null, "id", "image_down");
          var imageDefault = document.createElementNS("http://www.w3.org/2000/svg", "image");
          imageDefault.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "images/socket_simple_green.png");
          imageDefault.setAttributeNS(null, "width", demo.yfiles.layout.modules.StatusPortStyle.WIDTH);
          imageDefault.setAttributeNS(null, "height", demo.yfiles.layout.modules.StatusPortStyle.HEIGHT);
          imageDefault.setAttributeNS(null, "id", "image_default");

          // alternatively:
          /*
          var imageUp = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          imageUp.setAttributeNS(null, "fill", "green");
          imageUp.setAttributeNS(null, "width", demo.yfiles.layout.modules.StatusPortStyle.WIDTH);
          imageUp.setAttributeNS(null, "height", demo.yfiles.layout.modules.StatusPortStyle.HEIGHT);
          imageUp.setAttributeNS(null, "id", "image_up");
          var imageDown = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          imageDown.setAttributeNS(null, "fill", "red");
          imageDown.setAttributeNS(null, "width", demo.yfiles.layout.modules.StatusPortStyle.WIDTH);
          imageDown.setAttributeNS(null, "height", demo.yfiles.layout.modules.StatusPortStyle.HEIGHT);
          imageDown.setAttributeNS(null, "id", "image_down");
          var imageDefault = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          imageDefault.setAttributeNS(null, "fill", "yellow");
          imageDefault.setAttributeNS(null, "width", demo.yfiles.layout.modules.StatusPortStyle.WIDTH);
          imageDefault.setAttributeNS(null, "height", demo.yfiles.layout.modules.StatusPortStyle.HEIGHT);
          imageDefault.setAttributeNS(null, "id", "image_default");
          */

          defs.appendChild(imageUp);
          defs.appendChild(imageDown);
          defs.appendChild(imageDefault);

          demo.yfiles.layout.modules.StatusPortStyle.$initialized = true;
        },

        '$static': {

          // the size of the port rendering - immutable
          'WIDTH': 25,

          'HEIGHT': 25,

          '$initialized': false

        }
      };
    })


  });});
