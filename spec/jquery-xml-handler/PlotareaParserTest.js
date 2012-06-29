/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plotarea parsing", function () {
    "use strict";

    var Plotarea = window.multigraph.Plotarea,
        jQueryXMLHandler = window.multigraph.jQueryXMLHandler,
        xmlString = '<plotarea margintop="5" marginleft="10" marginbottom="19" marginright="5" border="0" bordercolor="0x111223"/>',
        $xml,
        p;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        p = Plotarea.parseXML($xml);
    });

    it("should be able to parse a plotarea from XML and read its 'margin().bottom' attribute", function () {
        expect(p.margin().bottom() === 19).toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'margin().left' attribute", function () {
        expect(p.margin().left() === 10).toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'margin().top' attribute", function () {
        expect(p.margin().top() === 5).toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'margin().right' attribute", function () {
        expect(p.margin().right() === 5).toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'border' attribute", function () {
        expect(p.border() === '0').toBe(true);
    });

    it("should be able to parse a plotarea from XML and read its 'bordercolor' attribute", function () {
        expect(p.bordercolor() === '0x111223').toBe(true);
    });

    it("should be able to parse a plotarea from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<plotarea margintop="5" marginleft="10" marginbottom="19" marginright="5" border="0" bordercolor="0x111223"/>';
        expect(p.serialize() === xmlString).toBe(true);
	p = Plotarea.parseXML($(xmlString2));
        expect(p.serialize() === xmlString2).toBe(true);
    });

});
