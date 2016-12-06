var _gtm = function() {
    var EVENT_QUEUE = {};
    var parent = this;

    function getDefaultOptions() {
        var _defaultOption = {
            allowPropagation: true,
            preventDefault: true
        }
        return JSON.parse(JSON.stringify(_defaultOption));
    };

    function preventDefault(e, f) {
        if (f.options.preventDefault !== undefined) {
            return f.options.preventDefault;
        } else {
            return e.options.preventDefault;
        }
    };

    function stopPropagation(e, f) {
        if (f.options.allowPropagation !== undefined) {
            return f.options.allowPropagation;
        } else {
            return e.options.allowPropagation;
        }
    };

    function getNewHandler(fn, options) {
        if (typeof fn !== typeof(function() {})) {
            throw new Exception('Handler function is invalid');
        }
        return {
            handler: fn,
            options: options
        };
    };

    function isValidEventName(name) {
        if (typeof name !== typeof '') {
            return false;
        } else if (!name || !(name in EVENT_QUEUE)) {
            return false;
        }
        return true;
    };

    this.Event = function(name, options) {
        var _options = getDefaultOptions();
        if (options) {
            for (key in options) {
                _options[key] = options[key];
            }
        }
        if (name in EVENT_QUEUE) {
            for (key in _options) {
                EVENT_QUEUE[name].options[key] = _options[key];
            }
        } else {
            var _sample = {
                options: _options,
                handlers: []
            };
            EVENT_QUEUE[name] = _sample;
        }
        return parent;
    };
    this.Trigger = function(name) {
        if (!isValidEventName(name)) {
            throw new Exception('Trigger requires a valid event name');
        }
        var thisObj = this;
        thisObj.eventName = name;
        thisObj.fn = function(event) {
            if (!isValidEventName(thisObj.eventName)) {
                throw new Exception('Trigger called failed due to invalid event');
            }
            for (var i = 0; i < EVENT_QUEUE[thisObj.eventName].handlers.length; i++) {
                var eventObj = EVENT_QUEUE[thisObj.eventName];
                var fnObj = EVENT_QUEUE[thisObj.eventName].handlers[i];
                fnObj.handler();
                if (preventDefault(eventObj, fnObj)) {
                    event.preventDefault();
                }
                if (stopPropagation(eventObj, fnObj)) {
                    event.stopPropagation();
                }
            }
        }

        return this.fn;
    };
    this.addHandler = function(name, fn, options) {
        if (!isValidEventName(name)) {
            throw new Exception('Handler couldn\'t be added, Invalid event');
        }
        if (typeof fn !== typeof(function() {})) {
            throw new Exception('Handler is not a function');
        }
        var _options = {};
        if (options) {
            for (key in options) {
                _options[key] = options[key];
            }
        }
        EVENT_QUEUE[name].handlers.push(getNewHandler(fn, _options));
        return parent;
    };
}

var event = new _gtm();
