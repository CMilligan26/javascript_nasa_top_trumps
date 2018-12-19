const PubSub = require('../helpers/pub_sub.js');

const GameWinnerView = function (element){
  this.element = element
};


GameWinnerView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:game-winner-determined', (event) => {
    this.renderModal(event.detail);
  });

  PubSub.subscribe('Game:current-player-turn', (event) => {
    document.querySelector('#game-container').style.visibility = 'visible';
    this.element.style.display = 'none';
  });

}

GameWinnerView.prototype.renderModal = function (winnerPhrase) {
  document.querySelector('#game-container').style.visibility = 'hidden';
  this.element.innerHTML = '';
  this.element.style.display = 'initial';

  const gameWinnerContent = document.createElement('div');
  gameWinnerContent.className = 'game-winner-content';

  const body = document.createElement('div');
  body.className = 'gameWinnerBody';
  winnerLine = document.createElement('p');
  winnerLine.className = 'winnerLine';
  winnerLine.textContent = winnerPhrase;
  body.appendChild(winnerLine);

  gameWinnerContent.appendChild(body)
  this.element.appendChild(gameWinnerContent);
};


module.exports = GameWinnerView;
