# event
A simple event handler to reduce no. of event handlers used for user actions

It is a simple event manager module that can be used to decrease the burden on DOM for various event handling. You can use one handler on a particular javascript event to trigger various intended functions. For more clear usage follow the sample code present in `samples` directory.

## Docs
`event` : Its the entry point of all the functionalities. It contains the following attributes/functions which can be used as per the need.

* `Event(name, options)` : It creates a new event by the name of `name` if it doesn't exists otherwise would update the options of the already present event. Returns object which supports the following functionalities: 
    - `addHandler(fn, options)` : Enqueue a handler for the event which is obtained from the `Event` function. `fn` is the handler function and `options` overrides the `options` used for the `Event` when the same is called. This can be optionally chained with multiple `addHandlers`.
* `Trigger(name)` : It returns a handler which would trigger all the handlers added using `Event.addHandler` function. This is attached with user action that is intended for all the handlers throughout the application.


## TODO
* Add deregistration functionality
* Add alert for register and deregister of handlers for any event.
* Research on pub-sub model for this, whether it would be better or worse
