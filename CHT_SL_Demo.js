/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/runtime','N/ui/serverWidget','N/url'],

function(runtime,serverWidget,url) {
   
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
    		var scriptParam = runtime.getCurrentScript();
    		log.debug('Total Governance Units :'+scriptParam.getRemainingUsage());
    		
    		var request = context.request;
    		var response = context.response;
    		
    		
    		
    		
    		if(request.method ==='GET'){
              var form =  serverWidget.createForm({
				title:'Job Application Form'
			});
              var field = form.addField({
    		    id : 'custpage_text',
    		    type : serverWidget.FieldType.TEXT,
    		    label : 'Name'
    		});
            field.layoutType = serverWidget.FieldLayoutType.NORMAL;
            field.updateBreakType({
                breakType: serverWidget.FieldBreakType.STARTCOL
            });
           
            form.addField({
                id: 'custpage_contact',
                type: serverWidget.FieldType.PHONE,
                label: 'Contact'
            });
            form.addField({
                id: 'custpage_date',
                type: serverWidget.FieldType.DATE,
                label: 'Date'
            });
         
           var select = form.addField({
                id: 'custpage_role',
                type: serverWidget.FieldType.SELECT,
                label: 'Select Role'
            });
            select.addSelectOption({
                value: 'a',
                text: 'Software developer'
            });
            select.addSelectOption({
                value: 'b',
                text: 'Ios Developer'
            });
            select.addSelectOption({
                value: 'c',
                text: 'Backend Developer'
            });
            select.addSelectOption({
                value: 'd',
                text: 'Frontend Developer'
            });
            var select = form.addField({
                id: 'custpage_status',
                type: serverWidget.FieldType.SELECT,
                label: 'Status'
            });
            select.addSelectOption({
                value: 'a',
                text: 'Unemployed'
            });
            select.addSelectOption({
                value: 'b',
                text: 'Employed'
            });
            var select = form.addField({
                id: 'custpage_qualification',
                type: serverWidget.FieldType.SELECT,
                label: 'Select Stream'
            });
            select.addSelectOption({
                value: 'a',
                text: 'B.Tech(CSE)'
            });
            
            select.addSelectOption({
                value: 'b',
                text: 'BCA'
            });
            select.addSelectOption({
                value: 'c',
                text: 'MCA'
            });
            select.addSelectOption({
                value: 'd',
                text: 'M.Tech(CSE)'
            });
             var productRating = form.addField({
            id: 'custpage_lblproductrating',
            type: serverWidget.FieldType.INLINEHTML,
            label: ' '
        }).updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.NORMAL
        }).updateBreakType({
            breakType: serverWidget.FieldBreakType.STARTROW
        }).defaultValue = '<p style=\'font-size:14px\'>Are You Working Now?</p>';
 
        form.addField({
            id: 'custpage_rdoproductrating',
            type: serverWidget.FieldType.RADIO,
            label: 'Yes',
            source: 'p1'
        }).updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.STARTROW
        });
        form.addField({
            id: 'custpage_rdoproductrating',
            type: serverWidget.FieldType.RADIO,
            label: 'No',
            source: 'p2'
        }).updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.MIDROW
        });
            form.addField({
                id: 'custpage_file',
                type: serverWidget.FieldType.FILE,
                label: 'Upload Resume'
            });
          
          

            form.addSubmitButton({
                label: 'Submit'
            });
    			context.response.writePage(form);
    			return true;
    		}else{
    		log.debug('In POST function');
			var request = context.request;	
             
            var textField =request.parameters.custpage_text;
            log.debug('textField:',textField);
            var contactField =request.parameters.custpage_contact;
            log.debug('contactField:',contactField);
            var role = request.parameters.custpage_role;
            log.debug('role:',role);
            var status = request.parameters.custpage_status;
            log.debug('status:',status);
            var qualification = request.parameters.custpage_qualification;
            log.debug('qualification:',qualification);
            var file = request.parameters.custpage_file;
            log.debug('file:',file);
            
        var custRec=record.create('customrecord_job_application_form1');
        custRec.setValue({
			    fieldId: 'name',
			    value: textField,
			    ignoreFieldChange: true
			    
			});
            
            context.response.write('<body style="color:red;background-color: black;text-align: center;">Record Saved Sucessfully.<script>setTimeout("window.close()",5000)</script></body>');

            
    		}
    		log.debug('Remaining Governance units :' +scriptParam.getRemainingUsage());
       	}
      catch(e){
    		log.error('Error in SuiteLet SendEmail Script',e);
    	}
    }

    return {
        onRequest: onRequest
    };
    
});


