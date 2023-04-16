/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([ 'N/ui/serverWidget', 'N/url', 'N/runtime', 'N/search', 'N/redirect' ],
/**
 * @param {serverWidget}
 *            serverWidget
 * @param {url}
 *            url
 */
function(serverWidget, url, runtime, search, redirect) {

	/**
	 * Definition of the Suitelet script trigger point.
	 * 
	 * @param {Object}
	 *            context
	 * @param {ServerRequest}
	 *            context.request - Encapsulation of the incoming request
	 * @param {ServerResponse}
	 *            context.response - Encapsulation of the Suitelet response
	 * @Since 2015.2
	 */
	function onRequest(context) {
		try {
			var scriptParam = runtime.getCurrentScript();
			log.debug('Total Governance Units :'
					+ scriptParam.getRemainingUsage());

			var request = context.request;
			var response = context.response;

			if (request.method === 'GET') {
				var custName = request.parameters.custName;
				log.debug('custName:', custName);

				var form = serverWidget.createForm({
					title : 'CUSTOMER FORM'
				});
				var field = form.addField({
					id : 'custpage_cust_name',
					type : serverWidget.FieldType.SELECT,
					label : 'CUSTOMER NAME',
					source : 'customer'
				});
				if (custName) {
					field.defaultValue = custName;
				}
				var ADDRESS = form.addSublist({
					id : 'custo_address',
					type : serverWidget.SublistType.INLINEEDITOR,
					label : 'ADDRESS'
				});
				ADDRESS.addField({
					id : 'cust_address',
					type : serverWidget.FieldType.TEXT,
					label : 'Adress',
				});
				ADDRESS.addField({
					id : 'cust_addres',
					type : serverWidget.FieldType.TEXT,
					label : 'Adress1',
				});
				ADDRESS.addField({
					id : 'cust_addre',
					type : serverWidget.FieldType.TEXT,
					label : 'Adress2',
				});
				ADDRESS.addField({
					id : 'cust_postal',
					type : serverWidget.FieldType.TEXT,
					label : 'Postal Code',
				});
				ADDRESS.addField({
					id : 'cust_country',
					type : serverWidget.FieldType.TEXT,
					label : 'Country',
				});
				ADDRESS.addField({
					id : 'cust_city',
					type : serverWidget.FieldType.TEXT,
					label : 'City',
				});
				ADDRESS.addField({
					id : 'cust_bill',
					type : serverWidget.FieldType.CHECKBOX,
					label : 'Default Billing Address',
				});
				ADDRESS.addField({
					id : 'cust_ship',
					type : serverWidget.FieldType.CHECKBOX,
					label : 'Default Shiping Address',
				});

				if (custName) {
					var customerSearchObj = search.create({
						type : "customer",
						filters : [ [ "internalid", "anyof", custName ] ],
						columns : [ search.createColumn({
							name : "entityid",
							sort : search.Sort.ASC,
							label : "Name"
						}), search.createColumn({
							name : "address",
							label : "Address"
						}), search.createColumn({
							name : "address1",
							label : "Address 1"
						}), search.createColumn({
							name : "address2",
							label : "Address 2"
						}), search.createColumn({
							name : "zipcode",
							label : "Zip Code"
						}), search.createColumn({
							name : "country",
							label : "Country"
						}), search.createColumn({
							name : "city",
							label : "City"
						}), search.createColumn({
							name : "isdefaultbilling",
							label : "Default Billing Address"
						}), search.createColumn({
							name : "isdefaultshipping",
							label : "Default Shipping Address"
						}) ]
					});
					var custAddress;
					var custCountry;
					var custPostal;
					var custAdd1;
					var custAdd2;
					var custCity;
					var custShip;
					var custBill;
					var searchResultCount = customerSearchObj.runPaged().count;
					log.debug("customerSearchObj result count",
							searchResultCount);
					customerSearchObj.run().each(function(result) {
						custAddress = result.getValue('address');
						log.debug('custAddress', custAddress)
						custCountry = result.getValue('country');
						custPostal = result.getValue('zipcode');
						custAdd1 = result.getValue('address1');
						custAdd2 = result.getValue('address2');
						custCity = result.getValue('city');
						custBill = result.getValue('isdefaultbilling');
						custShip = result.getValue('isdefaultshipping');
						log.debug('custShip', custShip)
						if (custBill == true || custShip == true) {
							custBill = 'T'
							custShip = 'T'
						} else if (custBill == false || custShip == false) {
							custBill = 'F'
							custShip = 'F'

						}

						return true;
					});

					for (i = 0; i < searchResultCount; i++) {
						if (custAddress) {
							ADDRESS.setSublistValue({
								id : 'cust_address',
								line : i,
								value : custAddress
							});
							ADDRESS.setSublistValue({
								id : 'cust_country',
								line : i,
								value : custCountry
							});
							ADDRESS.setSublistValue({
								id : 'cust_postal',
								line : i,
								value : custPostal
							});
							ADDRESS.setSublistValue({
								id : 'cust_addres',
								line : i,
								value : custAdd1
							});
							ADDRESS.setSublistValue({
								id : 'cust_addre',
								line : i,
								value : custAdd2
							});
							ADDRESS.setSublistValue({
								id : 'cust_city',
								line : i,
								value : custCity
							});
							ADDRESS.setSublistValue({
								id : 'cust_bill',
								line : i,
								value : custBill
							});
							ADDRESS.setSublistValue({
								id : 'cust_ship',
								line : i,
								value : 'F'
							});

						}
					}
				}
				form.clientScriptFileId = 106192;
				context.response.writePage(form);

			} else {
				log.debug('In POST function');
				var request = context.request;

				var custName = request.parameters.custpage_cust_name;
				log.debug('custName:', custName);
				redirect.toSuitelet({
					scriptId : 'customscript_cht_sl_customer_sr',
					deploymentId : 'customdeploy_cht_sl_customer_sr',
					parameters : {
						'custName' : custName
					}
				});

			}
		} catch (e) {
			log.error('Error in onrequest', e);
		}

	}

	return {
		onRequest : onRequest
	};

});
