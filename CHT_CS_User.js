/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/runtime'],
/**
 * @param {record} record
 * @param {runtime} runtime
 */
function(record, runtime) {
   
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
    		log.debug("In Bs")
    	} catch(e){
    		log.error("error in beforerSubmit"+e)
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
	log.debug("In As")
	
	var customRecord = record.create({
	       type: 'customrecord_veichle_123',
	       isDynamic: true
	   });
	customRecord.setValue({
		fieldId:'name',
		value:'Sudhanshu',
		ignoreFieldChange: true
	});
	customRecord.setValue({
		fieldId:'custrecord_brand_124',
		value:'3',
		ignoreFieldChange: true
	});
	customRecord.setValue({
		fieldId:'custrecord_cust_name_aks',
		value:'2236',
		ignoreFieldChange: true
	});
	customRecord.setValue({
		fieldId:'custrecord_cust_email_id_aks',
		value:'Ranjan20@gmail.com',
		ignoreFieldChange: true
	});
	customRecord.save(true);
	
} catch(e){
	log.error("error in afterSubmit"+e)
}
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
