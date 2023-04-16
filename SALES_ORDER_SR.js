/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define([ 'N/search', 'N/email', 'N/record', 'N/runtime' ],

function(search, email, record, runtime) {

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
	function getInputData() {// 10,000
		try {

			var openInvList = [];
			var salesorderSearchObj = search.create({
				type : "salesorder",
				filters : [ [ "type", "anyof", "SalesOrd" ], "AND",
						[ "name", "anyof", "13352" ], "AND",
						[ "mainline", "is", "T" ] ],
				columns : [ search.createColumn({
					name : "internalid",
					label : "Internal ID"
				}), search.createColumn({
					name : "tranid",
					label : "Document Number"
				}), search.createColumn({
					name : "statusref",
					label : "Status"
				}), search.createColumn({
					name : "amount",
					label : "Amount"
				}) ]
			});
			var searchResultCount = salesorderSearchObj.runPaged().count;
			log.debug("salesorderSearchObj result count", searchResultCount);

			var tranId;
			var docNum;
			var soAmount;
			var Sostatus;
			salesorderSearchObj.run().each(function(result) {
				// .run().each has a limit of 4,000 results

				tranId = result.getValue('internalid');
				log.debug("tranId", tranId);

				docNum = result.getValue('tranid');
				log.debug('docNum', docNum);

				soAmount = result.getValue('amount');
				log.debug('soAmount', soAmount);

				Sostatus = result.getValue('statusref');
				log.debug('Sostatus', Sostatus);

				openInvList.push({

					'tranId' : tranId,
					'docNum' : docNum,
					'Sostatus' : Sostatus,
					'soAmount' : soAmount

				});
				return true;
			});
			log.debug('openInvList', openInvList);
			log.debug('End of getInputData');
			return openInvList;

		} catch (e) {
			log.error('Error in getInputData', e);
		}
	}

	/**
	 * Executes when the map entry point is triggered and applies to each
	 * key/value pair.
	 * 
	 * @param {MapSummary}
	 *            context - Data collection containing the key/value pairs to
	 *            process through the map stage
	 * @since 2015.1
	 */
	function map(context) {// 1,000
		try {
			log.debug('In Map Stage', 'In Map Stage');
			var invResults = JSON.parse(context.value);
			log.debug('invResults:', invResults);

			var m_tranId = invResults.tranId;
			var m_soAmount = invResults.soAmount;
			var m_Sostatus = invResults.Sostatus;
			var m_docNum = invResults.docNum;

			log.debug('m_tranId', m_tranId);
			log.debug('m_soAmount', m_soAmount);
			log.debug('m_Sostatus', m_Sostatus);
			log.debug('m_docNum', m_docNum);

			context.write({
				key : m_tranId,
				value : {

					'm_tranId' : m_tranId,
					'm_soAmount' : m_soAmount,
					'm_docNum' : m_docNum,
					'm_Sostatus' : m_Sostatus

				}
			});

		} catch (e) {
			log.error('Error in map', e);
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
	function reduce(context) {// 5,000
		try {
			log.debug('In reduce Stage');
			log.debug('key :', context.key);
			log.debug('value:', context.values);
			log.debug('value Length:', context.values.length);
			// var mykey = context.key;

			var objRecord = record.transform({
				fromType : 'salesorder',
				fromId : context.key,
				toType : 'invoice'
			});

			var invoiceId = objRecord.save();
			log.debug('Invoice created and id is', invoiceId);

		} catch (e) {
			log.error('Error in reduce : ', e);
		}
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
	function summarize(summary) {// 10,000
		try {

		} catch (e) {
			log.error('Error in summarize', e);
		}
	}

	return {
		getInputData : getInputData,
		map : map,
		reduce : reduce,
		summarize : summarize
	};

});
