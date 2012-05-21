if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.ModelTool) {
    window.multigraph.ModelTool = {};
}

(function (ns) {
    "use strict";
    function AttrList(name) {
        var that = this,
        attr = new window.multigraph.ModelTool.Attr(name),
        arr = [];

        var delegate = function (obj, func) {
            return function () { return obj[func].apply(that, arguments); };
        };
        
        this.pop = delegate(arr, "pop");

        for (var i in attr) {
            if (attr.hasOwnProperty(i)) {
                if (typeof(attr[i]) === 'function') {
                    this[i] = delegate(attr, i);
                }
            }
        }

        //added since it's hard to inherit these properties from attr
        //via delegation
        this.and = that;
        this.which = that;

        this.add = function (obj) {
            if ((that.validator())(obj)) {
                arr.push(obj);
                return this;         
            } else {
                throw new Error(that.errorMessage());
            }
            
        };

        this.at = function (index) {
            if (index < 0 || index >= this.size()) {
                throw new Error("AttrList: Index out of bounds");
            }
            return arr[index];
        };

        //to keep things more java-y
        this.get = this.at;

        this.size = function () {
            return arr.length;
        };

        this.addTo = function (obj) {
            if(!obj || typeof(obj) !== 'object') {
                throw new Error("AttrList: addTo method requires an object parameter");                
            } else {
                var actualList = {},
                prop;
                for(prop in that) {
                    if (that.hasOwnProperty(prop) && !attr[prop]) {
                        //console.log("adding..." + prop);
                        actualList[prop] = that[prop];
                    }
                }
                obj[name] = function() {
                    return actualList;
                };
            }
        };
    }


    //this needs to stay if we're going to use instanceof
    //but note we override all of the methods via delegation
    //so it's not doing anything except for making an AttrList
    //an instance of Attr
    AttrList.prototype = new window.multigraph.ModelTool.Attr(name);

    ns.AttrList = AttrList;
}(window.multigraph.ModelTool));