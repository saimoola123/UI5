sap.ui.define(
	["sap/ui/core/mvc/Controller",
	 "sap/m/library",
	 "sap/ui/core/Locale",
	 "sap/ui/core/LocaleData",
	 "sap/ui/model/type/Currency",
	 "sap/m/ObjectAttribute"],
	function(Controller, library, Locale, LocaleData, Currency, ObjectAttribute){
		return Controller.extend("sai.moola.DataBinding.App",{
	//cahnges by user 2		
			formatMail : function(sFirstName,sLastName){
				var oBundle= this.getView().getModel("i18n").getResourceBundle();
				return library.URLHelper.normalizeEmail(
					sFirstName + "." + sLastName + "@gmail.com",
					oBundle.getText("mailSubject",[sFirstName]),
					oBundle.getText("mailBody")
					);
			},
	//format stock value
	//Developer 1 changes
			formatStockValue: function(fUnitPrice,fStockUnits, fCurrency){
			 	var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();
			 	var oLocale = new Locale(sBrowserLocale);
			 	var oLocaleData = new LocaleData(oLocale);
			 	var oCurrency = new Currency(oLocaleData.mData.currencyFormat);
			 	return oCurrency.formatValue([fUnitPrice * fStockUnits, fCurrency], "string");
			},
			
			onItemSelected: function(oEvent){
				var oSelectedItem = oEvent.getSource();
				var oContext = oSelectedItem.getBindingContext("products");
				var sPath = oContext.getPath();
				var oPanel = this.byId("productDetailsPanel");
				oPanel.bindElement({
					path: sPath,
					model: "products"
				});
			},
			
			productListFactory : function(sId,oContext){
				var oUIControl;
				//Decide on the data , which dependent to clone
				if(oContext.getProperty("UnitsInStock") === 0 && oContext.getProperty("Discontinued")){
					//the item is discontinued ,so use standard list item
					oUIControl = this.byId("productSimple").clone(sId);
					
				} else {
					//the item is availabel hence we will create Object List item
					oUIControl = this.byId("productExtended").clone(sId);
					// the item is temporarily out of stock, so we will add status
					if(oContext.getProperty("UnitsInStock") < 1) {
						oUIControl.addAttribute( new ObjectAttribute({
							text: {
								path: "i18n>outOfStock"
							}
						}));
					}
				}
				return oUIControl;
			}
			
		});
	});