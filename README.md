Audings: a tiny and simple UI sound controller
===========================================

With only 460 bytes minified + gzipped, Audings exposes a simple API to incorporate interface sounds in your web application. By decoding and storing your audio in memory, Audings can instantly retrieve and play them when you need.

Demo
----
Click on the squares or hit the hotkeys (F, G, H, J) on your keyboard to trigger the audio.

[Launch the demo](https://ljungmark.github.io/audings/)

API reference
-------------

* `audings.load(key, urlOrFile[, callback])` - load an audio file from a absolute or relative URL through AJAX or from a File Object (eg. `<input type="file">`), save it in the memory under the `key` key and call the optional callback function if present
* `audings.unload(key)` - delete the audio stored under `key` from memory
* `audings.start(key)` - start playing the audio stored under `key`
* `audings.stop(key)` - stop playing the audio stored under `key`

Examples
--------

Load `notification.wav` file through AJAX and store it in memory under the `notification` key:
```js
audings.load('notification', 'sounds/notification.wav');
```
...and play it through the `notification` key reference when you need:
```js
audings.start('notification');
```

Alternatively, load `notification.wav` file and play it as soon as it's ready (beware of latency):
```js
audings.load('notification', 'sounds/notification.wav', function(key){
    audings.start('notification');
})
```

Compatibility
-------------
Chrome 10+, Firefox 25+, Edge 12+ Safari 6+, Opera 15+
