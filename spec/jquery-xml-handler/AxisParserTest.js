/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis parsing", function () {
    "use strict";

    var Axis = window.multigraph.Axis;
    var jQueryXMLHandler = window.multigraph.jQueryXMLHandler;
    var xmlString = '<horizontalaxis id="x" min="0" max="10"/>';
    var $xml;

    beforeEach(function () {
        jQueryXMLHandler.mixin(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
    });

    it("should be able to parse an axis from XML", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a).not.toBeUndefined();
    });

    it("should be able to parse an axis from XML and read its 'id' attribute", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.id() === 'x').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'min' attribute", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.min() === '0').toBe(true);
    });

    it("should be able to parse an axis from XML and read its 'max' attribute", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.max() === '10').toBe(true);
    });

    it("should be able to parse an axis from XML, then serialize it, and get the same XML as the original", function () {
	var a = Axis.parseXML('horizontal', $xml);
        expect(a.serialize() === xmlString).toBe(true);
    });

});