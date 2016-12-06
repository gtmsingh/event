var _gtm = function() {
    var EVENT_QUEUE = {};

    function getDefaultOptions() {
        return {
            stopPropagation: true,
            preventDefault: true
        }
    };

    function preventDefault(e, f) {
        if (f.options.preventDefault !== undefined) {
            return f.options.preventDefault;
        } else {
            return e.options.preventDefault;
        }
    };

    function stopPropagation(e, f) {
        if (f.options.stopPropagation !== undefined) {
            return f.options.stopPropagation;
        } else {
            return e.options.stopPropagation;
        }
    };

    function getNewHandler(fn, options) {
        if (typeof fn !== typeof(function() {})) {
            throw 'Handler function is invalid';
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

    function _event(name, options) {
        var parent = this;
        this.options = options;
        this.handlers = [];
        this.name = name;
        this.addHandler = function addHandler(fn, options) {
            if (!isValidEventName(parent.name)) {
                throw 'Handler couldn\'t be added, Invalid event';
            }
            if (typeof fn !== typeof(function() {})) {
                throw 'Handler is not a function';
            }
            var _options = {};
            if (options) {
                for (key in options) {
                    _options[key] = options[key];
                }
            }
            EVENT_QUEUE[name].handlers.push(getNewHandler(fn, _options));
            return parent;
        }
    }

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
            var _sample = new _event(name, _options);
            EVENT_QUEUE[name] = _sample;
        }
        return EVENT_QUEUE[name];
    };

    this.Trigger = function(name) {
        if (!isValidEventName(name)) {
            throw 'Trigger requires a valid event name';
        }
        var thisObj = this;
        thisObj.eventName = name;
        thisObj.fn = function(event) {
            if (!isValidEventName(thisObj.eventName)) {
                throw 'Trigger called failed due to invalid event';
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
}

var event = new _gtm();
