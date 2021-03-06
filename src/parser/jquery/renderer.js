window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["type"];

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Renderer[parse] = function (xml, plot) {
            var rendererType,
                renderer,
                opt;
            if (xml && xml.attr("type") !== undefined) {
                rendererType = xml.attr("type");
                renderer = ns.core.Renderer.create(rendererType);
                if (!renderer) {
                    throw new Error("unknown renderer type '"+rendererType+"'");
                }
                renderer.plot(plot);
                if (xml.find("option").length > 0) {
                    $.each(xml.find(">option"), function (i, e) {
                        renderer.setOptionFromString($(e).attr("name"),
                                                     $(e).attr("value"),
                                                     $(e).attr("min"),
                                                     $(e).attr("max"));
                    });
                }
            }
            return renderer;
        };

        ns.core.Renderer.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<renderer ',
                i;

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ');

            var opt,
                optionString,
                optionStrings = [];
            for (opt in this.optionsMetadata) {
                var ropts = this.options()[opt]();
                for (i=0; i<ropts.size(); ++i) {
/*
  console.log('option: ' + opt);
  console.log('   min: ' + ropts.at(i).min());
  console.log('   max: ' + ropts.at(i).max());
  console.log('   val: ' + ropts.at(i).serializeValue());
  console.log('   dal: ' + (new (this.optionsMetadata[opt].type)(this.optionsMetadata[opt]["default"])).serializeValue());
*/
                    if ((ropts.at(i).min() !== undefined)
                        ||
                        (ropts.at(i).max() !== undefined)
                        ||
                        !(ropts.at(i).valueEq(this.optionsMetadata[opt]["default"]))
                       ) {
                        optionString = '<option name="'+opt+'" value="'+ropts.at(i).serializeValue()+'"';
                        if (ropts.at(i).min() !== undefined) {
                            optionString += ' min="'+ropts.at(i).min()+'"';
                        }
                        if (ropts.at(i).max() !== undefined) {
                            optionString += ' max="'+ropts.at(i).max()+'"';
                        }
                        optionString += '/>';
                        optionStrings.push(optionString);
                    }
                }
            }


            if (optionStrings.length > 0) {
                output += '>';
                output += optionStrings.join("");
                output += '</renderer>';
            } else {
                output += '/>';
            }

/*
            if (this.options().size() !== 0) {
                output += '>';
                for (i = 0; i < this.options().size(); i++) {
                    //foo.yaya;
                    output += this.options().at(i)[serialize]();
                }
console.log(optionStrings.join(""));
                output += '</renderer>';
            } else {
                output += '/>';
            }
*/





            return output;
        };

    });
});
