sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Page",
    "sap/ui/layout/form/SimpleForm",
    "sap/ui/core/Title",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/OverflowToolbar",
    "sap/m/ToolbarSpacer",
    "sap/ui/core/routing/History"
],
    function (Controller,JSONModel, Page, SimpleForm, Title, Button, Label, Input, OverflowToolbar, ToolbarSpacer,History) {
        "use strict";
        return Controller.extend("ui5.walkthrough.controller.matDetailView", {
            onInit() {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("matdetailview").attachPatternMatched(this._onRouteMatched, this)
                var osimpleform = new SimpleForm(this.createId("matsimpleform"), {
                    layout: "ResponsiveGridLayout",
                    columnsXL: 4,
                    columnsL: 4,
                    columnsM: 4,
                    labelSpanXL: 4,
                    labelSpanL: 4,
                    labelSpanM: 4,
                    labelSpanS: 4,
                    emptySpanXL: 4,
                    emptySpanL: 4,
                    emptySpanM: 4,
                    emptySpanXL: 4,
                    content: [
                        new Label({
                            text: "Material Id",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{materialRemote>/matid}",
                            enabled: false
                        }),
                        new Label({
                            text: "Material Description",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{materialRemote>/ltext}",
                            enabled: "{materialRemote>/editable}"

                        }),
                        new Label({
                            text: "Vendor Material",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{materialRemote>/vmatid}",
                            enabled: "{materialRemote>/editable}"
                        }),
                        new Label({
                            text: "Vendor Description",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{materialRemote>/vdesc}",
                            enabled: "{materialRemote>/editable}"
                        }),
                        new Label({
                            text: "UoM",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{}",
                            enabled: "{materialRemote>/editable}"
                        }),
                        new Label({
                            text: "Alt UoM",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{}",
                            enabled: "{materialRemote>/editable}"
                        }),
                    ],
                })
                var oPage = new Page({
                    showHeader: true,
                    showNavButton: "{materialRemote>/showNavButton}",
                    navButtonPress: this.onNavBack.bind(this),
                    headerContent: [
                        new Button({
                            type: "Accept",
                            enabled: "{materialRemote>/editButton}",
                            icon: "sap-icon://edit",
                            press: this.onEditPress.bind(this),
                        }),
                        new Button({
                            type: "Reject",
                            enabled: "{materialRemote>/editButton}",
                            icon: "sap-icon://delete",
                            // press: this.onDeletePress.bind(this)
                        }),
                    ],
                    content: [osimpleform],
                    footer: [
                        new OverflowToolbar({
                            content: [
                                new ToolbarSpacer(),
                                new Button({
                                    id: "footsavebutton",
                                    type: "Accept",
                                    text: "Save",
                                    visible: "{materialRemote>/visible}",
                                    press:this.onSavePress.bind(this)
                                }),
                                new Button({
                                    type: "Reject",
                                    text: "Cancel",
                                    visible: "{materialRemote>/visible}"
                                })
                            ],
                        })
                    ]
                })
                this.getView().byId("matDetailpage").addContent(oPage);
            },
             _onRouteMatched: function (oEvent) {
                var itemIndex = oEvent.getParameter("arguments");
                var oModel = this.getView().getModel("materialRemote");
                var aValue = oModel.getProperty("/Materials");

                  console.log("rowdetail",aValue)
                //  this.getView().getModel("materialRemote").read("/ODataMaterialsEntityContainer.Materials", {
                //    success: function (data, response) {
                //       var oAllData = data?.results;
                //       Object.keys(oAllData).forEach(function (key) {
                //          var item = oAllData[key];
             
                //          if (item.matid === itemIndex?.itemIndex) {
                //             console.log(item);
                //             oView.setModel(new JSONModel({...item, editable: false, visible: false, showNavButton: true}), "materialRemote");
                //          }
                //       }, this);     
                //    }
                // });
 
            },
   onNavBack:function(){
    const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("MaterialView", {}, true);
			}

            },
               
        
  onEditPress: function () {
                var oView = this.getView();
                var oModel = oView.getModel("materialRemote");
                var bEditable = !oModel.getProperty("/editable");
                var bVisible = !oModel.getProperty("/visible");
                var shownav = !oModel.getProperty("/showNavButton");
                var editbtn = false;
                oModel.setProperty("/editable", bEditable);
                oModel.setProperty("/visible", bVisible);
                oModel.setProperty("/showNavButton", shownav);
                oModel.setProperty("/editButton", editbtn);
            },
            onSavePress:function()
            { 
                    var oView = this.getView();
                    var oModel = oView.getModel("materialRemote");
                
                    // Get the edited data from the form
                    var oForm = oView.byId("matsimpleform");
                    var oFormData = oForm.getBindingContext("materialRemote").getObject();
                
                    // Get the table data
                    var oTableData = oModel.getProperty("/tableData");
                
                    // Find the index of the edited item in the table data
                    var iIndex = oTableData.findIndex(function (item) {
                        return item.matid === oFormData.matid;
                    });   
                
                    if (iIndex !== -1) {
                        // Show busy indicator
                        oView.setBusy(true);
                
                        // Simulate a delay for demonstration purposes (remove in a real scenario)
                            setTimeout(function () {
                            // Update the corresponding entry in the table data
                            oTableData[iIndex] = Object.assign({}, oFormData);
                
                            // Update the model data
                            oModel.setProperty("/tableData", oTableData);
                
                            // Reset the form to non-editable state
                            this.onEditPress();
                
                            // Hide busy indicator
                             oView.setBusy(false); 
                
                            // Show a success message
                            sap.m.MessageToast.show("Changes saved successfully!");
                        }.bind(this), 2000); // Simulated delay of 2 seconds (adjust as needed)
                    } else {
                        sap.m.MessageToast.show("Item not found in the table. Cannot save changes.");
                    }
                }
                
              
                 
            

        });
    });