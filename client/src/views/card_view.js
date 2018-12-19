const PubSub = require('../helpers/pub_sub.js');

const CardView = function (container, player_number) {
  this.container = container;
  this.playerNumber = player_number;
};

CardView.prototype.renderCardDetails = function (card, playerNumber) {
  const playerCard = document.createElement('div');
  playerCard.className = 'player-card';
  playerCard.className += ` player-card-${this.playerNumber}`;
  const image = this.createCustomElement('div', 'className', 'planet-image');
  const stats = this.createCustomElement('div', 'className', 'stats');

  // pick coloured card at random
  // colour defined matches colour temp of star
  // in Kelvin
  let frame = Math.floor(parseFloat(card.st_teff)/500.0);
  if (frame>20) {
    frame = 20;
  };
  let frameString=`000${frame}`.slice(-4);
  const url = `./images/${frameString}.png`;
  const imageDiv = this.createCustomElement('img', 'src', url);

  image.appendChild(imageDiv);

  const playing_fields = {
    "Name": card.pl_name,
    "Distance": card.pl_orbsmax,
    "Orbit Period": card.pl_orbper,
    "Radius": card.pl_radj,
    "Mass": card.pl_bmassj,
    "Planets": card.pl_pnum
  };


  Object.keys(playing_fields).forEach((key) => {
    const statDiv = this.createCustomElement('div','className','stats-row');
    const labelDiv = this.createCustomElement('div','className','stats-row-label');
    labelDiv.textContent = key;
    if (playerNumber === 1) {
    if (labelDiv.textContent !== "Name" && labelDiv.textContent !== "Star Temp") {
    labelDiv.addEventListener('click', (event) => {
      PubSub.publish('CardView:category-clicked', event.target.textContent);
    })
  }
}
    const valueDiv = this.createCustomElement('div','className','stats-row-value');
    valueDiv.textContent = playing_fields[key];
    if (labelDiv.textContent !== "Name") {
      statDiv.appendChild(labelDiv);
    };
    statDiv.appendChild(valueDiv);
    if (labelDiv.textContent === "Name") {
      valueDiv.classList.remove("stats-row-value");
      statDiv.classList.remove("stats-row");
      statDiv.className = "card-name";
      playerCard.appendChild(statDiv);
    }
    else {
    stats.appendChild(statDiv);
    };
  })

  playerCard.appendChild(image);
  playerCard.appendChild(stats);

  return playerCard;
};

CardView.prototype.createCustomElement = function (type, attr, value) {
 const element = document.createElement(type);
 element[attr] = value;
 return element;
};

module.exports = CardView;
