Ext.require(['*']);

var treeStore = Ext.create('Ext.data.TreeStore', {
    /*proxy: {
        type: 'ajax',
        url: 'data/treeData.json'
    }*/
	root: {
        expanded: true, 
        children: [{
            text: "Network Topology",
            expanded: true/*,
            children:[
                { id: 'item01', text: "Full Topology", leaf: true },
                { id: 'item02', text: "item2", leaf: true }
            ]*/
        }, {
            text: "Devices",
            expanded: false,
            children: [
                { id: 'item03', text: "Firewall", leaf: true },
                { id: 'item04', text: "Services", leaf: true },
                { id: 'item05', text: "Load Balancer", leaf: true }
            ]
        }, {
            text: "Users",
            expanded: false,
            children: [
                { id: 'item09', text: "Vishvesh", leaf: true },
                { id: 'item10', text: "Karthi", leaf: true },
                { id: 'item11', text: "Ganesh", leaf: true }
            ]
        }, {
            text: "Applications",
            expanded: false,
            children: [
                { id: 'item06', 
                  text: "Websites", 
                  leaf: false, 
                  expanded: false,
                  children: [{ id: 'item15', text: "www.adaranetworks.com", leaf: true }]
                },
                { id: 'item07', text: "Services", leaf: false },
                { id: 'item08', text: "Load Balancer", leaf: false }
            ]
        }]
    }
});

var treePanel = new Ext.create('Ext.tree.Panel', {
        id: 'west-panel',
        store: treeStore,
        width: 200,
        split: true,
        region: 'west',
        title: 'Select Type To View',
        rootVisible: false,
        stateId: 'navigation-panel',
        autoScroll: true,
		animate: true,
		containerScroll: true,
		collapsible: false,
        animCollapse: true,
		useArrows: true,
		margins:'0 0 5 5'
    });

Ext.onReady(function() {

    Ext.QuickTips.init();
    console.log("Extjs Initialized!");

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var viewport = Ext.create('Ext.Viewport', {
        id: 'border-example',
        layout: 'border',
        items: [
        // create instance immediately
        Ext.create('Ext.Component', {
            region: 'north',
            height: 32, // give north and south regions a height
            autoEl: {
                tag: 'div',
                html:'<div style="text-align: center; font-size: 14px; padding: 7px; color: navy;">ADARA SDN Visualizer</div>'
            }
        }), {
            // lazily created panel (xtype:'panel' is default)
            region: 'south',
            //contentEl: 'south',
            split: true,
            height: 100,
            minSize: 100,
            maxSize: 200,
            collapsible: true,
            collapsed: true,
            title: 'South',
            margins: '0 0 0 0'
        }, {
            xtype: 'tabpanel',
            region: 'east',
            title: 'East Side',
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [ '->', {
                   xtype: 'button',
                   text: 'test',
                   tooltip: 'Test Button'
                }]
            }],
            animCollapse: true,
            collapsible: false,
            split: true,
            width: 225, // give east and west regions a width
            minSize: 175,
            maxSize: 400,
            margins: '0 5 0 0',
            activeTab: 1,
            tabPosition: 'bottom',
            items: [{
                html: '<p>A TabPanel component can be a region.</p>',
                title: 'A Tab',
                autoScroll: true
            }, Ext.create('Ext.grid.PropertyGrid', {
                    title: 'Property Grid',
                    closable: true,
                    source: {
                        "(name)": "Properties Grid",
                        "grouping": false,
                        "autoFitColumns": true,
                        "productionQuality": false,
                        "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                        "tested": false,
                        "version": 0.01,
                        "borderWidth": 1
                    }
                })]
        }, treePanel,
        /*{
            id: 'west',
            store: treeStore,
            xtype: 'treepanel',
            width: 200,
	        split: true,
            //height: 100,
            region: 'west',
            title: 'West Region',
            collapsible: true,
            rootVisible: false,
            autoScroll: true,
    		animate: true
        },*/
        /*{
            region: 'west',
            stateId: 'navigation-panel',
            id: 'west-panel', // see Ext.getCmp() below
            title: 'West',
            split: true,
            width: 200,
            minWidth: 175,
            maxWidth: 400,
            collapsible: false,
            animCollapse: true,
            margins: '0 0 0 5',
            layout: 'accordion',
            items: [{
                contentEl: 'west',
                title: 'Navigation',
                iconCls: 'nav' // see the HEAD section for style used
            }, {
                title: 'Settings',
                html: '<p>Some settings in here.</p>',
                iconCls: 'settings'
            }, {
                title: 'Information',
                html: '<p>Some info in here.</p>',
                iconCls: 'info'
            }]
        },*/
        // in this instance the TabPanel is not wrapped by another panel
        // since no title is needed, this Panel is added directly
        // as a Container
        Ext.create('Ext.tab.Panel', {
            region: 'center', // a center region is ALWAYS required for border layout
            deferredRender: false,
            activeTab: 0,     // first tab initially active
            items: [/*{
                contentEl: 'center1',
                title: 'Close Me',
                closable: true,
                autoScroll: true
            },*/ {
                contentEl: 'center',
                title: 'Topology',
                autoScroll: true
            }]
        })]
    });
});