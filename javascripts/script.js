function getContent(value, suit){
  html = '<div class="card" value="' + value + '" suit="' + suit + '">';
  html += '<h3 class="value">' + value + '</h3>';
  html += '<img class="suit suit-tl" src="./images/' + suit + '.png">';
  html += '<img class="suit suit-br" src="./images/' + suit + '.png">';
  html += '</div>';

  return html;
}

var suits = [
  "heart",
  "spade",
  "club",
  "diamond"
];

var values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

var deck = [];

function createDeck(){
  for(i = 0; i < values.length; i++){
    for(j = 0; j < suits.length; j++){
      deck.push(Card(values[i], suits[j]));
    }
  }
}

function Card(value, suit){
  return {
    value: value,
    suit: suit
  }
}

function randomCard(){
  if(deck.length == 0){
    createDeck();
  }
  card_no = Math.floor(Math.random() * 100) % deck.length;
  console.log(deck.length, card_no);
  card = deck[card_no];

  delete deck[card_no];
  deck = deck.filter(Boolean);

  return card;
}

dealersHand = [];
playersHand = [];

function dealerScore(){
  var scores = [0];
  for(i = 0; i < dealersHand.length; i++){
    temp = parseInt(dealersHand[i].value);
    if(temp == NaN){
      if(dealersHand[i].value == "A"){
        temp = 0;
        for(j = 0; j < scores.length; j++){
          scores[j]++;
          scores.append(scores[j] + 10);
        }
      } else {
        temp = 10;
        for(j = 0; j < scores.length; j++){
          scores[j] += temp;
        }
      }
    } else {
      for(j = 0; j < scores.length; j++){
        scores[j] += temp;
      }
    }
  }

  scores = scores.sort(function(a, b){
    return a > b;
  });

  scores = scores.filter(function(a){
    return a < 22;
  })

  console.log(scores);
  return scores;
}

function playerScore(){
  var scores = [0];
  for(i = 0; i < playersHand.length; i++){
    temp = parseInt(playersHand[i].value);
    if((temp > 0) == false){
      console.log("Inside")
      if(playersHand[i].value == "A"){
        temp = 0;
        for(j = 0; j < scores.length; j++){
          scores[j]++;
          scores.push(scores[j] + 10);
        }
      } else {
        for(j = 0; j < scores.length; j++){
          scores[j] += temp;
        }
      }
    } else {
      for(j = 0; j < scores.length; j++){
        scores[j] += temp;
      }
    }
  }

  scores = scores.sort(function(a, b){
    return a > b;
  });

  console.log(scores);
  scores = scores.filter(function(a){
    return a < 22;
  })

  return scores;
}

function addDealer(){
  dealersHand.push(randomCard());

  var cards = "";

  console.log(dealersHand);
  for(i = 0; i < dealersHand.length; i++){
    card_content = getContent(dealersHand[i].value, dealersHand[i].suit);
    cards += card_content;
  }

  $(".dealer").html(cards);

  console.log(dealerScore());
  if(dealerScore().length == 0){
    showMessage("Dealer BUST");
  }
}

function addPlayer(){
  playersHand.push(randomCard());

  var cards = "";

  for(i = 0; i < playersHand.length; i++){
    card_content = getContent(playersHand[i].value, playersHand[i].suit);
    cards += card_content;
  }

  $(".player").html(cards);

  console.log(playerScore());
  if(playerScore().length == 0){
    showMessage("You Bust");
  }
}

function showMessage(msg){
  $("#msg").text(msg);
}

function hit(){
  addPlayer();
}


function stand(){
  while(true){
    addDealer();
    if(_dealerScoreLength = dealerScore().length){
      score = dealerScore()[_dealerScoreLength - 1]
      if(score > 16){
        break;
      }
    } else {
      break;
    }
  }

  if(score < 22){
    if(score < playerScore() && playerScore() < 22){
      showMessage("Oh.! Winner Winner Chicken Dinner, There it is");
    } else {
      showMessage("Yeah! I won");
    }
  } else {
    showMessage("Uff! I got busted.")
  }
}

function double(){
  if(playersHand().length == 2){
    addPlayer();
    stand();
  } else {
    showMessage("You can't double down now.")
  }
}

function init(){
  createDeck();
  addDealer();
  addPlayer();
  addPlayer();
}

function reset(){
  playersHand = [];
  dealersHand = [];

  addDealer();
  addPlayer();
  addPlayer();
}

$(document).ready(function(){
  init();

  $("#hit").on("click", function(){
    hit();
  });

  $("#stand").on("click", function(){
    stand();
  });

  $("#double").on("click", function(){
    double();
  });

  $("#reset").on("click", function(){
    reset();
  })
})
