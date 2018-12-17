const PubSub = require('../helpers/pub_sub.js');

const RulesButtonView = function (element){
  this.element = element
};

RulesButtonView.prototype.bindEvents = function () {
  this.element.style.display = 'none';
  this.element.addEventListener("click", (event) => {
    PubSub.publish("Rules:show-rules",{});
  });

  PubSub.subscribe('Game:game-winner-determined', () => {
    this.element.style.display = 'none';
  })

  PubSub.subscribe('StartButton:start-game', () => {
    this.element.style.display = 'initial';
  })
};

module.exports = RulesButtonView;
