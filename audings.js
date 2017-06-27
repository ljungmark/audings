!function() {
  const context = new (window.AudioContext || window.webkitAudioContext),
    buffers = {},

  audings_buffer = function(key, arrayBuffer, callback){
    context.decodeAudioData(arrayBuffer, function(bytes) {
      buffers[key] = {};
      buffers[key].data = bytes;
      buffers[key].loop = false;

      if (callback) callback(key);
    }, function(event){
      console.error('Audio decoding error: ' + event.err);
    }
  )},
  audings_load = function(key, source, callback, request){
    if (source.big) {
      request = new XMLHttpRequest();
      request.open('GET', source, true);
      request.responseType = 'arraybuffer';
      request.onload = function() {
        audings_buffer(key, request.response, callback);
      };
      request.send();
    }
    else {
      request = new FileReader();
      request.onload = function(){
        audings_buffer(key, request.result, callback);
      };
      request.readAsArrayBuffer(source);
    }
  },
  audings_unload = function(key){
    delete buffers[key]
  },
  audings_start = function(key, bufferSource){
    if (key in buffers) {
      if ('node' in buffers[key]) buffers[key].node.stop(0);

      bufferSource = context.createBufferSource();
      bufferSource.buffer = buffers[key].data;
      bufferSource.connect(context.destination);
      bufferSource.loop = buffers[key].loop;
      bufferSource.start(0)
      buffers[key].node = bufferSource;
    }
  },
  audings_stop = function(key) {
    if (key in buffers && buffers[key].node) buffers[key].node.stop(0);
  };

  window.audings = {
    load: audings_load,
    unload: audings_unload,
    start: audings_start,
    stop: audings_stop
  }
}();
