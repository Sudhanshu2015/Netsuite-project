/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define([ 'N/currentRecord', 'N/email', 'N/record', 'N/runtime' ],
/**
 * @param {currentRecord}
 *            currentRecord
 * @param {email}
 *            email
 * @param {record}
 *            record
 */
function(currentRecord, email, record, runtime) {

	function beforeSubmit(scriptContext) {

	}

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
	function afterSubmit(scriptContext) {
		try {
			var scriptObj = runtime.getCurrentScript();
			log.debug('Governance units: ' + scriptObj.getRemainingUsage());
			var customRecord = scriptContext.newRecord;

			if (scriptContext.type === scriptContext.UserEventType.CREATE) {
				var userName = customRecord.getValue('name');
				log.debug('userName', userName);
				var userEmail = customRecord.getValue('custrecord_email_id1');
				log.debug('userEmail', userEmail);
				var senderId = runtime.getCurrentUser().id;
				log.debug('senderId', senderId);
				var body = 'Hi User,' + '\r\n' + ' Dear ' + userName
						+ ' your application is Successfully Saved.' + '\r\n'
						+ ' Thanks, Admin';

				email.send({
					author : senderId,
					recipients : userEmail,
					subject : 'Your Record',
					body : body

				});
			}
			log.debug('Remaining governance units: ' + scriptObj.getRemainingUsage());
		} catch (e) {
			log.error('Error In After Submit Function', e)
		}

	}

	return {
		beforeSubmit : beforeSubmit,
		afterSubmit : afterSubmit
	};

});
