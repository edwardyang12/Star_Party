class Deck{

  constructor(cards=null){
    if(cards == null){
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
      this.deck = deck;
    }
    else{
      this.deck = cards;
    }
  }

  get getDeck(){
      return this.deck;
  }

  shuffle() {
      for (let i = this.deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }

  }

  removeCard(card){
    var index;
    for(index =0; index<this.deck.length;index++){
      if(card.localeCompare(this.deck[index]) == 0){
        this.deck.splice(index,1);
      }
    }
  }

  cardExists(card){
    var index;
    for(index =0; index<this.deck.length;index++){
      if(card.localeCompare(this.deck[index]) == 0){
        return 1; //exists
      }
    }
    return 0; //does not exist
  }

  giveCard(max = this.deck.length){
    var target = Math.floor(Math.random() * Math.floor(max));
    var temp = this.deck[target];
    this.removeCard(temp);
    return temp;
  }

}



// var test = new Deck();
// test.shuffle();
// console.log(test.getDeck);
// console.log(test.removeCard("BJ"));
// console.log(test.getDeck);
// console.log(test.cardExists("BJ"));
// console.log(test.giveCard());

module.exports.Deck = Deck;
