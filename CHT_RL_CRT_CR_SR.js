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
			var custName = requestBody.Name;
			log.debug('custName', custName);
			var brand = requestBody.carBrand;
			log.debug('brand', brand);
			var compName = requestBody.companyName;
			log.debug('compName', compName);
			var Email = requestBody.custEmail;
			log.debug('Email', Email);
			var driverName = requestBody.driverName;
			log.debug('driverName', driverName);
			var maintenance_by = requestBody.maintenance_by;
			log.debug('maintenance_by', maintenance_by);
			
			if (requestInfo) {
				
				  var rec = record.create({
			            type: 'customrecord_veichle_123',
			            isDynamic : true
			        });

			        rec.setValue({
			            fieldId: 'name',
			            value:  custName
			        });

			        rec.setValue({
			            fieldId: 'custrecord_brand_124',
			            value: brand
			        });

			        rec.setValue({
			            fieldId: 'custrecord_cust_name_aks',
			            value:compName
			        });
			        rec.setValue({
			            fieldId: 'custrecord_cust_email_id_aks',
			            value: Email
			        });
			        rec.setValue({
						sublistId : 'Maintainence',
						fieldId : 'custrecord_maintenance_by',
						line : 0,
						value : maintenance_by,
					});
			        rec.setValue({
						sublistId : 'Driver',
						fieldId : 'custrecord_driver_name',
						line : 0,
						text : driverName,
					});
					log.debug('Item selected');
			        var callId = rec.save();
			        if(callId){
			        	response ='Customer Created Succesfully, id'+callId;
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
			/*for output generation of customrecord
			 * {
    "customRecord":"Vehicle",
    "Name":"Sudhanshu Ranjan",
    "carBrand":"2",
    "companyName":"25807",
     "custEmail":"ranjansudhanshu2015@gmail.com",
     "driverName":"25662",
     "maintenance_by":"13037"

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
        //'get': doGet,
       // put: doPut,
        post: doPost,
       // 'delete': doDelete
    };
    
});
