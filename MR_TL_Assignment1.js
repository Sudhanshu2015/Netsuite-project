/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/file', 'N/record','N/runtime','N/task'],
/**
 * @param {file} file
 * @param {record} record
 */
function(file, record,runtime,task) {
   
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
    function getInputData(context) {
    	try{
    
            var fileConents=[];
          var resFileId = runtime.getCurrentScript();
          
          var mycontant = resFileId.getParameter({name: 'custscript_file_contents'});
    		
    		log.debug('mycontant',mycontant);
      	
					var csvData = mycontant.split(/\r?\n/).map(
							function(line) {
								return line.split(',');
							});

					var rows = csvData.slice(1);
					for (var i = 0; i < rows.length; i++) {
						var m_externalId = rows[i][0];
						//log.debug('m_externalId', m_externalId);
						var m_customer = rows[i][1];
                       // log.debug('m_customer', m_customer);
						var m_item = rows[i][2];
						var m_quantity = rows[i][3];
						var m_rate = rows[i][4];
						var m_amount = rows[i][5];
						var m_location = rows[i][6];
						var m_taxCode = rows[i][7];
                      
                     fileConents.push({
								'm_externalId' : m_externalId,
								'm_customer' : m_customer,
                                'm_item' : m_item,
                                'm_rate' : m_rate,
                                'm_amount' : m_amount,
                                'm_location' : m_location,
                                'm_taxCode' : m_taxCode
                        });
                    }
          
           if (!mycontant) {
            log.error({
                details: 'mycontant is not valid. Please check the script parameter stored in the completionScriptParameterName variable in getInputData().'
            });
        }

      return fileConents;
    		
    	}catch(e){
    		log.error('Error in Get Input data',e)
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
    		log.debug('in map function');
    	    var value=context.value;
    	      log.debug(context.value);
    	   	var invRecord = record.create({
				type : record.Type.INVOICE
			});

			for (data =0 ; data <context.value.length; data++) {

				var invResults = JSON.parse(value[data]);
				log.debug('invResults data:', invResults);

				r_fileId = invResults.m_fileId;
				log.debug("r_fileId", r_fileId);

				r_customer = invResults.m_customer;
				log.debug("r_customer", r_customer);

				r_externalId = invResults.m_externalId;
				log.debug("r_externalId", r_externalId);

				r_item = invResults.m_item;
				log.debug("r_item", r_item);

				r_quantity = invResults.m_quantity;
				log.debug("r_quantity", r_quantity);

				r_rate = invResults.m_rate;
				log.debug("r_rate", r_rate);

				r_amount = invResults.m_amount;
				log.debug("r_amount", r_amount);

				r_location = invResults.m_location;
				log.debug("r_location", r_location);

				r_taxCode = invResults.m_taxCode;
				log.debug("r_taxCode", r_taxCode);

				invRecord.setValue({
					fieldId : 'entity',
					value : r_customer
				});
				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'item',
					line : data,
					value : r_item,
				});
				log.debug('Item selected');

				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'quantity',
					line : data,
					value : r_quantity
				});
				log.debug('Quantity described');

				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'rate',
					line : data,
					value : r_rate
				});
				log.debug('Rate described');

				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'amount',
					line : data,
					value : r_amount
				});
				log.debug('Amount calculated');

				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'location',
					line : data,
					value : r_location
				});
				log.debug('Location filled');

				invRecord.setSublistValue({
					sublistId : 'item',
					fieldId : 'taxcode',
					line : data,
					value : r_taxCode
				});
				log.debug('Tax code selected');

			}
			var invoiceId = invRecord.save();
			log.debug('Invoice created and Id is', invoiceId);
    	}catch(e){
    		log.error('Error in map stage',e);
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
    		log.debug('in reduce function');
    	    
    	      log.debug(context.values);
    	 
    	}catch(e){
    		log.error('Error in reduce stage',e);
    	}
    	
    
    }


    /**
     * Executes when the summarize entry point is triggered and applies to the result set.
     *
     * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
     * @since 2015.1
     */
    function summarize(summary) {

    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
    
});
