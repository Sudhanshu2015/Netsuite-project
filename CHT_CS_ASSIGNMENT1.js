/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/url'],

function(url) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

    }

   
    function openCustomEmailPage() {
   // alert('hello Sudhanshu something is not right ');
    var output = url.resolveScript({
        scriptId: 'customscript_cht_sl_assignment',
        deploymentId: 'customdeploy_cht_sl_assignment',
        returnExternalUrl: true
    });
    //output='/app/site/hosting/scriptlet.nl?script=6351&deploy=1';
   // var finlUrl='https://tstdrv1911674.app.netsuite.com'+output;
    windows.open('https://tstdrv1911674.app.netsuite.com/app/site/hosting/scriptlet.nl?script=6351&deploy=1');
    return true;
    }


    return {
        pageInit: pageInit,
        openCustomEmailPage: openCustomEmailPage
    };
    
});
