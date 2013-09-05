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
yfiles.module("demo.yfiles.layout.modules", function(exports) {
  /**
   * Simple demo that hosts a {@link demo.yfiles.layout.modules.LayoutModulesDemo#graphControl}
   * which enables graph editing via the default {@link yfiles.input.GraphEditorInputMode} 
   * input mode for editing graphs.
   * This demo also supports grouped graphs, i.e., selected nodes can be grouped 
   * in so-called group nodes using CTRL-G, and again be ungrouped using CTRL-U. 
   * To move sets of nodes into and out of group nodes using the mouse, hold down 
   * the SHIFT key while dragging.
   * <p>
   * Apart from graph editing, the demo demonstrates various basic features that are already
   * present on <code>GraphControl</code> (either as predefined commands or as simple method calls), e.g.
   * load/save/export.
   * </p>
   * <p>
   * In addition to the <code>GraphControl</code> itself, the demo also shows how to use the <code>GraphOverviewControl</code>.
   * </p>
   * @class demo.yfiles.layout.modules.LayoutModulesDemo
   * @augments yfiles.demo.Application
   */
  /*public*/ exports.LayoutModulesDemo = new yfiles.ClassDefinition(function() {
    /** @lends demo.yfiles.layout.modules.LayoutModulesDemo.prototype */
    return {
      '$extends': yfiles.demo.Application,
      
      'constructor': function() {
        yfiles.demo.Application.call(this);
        this.$init();
      },
      
      // #region application
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
      
      /**
       * Backing field for below property 
       * @type yfiles.canvas.GraphOverviewControl
       * @private
       */
      '$overviewControl': null,
      
      /** @type yfiles.canvas.GraphOverviewControl */
      'overviewControl': {
        'get': function() {
          return this.$overviewControl;
        },
        'set': function(/*yfiles.canvas.GraphOverviewControl*/ value) {
          this.$overviewControl = value;
        }
      },
      
      /**
       * Backing field for below property 
       * @type yfiles.demo.IToggleButton
       * @private
       */
      '$orthogonalEditingButton': null,
      
      /** @type yfiles.demo.IToggleButton */
      'orthogonalEditingButton': {
        'get': function() {
          return this.$orthogonalEditingButton;
        },
        'set': function(/*yfiles.demo.IToggleButton*/ value) {
          this.$orthogonalEditingButton = value;
        }
      },
      
      /**
       * Backing field for below property 
       * @type yfiles.demo.IToggleButton
       * @private
       */
      '$snappingButton': null,
      
      /** @type yfiles.demo.IToggleButton */
      'snappingButton': {
        'get': function() {
          return this.$snappingButton;
        },
        'set': function(/*yfiles.demo.IToggleButton*/ value) {
          this.$snappingButton = value;
        }
      },
      
      /**
       * Backing field for below property 
       * @type yfiles.demo.IButton
       * @private
       */
      '$enterGroupButton': null,
      
      /** @type yfiles.demo.IButton */
      'enterGroupButton': {
        'get': function() {
          return this.$enterGroupButton;
        },
        'set': function(/*yfiles.demo.IButton*/ value) {
          this.$enterGroupButton = value;
        }
      },
      
      /**
       * Backing field for below property 
       * @type yfiles.demo.IButton
       * @private
       */
      '$exitGroupButton': null,
      
      /** @type yfiles.demo.IButton */
      'exitGroupButton': {
        'get': function() {
          return this.$exitGroupButton;
        },
        'set': function(/*yfiles.demo.IButton*/ value) {
          this.$exitGroupButton = value;
        }
      },
      
      /**
       * Backing field for below property 
       * @type yfiles.demo.IComboBox
       * @private
       */
      '$layoutComboBox': null,
      
      /** @type yfiles.demo.IComboBox */
      'layoutComboBox': {
        'get': function() {
          return this.$layoutComboBox;
        },
        'set': function(/*yfiles.demo.IComboBox*/ value) {
          this.$layoutComboBox = value;
        }
      },
      
      'registerCommands': function() {
        this.setProperty("New", new yfiles.demo.ActionCommand(yfiles.lang.delegate(this.$newButton_Click, this)));
        this.setProperty("Open", new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.OPEN, this.graphControl));
        this.setProperty("Save", new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.SAVE_AS, this.graphControl));
        this.setProperty("Print", new yfiles.demo.ActionCommand(function() {
          alert("Command not implemented");
        }));

        this.setProperty("FitContent", new yfiles.demo.ApplicationCommand(yfiles.canvas.GraphControl.FIT_GRAPH_BOUNDS_COMMAND, this.graphControl));
        this.setProperty("ZoomIn", new yfiles.demo.ApplicationCommand(yfiles.system.NavigationCommands.INCREASE_ZOOM, this.graphControl));
        this.setProperty("ZoomOut", new yfiles.demo.ApplicationCommand(yfiles.system.NavigationCommands.DECREASE_ZOOM, this.graphControl));
        var /*yfiles.demo.ApplicationCommand*/ newApplicationCommand;
        {
          newApplicationCommand = new yfiles.demo.ApplicationCommand(yfiles.system.NavigationCommands.ZOOM, this.graphControl);
          newApplicationCommand.parameter = 1.0;
        }
        this.setProperty("ZoomOriginal", newApplicationCommand);

        this.setProperty("Cut", new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.CUT, this.graphControl));
        this.setProperty("Copy", new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.COPY, this.graphControl));
        this.setProperty("Paste", new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.PASTE, this.graphControl));
        this.setProperty("Delete", new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.DEL, this.graphControl));

        this.setProperty("Undo", new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.UNDO, this.graphControl));
        this.setProperty("Redo", new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.REDO, this.graphControl));

        this.setProperty("GroupSelection", new yfiles.demo.ApplicationCommand(yfiles.input.GraphCommands.GROUP_SELECTION_COMMAND, this.graphControl));
        this.setProperty("UngroupSelection", new yfiles.demo.ApplicationCommand(yfiles.input.GraphCommands.UNGROUP_SELECTION_COMMAND, this.graphControl));
        this.setProperty("EnterGroup", new yfiles.demo.ApplicationCommand(yfiles.input.GraphCommands.ENTER_GROUP_COMMAND, this.graphControl));
        this.setProperty("ExitGroup", new yfiles.demo.ApplicationCommand(yfiles.input.GraphCommands.EXIT_GROUP_COMMAND, this.graphControl));

        this.setProperty("ToggleSnapping", new yfiles.demo.ActionCommand(yfiles.lang.delegate(this.$snappingButton_Click, this)));
        this.setProperty("ToggleOrthogonalEditing", new yfiles.demo.ActionCommand(yfiles.lang.delegate(this.$orthogonalEditingButton_Click, this)));

        this.setProperty("LayoutCommand", new yfiles.demo.ActionCommand(yfiles.lang.delegate(this.$applyLayout, this)));
        this.setProperty("LayoutSelectionChanged", new yfiles.demo.ActionCommand(yfiles.lang.delegate(this.layoutComboBox_SelectedIndexChanged, this)));
      },
      
      'loaded': function() {
        this.setTitle("Layout Module Demo [yFiles for HTML]");
        (/*(yfiles.demo.IButton)*/this.getProperty("printButton")).enabled = false;

        this.graphControl.storageLocation = yfiles.canvas.StorageLocation.FILE_SYSTEM;
        this.graphControl.preventContextMenuPropagation = false;

        require(["yfiles/graph-folding", "yfiles/graph-style-extra"], (function() {
          this.initializeGraph();
          this.createSampleGraph();
          require(["yfiles/graph-layout-bridge"], yfiles.lang.delegate(this.$initializeLayoutAlgorithms, this));
        }).bind(this));

        require(["yfiles/graph-input"], yfiles.lang.delegate(this.initializeInputModes, this));
        require(["yfiles/graph-graphml"], function() {});

        this.$initializeGrid();
        this.initializeSnapContext();

        this.overviewControl.graphControl = this.graphControl;
      },
      
      // #endregion 
      /**
       * @type yfiles.input.GraphSnapContext
       * @private
       */
      '$snapContext': null,
      
      /**
       * @type yfiles.canvas.GridInfo
       * @private
       */
      '$gridInfo': null,
      
      /**
       * @type yfiles.demo.ContextMenu
       * @private
       */
      '$contextMenu': null,
      
      '$initializeGrid': function() {},
      
      'initializeSnapContext': function() {
        var /*yfiles.input.GraphSnapContext*/ newGraphSnapContext;
        {
          newGraphSnapContext = new yfiles.input.GraphSnapContext();
          newGraphSnapContext.enabled = false;
          newGraphSnapContext.gridSnapType = yfiles.canvas.GridSnapType.NONE;
          newGraphSnapContext.nodeGridConstraintProvider = new yfiles.input.SimpleGridConstraintProvider/*<yfiles.graph.INode>*/.FromGridInfo(this.$gridInfo);
          newGraphSnapContext.bendGridConstraintProvider = new yfiles.input.SimpleGridConstraintProvider/*<yfiles.graph.IBend>*/.FromGridInfo(this.$gridInfo);
          newGraphSnapContext.portGridConstraintProvider = new yfiles.input.SimpleGridConstraintProvider/*<yfiles.graph.IPort>*/.FromGridInfo(this.$gridInfo);
        }
        this.$snapContext = newGraphSnapContext;
      },
      
      /**
       * Calls {@link demo.yfiles.layout.modules.LayoutModulesDemo#createEditorMode} and registers
       * the result as the {@link yfiles.canvas.CanvasControl#inputMode}.
       */
      'initializeInputModes': function() {
        this.graphControl.inputMode = this.createEditorMode();
      },
      
      /**
       * Creates the default input mode for the <code>GraphControl</code>,
       * a {@link yfiles.input.GraphEditorInputMode}.
       * @return {yfiles.input.IInputMode} a new <code>GraphEditorInputMode</code> instance and configures snapping and orthogonal edge editing
       */
      'createEditorMode': function() {
        var /*yfiles.input.GraphEditorInputMode*/ newGraphEditorInputMode;
        {
          newGraphEditorInputMode = new yfiles.input.GraphEditorInputMode();
          newGraphEditorInputMode.snapContext = this.$snapContext;
          var /*yfiles.input.OrthogonalEdgeEditingContext*/ newOrthogonalEdgeEditingContext;
          {
            newOrthogonalEdgeEditingContext = new yfiles.input.OrthogonalEdgeEditingContext();
            newOrthogonalEdgeEditingContext.orthogonalEdgeEditing = false;
          }
          newGraphEditorInputMode.orthogonalEdgeEditingContext = newOrthogonalEdgeEditingContext;
        }
        var /*yfiles.input.GraphEditorInputMode*/ mode = newGraphEditorInputMode;
        mode.navigationInputMode.addGroupEnteredListener(yfiles.lang.delegate(this.$onGroupChanged, this));
        mode.navigationInputMode.addGroupExitedListener(yfiles.lang.delegate(this.$onGroupChanged, this));

        // make bend creation more important than moving of selected edges
        // this has the effect that dragging a selected edge (not its bends)
        // will create a new bend instead of moving all bends
        // This is especially nicer in conjunction with orthogonal
        // edge editing because this creates additional bends every time
        // the edge is moved otherwise
        mode.createBendModePriority = mode.moveModePriority - 1;

        // add a context menu
        this.$contextMenu = new yfiles.demo.ContextMenu();
        mode.contextMenuInputMode.menu = this.$contextMenu;
        this.$contextMenu.install(this.graphControl.div);
        this.$contextMenu.addOpenedListener(function(/*Object*/ sender, /*yfiles.system.EventArgs*/ args) {
          var /*yfiles.system.CancelEventArgs*/ cancelEventArgs = new yfiles.system.CancelEventArgs();
          mode.contextMenuInputMode.menuOpening(cancelEventArgs);
          if (cancelEventArgs.cancel) {
            (/*(yfiles.demo.ContextMenu)*/sender).visible = false;
          }
        });
        this.$contextMenu.addClosedListener(function(/*Object*/ sender, /*yfiles.system.EventArgs*/ args) {
          mode.contextMenuInputMode.menuClosed();
        });
        mode.contextMenuInputMode.addCloseMenuListener((function(/*Object*/ o, /*yfiles.system.EventArgs*/ args) {
          this.$contextMenu.visible = false;
        }).bind(this));
        mode.contextMenuInputMode.addPopulateContextMenuListener(yfiles.lang.delegate(this.$onPopulateContextMenu, this));

        return mode;
      },
      
      /**
       * Populates the context menu based on the item the mouse hovers over
       * @private
       */
      '$onPopulateContextMenu': function(/*Object*/ sender, /*yfiles.input.PopulateContextMenuEventArgs*/ args) {
        // get the item which is located at the mouse position
        var /*yfiles.collections.IEnumerator<yfiles.model.IModelItem>*/ hits = this.graphControl.graphModelManager.enumerateHits(args.queryLocation);
        var /*yfiles.model.IModelItem*/ item = null;
        while (hits.moveNext()) {
          item = hits.current;
          if (yfiles.graph.INode.isInstance(item)) {
            break;// prefer nodes
          }
        }
        if (item === null) {
          // empty canvas hit: provide "select all"
          this.$contextMenu.createMenuItem("Select All").command = new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.SELECT_ALL, this.graphControl);
        }

        var /*yfiles.graph.IGraphSelection*/ graphSelection = this.graphControl.selection;

        // if a node or an edge is hit: provide "Select All Nodes" or "Select All Edges", respectively
        // also: select the hit item
        if (yfiles.graph.INode.isInstance(item)) {
          this.$contextMenu.createMenuItem("Select All Nodes").addEventListener(yfiles.lang.delegate(this.$selectAllNodes, this));
          if (!graphSelection.isSelected(item)) {
            graphSelection.clear();
          }
          graphSelection.setSelected(item, true);
        } else if (yfiles.graph.IEdge.isInstance(item)) {
          this.$contextMenu.createMenuItem("Select All Edges").addEventListener(yfiles.lang.delegate(this.$selectAllEdges, this));
          if (!graphSelection.isSelected(item)) {
            graphSelection.clear();
          }
          graphSelection.setSelected(item, true);
        }
        // if one or more nodes are selected: add options to cut and copy
        if (graphSelection.selectedNodes.count > 0) {
          this.$contextMenu.createMenuItem("Cut").command = new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.CUT, this.graphControl);
          this.$contextMenu.createMenuItem("Copy").command = new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.COPY, this.graphControl);
        }
        if (!this.graphControl.clipboard.empty) {
          // clipboard is not empty: add option to paste
          this.$contextMenu.createMenuItem("Paste").command = new yfiles.demo.ApplicationCommand(yfiles.system.ApplicationCommands.PASTE, this.graphControl);
        }
      },
      
      '$selectAllEdges': function(/*Event*/ evt) {
        this.graphControl.selection.clear();
        var /*yfiles.util.IEnumerator*/ tmpEnumerator;
        for (tmpEnumerator = this.graph.edges.getEnumerator(); tmpEnumerator.moveNext(); ) {
          var /*yfiles.graph.IEdge*/ edge = tmpEnumerator.current;
          {
            this.graphControl.selection.setSelected(edge, true);
          }
        }
      },
      
      '$selectAllNodes': function(/*Event*/ evt) {
        this.graphControl.selection.clear();
        var /*yfiles.util.IEnumerator*/ tmpEnumerator;
        for (tmpEnumerator = this.graph.nodes.getEnumerator(); tmpEnumerator.moveNext(); ) {
          var /*yfiles.graph.INode*/ node = tmpEnumerator.current;
          {
            this.graphControl.selection.setSelected(node, true);
          }
        }
      },
      
      '$onGroupChanged': function(/*Object*/ source, /*yfiles.model.ItemEventArgs<yfiles.graph.INode>*/ evt) {
        this.enterGroupButton.enabled = yfiles.input.GraphCommands.ENTER_GROUP_COMMAND.canExecuteOnTarget(null, this.graphControl);
        this.exitGroupButton.enabled = yfiles.input.GraphCommands.EXIT_GROUP_COMMAND.canExecuteOnTarget(null, this.graphControl);
      },
      
      /**
       * Initializes the graph instance and set default styles.
       */
      'initializeGraph': function() {
        //Enable folding
        var /*yfiles.graph.IFoldedGraph*/ view = new yfiles.graph.FoldingManager().createManagedView();
        this.graphControl.graph = view.graph;

        // #region Enable undoability

        // Get the master graph instance and enable undoability support.
        var /*yfiles.graph.DefaultGraph*/ defaultGraph = view.manager.masterGraph.safeGet(yfiles.graph.DefaultGraph.$class);
        defaultGraph.undoEngineEnabled = true;

        // #endregion 

        // #region Configure grouping

        // get a hold of the IGroupedGraph
        var /*yfiles.graph.IGroupedGraph*/ groupedGraph = view.groupedGraph;

        // configure the group node style.
        if (groupedGraph !== null) {
          //PanelNodeStyle is a nice style especially suited for group nodes
          var /*yfiles.system.Color*/ groupNodeColor = yfiles.system.Color.fromArgb(255, 214, 229, 248);
          var /*yfiles.drawing.PanelNodeStyle*/ newPanelNodeStyle;
          {
            newPanelNodeStyle = new yfiles.drawing.PanelNodeStyle.WithColor(groupNodeColor);
            newPanelNodeStyle.insets = new yfiles.geometry.InsetsD.FromLeftTopRightAndBottom(5, 20, 5, 5);
            newPanelNodeStyle.labelInsetsColor = groupNodeColor;
          }
          groupedGraph.groupNodeDefaults.style = new yfiles.drawing.CollapsibleNodeStyleDecorator.WithStyle(newPanelNodeStyle);

          // Set a different label style and parameter
          var /*yfiles.drawing.SimpleLabelStyle*/ newSimpleLabelStyle;
          {
            newSimpleLabelStyle = new yfiles.drawing.SimpleLabelStyle();
          }
          groupedGraph.groupNodeDefaults.labels.style = newSimpleLabelStyle;
          groupedGraph.groupNodeDefaults.labels.labelModelParameter = yfiles.drawing.InteriorStretchLabelModel.NORTH;
        }

        // #endregion 

        // #region Configure graph defaults

        view.graph.nodeDefaults.style = new yfiles.drawing.ShinyPlateNodeStyle.WithColor(yfiles.system.Colors.DARK_ORANGE);

        // #endregion 

      },
      
      'createSampleGraph': function() {
        var /*yfiles.graph.IGraph*/ graph = this.graphControl.graph;
        var /*yfiles.graph.INode[]*/ nodes = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
        for (var /*int*/ i = 0; i < nodes.length; i++) {
          nodes[i] = graph.createNode();
          graph.addLabel(nodes[i], (i + 1) + "");
        }

        graph.setNodeStyle(nodes[0], new yfiles.drawing.ShinyPlateNodeStyle.WithColor(yfiles.system.Colors.DIM_GRAY));
        var /*yfiles.drawing.SimpleLabelStyle*/ newSimpleLabelStyle;
        {
          newSimpleLabelStyle = new yfiles.drawing.SimpleLabelStyle();
          newSimpleLabelStyle.textBrush = yfiles.system.Brushes.WHITE;
        }
        graph.setLabelStyle(nodes[0].labels.getItem(0), newSimpleLabelStyle);

        graph.createEdge(nodes[0], nodes[11]);
        graph.createEdge(nodes[0], nodes[8]);
        graph.createEdge(nodes[0], nodes[19]);
        graph.createEdge(nodes[0], nodes[2]);
        graph.createEdge(nodes[11], nodes[4]);
        graph.createEdge(nodes[11], nodes[18]);
        graph.createEdge(nodes[8], nodes[7]);
        graph.createEdge(nodes[19], nodes[13]);
        graph.createEdge(nodes[19], nodes[2]);
        graph.createEdge(nodes[19], nodes[17]);
        graph.createEdge(nodes[19], nodes[15]);
        graph.createEdge(nodes[19], nodes[10]);
        graph.createEdge(nodes[13], nodes[7]);
        graph.createEdge(nodes[13], nodes[17]);
        graph.createEdge(nodes[2], nodes[15]);
        graph.createEdge(nodes[2], nodes[1]);
        graph.createEdge(nodes[4], nodes[18]);
        graph.createEdge(nodes[16], nodes[6]);
        graph.createEdge(nodes[7], nodes[14]);
        graph.createEdge(nodes[17], nodes[5]);
        graph.createEdge(nodes[15], nodes[10]);
        graph.createEdge(nodes[15], nodes[12]);
        graph.createEdge(nodes[6], nodes[9]);
        graph.createEdge(nodes[5], nodes[3]);
        graph.createEdge(nodes[5], nodes[9]);

      },
      
      /**
       * Gets the currently registered <code>IGraph</code> instance from the <code>GraphControl</code>.
       * @type yfiles.graph.IGraph
       */
      'graph': {
        'get': function() {
          return this.graphControl.graph;
        }
      },
      
      '$newButton_Click': function() {
        this.$clearGraph();
      },
      
      '$clearGraph': function() {
        this.graphControl.graph.clear();
        yfiles.canvas.GraphControl.FIT_GRAPH_BOUNDS_COMMAND.executeOnTarget(null, this.graphControl);
      },
      
      '$snappingButton_Click': function() {
        (/*(yfiles.input.GraphEditorInputMode)*/this.graphControl.inputMode).snapContext.enabled = this.snappingButton.isChecked;
      },
      
      '$orthogonalEditingButton_Click': function() {
        var /*yfiles.input.GraphEditorInputMode*/ inputMode = /*(yfiles.input.GraphEditorInputMode)*/this.graphControl.inputMode;
        inputMode.orthogonalEdgeEditingContext.orthogonalEdgeEditing = this.orthogonalEditingButton.isChecked;
        inputMode.createEdgeInputMode.orthogonalEdgeCreation = this.orthogonalEditingButton.isChecked;
      },
      
      // #region Layout
      // holds all available layouters by name for the combo box
      /**
       * @type yfiles.collections.IDictionary
       * @private
       */
      '$availableLayouts': null,
      
      /**
       * holds the currently chosen layout
       * @type yfiles.layout.ILayouter
       * @private
       */
      '$currentLayout': null,
      
      /**
       * reentrant lock for layout
       * @type boolean
       * @private
       */
      '$layouting': false,
      
      /**
       * Populates the layout combo box.
       * @private
       */
      '$initializeLayoutAlgorithms': function() {
        if (this.layoutComboBox === null) {
          return;
        }

        var /*string[]*/ items = ["Hierarchic", "Organic", "Orthogonal", "Circular", "Tree", "Generic Tree", "Balloon", "Random", "Orthogonal Router", "Organic Router", "Polyline Router"];

        // load hierarchic layout module
        require(["yfiles/layout-hierarchic"], (function() {
          this.$availableLayouts.put(items[0], new yfiles.hierarchic.IncrementalHierarchicLayouter());
          this.layoutComboBox_SelectedIndexChanged();
        }).bind(this));

        // load organic layout module
        var tmp;
        require(["yfiles/layout-organic"], (function() {
          (this.$availableLayouts.put(items[1], tmp = demo.yfiles.layout.modules.LayoutModulesDemo.initializer(new yfiles.organic.SmartOrganicLayouter())),tmp);
        }).bind(this));

        // load orthogonal layout module
        var tmp1;
        require(["yfiles/layout-orthogonal"], (function() {
          (this.$availableLayouts.put(items[2], tmp1 = new yfiles.orthogonal.OrthogonalLayouter()),tmp1);
        }).bind(this));

        // load circular layout module
        var tmp2;
        require(["yfiles/layout-circular"], (function() {
          (this.$availableLayouts.put(items[3], tmp2 = new yfiles.circular.CircularLayouter()),tmp2);
        }).bind(this));

        // load tree layout module
        require(["yfiles/layout-tree", "yfiles/layout-router"], (function() {
          var /*yfiles.tree.TreeLayouter*/ treeLayout = new yfiles.tree.TreeLayouter();
          var /*yfiles.tree.TreeReductionStage*/ newTreeReductionStage;
          {
            newTreeReductionStage = new yfiles.tree.TreeReductionStage();
            newTreeReductionStage.nonTreeEdgeRouter = new yfiles.router.OrganicEdgeRouter();
            newTreeReductionStage.nonTreeEdgeSelectionKey = yfiles.router.OrganicEdgeRouter.ROUTE_EDGE_DP_KEY;
          }
          var /*yfiles.tree.TreeReductionStage*/ treeReductionStage = newTreeReductionStage;
          treeLayout.appendStage(treeReductionStage);

          this.$availableLayouts.put(items[4], treeLayout);

          var /*yfiles.tree.GenericTreeLayouter*/ genericTreeLayouter = new yfiles.tree.GenericTreeLayouter();
          genericTreeLayouter.prependStage(treeReductionStage);
          this.$availableLayouts.put(items[5], genericTreeLayouter);

          var /*yfiles.tree.BalloonLayouter*/ balloonLayouter = new yfiles.tree.BalloonLayouter();
          balloonLayouter.prependStage(treeReductionStage);
          this.$availableLayouts.put(items[6], balloonLayouter);

        }).bind(this));

        // load core layout module
        var tmp3;
        require(["yfiles/layout-core"], (function() {
          (this.$availableLayouts.put(items[7], tmp3 = new yfiles.random.RandomLayouter()),tmp3);
        }).bind(this));

        // load router layout module
        require(["yfiles/layout-router"], (function() {
          this.$availableLayouts.put(items[8], new yfiles.router.OrthogonalEdgeRouter());
          this.$availableLayouts.put(items[9], new yfiles.router.OrganicEdgeRouter());
        }).bind(this));
        // load router layout module
        require(["yfiles/layout-polyline"], (function() {
          var /*yfiles.router.polyline.EdgeRouter*/ newEdgeRouter;
          {
            newEdgeRouter = new yfiles.router.polyline.EdgeRouter();
            newEdgeRouter.polylineRoutingEnabled = true;
          }
          this.$availableLayouts.put(items[10], newEdgeRouter);
        }).bind(this));

        this.layoutComboBox.items = yfiles.collections.List.fromArray(items);
      },
      
      /**
       * Applies the layout.
       * @private
       */
      '$applyLayout': function() {
        if (this.$layouting || this.$currentLayout === null) {
          return;
        }

        this.$layouting = true;
        this.graphControl.morphLayout(this.$currentLayout, yfiles.system.TimeSpan.fromSeconds(1), (function(/*Object*/ s, /*yfiles.system.EventArgs*/ args) {
          this.$layouting = false;
          if (args instanceof yfiles.graph.LayoutExceptionEventArgs) {
            throw (/*(yfiles.graph.LayoutExceptionEventArgs)*/args).exception;
          }
        }).bind(this));
      },
      
      /**
       * Handles the SelectedIndexChanged event of the layoutComboBox control.
       */
      'layoutComboBox_SelectedIndexChanged': function() {
        if (this.layoutComboBox === null) {
          return;
        }
        var /*string*/ key = this.layoutComboBox.selectedItem;
        if (key !== null && this.$availableLayouts.containsKey(key)) {
          this.$currentLayout = this.$availableLayouts.get(key);
          this.$applyLayout();
        }
      },
      
      // #endregion 
      '$init': function() {
        this.$gridInfo = new yfiles.canvas.GridInfo.FromGridSpacing(demo.yfiles.layout.modules.LayoutModulesDemo.GRID_SIZE);
        this.$availableLayouts = new yfiles.collections.Dictionary/*<string, yfiles.layout.ILayouter>*/();
      },
      
      /** @lends demo.yfiles.layout.modules.LayoutModulesDemo */
      '$static': {
        /**
         * private GridVisualCreator grid;
         * @type int
         * @private
         */
        'GRID_SIZE': 50,
        
        /**
         * @return {yfiles.organic.SmartOrganicLayouter}
         * @private
         */
        'initializer': function(/*final yfiles.organic.SmartOrganicLayouter*/ newSmartOrganicLayouter) {
          newSmartOrganicLayouter.minimalNodeDistance = 40;
          return newSmartOrganicLayouter;
        }
        
      }
    };
  })


});});
