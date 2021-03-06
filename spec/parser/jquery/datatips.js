/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Datatips parsing", function () {
    "use strict";

    var Datatips = window.multigraph.core.Datatips,
        xmlString = '<datatips bgcolor="0x123456" bordercolor="0xfffbbb" format="number" bgalpha="1" border="2" pad="1"/>',
        $xml,
        d;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
	$xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        d = Datatips.parseXML($xml);
    });

    it("should be able to parse a datatips from XML", function () {
        expect(d).not.toBeUndefined();
    });

    it("should be able to parse a datatips from XML and read its 'format' attribute", function () {
        expect(d.format()).toBe("number");
    });

    it("should be able to parse a datatips from XML and read its 'bgcolor' attribute", function () {
        expect(d.bgcolor().getHexString()).toBe("0x123456");
    });

    it("should be able to parse a datatips from XML and read its 'bgalpha' attribute", function () {
        expect(d.bgalpha()).toBe("1");
    });

    it("should be able to parse a datatips from XML and read its 'border' attribute", function () {
        expect(d.border()).toBe(2);
    });

    it("should be able to parse a datatips from XML and read its 'bordercolor' attribute", function () {
        expect(d.bordercolor().getHexString()).toBe("0xfffbbb");
    });

    it("should be able to parse a datatips from XML and read its 'pad' attribute", function () {
        expect(d.pad()).toBe(1);
    });

    it("should be able to parse a datatips from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<datatips bgcolor="0x125621" format="datetime" border="5"/>';
        expect(d.serialize()).toBe(xmlString);
	d = Datatips.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
        //removed due to defaults
        //expect(d.serialize() === xmlString2).toBe(true);
    });

    describe("Variable parsing", function () {
        var Variable = window.multigraph.core.DatatipsVariable;

        beforeEach(function () {
            xmlString = '<datatips bgcolor="0x123456" bordercolor="0xba789b" format="datetime" bgalpha="5" border="7" pad="2"><variable format="number"/></datatips>';
            window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            d = Datatips.parseXML($xml);
        });

        it("should be able to parse a datatips with a child from XML", function () {
            expect(d).not.toBeUndefined();
        });

        it("should be able to parse a datatips with multiple children from XML", function () {
            xmlString = '<datatips bgcolor="0x123456" bordercolor="0xba789b" format="datetime" bgalpha="5" border="7" pad="2"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips>';
            $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
            d = Datatips.parseXML($xml);
            expect(d).not.toBeUndefined();
        });

        it("should be able to parse a variable from XML and read its 'format' attribute", function () {
            expect(d.variables().at(0).format()).toBe("number");
        });

        it("should be able to parse a datatips with children from XML, serialize it and get the same XML as the original", function () {
            var xmlString2 = '<datatips bgcolor="0x777456" bordercolor="0xba999b" format="datetime" bgalpha="5" border="7" pad="2"><variable format="number"/><variable format="number"/><variable format="datetime"/></datatips>';
            expect(d.serialize()).toBe(xmlString);
            d = Datatips.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
            expect(d.serialize()).toBe(xmlString2);
        });

    });
});
