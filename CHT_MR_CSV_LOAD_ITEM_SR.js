/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define([ 'N/file', 'N/record', 'N/task' ],
/**
 * @param {file}
 *            file
 * @param {record}
 *            record
 * @param {task}
 *            task
 */
function(file, record, task) {

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

		try {
			log.debug('In getInputData', 'In getInputData');

			var fileObj = file.load({
				id : 106593
			});

			var csvData = parseCSV(fileObj.getContents());
			return csvData;

		}

		catch (e) {
			log.error("Error in getInputData");
		}
	}
	function parseCSV(csvData) {
		// Split the CSV data into rows
		var rows = csvData.split('\n');
		// Get the column headers from the first row
		var headers = rows[0].split(',');
		var data = [];
		// Loop through the remaining rows and create an object for each row
		for (var i = 1; i < rows.length; i++) {
			var row = rows[i].split(',');
			var item = {};
			// Map the row data to the column headers
			for (var j = 0; j < headers.length; j++) {
				item[headers[j]] = row[j];
			}
			data.push(item);
		}
		return data;
	}

	function map(context) {
		try {
			log.debug("value", context.value);
			var value_Length = context.value.length;

			var fileContent = JSON.parse(context.value)

			/*var createItemTask = task.create({
				taskType : task.TaskType.CREATE_RECORD,
				recordType : 'inventoryitem',
				defaults : {
					ITEMS_NAME : fileContent.ITEMS_NAME,
					NATIONALITY : fileContent.NATIONALITY,
					TAXABLE : fileContent.TAXABLE,
					},
			});
			createItemTask.submit();*/

			
			  var scriptTask = task.create({taskType:task.TaskType.CSV_IMPORT});
			scriptTask.mappingId = 671;
			  var f =file.load(106593); 
			  scriptTask.importFile = f;
			  scriptTask.mappingParams = { entity: JSON.stringify([fileContent]) };
			 
			  var csvImportTaskId = scriptTask.submit();
			 

		} catch (e) {
			log.error(' ERROR IN MAP STAGE', e)
		}

	}

	/**
	 * Executes when the reduce entry point is triggered and applies to each
	 * group.
	 * 
	 * @param {ReduceSummary}
	 *            context - Data collection containing the groups to process
	 *            through the reduce stage
	 * @since 2015.1
	 */
	function reduce(context) {

	}

	/**
	 * Executes when the summarize entry point is triggered and applies to the
	 * result set.
	 * 
	 * @param {Summary}
	 *            summary - Holds statistics regarding the execution of a
	 *            map/reduce script
	 * @since 2015.1
	 */
	function summarize(summary) {

	}

	return {
		getInputData : getInputData,
		map : map,
		reduce : reduce,
		summarize : summarize
	};

});
