sap.ui.require([
	"sap/m/Text",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/BindingMode"
], function (Text, JSONModel, ResourceModel, XMLView, BindingMode) {
	"use strict";
	// Attach the anonymus function to the SAPUI5 'init' event
	sap.ui.getCore().attachInit(function () {
		//Create JSON Model from object literal
		var oProductModel = new JSONModel();
		oProductModel.loadData("./model/Products.json");
		sap.ui.getCore().setModel(oProductModel, "products");
		
		var oModel = new JSONModel({
			firstName: "saisrinivas",
			lastName: "m",
			enabled: true,
			address:{
				street: "Dietmar-Hopp-Allee 16",
				city: "Walldorf",
				zip: "69190",
				country: "Germany"
			},
			salesToDate: "12345.6789",
			"priceThreshold": 20,
			currencyCode: "EUR"
		});
	
		//Set default Binding Mode as one-way
		oModel.setDefaultBindingMode(BindingMode.OneWay);
		// set the model to the core
		sap.ui.getCore().setModel(oModel);
		
		//Create resources model for language specific texts
		var oResourceModel = new ResourceModel({
			bundleName: "sai.moola.DataBinding.i18n.i18n"
		});
		//Assign the model object to the SAPUI5 coreusing the name "i18n"
		sap.ui.getCore().setModel(oResourceModel,"i18n");
		
		//Display the XML View called "App"
		var oView = new XMLView({
			viewName: "sai.moola.DataBinding.view.App"
		});
		
		//Register the view with the Message Manager
		sap.ui.getCore().getMessageManager().registerObject(oView, true);
		oView.placeAt("content");
	
	});
	
});