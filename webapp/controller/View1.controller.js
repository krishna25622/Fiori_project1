sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.training.com.project1.controller.View1", {
            onInit: function () {

            },
            createSalesOrder: function(oEvent){
                var SalesOrderID = this.getView().byId("iorddid").getValue();
                var CustomerName = this.getView().byId("iorddName").getValue();
                var LifecycleStatusDescription = this.getView().byId("iorddDesc").getValue();
                //if(SalesOrderID  == undefined || SalesOrderID == null){
                //    MessageBox.error("Please enter a SALES_ORDER ID.")
                //}else{
                    var oEntry = {
                        "SalesOrderID" : SalesOrderID,
                        "Note": "EPM DG: SO ID 0500000000 Deliver as fast as possible",
                        "NoteLanguage": "EN",
                        "CustomerID": "0010100",
                        "CustomerName": "VARUN",
                        "CurrencyCode": "034",
                        "GrossAmount": 25867.03,
                        "NetAmount": 21737.00,
                       "TaxAmount": 4130.03,
                       "LifecycleStatus": "NEW",
                        "LifecycleStatusDescription": "NEW"
                    };

                    this.getView().getModel("oModel1").create("/SalesOrderSet",oEntry,{
                        success:function(oData,response){
                            MessageBox.success("SALESORDER created sccessfully.");
                        },
                        error:function(oError){
                            MessageBox.error("SALESORDER could not be created. Error: " + oError.responseText);
                        }
                    });
                //}
            },

            updateSalesOrder: function(oEvent){
                var SaesOrID = this.getView().byId("iorddid").getValue();
                var CustName = this.getView().byId("iorddName").getValue();
                var StatusDescription = this.getView().byId("iorddDesc").getValue();
                if(SaesOrID  == undefined || SaesOrID == null || SaesOrID == ""){
                   MessageBox.error("Please enter a SALES_ORDER ID.")
                }else{
                    var oEntry = {};
                    oEntry.SalesOrderID = SaesOrID;
                    oEntry.CustomerName = CustName;
                    oEntry.LifecycleStatusDescription = StatusDescription;

                    var sPath = "/SalesOrderSet('" + SaesOrID + "')";

                    this.getView().getModel("oModel1").update(sPath,oEntry,{
                        success:function(oData,response){
                            MessageBox.success("SALESORDER updated sccessfully.");
                        },
                        error:function(oError){
                            MessageBox.error("SALESORDER could not be updated. Error: " + oError.responseText);
                        }
                    });
                }
            },
            onSalesOrder: function(oEvent){
                var src = oEvent.getSource();
                var sourcePath = oEvent.getSource().getBindingContextPath();
                var calcPath = sourcePath + "/ToBusinessPartner";

                var oPanel = this.getView().byId("idPanel1");


                oPanel.bindElement({
                    path: calcPath,
                    model: "oModel1"
                });
            }
        });
    });
