window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var toRGBA = function (color, alpha) {
            if (!(color instanceof window.multigraph.math.RGBColor)) {
                throw new Error("graphics.raphael.toRGBA: first argument must be an RGBColor instance");
            }
            if (alpha === undefined) {
                alpha = 1.0;
            }
            if (typeof(alpha) !== "number") {
                throw new Error("graphics.raphael.toRGBA: second argument, if present, must be a number");
            }
            return "rgba(" + (255*color.r()) + ", " + (255*color.g()) + ", " + (255*color.b()) + ", " + alpha + ")";
        };

        // cached settings object, for quick access during rendering, populated in begin() method:
        ns.PointlineRenderer.hasA("settings");

        ns.PointlineRenderer.respondsTo("begin", function (graphicsContext) {
            var settings = {
                "paper"              : graphicsContext.paper,
                "set"                : graphicsContext.set,
                "path"               : "",
                "points"             : [],
                "first"              : true,
                "pointshape"         : this.getOptionValue("pointshape"),
                "pointcolor"         : this.getOptionValue("pointcolor"),
                "pointopacity"       : this.getOptionValue("pointopacity"),
                "pointsize"          : this.getOptionValue("pointsize"),
                "pointoutlinewidth"  : this.getOptionValue("pointoutlinewidth"),
                "pointoutlinecolor"  : this.getOptionValue("pointoutlinecolor"),
                "linecolor"          : this.getOptionValue("linecolor"),
                "linewidth"          : this.getOptionValue("linewidth")
            };
            this.settings(settings);
        });

        ns.PointlineRenderer.respondsTo("dataPoint", function (datap) {
            var settings = this.settings(),
                p;

            if (this.isMissing(datap)) {
                settings.first = true;
                return;
            }
            p = this.transformPoint(datap);
            if (settings.linewidth > 0) {
                if (settings.first) {
                    settings.path += "M" + p[0] + "," + p[1];
                    settings.first = false;
                } else {
                    settings.path += "L" + p[0] + "," + p[1];
                }
            }
            if (settings.pointsize > 0) {
                settings.points.push(p);
            }
        });

        ns.PointlineRenderer.respondsTo("end", function () {
            var settings = this.settings(),
                linecolor = settings.linecolor.getHexString("#");

            if (settings.linewidth > 0) {
            settings.set.push( settings.paper.path(settings.path)
                               .attr({
                                   "stroke": linecolor,
                                   "stroke-width": settings.linewidth
                               }));
            }

            if (settings.pointsize > 0) {
                this.drawPoints();
            }
        });

        ns.PointlineRenderer.respondsTo("drawPoints", function () {
            var settings  = this.settings(),
                paper     = settings.paper,
                pointSet  = paper.set(),
                points    = settings.points,
                pointPath = "",
                raphaelAttrs,
                i;

            if ((settings.pointshape === ns.PointlineRenderer.PLUS) || (settings.pointshape === ns.PointlineRenderer.X)) {
                raphaelAttrs = {
                    "stroke": settings.pointcolor.getHexString("#"),
                    "stroke-width": settings.pointoutlinewidth
                };

            } else {
                raphaelAttrs = {
                    "fill": toRGBA(settings.pointcolor, settings.pointopacity),
                    "stroke": settings.pointoutlinecolor.getHexString("#"),
                    "stroke-width": settings.pointoutlinewidth
                };
            }

            for (i = 0; i < points.length; ++i) {
                pointPath += this.drawPoint(settings.pointshape, settings.pointsize, points[i]);
            }

            if (pointPath !== "") {
                pointSet.push(paper.path(pointPath));
            }

            pointSet.attr(raphaelAttrs);

            settings.set.push(pointSet);
        });

        ns.PointlineRenderer.respondsTo("drawPoint", function (shape, size, p) {
            var path = "",
                a,b,d;

            switch (shape) {
                case ns.PointlineRenderer.PLUS:
                    path +=  "M" + p[0] + "," + (p[1]-size);
                    path += "L" + p[0] + "," + (p[1]+size);
                    path += "M" + (p[0]-size) + "," + p[1];
                    path += "L" + (p[0]+size) + "," + p[1];
                    break;
                case ns.PointlineRenderer.X:
                    d = 0.70710 * size;
                    path += "M" + (p[0]-d) + "," + (p[1]-d);
                    path += "L" + (p[0]+d) + "," + (p[1]+d);
                    path += "M" + (p[0]-d) + "," + (p[1]+d);
                    path += "L" + (p[0]+d) + "," + (p[1]-d);
                    break;
                case ns.PointlineRenderer.TRIANGLE:
                    d = 1.5 * size;
                    a = 0.866025 * d;
                    b = 0.5 * d;
                    path += "M" + p[0] + "," + (p[1]+d);
                    path += "L" + (p[0]+a) + "," + (p[1]-b);
                    path += "L" + (p[0]-a) + "," + (p[1]-b);
                    path += "Z";
                    break;
                case ns.PointlineRenderer.DIAMOND:
                    d = 1.5 * size;
                    path += "M" + (p[0]-size) + "," + p[1];
                    path += "L" + p[0] + "," + (p[1]+d);
                    path += "L" + (p[0]+size) + "," + p[1];
                    path += "L" + p[0] + "," + (p[1]-d);
                    path += "Z";
                    break;
                case ns.PointlineRenderer.STAR:
                    d = 1.5 * size;
                    path += "M" + (p[0]-d*0.0000) + "," + (p[1]+d*1.0000);
                    path += "L" + (p[0]+d*0.3536) + "," + (p[1]+d*0.3536);
                    path += "L" + (p[0]+d*0.9511) + "," + (p[1]+d*0.3090);
                    path += "L" + (p[0]+d*0.4455) + "," + (p[1]-d*0.2270);
                    path += "L" + (p[0]+d*0.5878) + "," + (p[1]-d*0.8090);
                    path += "L" + (p[0]-d*0.0782) + "," + (p[1]-d*0.4938);
                    path += "L" + (p[0]-d*0.5878) + "," + (p[1]-d*0.8090);
                    path += "L" + (p[0]-d*0.4938) + "," + (p[1]-d*0.0782);
                    path += "L" + (p[0]-d*0.9511) + "," + (p[1]+d*0.3090);
                    path += "L" + (p[0]-d*0.2270) + "," + (p[1]+d*0.4455);
                    path += "Z";
                    break;
                case ns.PointlineRenderer.SQUARE:
                    path += "M" + (p[0] - size) + "," +  (p[1] - size);
                    path += "L" + (p[0] + (2 * size)) + "," +  (p[1] - size);
                    path += "L" + (p[0] + (2 * size)) + "," +  (p[1] + (2 * size));
                    path += "L" + (p[0] - size) + "," +  (p[1] + (2 * size));
                    path += "Z";
                    break;
                default: // ns.PointlineRenderer.CIRCLE
                    path += "M" + p[0] + "," + p[1];
                    path += "m0," + (-size);
                    path += "a" + size + "," + size + ",0,1,1,0," + (2 * size);
                    path += "a" + size + "," + size + ",0,1,1,0," + (-2 * size);
                    path += "z";
                    break;
            }
            return path;

        });
    });

});
