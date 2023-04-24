/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(
		[ 'N/error','N/search' ],
		/**
		 * @param {error}
		 *            error
		 * @param {record}
		 *            record
		 * @param {search}
		 *            search
		 */
		function(error,search) {

			/**
			 * Function definition to be triggered before record is loaded.
			 * 
			 * @param {Object}
			 *            scriptContext
			 * @param {Record}
			 *            scriptContext.newRecord - New record
			 * @param {Record}
			 *            scriptContext.oldRecord - Old record
			 * @param {string}
			 *            scriptContext.type - Trigger type
			 * @Since 2015.2
			 */
			function beforeSubmit(scriptContext) {

				var newProjectRecord = scriptContext.newRecord;

				var claimNumber = newProjectRecord.getValue({
					fieldId : 'custentity_claim_num_sr'
				});
				log.debug('claimNumber', claimNumber)
				
           if(scriptContext.type === scriptContext.UserEventType.CREATE || scriptContext.type === scriptContext.UserEventType.EDIT){
				var searchResults = searchDuplicateClaimNumbers(claimNumber,
						newProjectRecord.id);
				log.debug("searchResults", searchResults.length)

				if (searchResults.length > 0) {

					var redirectUrl = 'https://tstdrv1911674.app.netsuite.com/app/accounting/project/project.nl?id='
							+ newProjectRecord.id;
					throw error.create({
						name : 'DUPLICATE CLAIM NUMBER',
						message : 'Duplicate claim number found please enter another claim number',
						redirect : {
							url : redirectUrl
						}
					});
					return false;
				}
           }
           else if(scriptContext.type === scriptContext.UserEventType.DELETE){
        	   var RecordId=newProjectRecord.id
        	   
           }
        	   
           
				return true;

			}

			function searchDuplicateClaimNumbers(claimNumber, currentRecordId) {
				
				var filters = [];
				filters.push([ 'custentity_claim_num_sr', 'is', claimNumber ]);

				var searchObj = search.create({
					type : 'job',
					filters : filters
				});

				var searchResults = searchObj.run().getRange({
					start : 0,
					end : 1
				});

				return searchResults;
			}

			return {
				beforeSubmit : beforeSubmit,
			};

		});
