/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data CSV parsing", function () {
    "use strict";

    var CSV = window.multigraph.core.CSV,
        xmlString = '<csv location="http://example.com/CoolnessOfCats.csv"/>',
        $xml,
        csv;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        csv = CSV.parseXML($xml);
    });

    it("should be able to parse a CSV from XML", function () {
        expect(csv).not.toBeUndefined();
        expect(csv instanceof CSV).toBe(true);
    });

    it("should be able to parse a csv from XML and read its 'location' attribute", function () {
        expect(csv.location()).toBe("http://example.com/CoolnessOfCats.csv");
    });
    it("should be able to parse a csv from XML, serialize it and get the same XML as the original", function () {
        var xmlString2 = '<csv location="http://example.com/CoolnessOfDogs.csv"/>';
        expect(csv.serialize()).toBe(xmlString);
        csv = CSV.parseXML(window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2));
        expect(csv.serialize()).toBe(xmlString2);
    });

});
