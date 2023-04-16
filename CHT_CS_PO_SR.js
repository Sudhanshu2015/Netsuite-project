/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

function() {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
    	try {
			if (scriptContext.fieldId == 'custpage_purchase') {
				var cust_internalId = scriptContext.currentRecord.getValue({
					fieldId : 'custpage_purchase'
				});
				alert('cust_internalId' + cust_internalId);

				if (cust_internalId) {

					var btnClick = document.forms['main_form'].elements['submitter'];
					if (btnClick) {
						btnClick.click();
					} else {
						document.forms[0].submit();
					}
				}
			}

		} catch (e) {
			alert('Error in fieldChanged function: ' + e);
		}
    }

   
   

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
       
    };
    
});
