/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/runtime'],
/**
 * @param {record} record
 * @param {runtime} runtime
 */
function(record, runtime) {
    
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
    		var currentRecord=scriptContext.currentRecord ;	
    		var contextMode=scriptContext.mode;
    		alert('Record type :'+scriptContext.currentRecord.type);
    		var userObj=runtime.getCurrentUser();
    		userObj=userObj.name
    		
    		currentRecord.getField({fieldId:'custrecord_fax_sr'}).isDisabled=true;
    		if(contextMode == 'create'){
    			
    			   currentRecord.setValue({
    			    fieldId: 'name',
    			    value: userObj,
    			    ignoreFieldChange: true
    			    
    			});
    		}
    		var value =currentRecord.getValue({
			    fieldId: 'isinactive'
			});
    		if(value){
    			alert("Record is inactive");
    				
 			 }
    		else{
    			alert("Record is active")
    		}
    		var userRec=runtime.getCurrentUser();
    		userRec=userRec.role
    		
    		
    		 if(contextMode == 'create'){
        			
     			   currentRecord.setValue({
     			    fieldId: 'custrecord_role_name_sr',
     			    value: userRec,
     			    ignoreFieldChange: true
     			    
     			});
    		}
    	}
    	catch(e){
    		alert("error in pageInit function"+e)
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
    		if(scriptContext.fieldId='custrecord_email_id_sr'){
    			var Value=scriptContext.currentRecord.getValue({
    				fieldId:'custrecord_email_id_sr'
    			});
    			
    			if(Value){
    				scriptContext.currentRecord.setValue({
    				    fieldId: 'custrecord_fax_sr',
    				    value: Value,
    				    ignoreFieldChange: true
    				    
    				});
    			}
    		}
    		if(scriptContext.fieldId='custrecord_customer_name_sr'){
    			var Value=scriptContext.currentRecord.getValue({
    				fieldId:'custrecord_customer_name_sr'
    			});
    			//alert('value:'+Value);
    			if(Value){
    				var objRecord = record.load({
    				    type: record.Type.CUSTOMER,
    				    id: Value,
    				    isDynamic: true,
    				});
    				    
    				
    	    			var Email=objRecord.getValue({
    	    				fieldId:'email'
    	    			});	
    	    			//alert('email:'+Email);
    	    			if(Email){
    	    				scriptContext.currentRecord.setValue({
    	    				    fieldId: 'custrecord_customer_email_sr',
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
            if(userObj1){
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
        return true;  
    	}
            
    	catch(e){
    		alert("error occured in validatefield"+e);
    	
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
      try{
           alert("Item Is Added");
      return true;}
      catch(e) {
        alert('Error in validateLine'+e) ;
      }
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
      try{
         alert("Item Is Inserted");
      return true;}
      catch(e) {
        alert('Error in validateInsert'+e) ;
      }
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
          try{ alert("Item Is Deleted");
      return true;}
      catch(e) {
    
        alert('Error in validateDelete '+e); 
      }
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
       
       var email=scriptContext.currentRecord.getValue({
    	   fieldId:'custrecord_email_id_sr'
       });
       if(!email){
    	   alert("Please enter email id");
    	   return false;
       }
       else{
    	   alert("save record");
    	   return true;  
       }
    }

    return {
       pageInit: pageInit,
       fieldChanged: fieldChanged,
//        postSourcing: postSourcing,
//        sublistChanged: sublistChanged,
//        lineInit: lineInit,
      validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
       validateDelete: validateDelete,
        saveRecord: saveRecord
   
    };
    
});




