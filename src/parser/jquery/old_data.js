window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var DataVariable = window.multigraph.core.DataVariable;
    var NumberValue  = window.multigraph.core.NumberValue;
    var ArrayData  = window.multigraph.core.ArrayData;
    var Data = window.multigraph.core.OldData;

    var children = ["variables", "values", "csv", "service"];

    ns.mixin.add(function(ns, parse, serialize) {
        
        Data[parse] = function (xml) {
            var data = new Data(),
                childModelNames = ["Variables", "Values", "CSV", "Service"],
                i;

            if (xml) {

                for (i = 0; i < children.length; i++) {
                    if (xml.find(children[i]).length > 0) {
                        data[children[i]](ns.core[childModelNames[i]][parse](xml.find(children[i]), data));
                    }
                }

                /**
                 ** !!! TEMPORARY HACK !!!
                 **
                 ** Until we completely merge ArrayData, if this <data> section includes a <values> tag,
                 ** and if it includes a <variables> tag, use the temporary "arraydata" attribute to store
                 ** a reference to an ArrayData object.
                 **/

                var values = $(xml.find(">values"));
                if (values.length > 0 && data.variables()) {
                    values = values[0];

                    var dataVariables = [];
                    for (i=0; i<data.variables().variable().size(); ++i) {
                        dataVariables.push(data.variables().variable().at(i));
                    }

                    var dataValues = ArrayData.textToDataValuesArray(dataVariables, $(values).text());
                    var ad = new ArrayData(dataVariables, dataValues);
                    data.arraydata(ad);

                /**
                 ** END OF TEMPORARY HACK
                 **/

                }


            }
            return data;
        };
        
        Data.prototype[serialize] = function () {
            var childStrings = [],
                output = '<data',
                i;

            childStrings = window.multigraph.utilityFunctions.serializeChildModels(this, children, childStrings, serialize);
/*
            for (i = 0; i < children.length; i++) {
                if (this[children[i]]()) {
                    childStrings.push(this[children[i]]()[serialize]());
                }
            }
*/

            if (childStrings.length > 0) {
                output += '>' + childStrings.join('') + '</data>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
});
