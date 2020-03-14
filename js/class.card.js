class Card {
     constructor(suit, rank, score)
     {
        this.suit = suit;
        this.rank = rank;
        this.score = score;
        this.suitColor;
        this.suitHTMLEntity;
        
        (this.suit === "diamond" || this.suit === "heart") ? this.suitColor = 'red' : this.suitColor = 'black';

        if(this.suit === "spade") this.suitHTMLEntity = "&spades;";
        if(this.suit === "heart") this.suitHTMLEntity = "&hearts;";
        if(this.suit === "diamond") this.suitHTMLEntity = "&diams;";
        if(this.suit === "club") this.suitHTMLEntity = "&clubs;";

     }
 }