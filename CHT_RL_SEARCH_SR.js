/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define([ 'N/search','N/record' ],

function(search,record) {

	/**
	 * Function called upon sending a GET request to the RESTlet.
	 * 
	 * @param {Object}
	 *            requestParams - Parameters from HTTP request URL; parameters
	 *            will be passed into function as an Object (for all supported
	 *            content types)
	 * @returns {string | Object} HTTP response body; return string when request
	 *          Content-Type is 'text/plain'; return Object when request
	 *          Content-Type is 'application/json'
	 * @since 2015.1
	 */
	function doGet(requestParams) {

	}

	/**
	 * Function called upon sending a PUT request to the RESTlet.
	 * 
	 * @param {string |
	 *            Object} requestBody - The HTTP request body; request body will
	 *            be passed into function as a string when request Content-Type
	 *            is 'text/plain' or parsed into an Object when request
	 *            Content-Type is 'application/json' (in which case the body
	 *            must be a valid JSON)
	 * @returns {string | Object} HTTP response body; return string when request
	 *          Content-Type is 'text/plain'; return Object when request
	 *          Content-Type is 'application/json'
	 * @since 2015.2
	 */
	function doPut(requestBody) {

	}

	/**
	 * Function called upon sending a POST request to the RESTlet.
	 * 
	 * @param {string |
	 *            Object} requestBody - The HTTP request body; request body will
	 *            be passed into function as a string when request Content-Type
	 *            is 'text/plain' or parsed into an Object when request
	 *            Content-Type is 'application/json' (in which case the body
	 *            must be a valid JSON)
	 * @returns {string | Object} HTTP response body; return string when request
	 *          Content-Type is 'text/plain'; return Object when request
	 *          Content-Type is 'application/json'
	 * @since 2015.2
	 */
	function doPost(requestBody) {
		try {
			var openInvList = [];
			log.debug('Inside Restlet post method');
			var response = '';

			var requestInfo = requestBody.customRecord;
			log.debug('requestInfo', requestInfo);

			var searchContext = '';
			if (requestInfo) {
				var customrecord_veichle_123SearchObj = search.create({
					type : requestInfo,
					filters : [],
					 columns:
						   [
						      search.createColumn({
						         name: "name",
						         sort: search.Sort.ASC,
						         label: "Name"
						      }),
						      search.createColumn({name: "custrecord_maintenance_by", label: "Maintenance by"}),
						      search.createColumn({name: "custrecord_brand_124", label: "Brand"})
						   ]
				});
				
				var custName;
    			var Brand;
    			var Maintenance_by;
    			
				
				var searchResultCount = customrecord_veichle_123SearchObj
						.runPaged().count;
				log.debug("customrecord_veichle_123SearchObj result count",
						searchResultCount);
				customrecord_veichle_123SearchObj.run().each(function(result) {
					// .run().each has a limit of 4,000 results
					// Create a search results/store it in a JSON format
					custName = result.getValue('name');
    				log.debug("custName",custName);
    				Brand =  result.getValue('custrecord_brand_124');
    				log.debug('Brand',Brand);
    				Maintenance_by = result.getText('custrecord_maintenance_by');
    				log.debug('Maintenance_by',Maintenance_by);
    				
    				
    					openInvList.push({
    					'custName':custName,
    					'Brand':Brand,
    					'Maintenance_by':Maintenance_by,
    					
    				});
					return true;
				});

				response = openInvList;

				return response;

			} else {
				response = 'Error: There is no Request data found';
				return response;
			}
		} catch (e) {
			log.error('Error in doPost function: ', e);
			return e.message;
		}
	}

	/**
	 * Function called upon sending a DELETE request to the RESTlet.
	 * 
	 * @param {Object}
	 *            requestParams - Parameters from HTTP request URL; parameters
	 *            will be passed into function as an Object (for all supported
	 *            content types)
	 * @returns {string | Object} HTTP response body; return string when request
	 *          Content-Type is 'text/plain'; return Object when request
	 *          Content-Type is 'application/json'
	 * @since 2015.2
	 */
	function doDelete(requestParams) {

	}

	return {
		// 'get': doGet,
		// put: doPut,
		post : doPost,
	// 'delete': doDelete
	};

});
