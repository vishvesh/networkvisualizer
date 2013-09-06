(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['yfiles/lang'],function(){
yfiles.module("demo.yfiles.layout.module", function(exports) {
  /*public*/ exports.SelfloopHidingStage = new yfiles.ClassDefinition(function() {
    return {
      '$extends': yfiles.layout.AbstractLayoutStage,
      
      'constructor': function(/*yfiles.layout.ILayouter*/ coreLayouter) {
        yfiles.layout.AbstractLayoutStage.WithCoreLayouter.call(this, coreLayouter);
      },
      
      'canLayout': function(/*yfiles.layout.LayoutGraph*/ graph) {
        return true;
      },
      
      'doLayout': function(/*yfiles.layout.LayoutGraph*/ graph) {
        var /*yfiles.collections.List<yfiles.algorithms.Edge>*/ selfLoopEdges = new yfiles.collections.List/*<yfiles.algorithms.Edge>*/();
        var /*yfiles.collections.Dictionary*/ sourceEdgeInfo = new yfiles.collections.Dictionary();
        var /*yfiles.collections.Dictionary*/ targetEdgeInfo = new yfiles.collections.Dictionary();

        var /*yfiles.algorithms.GraphHider*/ hider = new yfiles.algorithms.GraphHider(graph);
        var /*yfiles.layout.CopiedLayoutGraph*/ clg = /*(yfiles.layout.CopiedLayoutGraph)*/graph;
        var /*yfiles.graph.IGraph*/ igraph = (/*(yfiles.graph.LayoutGraphAdapter)*/clg.originalGraph).adaptedGraph;
        var /*yfiles.util.IEnumerator*/ edges = graph.edges.getEnumerator();


        // Hide selfloops: go over all edges

        while (edges.moveNext()) {
          var /*yfiles.algorithms.Edge*/ edge = edges.current;
          {
            // if the edge is a self loop
            if (edge.source === edge.target) {
              var /*yfiles.graph.IEdge*/ originalEdge = /*(yfiles.graph.IEdge)*/clg.getOriginalEdge(edge);
              var /*yfiles.graph.IPort*/ source = originalEdge.sourcePort;
              var /*yfiles.graph.IPort*/ target = originalEdge.targetPort;

              // find other edges at the same port and map them
              // 1. at source
              var /*yfiles.util.IEnumerator*/ edgesAtSourcePort = yfiles.graph.GraphExtensions.edgesAtPort(igraph, source).getEnumerator();
              while (edgesAtSourcePort.moveNext()) {
                var /*yfiles.graph.IEdge*/ e = edgesAtSourcePort.current;
                {
                  if (e === originalEdge) continue;
                  var /*demo.yfiles.layout.module.SelfloopHidingStage.EdgeStruct*/ es = {otherEdge: clg.getCopiedEdge(e), otherAtSource:e.sourcePort === source};
                  sourceEdgeInfo.addKeyValue(edge, es);
                  break;
                }
              }
              // 2. at target
              var /*yfiles.util.IEnumerator*/ edgesAtTargetPort = yfiles.graph.GraphExtensions.edgesAtPort(igraph, target).getEnumerator();
              while (edgesAtTargetPort.moveNext()) {
                var /*yfiles.graph.IEdge*/ e = edgesAtTargetPort.current;
                {
                  if (e === originalEdge) continue;
                  var /*demo.yfiles.layout.module.SelfloopHidingStage.EdgeStruct*/ es = {otherEdge: clg.getCopiedEdge(e), otherAtSource: e.sourcePort === target};
                  targetEdgeInfo.addKeyValue(edge, es);
                  break;
                }
              }
              // last: remember the edge and hide it
              selfLoopEdges.add(edge);
              hider.hide(edge);
            }
          }
        }

        // after all selfloops are hidden: do the actual layout
        this.doLayoutCore(graph);

        // after the layout: unhide the edges
        hider.unhideAll();

        // correct the layout such that the hidden edges will end at their ports
        // for each hidden edge
        var /*yfiles.util.IEnumerator*/ hiddenEdgeEnumerator = selfLoopEdges.getListEnumerator();
        while (hiddenEdgeEnumerator.moveNext()) {
          var /*yfiles.algorithms.Edge*/ edge = hiddenEdgeEnumerator.current;
          {
            var sourceEs = {};
            var /*yfiles.algorithms.YPoint*/ sp = graph.getSourcePointAbs(edge);
            // get the mapped info and set the edge's source point accordingly
            if (sourceEdgeInfo.tryGetValue(edge, sourceEs)) {
              sp = sourceEs.value.otherAtSource ? graph.getSourcePointAbs(sourceEs.value.otherEdge) : graph.getTargetPointAbs(sourceEs.value.otherEdge);
              graph.setSourcePointAbs(edge, sp);
            }
            var targetEs = {};
            var /*yfiles.algorithms.YPoint*/ tp = graph.getSourcePointAbs(edge);
            // same for the target point
            if (targetEdgeInfo.tryGetValue(edge, targetEs)) {
              tp = targetEs.value.otherAtSource ? graph.getSourcePointAbs(targetEs.value.otherEdge) : graph.getTargetPointAbs(targetEs.value.otherEdge);
              graph.setTargetPointAbs(edge, tp);
            }

            // extra: if the source and target are at the same y (most likely the node border)
            // add some bends to improve the visibility
            if (sp.y === tp.y) {
              var /*double*/ y = graph.getCenter(edge.source).y;
              var /*yfiles.layout.IEdgeLayout*/ el = graph.getEdgeLayout(edge);
              el.addPoint(sp.x, y);
              el.addPoint(tp.x, y);
            }
          }
        }
      }
    };
  })


});});
