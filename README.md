# event v1.0
A simple event handler to reduce no. of event handlers used for user actions

It is a simple event manager module that can be used to decrease the burden on DOM for various event handling. You can use one handler on a particular javascript event to trigger various intended functions. For more clear usage follow the sample code present in `samples` directory.

### Docs
Some functionality might be present in some version and might not be in another. To get the previous version checkout the version branch. For eg. for version 1.0, checkout v1.0, similarly for version 1.1 checkout v1.1 and so on. All the functionalities (unless mentioned) would be available from v1.0 onwards.

`event` : Its the entry point of all the functionalities. It contains the following attributes/functions which can be used as per the need.

* `Event(name, [options])` : It creates a new event by the name of `name` if it doesn't exists otherwise would update the options of the already present event. Returns object which supports the following functionalities: 
    - `addHandler(fn, [options])` : Enqueue a handler for the event which is obtained from the `Event` function. `fn` is the handler function and `options` overrides the `options` used for the `Event` when the same is called. This can be optionally chained with multiple `addHandlers`.
    - `trigger([event])` : It triggers a event if its still present. It accepts optional javascript event that can be used inside the handler.
* `getTrigger(name)` : It returns a handler which would trigger all the handlers added using `Event.addHandler` function. This is attached with user action that is intended for all the handlers throughout the application.

For usage example, you can check [this](https://codebeads.wordpress.com/2016/12/07/javascript-going-back-to-events/)
#### Note:
* `options` being used have the following default values and are optional (unless specifically mentioned).
```
{
    stopPropagation: false,
    preventDefault: false
}
```
These options, as you guess are used to stop propagation of event and preventing default behaviour respectively.
* All the function calls throws an Exception if something is wrong, unless specified.

### TODO
- [ ] Add deregistration functionality for handlers.
- [ ] Add alert for register and deregister of handlers for any event.
- [ ] Add callback/promise support to add synchronization of async handlers.
- [ ] Research on pub-sub model for this, whether it would be better or worse.
- [ ] Add this in bower or similar package manager.
