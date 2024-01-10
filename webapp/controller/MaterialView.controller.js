sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/Text",
    "sap/f/DynamicPageTitle",
    "sap/f/DynamicPageHeader",
    "sap/m/SearchField",
    "sap/m/OverflowToolbar",
    "sap/f/DynamicPage",
    "sap/m/Button",
    "sap/m/Panel",
    "sap/m/Toolbar",
    "sap/m/ToolbarSpacer",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Title",
    "sap/ui/core/Icon",
    "sap/ui/core/CustomData"
], function (Controller,
    JSONModel,
    Table,
    Column,
    Text,
    DynamicPageTitle,
    DynamicPageHeader,
    SearchField,
    OverflowToolbar,
    DynamicPage,
    Button,
    Panel,
    Toolbar,
    ToolbarSpacer,
    Filter,
    FilterOperator,
    Title,
    Icon,
    CustomData
) {
    "use strict";
    return Controller.extend("ui5.walkthrough.controller.MaterialView", {
        onInit: function () {
            this.getOwnerComponent().getModel("materialRemote").read("/ODataMaterialsEntityContainer.Materials", {
                success: function (data, response) {
                    console.log("1234", data)
                    // Assuming the array is stored in the "results" property
                    // var aData = data.results;
                    // // Create a JSON model and set the data
                    // var oJsonModel = new JSONModel();
                    // oJsonModel.setData({
                    //     Materials: aData
                    // });
                    this.getView().setModel(this.getOwnerComponent().getModel("materialRemote"))
                    // Set the model to the table
                    // oTable.setModel(oJsonModel);
                    // Bind the data to the table
                    oTable.bindItems({
                        path: "materialRemote>/results", // Make sure this path matches the structure of your OData response
                        template: cli
                    });
                }.bind(this),
                error: function (err) {
                    console.log("Odata Error Message", err)
                }
            });
            var oOverflowToolbar = new OverflowToolbar({
                content: [
                    new Text({
                        text: "Material List ({material>/counts/total})"
                    }),
                    new ToolbarSpacer(),
                    new Button({
                        icon: "sap-icon://add",
                        tooltip: "Create",
                        press:this.onAddPress.bind(this)
                    }),
                ]
            })
            var cli = new sap.m.ColumnListItem();
            var matid = new sap.m.Text({
                text: "{matid}",
            });
            cli.addCell(matid);
            var matdes = new sap.m.Text({
                text: "{materialRemote>ltext}",
            });
            cli.addCell(matdes);
            var matven = new sap.m.Text({
                text: "{materialRemote>vmatid}",
            });
            cli.addCell(matven);
            var matvendes = new sap.m.Text({
                text: "{materialRemote>vdesc}",
            });
            cli.addCell(matvendes);
            var matuom = new sap.m.Text({
                text: "{materialRemote>UoM}",
            });
            cli.addCell(matuom);
            var mataltuom = new sap.m.Text({
                text: "{materialRemote>AltUoM}",
            });
            cli.addCell(mataltuom);
            var oIcon = new Icon({
                src: "sap-icon://navigation-right-arrow",
                width: "100px",
                press: this.materialRowPress.bind(this)
            });
            oIcon.addCustomData(new CustomData({key:"Id", value: "{matid}"}));
            cli.addCell(oIcon)
            var matidcol = new Column({
                header: new sap.m.Text({text:"Material Id" })
            });
            var matdescol = new Column({
                header: new sap.m.Text({text:"Material Description" })
            });
            var matvencol = new Column({
                header: new sap.m.Text({text:"Vendor Material" })
            });
            var matvendescol = new Column({
                header: new sap.m.Text({text:"Vendor Description" })
            });
            var matuomcol = new Column({
                header: new sap.m.Text({text:"UoM" })
            });
            var mataltuomcol = new Column({
                header: new sap.m.Text({text:"Alt UoM" })
            });
            var matdetailcol = new Column({
                header: new sap.m.Text({text: "" })
            });
            var oTable = new Table(this.createId("materialtable"), {
                grow: true,
                headerToolbar: oOverflowToolbar,
            })
            oTable.addColumn(matidcol);
            oTable.addColumn(matdescol);
            oTable.addColumn(matvencol);
            oTable.addColumn(matvendescol);
            oTable.addColumn(matuomcol);
            oTable.addColumn(mataltuomcol);
            oTable.addColumn(matdetailcol);
            var oDynamicPage = new DynamicPage({
                headerExpanded: true,
                title: new DynamicPageTitle({
                    heading: [
                        new Title({
                            text: "Material"
                        })
                    ]
                }),
                header: new DynamicPageHeader({
                    content: [
                        new Panel({
                            content: [
                                new Toolbar({
                                    content: [
                                        new SearchField({
                                            name: "SearchField",
                                            width: "30%",
                                            placeholder: "Search...",
                                            search: this.onMatSearch.bind(this)
                                        }),
                                    ]
                                })
                            ],
                        })
                    ],
                }),
                content: [oTable]
            })
            this.getView().byId("MaterialPage").addContent(oDynamicPage);
        },
        onMatSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.getView().byId("materialtable");
            var oBinding = oTable.getBinding("items");
            if (oBinding) {
                var aFilters = [];
                if (sQuery) {
                    // Create a filter for each column you want to search
                    var aColumnFilters = [
                        new Filter("matid", FilterOperator.Contains, sQuery),
                        new Filter("ltext", FilterOperator.Contains, sQuery),
                        new Filter("vmatid", FilterOperator.Contains, sQuery),
                        new Filter("vdesc", FilterOperator.Contains, sQuery),
                        new Filter("UoM", FilterOperator.Contains, sQuery),
                        new Filter("AltUoM", FilterOperator.Contains, sQuery)
                        // Add similar lines for other columns
                    ];
                    aFilters = new Filter({
                        filters: aColumnFilters,
                        and: false // Combine filters using OR condition
                    });
                }
                oBinding.filter(aFilters);
            }
        },
 materialRowPress: function (oEvent) { 
         var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var materialid = oEvent.getSource().data("Id");
            oRouter.navTo("matdetailview", {
                itemIndex: materialid
            });
        },
        onAddPress:function(oEvent){
         var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("addmatview", {
        });


        }
      
    });
});

































































































































































































































































































































































































































































































































































































