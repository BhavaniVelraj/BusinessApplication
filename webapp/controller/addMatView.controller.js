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
    "sap/m/ToolbarSpacer"],
    function (Controller,JSONModel, Page, SimpleForm, Title, Button, Label, Input, OverflowToolbar, ToolbarSpacer) {
        "use strict";
        return Controller.extend("ui5.walkthrough.controller.addMatView", {
            onInit() {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("addmatview").attachPatternMatched(this._onRouteMatched, this)
                var osimpleform = new SimpleForm(this.createId("addmatsimpleform"), {
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
                            value: "{}",
                        }),
                        new Label({
                            text: "Material Description",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{}",
                        }),
                        new Label({
                            text: "Vendor Material",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{}",
                        }),
                        new Label({
                            text: "Vendor Description",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{}",
                        }),
                        new Label({
                            text: "UoM",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{}",
                        }),
                        new Label({
                            text: "Alt UoM",
                            design: "Bold"
                        }),
                        new Input({
                            value: "{}",
                        }),
                    ],
                })
                var oPage = new Page({
                    showHeader: true,
                    showNavButton: true,
                    // navButtonPress: this.onNavBack.bind(this),
                    content: [osimpleform],
                    footer: [
                        new OverflowToolbar({
                            content: [
                                new ToolbarSpacer(),
                                new Button({
                                    // id: "footsavebutton",
                                    type: "Accept",
                                    text: "Save",
                                    // press:this.onSavePress.bind(this)
                                }),
                                new Button({
                                    type: "Reject",
                                    text: "Cancel",
                                })
                            ],
                        })
                    ]
                })
                this.getView().byId("addmatDetailpage").addContent(oPage);
            },
             _onRouteMatched: function (oEvent) {
                
            },
               
        
  
                 
            

        });
    });