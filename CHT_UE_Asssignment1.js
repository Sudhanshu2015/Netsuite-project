/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/ui/serverWidget'],
		/**
		 * @param {record} record
		 */
		function(record, serverWidget) {

	/**
	 * Function definition to be triggered before record is loaded.
	 *
	 * @param {Object} scriptContext
	 * @param {Record} scriptContext.newRecord - New record
	 * @param {string} scriptContext.type - Trigger type
	 * @param {Form} scriptContext.form - Current form
	 * @Since 2015.2
	 */
	function beforeLoad(scriptContext) {
		try{
			log.debug('In BeforeLoad Function');
			if(scriptContext.type == 'view'){
				
				var testBtn = scriptContext.form.addButton({
				    id : 'custpage_test_btn',
				    label : 'Send Email',
				    functionName: 'openCustomEmailPage'
				});
				scriptContext.form.clientScriptModulePath = 'SuiteScripts/CHT_CS_ASSIGNMENT1.js';

				
			}
		}catch(e){
			log.error('Error in beforeLoad function: ',e);
		}
	}

	/**
	 * Function definition to be triggered before record is loaded.
	 *
	 * @param {Object} scriptContext
	 * @param {Record} scriptContext.newRecord - New record
	 * @param {Record} scriptContext.oldRecord - Old record
	 * @param {string} scriptContext.type - Trigger type
	 * @Since 2015.2
	 */
	function beforeSubmit(scriptContext) {

		
			
		
	}

	/**
	 * Function definition to be triggered before record is loaded.
	 *
	 * @param {Object} scriptContext
	 * @param {Record} scriptContext.newRecord - New record
	 * @param {Record} scriptContext.oldRecord - Old record
	 * @param {string} scriptContext.type - Trigger type
	 * @Since 2015.2
	 */
	function afterSubmit(scriptContext) {
		try{
			 var customerRecord = scriptContext.newRecord;
			if(scriptContext.fieldId='custbody_cht_customer_name'){
    			var Value=customerRecord.getValue({
    				fieldId:'custbody_cht_customer_name'
    			});
    			//alert('value:'+Value);
    			if(Value){
    				var objRecord = record.load({
    				    type: record.Type.CUSTOMER,
    				    id: Value,
    				    isDynamic: true,
    				});
    				    
    				
    	    			var Email=objRecord.getValue({
    	    				fieldId:'custbody_cht_custom_email'
    	    			});	
    	    			//alert('email:'+Email);
    	    			
    	    			
    			}
    			email.send({
					author: Value,
					recipients: Email,
					subject: 'Estimate status',
					body: 'Estimate created Successfully',
					
				});
    		}	
		
			

		}catch(e){
			log.error('Error in afterSubmit function:',e);
		}
	}

	return {
		beforeLoad: beforeLoad,
		beforeSubmit: beforeSubmit,
		afterSubmit: afterSubmit
	};

});
