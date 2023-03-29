/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(
		[ 'N/url', 'N/record' ],

		function(url, record) {

			/**
			 * Function to be executed after page is initialized.
			 * 
			 * @param {Object}
			 *            scriptContext
			 * @param {Record}
			 *            scriptContext.currentRecord - Current form record
			 * @param {string}
			 *            scriptContext.mode - The mode in which the record is
			 *            being accessed (create, copy, or edit)
			 * 
			 * @since 2015.2
			 */
			function pageInit(scriptContext) {

			}
			function saveRecord(scriptContext) {
				var custName = scriptContext.currentRecord.getValue({
					fieldId : 'custpage_salesorder',
					ignoreFieldChange : true
				});
				log.debug('custName', custName);
				var letters = /^[0-9]+$/;
				if (custName.match(letters)) {
					window
							.open('https://tstdrv1911674.app.netsuite.com/app/accounting/transactions/salesord.nl?id='
									+ custName + '&whence=');

					scriptContext.currentRecord.setValue({
						fieldId : 'custpage_salesorder',
						value : '',
						ignoreFieldChange : true

					});
				} else {
					alert("please enter only numeric value")
				}
			}

			return {
				pageInit : pageInit,
				saveRecord : saveRecord
			};

		});
