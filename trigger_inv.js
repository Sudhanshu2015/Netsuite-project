/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(['N/record'],
    function(record) {
        function beforeSubmit(context) {
            try {
                if (context.type === context.UserEventType.CREATE && context.type == context.UserEventType.EDIT) {
                    return;
                }

                var Invoice = context.newRecord;
                //log.debug('Invoice', Invoice)

                var numItems = Invoice.getLineCount({
                    sublistId: 'item'
                });
                log.debug('numItems', numItems);

                var finalQuantity = 0;
                for (var intLinenum = 0; intLinenum <= numItems; intLinenum++) {
                    totalQuantity = Invoice.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        line: intLinenum
                    });
                    if (totalQuantity != '' && totalQuantity != null) {
                        finalQuantity += parseFloat(totalQuantity);
                        log.debug('finalQuantity', finalQuantity);
                    }
                }
                if (finalQuantity > 10) {

                    var fulfillmentChoice1 = Invoice.setValue({
                        fieldId: 'custbody_quantity',
                        value: 1,
                        ignoreFieldChange: true
                    });
                   // log.debug('fulfillmentChoice1', fulfillmentChoice1);

                }
                else if((finalQuantity < 10)){
                	 var fulfillmentChoice2 = Invoice.setValue({
                         fieldId: 'custbody_quantity',
                         value: 2,
                         ignoreFieldChange: true
                     });
                }
                else{
                	 var fulfillmentChoice2 = Invoice.setValue({
                         fieldId: 'custbody_quantity',
                         value: 3,
                         ignoreFieldChange: true
                     });
                }


            } catch (er) {
                log.debug('Error in before Submit', er.message)
            }
        }
        return {
            beforeSubmit: beforeSubmit
        };
    });