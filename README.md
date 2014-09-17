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

`navigator.onLine` [always incorrectly reports `true` in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=654579) and doesn't fire events [bug 756364](https://bugzilla.mozilla.org/show_bug.cgi?id=756364).


## What can we do about it, mate?

We have a few options:

* check for connectivity only when a user action that requires connectivity, polling only until user regains connectivity
* continually make a simple request in the background, fixing the value of `navigator.onLine` and firing events (@remy's example uses synchronous XHR polling every 5 minutes)
* change `navigator.onLine` to return a `Promise` after checking connectivity
* checking when a [socket](https://developer.mozilla.org/en-US/docs/Web/API/TCPSocket) is closed, which unfortunately works on only Firefox OS for privileged, packaged web apps ([raw sockets are currently being standardised](http://www.w3.org/TR/raw-sockets/)


## Credits

* Remy Sharp for his [XHR-polling polyfill](https://github.com/remy/polyfills/blob/master/offline-events.js)


## Licence

The content of this project itself is licensed under the [Creative Commons Attribution 3.0 licence](http://creativecommons.org/licenses/by/3.0/us/deed), and the underlying source code used to format and display that content is licensed under the [MIT license](LICENCE).
