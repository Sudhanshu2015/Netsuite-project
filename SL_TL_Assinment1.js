/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/file', 'N/task', 'N/ui/serverWidget'],
/**
 * @param {file} file
 * @param {task} task
 * @param {serverWidget} serverWidget
 */
function(file, task, serverWidget) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
    	try{
    		var request = context.request;
			var response = context.response;
    		if (request.method === 'GET') {
    			var form = serverWidget.createForm({
					title : 'SUBMIT FILE'
				});	
    			var File = form.addField({
					id : 'custpage_file',
					type : serverWidget.FieldType.FILE,
					label : 'File'
				});
    			form.addSubmitButton({
					label : 'Submit'
				});
    			context.response.writePage(form);
				return true;
    		}else{
    			log.debug('In POST function');
				var request = context.request;
				var fileId = request.files.custpage_file;
				 log.debug('fileId',fileId);
                  var fileContent=  fileId.getContents()
              log.debug('fileContent',fileContent);
				var mrTask = task.create({
				    taskType: task.TaskType.MAP_REDUCE,
				    scriptId: 'customscript6921',
			        deploymentId: 'customdeploy1',
                    params:{
				    	'custscript_file_contents': fileContent
				     }
				   });
				
				var mrTaskId = mrTask.submit();
				context.response
				.write('<body style="color:red;text-align: center;">File is uploaded.<script>setTimeout("window.close()",5000)</script></body>');
    		}
    		
    	}catch(e){
    		log.error('Error In On request',e)
    	}

    }

    return {
        onRequest: onRequest
    };
    
});
