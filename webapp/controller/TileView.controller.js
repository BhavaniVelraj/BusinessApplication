sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/GridContainer",
    "sap/f/GridContainerSettings",
    "sap/f/GridContainerItemLayoutData",
    "sap/m/GenericTile",
    "sap/m/TileContent",
    "sap/m/NumericContent",
    "sap/m/OverflowToolbar"
], (Controller, GridContainer, GridContainerSettings, GridContainerItemLayoutData, GenericTile,TileContent,NumericContent, OverflowToolbar) => {
    "use strict";
    return Controller.extend("ui5.walkthrough.controller.TileView", {

        onInit: function () {
            //Create Grid Container//
            var oGridContainer = new GridContainer({
                layout: new GridContainerSettings({
                    rowSize: "80px",
                    columnSize: "80px",
                    gap: "50px"
                })

            });

            // Create GenericTile
            var oGenericTile1 = new GenericTile({
                header: "Material Master",
                subheader: "Maintenance",
                press: this.onMaterialPress.bind(this),
                layoutData: new GridContainerItemLayoutData({
                    rows: 2,
                    columns: 2
                }),

            });
            //Create Footer Content//
            var oTileContent1 = new TileContent({
                footer: "Count"
            });

            // Create NumericContent control
            var oNumericContent1 = new NumericContent({
                value: "200",
                icon: "sap-icon://bbyd-active-sales"
            });

            // Set NumericContent to TileContent
            oTileContent1.setContent(oNumericContent1);

            // Set TileContent to GenericTile
            oGenericTile1.addTileContent(oTileContent1);

            //GenericTile into the Container//
            oGridContainer.addItem(oGenericTile1);

             // Create GenericTile2//
             var oGenericTile2 = new GenericTile({
                header: "Receipe",
                subheader: "Maintenance",
                // press: this.onReceipePress.bind(this),
                layoutData: new GridContainerItemLayoutData({
                    rows: 2,
                    columns: 2
                }),

            });
            //Create Footer Content//
            var oTileContent2 = new TileContent({
                footer: "Count"
            });

            // Create NumericContent control
            var oNumericContent2 = new NumericContent({
                value: "200",
                icon: "sap-icon://bbyd-active-sales"
            });

            // Set NumericContent to TileContent
            oTileContent2.setContent(oNumericContent2);

            // Set TileContent to GenericTile
            oGenericTile2.addTileContent(oTileContent2);

            //GenericTile into the Container//
            oGridContainer.addItem(oGenericTile2);

            
             // Create GenericTile3//
             var oGenericTile3 = new GenericTile({
                header: "Lab",
                subheader: "Testing",
                // press: this.onTestPress.bind(this),
                layoutData: new GridContainerItemLayoutData({
                    rows: 2,
                    columns: 2
                }),

            });
            //Create Footer Content//
            var oTileContent3 = new TileContent({
                footer: "Records"
            });

            // Create NumericContent control
            var oNumericContent3 = new NumericContent({
                value: "35",
                icon: "sap-icon://bbyd-active-sales"
            });

            // Set NumericContent to TileContent
            oTileContent3.setContent(oNumericContent3);

            // Set TileContent to GenericTile
            oGenericTile3.addTileContent(oTileContent3);

            //GenericTile into the Container//
            oGridContainer.addItem(oGenericTile3);


            
             // Create GenericTile4//
             var oGenericTile4 = new GenericTile({
                header: "Inventory",
                subheader: "Maintenance",
                // press: this.onInventoryPress.bind(this),
                layoutData: new GridContainerItemLayoutData({
                    rows: 2,
                    columns: 2
                }),

            });
            //Create Footer Content//
            var oTileContent4 = new TileContent({
                footer: "Stock"
            });

            // Create NumericContent control
            var oNumericContent4 = new NumericContent({
                value: "200",
                icon: "sap-icon://bbyd-active-sales"
            });

            // Set NumericContent to TileContent
            oTileContent4.setContent(oNumericContent4);

            // Set TileContent to GenericTile
            oGenericTile4.addTileContent(oTileContent4);

            //GenericTile into the Container//
            oGridContainer.addItem(oGenericTile4);
            
            //View Container page//
            this.getView().byId("tilegridcontainer").addContent(oGridContainer);
        },
        onMaterialPress:function(){
            const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("materialview");
                var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
                oCrossAppNavigator.toExternal({
                target: {
                    target: { semanticObject: "materialview", action: "materialview" }
               }
    });
    
           }

    });
});