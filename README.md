# navigator.onLine-that-actually works

Fixing `navigator.onLine` so it works everywhere.

## What is `navigator.onLine`, mate?

> `window.navigator.onLine`
>
> Returns `false` if the user agent is definitely offline (disconnected from the network). Returns `true` if the user agent might be online.
>
> The events online and offline are fired when the value of this attribute changes.
>
> <small>Note: This attribute is inherently unreliable. A computer can be connected to a network without having Internet access.</small>


Source: [HTML Standard](https://html.spec.whatwg.org/#browser-state)


## What's the problem, mate?

`navigator.onLine` [always incorrectly reports `true` in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=654579) and doesn't fire events [bug 756364](https://bugzilla.mozilla.org/show_bug.cgi?id=756364). And there are a [plethora of bugs with Chrome's implementation](http://crbug.com?q=navigator.online) too.


## What can we do about it, mate?

We have a few options:

* check for connectivity only when a user action that requires connectivity, polling only until user regains connectivity
* continually make a simple request in the background, fixing the value of `navigator.onLine` and firing events ([@remy](https://github.com/remy)'s example uses synchronous XHR polling every 5 minutes)
* change `navigator.onLine` to return a `Promise` after checking connectivity
* checking when a [socket](https://developer.mozilla.org/en-US/docs/Web/API/TCPSocket) is closed, which unfortunately works on only Firefox OS for privileged, packaged web apps ([raw sockets are currently being standardised](http://www.w3.org/TR/raw-sockets/))


## Credits

A big thanks to [@remy](https://github.com/remy) for his [XHR-polling polyfill](https://github.com/remy/polyfills/blob/master/offline-events.js).

I want to thank these fine individuals for their assistance in extending [my original concept](ondemand-promises.js) and building out a full-blown, resilient offline-checking system in the [Firefox Marketplace](https://github.com/mozilla/fireplace):

* [@muffinresearch](https://github.com/remy)
* [@spasovski](https://github.com/spasovski)
* [@diox](https://github.com/diox)
* [@ngokevin](https://github.com/ngokevin)


## Licence

The content of this project itself is licenced under the [Creative Commons Attribution 3.0 licence](http://creativecommons.org/licences/by/3.0/us/deed), and the underlying source code used to format and display that content is licenced under the [MIT licence](LICENCE).
