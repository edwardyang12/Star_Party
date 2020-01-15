class Deck{

  constructor(cards){
    this.deck = cards;
  }

  get play_deck(){
      return this.deck;
  }

  static shuffle(cards){
    this.deck = shuffle(cards);
  }

//to do: implement remove cards


}

var deck = [];

var suits = "H S C D";
var splitSuits = suits.split(" ");

var nums = "1 2 3 4 5 6 7 8 9 10 J Q K";
var splitnums = nums.split(" ");

var suitCounter = 0;
var numsCounter = 0;
for(suitCounter = 0;suitCounter<splitSuits.length;suitCounter++){
  for(numsCounter = 0;numsCounter<splitnums.length;numsCounter++){
    deck.push(splitSuits[suitCounter]+splitnums[numsCounter]);
  }
}
deck.push("BJ");
deck.push("LJ");

const test = new Deck(deck);
console.log(test.play_deck);

module.exports = Deck;
