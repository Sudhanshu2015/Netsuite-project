/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([ 'N/record', 'N/search', 'N/ui/serverWidget' ],
/**
 * @param {record} record
 * @param {search} search
 */
function(record, search, serverWidget) {

	/**
	 * Definition of the Suitelet script trigger point.
	 *
	 * @param {Object} context
	 * @param {ServerRequest} context.request - Encapsulation of the incoming request
	 * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
	 * @Since 2015.2
	 */
	function onRequest(context) {
		try {
			var request = context.request;
			var response = context.response;
			var openInvoiceList = [];

			if (request.method === 'GET') {

				var form = serverWidget.createForm({
					title : 'INVOICE RECORD'
				});

				var INVOICE = form.addSublist({
					id : 'custpage_inv',
					type : serverWidget.SublistType.INLINEEDITOR,
					label : 'INVOICE'
				});
				INVOICE.addField({
					id : 'custpage_int',
					type : serverWidget.FieldType.TEXT,
					label : 'Internal ID',
				});
				INVOICE.addField({
					id : 'custpage_doc',
					type : serverWidget.FieldType.TEXT,
					label : 'Document Number',
				});
				INVOICE.addField({
					id : 'custpage_sts',
					type : serverWidget.FieldType.TEXT,
					label : 'Status',
				});
				INVOICE.addField({
					id : 'custpage_amnt',
					type : serverWidget.FieldType.TEXT,
					label : 'Amount',
				});
				var salesorderSearchObj = search.create({
					type : "salesorder",
					filters : [ [ "type", "anyof", "SalesOrd" ], "AND",
							[ "name", "anyof", "13352" ], "AND",
							[ "mainline", "is", "T" ] ],
					columns : [ search.createColumn({
						name : "internalid",
						label : "Internal ID"
					}), search.createColumn({
						name : "tranid",
						label : "Document Number"
					}), search.createColumn({
						name : "statusref",
						label : "Status"
					}), search.createColumn({
						name : "amount",
						label : "Amount"
					}) ]
				});
				var Internal_Id;
				var docNum;
				var Amount;
				var Status;
				var searchResultCount = salesorderSearchObj.runPaged().count;
				log
						.debug("salesorderSearchObj result count",
								searchResultCount);
				salesorderSearchObj.run().each(function(result) {
					Internal_Id = result.getValue('internalid');
					log.debug("Internal_Id", Internal_Id);

					docNum = result.getValue('tranid');
					log.debug('docNum', docNum);

					Amount = result.getValue('amount');
					log.debug('Amount', Amount);

					Status = result.getValue('statusref');
					log.debug('Status', Status);

					openInvoiceList.push({

						'Internal_Id' : Internal_Id,
						'docNum' : docNum,
						'Amount' : Amount,
						'Status' : Status
					});
					log.debug('openInvoiceList', openInvoiceList);

					return true;
				});

			}
			log.debug('openInvoiceList.length', openInvoiceList.length)
			if (Internal_Id) {

				for (i = 0; i < openInvoiceList.length; i++) {
					INVOICE.setSublistValue({
						id : 'custpage_int',
						line : i,
						value : openInvoiceList[i].Internal_Id
					});
					INVOICE.setSublistValue({
						id : 'custpage_doc',
						line : i,
						value : openInvoiceList[i].docNum
					});
					INVOICE.setSublistValue({
						id : 'custpage_amnt',
						line : i,
						value : openInvoiceList[i].Amount
					});
					INVOICE.setSublistValue({
						id : 'custpage_sts',
						line : i,
						value : openInvoiceList[i].Status
					});

				}
			}
			context.response.writePage(form);
			return true;
		} catch (e) {
			log.error('Error in onrequest', e);
		}

	}

	return {
		onRequest : onRequest
	};

});
