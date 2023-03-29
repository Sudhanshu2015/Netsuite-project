/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/record'],

function(record) {
   
    /**
     * Function called upon sending a GET request to the RESTlet.
     *
     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.1
     */
    function doGet(requestParams) {

    }

    /**
     * Function called upon sending a PUT request to the RESTlet.
     *
     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
     * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doPut(requestBody) {

    }


    /**
     * Function called upon sending a POST request to the RESTlet.
     *
     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
     * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doPost(requestBody) {

    	try{
    		log.debug('Inside Restlet post method');
			var response = '';

			var requestInfo = requestBody.customRecord;
			log.debug('requestInfo', requestInfo);
			var r_customer = requestBody.r_customer;
			log.debug('r_customer', r_customer);
            var s_item = requestBody.items;
			log.debug('s_item', s_item);
			var r_item = requestBody.items.r_item;
			log.debug('r_item', r_item);
			var r_quantity = requestBody.items.r_quantity;
			log.debug('r_quantity', r_quantity);
			var r_rate = requestBody.items.r_rate;
			log.debug('r_rate', r_rate);
			var r_amount = requestBody.items.r_amount;
			log.debug('r_amount', r_amount);
			var r_location = requestBody.items.r_location;
			log.debug('r_location', r_location);
			var r_taxCode = requestBody.items.r_taxCode;
			log.debug('r_taxCode', r_taxCode);
			var r_return = requestBody.items.r_return;
			log.debug('r_return', r_return);
			
			if (requestInfo) {
				
				var invRecord = record.create({
					type : record.Type.INVOICE
				});
				invRecord.setValue({
					fieldId : 'entity',
					value : r_customer
				});
				log.debug('Customer selected');
             
               invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'item',
					line : 0,
					value : r_item,
				});
				log.debug('Item selected');

				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'quantity',
					line : 0,
					value : r_quantity
				});
				log.debug('Quantity described');

				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'rate',
					line : 0,
					value : r_rate
				});
				log.debug('Rate described');

				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'amount',
					line : 0,
					value : r_amount
				});
				log.debug('Amount calculated');

				invRecord.setValue({
					sublistId : 'item',
					fieldId : 'location',
					line : 0,
					value : r_location
				});
				log.debug('Location filled');

				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'taxcode',
					line : 0,
					value :r_taxCode
				});
				invRecord.setValue({
					sublistId : 'item',
					fieldId : 'custbody_eb_returnreason',
					line : 0,
					value : r_return
				});
				log.debug('Tax code selected');
  
				var invoiceId = invRecord.save();
			        if(invoiceId){
			        	response ='Invoice Created Succesfully, id'+invoiceId;
			        }
				return response;

			} else {
				response = 'Error: There is no Request data found';
				return response;
			}
    	}
    	catch(e){
    		log.error('Error in doPost function: ', e);
			return e.message;
			/*  {
    "customRecord":"Invoice",
    "r_customer":"25807",
    "items":{
    "r_item":"1300",
    "r_quantity":"10",
    "r_rate":"100",
    "r_amount":"1000",
    "r_location":"122",
    "r_taxCode":"-7",
    "r_return":"1"
}
}*/
    	}
    }

    /**
     * Function called upon sending a DELETE request to the RESTlet.
     *
     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
     * @since 2015.2
     */
    function doDelete(requestParams) {

    }

    return {
       // 'get': doGet,
       // put: doPut,
        post: doPost,
       // 'delete': doDelete
    };
    
});
