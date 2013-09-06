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
   * @class demo.yfiles.graph.simplecustomstyle.SimpleCustomStyleDemo
   * @augments yfiles.demo.Application
   */
  /*public*/ exports.SimpleCustomStyleDemo = new yfiles.ClassDefinition(function() {
    /** @lends demo.yfiles.graph.simplecustomstyle.SimpleCustomStyleDemo.prototype */
    return {
      '$extends': yfiles.demo.Application,
      
      'constructor': function() {
        yfiles.demo.Application.call(this);
        this.$init();
      },
      
      /**
       * Sets a custom NodeStyle instance as a template for newly created
       * nodes in the graph.
       */
      'initializeGraph': function() {
        var /*yfiles.graph.IGraph*/ graph = this.graphControl.graph;

        // Create a new style and use it as default port style
        graph.nodeDefaults.ports.style = new demo.yfiles.graph.simplecustomstyle.MySimplePortStyle();

        // Create a new style and use it as default node style
        graph.nodeDefaults.style = new demo.yfiles.graph.simplecustomstyle.MySimpleNodeStyle();
        // Create a new style and use it as default edge style
        graph.edgeDefaults.style = new demo.yfiles.graph.simplecustomstyle.MySimpleEdgeStyle();
        // Create a new style and use it as default label style
        graph.nodeDefaults.labels.style = new demo.yfiles.graph.simplecustomstyle.MySimpleLabelStyle();
        graph.nodeDefaults.labels.labelModelParameter = yfiles.drawing.ExteriorLabelModel.NORTH;
        graph.edgeDefaults.labels.style = new demo.yfiles.graph.simplecustomstyle.MySimpleLabelStyle();

        graph.nodeDefaults.size = new yfiles.geometry.SizeD(50, 50);

        // Create some graph elements with the above defined styles.
        this.$createSampleGraph();
      },
      
      // #region Initialization
      /**
       * Called upon loading of the form.
       * This method initializes the graph and the input mode.
       * @see 
       * @see demo.yfiles.graph.simplecustomstyle.SimpleCustomStyleDemo#initializeGraph
       */
      'initialize': function() {
        // initialize the graph
        this.initializeGraph();

        // initialize the input mode
        this.graphControl.inputMode = this.createEditorMode();

        this.graphControl.fitGraphBounds();
      },
      
      /**
       * Creates the default input mode for the GraphControl,
       * a {@link yfiles.input.GraphEditorInputMode}.
       * @return {yfiles.input.IInputMode} a new GraphEditorInputMode instance
       */
      'createEditorMode': function() {
        var /*yfiles.input.GraphEditorInputMode*/ newGraphEditorInputMode;
        {
          newGraphEditorInputMode = new yfiles.input.GraphEditorInputMode();
          newGraphEditorInputMode.labelEditingAllowed = true;
        }
        var /*yfiles.input.GraphEditorInputMode*/ mode = newGraphEditorInputMode;
        return mode;
      },
      
      // #endregion 
      // #region Graph creation
      /**
       * Creates the initial sample graph.
       * @private
       */
      '$createSampleGraph': function() {
        var /*yfiles.graph.IGraph*/ graph = this.graphControl.graph;
        var /*yfiles.graph.INode*/ n0 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(291, 433), yfiles.system.Color.fromArgb(255, 108, 0, 255));
        var /*yfiles.graph.INode*/ n1 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(396, 398), yfiles.system.Color.fromArgb(255, 210, 255, 0));
        var /*yfiles.graph.INode*/ n2 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(462, 308), yfiles.system.Color.fromArgb(255, 0, 72, 255));
        var /*yfiles.graph.INode*/ n3 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(462, 197), yfiles.system.Color.fromArgb(255, 255, 0, 84));
        var /*yfiles.graph.INode*/ n4 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(396, 107), yfiles.system.Color.fromArgb(255, 255, 30, 0));
        var /*yfiles.graph.INode*/ n5 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(291, 73), yfiles.system.Color.fromArgb(255, 0, 42, 255));
        var /*yfiles.graph.INode*/ n6 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(185, 107), yfiles.system.Color.fromArgb(255, 114, 255, 0));
        var /*yfiles.graph.INode*/ n7 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(119, 197), yfiles.system.Color.fromArgb(255, 216, 0, 255));
        var /*yfiles.graph.INode*/ n8 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(119, 308), yfiles.system.Color.fromArgb(255, 36, 255, 0));
        var /*yfiles.graph.INode*/ n9 = graph.createNodeAtLocationAndTag(new yfiles.geometry.PointD(185, 398), yfiles.system.Color.fromArgb(255, 216, 0, 255));

        var /*yfiles.drawing.ExteriorLabelModel*/ newExteriorLabelModel;
        {
          newExteriorLabelModel = new yfiles.drawing.ExteriorLabelModel();
          newExteriorLabelModel.insets = new yfiles.geometry.InsetsD(15);
        }
        var /*yfiles.drawing.ExteriorLabelModel*/ labelModel = newExteriorLabelModel;
        graph.addLabelWithParameter(n0, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.SOUTH), "Node 0");
        graph.addLabelWithParameter(n1, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.SOUTH_EAST), "Node 1");
        graph.addLabelWithParameter(n2, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.EAST), "Node 2");
        graph.addLabelWithParameter(n3, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.EAST), "Node 3");
        graph.addLabelWithParameter(n4, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.NORTH_EAST), "Node 4");
        graph.addLabelWithParameter(n5, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.NORTH), "Node 5");
        graph.addLabelWithParameter(n6, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.NORTH_WEST), "Node 6");
        graph.addLabelWithParameter(n7, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.WEST), "Node 7");
        graph.addLabelWithParameter(n8, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.WEST), "Node 8");
        graph.addLabelWithParameter(n9, labelModel.createParameter(yfiles.drawing.ExteriorLabelModel.Position.SOUTH_WEST), "Node 9");

        graph.createEdge(n0, n4);
        graph.createEdge(n6, n0);
        graph.createEdge(n6, n5);
        graph.createEdge(n5, n2);
        graph.createEdge(n3, n7);
        graph.createEdge(n9, n4);
      },
      
      // #endregion 
      /**
       * Backing field for below property 
       * @type yfiles.canvas.GraphControl
       * @private
       */
      '$graphControl': null,
      
      /** @type yfiles.canvas.GraphControl */
      'graphControl': {
        'get': function() {
          return this.$graphControl;
        },
        'set': function(/*yfiles.canvas.GraphControl*/ value) {
          this.$graphControl = value;
        }
      },
      
      'loaded': function() {
        this.$createTitle("Simple Custom Styles Demo [yFiles for HTML]");
        this.initialize();
      },
      
      '$createTitle': function(/*string*/ title) {
        document.title = title;
      },
      
      'registerCommands': function() {
        this.setProperty("FitContent", new yfiles.demo.ApplicationCommand(yfiles.canvas.GraphControl.FIT_GRAPH_BOUNDS_COMMAND, this.graphControl));
        this.setProperty("ZoomIn", new yfiles.demo.ApplicationCommand(yfiles.system.NavigationCommands.INCREASE_ZOOM, this.graphControl));
        this.setProperty("ZoomOut", new yfiles.demo.ApplicationCommand(yfiles.system.NavigationCommands.DECREASE_ZOOM, this.graphControl));
        var /*yfiles.demo.ApplicationCommand*/ newApplicationCommand;
        {
          newApplicationCommand = new yfiles.demo.ApplicationCommand(yfiles.system.NavigationCommands.ZOOM, this.graphControl);
          newApplicationCommand.parameter = 1.0;
        }
        this.setProperty("ZoomOriginal", newApplicationCommand);
        this.setProperty("ModifyColors", new yfiles.demo.ActionCommand(yfiles.lang.delegate(this.modifyColors, this)));
      },
      
      /**
       * @type yfiles.system.Random
       * @private
       */
      '$random': null,
      
      /**
       * Modifies the tag of each node.
       */
      'modifyColors': function() {
        // modify the tag
        var /*yfiles.util.IEnumerator*/ tmpEnumerator;
        for (tmpEnumerator = this.graphControl.selection.selectedNodes.getEnumerator(); tmpEnumerator.moveNext(); ) {
          var /*yfiles.graph.INode*/ node = tmpEnumerator.current;
          {
            node.tag = yfiles.drawing.ImageSupport.fromHSB(this.$random.nextDouble(), 1, 1, 1);
          }
        }
        // and invalidate the view as the graph cannot know that we changed the styles
        this.graphControl.invalidate();
      },
      
      '$init': function() {
        this.$random = new yfiles.system.Random();
      }
      
    };
  })


});});
