/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(
		[ 'N/ui/serverWidget', 'N/runtime', 'N/record', 'N/email', 'N/redirect' ],
		/**
		 * @param {serverWidget}
		 *            serverWidget
		 * @param {url}
		 *            url
		 */
		function(serverWidget, runtime, record, email, redirect) {

			/**
			 * Definition of the Suitelet script trigger point.
			 * 
			 * @param {Object}
			 *            context
			 * @param {ServerRequest}
			 *            context.request - Encapsulation of the incoming
			 *            request
			 * @param {ServerResponse}
			 *            context.response - Encapsulation of the Suitelet
			 *            response
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
						var purchaseId = request.parameters.purchaseId;
						log.debug('purchaseId:', purchaseId);
						var form = serverWidget.createForm({
							title : 'PURCHASE ORDER FORM'
						});
						var Purchase = form.addField({
							id : 'custpage_purchase',
							type : serverWidget.FieldType.TEXT,
							label : 'PURCHASE ORDER',
						// source : 'purchaseOrder'
						});
						if (purchaseId) {
							Purchase.defaultValue = purchaseId;
						}

						var Purchase = form.addSublist({
							id : 'cust_po_detail',
							type : serverWidget.SublistType.INLINEEDITOR,
							label : 'PO DETAILS'
						});
						Purchase.addField({
							id : 'cust_item',
							type : serverWidget.FieldType.TEXT,
							label : 'Item',
						});
						Purchase.addField({
							id : 'cust_qty',
							type : serverWidget.FieldType.TEXT,
							label : 'Quantity',
						});
						Purchase.addField({
							id : 'cust_rt',
							type : serverWidget.FieldType.TEXT,
							label : 'Rate',
						});
						Purchase.addField({
							id : 'cust_amt',
							type : serverWidget.FieldType.TEXT,
							label : 'Amount',
						});

						if (purchaseId) {
							log.debug("in if loop")
							var objRecord = record.load({
								type : record.Type.PURCHASE_ORDER,
								id : purchaseId,
								isDynamic : true,
							});
							var lineCount = objRecord.getLineCount({
								sublistId : 'item'
							});
							log.debug('lineCount', lineCount);

							var Quantity;
							var Amount;
							var Item;
							var Rate;

							var j = 0;
							for (var i = 0; i < lineCount; i++) {

								Quantity = objRecord.getSublistValue({
									sublistId : 'item',
									fieldId : 'quantity',
									line : j
								});
								// log.debug('Quantity', Quantity);
								Amount = objRecord.getSublistValue({
									sublistId : 'item',
									fieldId : 'amount',
									line : j
								});
								// log.debug('Amount', Amount);
								Item = objRecord.getSublistText({
									sublistId : 'item',
									fieldId : 'item',
									line : j
								});
								// log.debug('Item', Item);
								Rate = objRecord.getSublistValue({
									sublistId : 'item',
									fieldId : 'rate',
									line : j
								});
								// log.debug('Rate', Rate);

								Purchase.setSublistValue({
									id : 'cust_item',
									line : j,
									value : Item
								});
								Purchase.setSublistValue({
									id : 'cust_qty',
									line : j,
									value : Quantity
								});
								Purchase.setSublistValue({
									id : 'cust_amt',
									line : j,
									value : Amount
								});
								Purchase.setSublistValue({
									id : 'cust_rt',
									line : j,
									value : Rate
								});

								j++
							}
						}

						form.addSubmitButton({
							label : 'Submit'
						});

						form.clientScriptFileId = 106588;
						context.response.writePage(form);
						return true;
					} else {
						log.debug('In POST function');
						var request = context.request;
						var sublistLineCount = request
								.getLineCount('cust_po_detail');
						var purchaseId = request.parameters.custpage_purchase;
						log.debug('purchaseId:', purchaseId);
						var Item;
						var Quantity;
						var Rate;
						var Amount;
						if (sublistLineCount > 0) {

							var tableContent;
							tableContent = '<html><head><style>table{font-family:arial, sans-serif;border-collapse: collapse;width:100%;}td, th {border: 1px solid #dddddd;text-align:left;padding: 8px;}tr:nth-child(even){background-color: #dddddd;}</style></head><body><h2>PURCHASEORDER LIST</h2><table><tr><th>Item</th><th>Quantity</th><th>Rate</th><th>Amount</th></tr>';

							for (var lineCount = 0; lineCount < sublistLineCount; lineCount++) {
								Item = request.getSublistValue({
									group : 'cust_po_detail',
									name : 'cust_item',
									line : lineCount
								});

								Quantity = request.getSublistValue({
									group : 'cust_po_detail',
									name : 'cust_qty',
									line : lineCount
								});
								Rate = request.getSublistValue({
									group : 'cust_po_detail',
									name : 'cust_rt',
									line : lineCount
								});
								Amount = request.getSublistValue({
									group : 'cust_po_detail',
									name : 'cust_amt',
									line : lineCount
								});
								tableContent += '<tr><td>' + Item + '</td><td>'
										+ Quantity + '</td><td>' + Rate
										+ '</td><td>' + Amount + '</td></tr>';

							}

							var recipient = 'test@gmail.com';
							email.send({
								author : 25662,
								recipients : recipient,
								subject : "Purchase Order Details",
								body : tableContent,
							});
							log.debug("Email sent sucessfully");
							context.response
									.write('<body style="color:red;text-align: center;">Email has been sent Sucessfully.<script>setTimeout("window.close()",5000)</script></body>');
						}

						if (sublistLineCount <= 0) {
							redirect.toSuitelet({
								scriptId : 'customscript_cht_sl_po_sr',
								deploymentId : 'customdeploy_cht_sl_po_sr',
								parameters : {
									'purchaseId' : purchaseId
								}
							});
						}
					}
				}

				catch (e) {
					log.error('Error in onrequest', e);
				}

			}

			return {
				onRequest : onRequest
			};

		});
