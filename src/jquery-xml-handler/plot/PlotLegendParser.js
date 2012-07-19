if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "label"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Legend[parse] = function (xml) {
            var legend = new nsObj.Plot.Legend();
            if (xml) {
                legend.visible(xml.attr("visible"));
                legend.label(xml.attr("label"));
            }
            return legend;
        };
        
        nsObj.Plot.Legend.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<legend ',
                i;

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
