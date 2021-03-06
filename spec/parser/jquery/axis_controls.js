/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis AxisControls parsing", function () {
    "use strict";

    var AxisControls = window.multigraph.core.AxisControls,
        xmlString = '<axiscontrols visible="false"/>',
        $xml,
        axiscontrols;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        axiscontrols = AxisControls.parseXML($xml);
    });

    it("should be able to parse a AxisControls from XML", function () {
        expect(axiscontrols).not.toBeUndefined();
        expect(axiscontrols instanceof AxisControls).toBe(true);
    });

    it("should be able to parse a axiscontrols from XML and read its 'visible' attribute", function () {
        expect(axiscontrols.visible()).toBe("false");
    });

    it("should be able to parse a axiscontrols from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<axiscontrols visible="true"/>';
        expect(axiscontrols.serialize() === xmlString).toBe(true);
        axiscontrols = AxisControls.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
        expect(axiscontrols.serialize() === xmlString2).toBe(true);
    });

});
