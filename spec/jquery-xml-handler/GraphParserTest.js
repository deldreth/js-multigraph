/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Graph parsing", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        Plot = window.multigraph.Plot,
        Window = window.multigraph.Window,
        UI = window.multigraph.UI,
        NetworkMonitor = window.multigraph.NetworkMonitor,
        Debugger = window.multigraph.Debugger,
        Legend = window.multigraph.Legend,
        Background = window.multigraph.Background,
        Plotarea = window.multigraph.Plotarea,
        Data = window.multigraph.Data,
        Graph = window.multigraph.Graph,
        g,
        h,
        v,
        w,
        p,
        ui,
        debug,
        legend,
        background,
        plotarea,
        data,
        xmlString = '<graph><window margin="1" padding="10" bordercolor="0x111223" width="2" height="97" border="0"/><ui eventhandler="error"/><networkmonitor visible="yes" fixed="no"/><debugger visible="yes" fixed="no"/><legend color="0x56839c" bordercolor="0x941394" visible="true" base="-1 -1" anchor="0 0" position="0 0" frame="padding" opacity="1" border="10" rows="4" columns="3" cornerradius="5" padding="4"/><background color="0x123456"/><plotarea margintop="5" marginleft="10" marginbottom="19" marginright="5" bordercolor="0x111223" border="0"/><title color="0xfffaab" bordercolor="0x127752" border="2" opacity="0" padding="4" cornerradius="10" base="0 0" position="-1 1" anchor="1 1">Cool Cats</title><horizontalaxis color="0x123456" id="x" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><horizontalaxis id="x2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><verticalaxis color="0x123456" id="y" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="0.5-2"/><verticalaxis color="0x123456" id="y2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="0.9+20"/><plot><horizontalaxis ref="x"/><verticalaxis ref="y"/></plot><plot><horizontalaxis ref="x2"/><verticalaxis ref="y2"/></plot><data><values>3,4,5,6</values></data></graph>',
        xmlString2 = '<graph><window margin="1" padding="10" bordercolor="0x111223" width="2" height="97" border="0"/><ui eventhandler="error"/><networkmonitor visible="yes" fixed="no"/><debugger visible="yes" fixed="no"/><legend color="0x56839c" bordercolor="0x941394" visible="true" base="-1 -1" anchor="0 0" position="0 0" frame="padding" opacity="1" border="10" rows="4" columns="3" cornerradius="5" padding="4"/><background color="0x123456"/><plotarea margintop="5" marginleft="10" marginbottom="19" marginright="5" bordercolor="0x111223" border="0"/><title color="0xfffaab" bordercolor="0x127752" border="2" opacity="0" padding="4" cornerradius="10" base="0 0" position="-1 1" anchor="1 1">Cool Cats</title><horizontalaxis color="0x123456" id="x" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><horizontalaxis color="0x123456" id="x2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><verticalaxis color="0x123456" id="y" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><verticalaxis color="0x123456" id="y2" type="number" position="1 1" pregap="2" postgap="4" anchor="0 1" base="1 -1" min="0" minoffset="19" minposition="0 0" max="10" maxoffset="2" maxposition="0 1" positionbase="0 0" tickmin="-3" tickmax="3" highlightstyle="bold" linewidth="1" length="1+0"/><data><values>3,4,5,6</values></data></graph>',
        $xml;

    beforeEach(function () {
        window.multigraph.jQueryXMLMixin.apply(window.multigraph, 'parseXML', 'serialize');
	$xml = $(xmlString);
        g = Graph.parseXML($xml);
    });

    it("should be able to parse a graph from XML", function () {
        expect(g).not.toBeUndefined();
        expect(g instanceof Graph).toBe(true);
    });

    it("should be able to parse a graph from XML, then serialize it, and get the same XML as the original", function () {
        expect(g.serialize()).toBe(xmlString);
	$xml = $(xmlString2);
        g = Graph.parseXML($xml);
        expect(g.serialize()).toBe(xmlString2);
    });

});
