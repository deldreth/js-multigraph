/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph Title", function () {
    "use strict";

    var Title = window.multigraph.core.Title,
        title;

    beforeEach(function () {
        title = new Title();
    });

    it("should be able to create a Title", function () {
        expect(title instanceof Title).toBe(true);
    });

    describe("content attribute", function () {
        it("should be able to set/get the content attribute", function () {
            title.content("This graph plots cats");
            expect(title.content()).toBe("This graph plots cats");
        });

    });

    describe("border attribute", function () {
        it("should be able to set/get the border attribute", function () {
            title.border("2");
            expect(title.border()).toBe("2");
        });

    });

    describe("color attribute", function () {
        it("should be able to set/get the color attribute", function () {
            title.color(window.multigraph.math.RGBColor.parse("0x12ffa8"));
            expect(title.color().getHexString()).toBe("0x12ffa8");
        });

    });

    describe("bordercolor attribute", function () {
        it("should be able to set/get the bordercolor attribute", function () {
            title.bordercolor(window.multigraph.math.RGBColor.parse("0xadd728"));
            expect(title.bordercolor().getHexString()).toBe("0xadd728");
        });

    });

    describe("opacity attribute", function () {
        it("should be able to set/get the opacity attribute", function () {
            title.opacity(1);
            expect(title.opacity()).toBe(1);
        });

    });

    describe("padding attribute", function () {
        it("should be able to set/get the padding attribute", function () {
            title.padding("4");
            expect(title.padding()).toBe("4");
        });

    });

    describe("cornerradius attribute", function () {
        it("should be able to set/get the cornerradius attribute", function () {
            title.cornerradius("5");
            expect(title.cornerradius()).toBe("5");
        });

    });

    describe("base attribute", function () {
        it("should be able to set/get the base attribute", function () {
            title.base("1 1");
            expect(title.base()).toBe("1 1");
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            title.position("0 1");
            expect(title.position()).toBe("0 1");
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            title.anchor("-1 1");
            expect(title.anchor()).toBe("-1 1");
        });

    });

});
