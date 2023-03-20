/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/email','N/search','N/runtime','N/record'],
/**
 * @param {email} email
 */
function(email,search,runtime,record) {
   
    /**
     * Marks the beginning of the Map/Reduce process and generates input data.
     *
     * @typedef {Object} ObjectRef
     * @property {number} id - Internal ID of the record instance
     * @property {string} type - Record type id
     *
     * @return {Array|Object|Search|RecordRef} inputSummary
     * @since 2015.1
     */
    function getInputData() {
    	try{
    		var openInvList = [];
    		var invoiceSearchObj = search.create({
    			   type: "invoice",
    			   filters:
    			   [
    			      ["type","anyof","CustInvc"], 
    			      "AND", 
    			      ["mainline","is","T"], 
    			      "AND", 
    			      ["name","anyof","25807"], 
    			      "AND", 
    			      ["status","anyof","CustInvc:A"]
    			   ],
    			   columns:
    			   [
    			      search.createColumn({name: "tranid", label: "Document Number"}),
    			      search.createColumn({name: "amountpaid", label: "Amount Paid"}),
    			      search.createColumn({name: "entity", label: "Name"}),
    			      search.createColumn({name: "amount", label: "Amount"}),
    			      search.createColumn({name: "email", label: "Email"})
    			   ]
    			});
    			var searchResultCount = invoiceSearchObj.runPaged().count;
    			log.debug("invoiceSearchObj result count",searchResultCount);
    			var custName;
    			var tranId;
    			var invAmount;
    			var custEmail;
    			invoiceSearchObj.run().each(function(result){
    				custName = result.getValue('entity');
    				log.debug("custName",custName);
    				tranId =  result.getValue('tranid');
    				log.debug('tranId',tranId);
    				invAmount = result.getValue('amount');
    				log.debug('invAmount',invAmount);
    				custEmail = result.getValue('email');
    				log.debug('custEmail',custEmail);
    				
    					openInvList.push({
    					'custName':custName,
    					'tranId':tranId,
    					'invAmount':invAmount,
    					'custEmail':custEmail
    				});
    				return true;
    			});
    			log.debug('openInvList',openInvList);
    			log.debug('End of getInputData');
    			return openInvList;
    	
    			   
    		

    			/*
    			invoiceSearchObj.id="customsearch1678551837933";
    			invoiceSearchObj.title="Custom Transaction Search 9 (copy)";
    			var newSearchId = invoiceSearchObj.save();
    			*/
    	}
    	catch(e){
    		log.error("Error in getInputData",e);
    	}

    }

    /**
     * Executes when the map entry point is triggered and applies to each key/value pair.
     *
     * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
     * @since 2015.1
     */
    function map(context) {
  	  try{
      	log.debug('In Map Stage','In Map Stage');
  		var invResults = JSON.parse(context.value);
  		log.debug('invResults:',invResults);

  		var m_custName = invResults.custName;
  		var m_tranId = invResults.tranId;
  		var m_invAmount = invResults.invAmount;
  		var m_custEmail = invResults.custEmail;
  		log.debug('m_custName',m_custName);
  		log.debug('m_tranId',m_tranId);
  		log.debug('m_invAmount',m_invAmount);
  		log.debug('m_custEmail',m_custEmail);
  		

  		context.write({
  			key : m_tranId,
  			value :{
  				'm_custName':m_custName,
  				'm_tranId':m_tranId,
  				'm_invAmount':m_invAmount,
  				'm_custEmail':m_custEmail
  			}
  		});

  	}catch(e){
  		log.error('Error in map',e);
  	}
    }

    /**
     * Executes when the reduce entry point is triggered and applies to each group.
     *
     * @param {ReduceSummary} context - Data collection containing the groups to process through the reduce stage
     * @since 2015.1
     */
    function reduce(context) {
    
	
	try{
		var value = context.values;
		var value_Length=context.values.length;
	    
		log.debug('In Reduce Stage');
		//log.debug('Key:',context.key);
		//log.debug('value:',context.values);
		//log.debug('value Length:',context.values.length);
		var r_custName;
		var r_tranId;
		var r_invAmount;
		var r_custEmail;
		
		for(cA = 0; cA < value_Length; cA++){

			var invResults = JSON.parse(value[cA]);
			log.debug('invResults cA:',invResults);

			r_custName = invResults.m_custName;
			log.debug("r_custName", r_custName);
			
			r_tranId = invResults.m_tranId;
			log.debug("r_tranId", r_tranId);
			
			r_invAmount = invResults.m_invAmount;
			log.debug("r_invAmount", r_invAmount);
			
			r_custEmail = invResults.m_custEmail;
			log.debug("r_custEmail", r_custEmail);
			
			var currentuser = 25662;
			 log.debug('currentuser',currentuser);
		  	  var subject = 'For Invoice  Bill Payment ';
		      var body = 'Hi Customer,'+'\r\n'+'Your Invoice Amount'+r_invAmount+'is pending, Please created a payment before the due date.'+'\r\n'+' Thanks, Admin';

		      email.send({
		          author: currentuser,
		          recipients: r_custEmail,
		          subject: subject,
		          body: body
		      });
		      log.debug("Email is sent")
		}
		
		
		
		
		
	}catch(e){
		log.error('Error in reduce',e);
	}

}


    /**
     * Executes when the summarize entry point is triggered and applies to the result set.
     *
     * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
     * @since 2015.1
     */
    function summarize(summary) {
    	try{

		}catch(e){
			log.error('Error in summarize',e);
		}
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
    
});
