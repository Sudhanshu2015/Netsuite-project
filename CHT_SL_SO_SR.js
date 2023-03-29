/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([ 'N/ui/serverWidget', 'N/url', 'N/runtime', 'N/record', 'N/redirect' ],
/**
 * @param {serverWidget}
 *            serverWidget
 * @param {url}
 *            url
 */
function(serverWidget, url, runtime, record, redirect) {

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
			var form = serverWidget.createForm({
				title : 'SALES ORDER'
			});

			if (request.method === 'GET') {
				var sales = form.addField({
					id : 'custpage_salesorder',
					type : serverWidget.FieldType.TEXT,
					label : 'Enter Sales Order'
				});
				form.addSubmitButton({
					label : 'Search'
				});

				form.clientScriptFileId = 106137;
				context.response.writePage(form);
				return true;
			} else {
				custpage_salesorder
				log.debug('In POST function');
				/*
				 * var request = context.request; var sales =
				 * request.parameters.custpage_salesorder;
				 * log.debug('sales:',sales); var redirectUrl =
				 * 'https://tstdrv1911674.app.netsuite.com/app/accounting/transactions/salesord.nl?id='+sales+'&whence=';
				 * log.debug('redirectUrl',redirectUrl); redirect.redirect({
				 * url: redirectUrl, });
				 */
				var customerName = request.parameters.custpage_salesorder;
				redirect.toSuitelet({
					scriptId : 'customscript_cht_sl_so_sr',
					deploymentId : 'customdeploy_cht_sl_so_sr',
					parameters : {
						'custpage_salesorder' : custpage_salesorder
					}
				});

			}
			log.debug("Remaining Governance Units : "
					+ scriptParam.getRemainingUsage());

		} catch (e) {
			log.error('Error in SuiteLet Script', e);
		}
	}

	return {
		onRequest : onRequest
	};

});
