class Card {
     constructor(suit, rank, score)
     {
         this.suit = suit;
         this.rank = rank;
         this.score = score;
         this.suitColor;

         this.suit === ("heart" || "diamond") ? this.suitColor = 'red' : this.suitColor = 'black';

     }
 }