/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/ui/message'],
/**
 * @param {message} message
 */
function(message) {
    
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
    	try{
    		var rejectButton=scriptContext.form.getButtons('rejectbutton');
    		rejectButton.onClick=function(){
    			message.create({
    				title: 'Reject',
    				message:'Are You sure u want to reject',
    			    type:message.Type.WARNING
    			}).show();
    		};
    		var mymessage=message.create({
				title: 'Reject',
				message:'Are You sure u want to reject',
			    type:message.Type.WARNING
			});
    		mymessage.show();
    	}
    	catch(e){
    		alert("Error in pageInit function ");
    	}
 
    }


    return {
        pageInit: pageInit,

    };
    
});
