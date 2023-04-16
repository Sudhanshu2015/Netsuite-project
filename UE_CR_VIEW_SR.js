/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget'],
/**
 * @param {serverWidget} serverWidget
 */
function(serverWidget) {
   
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
    		if(scriptContext.type === scriptContext.UserEventType.VIEW){
    			var form=scriptContext.form;
    			form.clienScriptModulePath='SuiteScripts/CS_CR_VIEW_SR.js'
    		    //form.clientScriptFileId = 106264;
    		}
    	}
    	catch(e){
    		log.error("alert In beforeLoad function");
    	}

    }


    return {
        beforeLoad: beforeLoad
       
    };
    
});
