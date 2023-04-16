/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([ 'N/record', 'N/currentRecord' ],
/**
 * @param {record}
 *            record
 */
function(record, currentRecord) {

	function pageInit(scriptContext) {

	}

	function saveRecord(scriptContext) {

		try {

			var Invoice = scriptContext.currentRecord;

			var numItems = Invoice.getLineCount({
				sublistId : 'item'
			});
			// alert('numItems :' + numItems);

			var finalQuantity = 0;
			for (var intLinenum = 0; intLinenum < numItems; intLinenum++) {
				totalQuantity = Invoice.getSublistValue({
					sublistId : 'item',
					fieldId : 'quantity',
					line : intLinenum
				});
				if (totalQuantity != '' && totalQuantity != null) {
					finalQuantity += parseFloat(totalQuantity);
				}
			}
			alert('finalQuantity :' + finalQuantity);
			var customRecord = record.load({
				type : 'customrecord_job_application_form1',
				id : 15,
				isDynamic : true
			});
			var getRecord = customRecord.getValue({

				fieldId : 'custrecord_value'
			});
			// alert('getRecord :' + getRecord);

			if (finalQuantity > getRecord) {

				var fulfillmentChoice1 = Invoice.setValue({
					fieldId : 'custbody_quantity',
					value : 1,
					ignoreFieldChange : true
				});
				return true;

			} else if ((finalQuantity < getRecord)) {
				var fulfillmentChoice2 = Invoice.setValue({
					fieldId : 'custbody_quantity',
					value : 2,
					ignoreFieldChange : true
				});
			} else {
				var fulfillmentChoice3 = Invoice.setValue({
					fieldId : 'custbody_quantity',
					value : 3,
					ignoreFieldChange : true
				});
			}

		} catch (er) {
			alert('Error in SaveRecord function' + er)
		}

	}

	return {
		pageInit : pageInit,
		saveRecord : saveRecord

	};

});
