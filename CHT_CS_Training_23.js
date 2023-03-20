/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param {record} record
 */
function(record) {
    
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
	
	alert("Hello")
	scriptContext.currentRecord.setValue({
	    fieldId: 'altname',
	    value: 'JAVA_Training',
	    ignoreFieldChange: true
	    
	});
	
}
catch(e){
	alert("Error encountered")
}
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
    	try{
    		if(scriptContext.fieldId='custrecord_cust_name_aks'){
    			var Value=scriptContext.currentRecord.getValue({
    				fieldId:'custrecord_cust_name_aks'
    			});
    			alert('value:'+Value);
    			if(Value){
    				var objRecord = record.load({
    				    type: record.Type.CUSTOMER,
    				    id: Value,
    				    isDynamic: true,
    				});
    				    
    				
    	    			var Email=objRecord.getValue({
    	    				fieldId:'email'
    	    			});	
    	    			alert('email:'+Email);
    	    			if(Email){
    	    				scriptContext.currentRecord.setValue({
    	    				    fieldId: 'custrecord_cust_email_id_aks',
    	    				    value: Email,
    	    				    ignoreFieldChange: true
    	    				    
    	    				});
    	    			}
    			}
    		}
    	}
    	catch(e){
    		alert("error in fieldchange function"+e)
    	}
        
            
    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {
    	try{
    		var currentRecord = scriptContext.currentRecord;
            if (scriptContext.fieldId == 'name'){
            	var userObj1=currentRecord.getValue({
    				fieldId:'name'
    			});
        		
        		
        		/*  var userObj1 = userObj1.length;
                if (userObj1 < 8){
                    alert("name is not correct");
                    return false;
                }
                return true;*/
            
            var letters = /^[A-Za-z\s]+$/;
            if(userObj1.match(letters))
              {
               return true;
              }
            else
              {
              
              
              currentRecord.setValue('name','');
              alert("Name should only character");
              return false;
              }	
        		 
    }
    	}
            
    	catch(e){
    		alert("error occured in validatefield"+e)
    	
    }
    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {

    }

    return {
//        pageInit: pageInit,
//        fieldChanged: fieldChanged,
//        postSourcing: postSourcing,
//        sublistChanged: sublistChanged,
//        lineInit: lineInit,
       validateField: validateField,
       validateLine: validateLine,
       validateInsert: validateInsert,
       validateDelete: validateDelete,
//        saveRecord: saveRecord
    };
    
});
