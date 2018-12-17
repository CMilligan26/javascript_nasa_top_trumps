// Custom PubSub
// this is a chatty version and dumps loads of info
// out to the console.

const PubSub = {

  // send a payload out on channel

  publish : function(channel, payload){
    const event = new CustomEvent(channel, { detail: payload } );
    document.dispatchEvent(event);
  },

  // register interest in an event, with the code to run
  // when this event is emitted

  subscribe: function(channel, callback){
    document.addEventListener(channel, callback);
  },

};

module.exports = PubSub;
