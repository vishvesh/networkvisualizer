(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['yfiles/lang'],function(){
    yfiles.module("demo.yfiles", function(exports) {
        /*public*/ exports.PortKeepingStage = new yfiles.ClassDefinition(function() {
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
                    var /*yfiles.collections.Dictionary*/ nodeCenterMap = new yfiles.collections.Dictionary();
                    var /*yfiles.collections.Dictionary*/ sourcePointMap = new yfiles.collections.Dictionary();
                    var /*yfiles.collections.Dictionary*/ targetPointMap = new yfiles.collections.Dictionary();

                    var /*yfiles.algorithms.GraphHider*/ hider = new yfiles.algorithms.GraphHider(graph);
                    var /*yfiles.util.IEnumerator*/ edges = graph.edges.getEnumerator();


                    // Hide selfloops: go over all edges

                    while (edges.moveNext()) {
                        var /*yfiles.algorithms.Edge*/ edge = edges.current;
                        sourcePointMap.addKeyValue(edge, graph.getSourcePointRel(edge));
                        targetPointMap.addKeyValue(edge, graph.getTargetPointRel(edge));
                        {
                            // if the edge is a self loop
                            if (edge.source === edge.target) {
                                // remember the node location to fix existing bends
                                nodeCenterMap.addKeyValue(edge, graph.getCenter(edge.source));
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

                    edges = graph.edges.getEnumerator();
                    while (edges.moveNext()) {
                        edge = edges.current;
                        graph.setSourcePointRel(edge, sourcePointMap.get(edge));
                        graph.setTargetPointRel(edge, targetPointMap.get(edge));
                    }

                    // correct the layout such that the hidden edges will end at their ports
                    // for each hidden edge
                    var /*yfiles.util.IEnumerator*/ hiddenEdgeEnumerator = selfLoopEdges.getListEnumerator();
                    while (hiddenEdgeEnumerator.moveNext()) {
                        edge = hiddenEdgeEnumerator.current;
                        {
                            var sp = graph.getSourcePointAbs(edge);
                            var tp = graph.getTargetPointAbs(edge);


                            var /*yfiles.layout.IEdgeLayout*/ el = graph.getEdgeLayout(edge);
                            var center = graph.getCenter(edge.source);
                            if (el.pointCount() > 0) {
                                // bends exist: correct their location
                                var oldCenterRef = {};
                                if (nodeCenterMap.tryGetValue(edge, oldCenterRef)) {
                                    var oldCenter = oldCenterRef.value;
                                    var currentCenter = center;
                                    var dx =+ currentCenter.x - oldCenter.x;
                                    var dy =+ currentCenter.y - oldCenter.y;
                                    for (var i=0; i<el.pointCount(); i++) {
                                        var bend = el.getPoint(i);
                                        el.setPoint(i, bend.x + dx, bend.y + dy);
                                    }
                                }
                            } else if (sp.y === tp.y) {
                                // extra: if no bends exist and the source and target are at the same y (most likely the node border)
                                // add some bends to improve the visibility
                                var /*double*/ y = center.y;
                                el.addPoint(sp.x, y);
                                el.addPoint(tp.x, y);
                            }
                        }
                    }
                }
            };
        })


    });});
