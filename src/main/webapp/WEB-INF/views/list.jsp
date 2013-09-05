<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  
  <link rel="stylesheet" href="resources/js/yfiles/lib/yfiles.css"/>
  <link rel="stylesheet" href="resources/js/yfiles/resources/style/demo-framework.css"/>
  
  <script src="resources/js/yfiles/ide-support/yfiles-typeinfo.js"></script><!-- enable debugging -->
  <script src="resources/js/yfiles/lib/yfiles/es5-shim.js"></script>
  <script src="resources/js/yfiles/demo-framework/require.js"></script>

  <link rel="stylesheet" href="resources/css/list.css" />
  
</head>
<body>
  <div id="loader">
		<p>Loading&hellip; please wait.</p>
	</div>

  <div id="app" data-type="application">

    <div data-type="BorderLayout" class="container" data-layout-arrangement="headline">

      <div data-type="Panel" data-layout-region="top" id="top" data-splitter="false">
      <div id="header"></div>
        <div data-type="ToolBar" data-name="toolbar">

          <button data-command="New" title="New" data-icon="yIconNew"></button>
          <button data-command="Open" data-name="openButton" title="Open a GraphML file" data-icon="yIconOpen"></button>
          <button data-command="Save" data-name="saveButton" title="Show GraphML in a new browser window for saving" data-icon="yIconSave"></button>
          <button data-command="Print" style="display:none" data-name="printButton" title="Print" data-icon="yIconPrint"></button>

          <span data-type="Separator"></span>

          <button data-command="ZoomIn" title="Zoom In" data-icon="yIconZoomIn"></button>
          <button data-command="ZoomOriginal" title="Zoom to original size" data-icon="yIconZoomOriginal"></button>
          <button data-command="ZoomOut" title="Zoom Out" data-icon="yIconZoomOut"></button>
          <button data-command="FitContent" title="Fit Content" data-icon="yIconZoomFit"></button>

          <span data-type="Separator"></span>

          <button data-command="Cut" title="Cut" data-icon="yIconCut"></button>
          <button data-command="Copy" title="Copy" data-icon="yIconCopy"></button>
          <button data-command="Paste" title="Paste" data-icon="yIconPaste"></button>
          <button data-command="Delete" title="Delete" data-icon="yIconDelete"></button>

          <span data-type="Separator"></span>

          <button data-command="Undo" title="Undo" data-icon="yIconUndo"></button>
          <button data-command="Redo" title="Redo" data-icon="yIconRedo"></button>

          <span data-type="Separator"></span>

          <button data-command="ToggleSnapping" data-type="ToggleButton"
              data-name="snappingButton" title="Toggle snapping" data-icon="yIconSnapping"></button>
          <button data-command="ToggleOrthogonalEditing" data-type="ToggleButton" data-icon="yIconOrthogonal"
              data-name="orthogonalEditingButton" title="Toggle orthogonal editing"></button>

          <span data-type="Separator"></span>

          <form>
            <select data-type="ComboBox" data-command="LayoutSelectionChanged" data-name="layoutComboBox"
                title="Select a layout algorithm"></select>
          </form>
          <button data-command="LayoutCommand" title="Layout the graph" data-icon="yIconLayout"></button>

          <span data-type="Separator"></span>

          <button data-command="GroupSelection" title="Group selected element" data-icon="yIconGroup"></button>
          <button data-command="UngroupSelection" title="Ungroup selected element" data-icon="yIconUngroup"></button>
          <button data-name="enterGroupButton" data-command="EnterGroup" title="Enter group"
              data-icon="yIconEnterGroup"></button>
          <button data-name="exitGroupButton" data-command="ExitGroup" title="Leave group"
              data-icon="yIconExitGroup"></button>
        </div>
      </div>

     <div data-type="Panel" data-layout-region="center" id="center">
        <div data-type="GraphControl" data-name="graphControl" id="graphControl" data-layout-region="center"></div>
      </div>
	 <aside data-type="BorderLayout" class="sidebar right" data-layout-region="right" id="right" style =display:none> 
       <div data-type="CollapsiblePane" data-header="Overview" data-collapse="top" data-layout-region="top"
           id="overviewContainer" data-splitter="false">
         <div data-type="GraphOverviewControl" data-name="overviewControl" id="overviewControl"></div>
       </div> 
     </aside>

    </div>
  </div>
  
<script>
require.baseUrl = 'resources/js/yfiles/lib/';
require([
		'resources/js/yfiles/resources/license.js',
		'resources/js/yfiles/demo-framework/demo-framework.js',
		'yfiles/graph-base',
		'resources/js/yfiles/LayoutModulesDemo.js'
	], function () {
	yfiles.demo.Application.start(new demo.yfiles.layout.modules.LayoutModulesDemo(), 'app', {
		backend : 'yfiles',
		loaderId : 'loader',
		catchErrors : 'true'
	});
});
</script>
</body>
</html>
