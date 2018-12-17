const PubSub = require('../helpers/pub_sub.js');

const StartGameButtonView = function (element) {
  this.element = element;
};

StartGameButtonView.prototype.bindEvents = function () {
  this.element.addEventListener("click", (event) => {
    this.element.hidden = true;
    PubSub.publish("StartButton:start-game",{});
  });

  PubSub.subscribe('Game:game-winner-determined', () => {
    this.element.hidden = false;
  })
};

module.exports = StartGameButtonView;
