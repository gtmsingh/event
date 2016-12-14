var _gtm = function() {
    var EVENT_QUEUE = {};
    var TRIGGERS = {};
    var _parent = this;

    function getDefaultOptions() {
        return {
            stopPropagation: false,
            preventDefault: false
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

    function getHandlerKey(fn, handlers) {
        if (typeof fn === typeof(function() {})) {
            if (fn.name) {
                return fn.name;
            } else {
                for (var i = 0; i < 3; i++) {
                    var name = Math.random().toString(36).slice(2);
                    if (!(name in handlers)) {
                        return name;
                    }
                }
            }
        } else {
            throw "Could get key for non-function type";
        }
    }

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
        this.handlersMap = {};
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
            var fnKey = getHandlerKey(fn, parent.handlersMap);
            if (fnKey in parent.handlersMap) {
                throw 'Handler with this name already exists for "' + parent.name + '" event';
            }
            parent.handlersMap[fnKey] = getNewHandler(fn, _options);
            parent.handlers.push(fnKey);
            return parent;
        };
        this.removeHandler = function removeHandler(name) {
            if (!(name in parent.handlersMap)) {
                throw "Cannot remove unregistered handler";
            }
            delete parent.handlersMap[name];
            parent.handlers.splice(parent.handlers.indexOf(name), 1);
        };
        this.getLastHandlerName = function() {
            if (parent.handlers.length > 0) {
                return parent.handlers[parent.handlers.length - 1];
            } else {
                return null;
            }
        };
        this.trigger = function trigger(event) {
            if (!isValidEventName(parent.name)) {
                throw 'Invalid event to trigger';
            }
            _parent.getTrigger(parent.name)(event);
        }
    }

    this.Event = function Event(name, options) {
        var _options = getDefaultOptions();
        if (options) {
            for (key in options) {
                _options[key] = options[key];
            }
            if (name in EVENT_QUEUE) {
                for (key in _options) {
                    EVENT_QUEUE[name].options[key] = _options[key];
                }
            }
        }
        if (!(name in EVENT_QUEUE)) {
            var _sample = new _event(name, _options);
            EVENT_QUEUE[name] = _sample;
        }

        return EVENT_QUEUE[name];
    };

    this.getTrigger = function getTrigger(name) {
        if (!isValidEventName(name)) {
            throw 'Invalid event for getting trigger';
        }
        if (!(name in TRIGGERS)) {
            TRIGGERS[name] = (function(name) {
                var eventName = name;
                return function(event) {
                    if (!isValidEventName(eventName)) {
                        throw 'Trigger called failed due to invalid event';
                    }
                    for (var i = 0; i < EVENT_QUEUE[eventName].handlers.length; i++) {
                        var eventObj = EVENT_QUEUE[eventName];
                        var fnKey = EVENT_QUEUE[eventName].handlers[i];
                        var fnObj = EVENT_QUEUE[eventName].handlersMap[fnKey];
                        fnObj.handler(event);
                        if (event) {
                            if (preventDefault(eventObj, fnObj)) {
                                event.preventDefault();
                            }
                            if (stopPropagation(eventObj, fnObj)) {
                                event.stopPropagation();
                            }
                        }
                    }
                }
            })(name);
        }
        return TRIGGERS[name];
    };
}

var event = new _gtm();
