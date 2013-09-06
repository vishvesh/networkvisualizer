(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['yfiles/lang'],function(){
yfiles.module("demo.yfiles.graph.input.portcandidateprovider", function(exports) {
  /*public*/ exports.InsideNodeLineRenderer = new yfiles.ClassDefinition(function() {
    return {
      '$extends': yfiles.drawing.PolylineEdgeStyleRenderer,
      
      'constructor': function() {
        yfiles.drawing.PolylineEdgeStyleRenderer.call(this);
        this.$calculator = new yfiles.graph.DefaultEdgeIntersectionCalculator();
      },
      
      '$calculator': null,
      
      /**
       * Creates the edge path. In contrast to its base method, this method has no special handling for edges inside nodes.
       */
      'createPath': function() {
        var /*yfiles.model.IListEnumerable<yfiles.graph.IBend>*/ bends = this.itemF.bends;
        var /*yfiles.drawing.GeneralPath*/ generalPath = new yfiles.drawing.GeneralPath.WithCapacity(bends.count + 2);
        generalPath.moveToPoint(this.itemF.sourcePort.location);
        var /*yfiles.util.IEnumerator*/ tmpEnumerator = bends.getEnumerator();
        while (tmpEnumerator.moveNext()) {
          var /*yfiles.graph.IBend*/ bend = tmpEnumerator.current;
          {
            generalPath.lineToPoint(bend.location);
          }
        }
        generalPath.lineToPoint(this.itemF.targetPort.location);
        return generalPath;
      },
      
      /**
       * Crops the edge path at the nodes except for edges inside a single node.
       */
      // 'cropPath': function(/*final yfiles.lang.Reference<yfiles.drawing.GeneralPath>*/ pathToCrop) {
       // special cropping only for edges inside a node
        // var /*yfiles.lang.Object*/ obj;
        // if (this.itemF.sourcePort === this.itemF.targetPort || (((obj = this.itemF.sourcePort.owner) === yfiles.graph.INode.$class || obj && obj.getClass && obj.getClass().types[yfiles.graph.INode.$class.fullName]) && this.itemF.sourcePort.owner === this.itemF.targetPort.owner)) {
          // if (this.getSourceArrow() !== null) {
            // this.$calculator.cropEdgePathWithEdgePathAtSourceAndArrow(pathToCrop, true, this.getSourceArrow());
          // }
          // if (this.getTargetArrow() !== null) {
            // this.$calculator.cropEdgePathWithEdgePathAtSourceAndArrow(pathToCrop, false, this.getTargetArrow());
          // }
        // } else {
          // demo.yfiles.graph.input.portcandidateprovider.InsideNodeLineRenderer.$super.cropPath.call(this, pathToCrop);
        // }
      // },
	  
	    /**
       * Crops the edge path at the nodes except for edges inside a single node.
       */
      'cropPath': function(/*final yfiles.lang.Reference<yfiles.drawing.GeneralPath>*/ pathToCrop) {
        // special cropping only for edges inside a node
        var /*yfiles.lang.Object*/ obj;
		//        if (this.itemF.sourcePort === this.itemF.targetPort || (((obj = this.itemF.sourcePort.owner) === yfiles.graph.INode.$class || obj && obj.getClass && obj.getClass().types[yfiles.graph.INode.$class.fullName]) && this.itemF.sourcePort.owner === this.itemF.targetPort.owner)) 
		if (this.itemF.sourcePort === this.itemF.targetPort ||(yfiles.graph.INode.isInstance(this.itemF.sourcePort.owner) && this.itemF.sourcePort.owner === this.itemF.targetPort.owner))
		{
          if (this.getSourceArrow() !== null) {
            this.$calculator.cropEdgePathWithEdgePathAtSourceAndArrow(pathToCrop, true, this.getSourceArrow());
          }
          if (this.getTargetArrow() !== null) {
            this.$calculator.cropEdgePathWithEdgePathAtSourceAndArrow(pathToCrop, false, this.getTargetArrow());
          }
        } 
      },


      'createVisual': function(ctx) {
          // get the visual from the super implementation
          var visual = demo.yfiles.graph.input.portcandidateprovider.InsideNodeLineRenderer.$super.createVisual.call(this, ctx);
          // check whether there is a tag with the property floworder
          var floworder = this.item.tag && this.item.tag.floworder;
          if (visual && floworder) {
              // retrieve the path element
              var element = visual.svgElement.firstElementChild;
              if (element.tagName == "path") {
                  // select the direction according to the flow order
                  // the animation goes from 0 to 12 which is appropriate for a stroke with the dash pattern 6,6
                  var from = floworder == 1 ? 0 : 30;
                  var to = floworder == 1 ? 30 : 0;
                  var animate = document.createElementNS(this.svgNS, "animate");
                  animate.setAttributeNS(null, "from", from);
                  animate.setAttributeNS(null, "to", to);
                  // duration 0.5s - change to increase or decrease speed
                  animate.setAttributeNS(null, "dur", "0.5s");
                  animate.setAttributeNS(null, "attributeName", "stroke-dashoffset");
                  animate.setAttributeNS(null, "repeatCount", "indefinite");
                  element.appendChild(animate);
              }

          }
          return visual;
      },
      'svgNS': "http://www.w3.org/2000/svg"
    };
  })


});});
