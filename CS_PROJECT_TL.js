/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(
		[ 'N/search' ],
		/**
		 * @param {record}
		 *            record
		 * @param {search}
		 *            search
		 */
		function(search) {

			/**
			 * Function to be executed after page is initialized.
			 * 
			 * @param {Object}
			 *            scriptContext
			 * @param {Record}
			 *            scriptContext.currentRecord - Current form record
			 * @param {string}
			 *            scriptContext.mode - The mode in which the record is
			 *            being accessed (create, copy, or edit)
			 * 
			 * @since 2015.2
			 */
			function pageInit(scriptContext) {

			}

			/**
			 * Validation function to be executed when record is deleted.
			 * 
			 * @param {Object}
			 *            scriptContext
			 * @param {Record}
			 *            scriptContext.currentRecord - Current form record
			 * @param {string}
			 *            scriptContext.sublistId - Sublist name
			 * 
			 * @returns {boolean} Return true if sublist line is valid
			 * 
			 * @since 2015.2
			 */
			function validateField(scriptContext) {
				try {

					var currentRecord = scriptContext.currentRecord;
					if (scriptContext.fieldId == 'custentity_claim_num_sr') {
						var claimNumber = currentRecord.getValue({
							fieldId : 'custentity_claim_num_sr'
						});

						if (claimNumber) {

							var filters = [];
							filters.push([ 'custentity_claim_num_sr', 'is',
									claimNumber ]);

							var claim_searchObj = search.create({
								type : 'job',
								filters : filters
							});

							var results = claim_searchObj.run().getRange({
								start : 0,
								end : 1
							});

							if (results.length > 0) {
								alert('This claim number already exists. Please enter a different claim num.');
								currentRecord.setValue(
										'custentity_claim_num_sr', '');

							}

						}

					}
					return true;

				} catch (e) {
					alert("error in validate field" + e)
				}

			}

			/**
			 * Validation function to be executed when record is saved.
			 * 
			 * @param {Object}
			 *            scriptContext
			 * @param {Record}
			 *            scriptContext.currentRecord - Current form record
			 * @returns {boolean} Return true if record is valid
			 * 
			 * @since 2015.2
			 */
			function saveRecord(scriptContext) {
				try {

					var Project = scriptContext.currentRecord;
					var Claim_no = Project.getValue({
						fieldId : 'custentity_claim_num_sr'
					});
					alert('Claim_no' + Claim_no);

					if (Claim_no) {
						var entitySearchObj = search.create({
							type : "entity",
							filters : [ [ "custentity_claim_num_sr", "is",
									Claim_no ] ],
							columns : [ search.createColumn({
								name : "custentity_claim_num_sr",
								label : "CLAIM NUMBER SR"
							}) ]
						});
						var claim_no;
						var searchResultCount = entitySearchObj.runPaged().count;
						log.debug("entitySearchObj result count",
								searchResultCount);
						entitySearchObj
								.run()
								.each(
										function(result) {
											claim_no = result
													.getValue('custentity_claim_num_sr');
											return true;
										});
						alert('claim_no ' + claim_no);

						if (Claim_no === claim_no) {
							alert("This claim number already exist")
							return false
						} else {
							return true;
						}
					}

				} catch (e) {
					alert("Error in saveRecord" + e);
				}

			}

			return {
				pageInit : pageInit,
				validateField : validateField,
			// saveRecord: saveRecord
			};

		});
