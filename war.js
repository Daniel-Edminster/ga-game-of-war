class WarGame {
    constructor(){
        this.deck = [];
        this.p1 = { inPlay: [], deck: [] };
        this.p2 = { inPlay: [], deck: [] };
        this.suits = ['S','H','D','C'];
        this.values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
        this.initialize();
        this.playIdx = 0;

        console.log("War initialized, type w.turn(); to begin.");
    }

    initialize() {
        this.deck = [];
        this.p1 = { inPlay: [], deck: [] };
        this.p2 = { inPlay: [], deck: [] };
        this.playIdx = 0;
        
        for(let i=0;i<this.suits.length;i++) {
            for(let j=0;j<this.values.length;j++) {
                this.deck.push({ suit: this.suits[i], value: this.values[i] });
            }
        }

        //shuffle our deck
        this.deck = this.shuffle(this.deck);

        //split the deck in half, allocate player decks
        this.p1.deck.push(...this.deck.splice(0,26));
        this.p2.deck.push(...this.deck.splice(0,26));


    }

    //Fisher - Yates unbiased shuffling algorithm
    //https://bost.ocks.org/mike/shuffle/
    shuffle(array) {
        var m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
      }

      turn() {
        if(this.p1.deck.length && this.p2.deck.length){
            this.p1.inPlay.push(this.p1.deck.shift());
            this.p2.inPlay.push(this.p2.deck.shift());
    
            if(this.p1.inPlay[0].value > this.p2.inPlay[0].value) {
                console.log('p1 wins: ', this.p1.inPlay[0], 'p2: ', this.p2.inPlay[0]);
                this.p1.deck.push(this.p1.inPlay.shift(), this.p2.inPlay.shift());
                this.turnWinCheck();
            }
            else if (this.p2.inPlay[0].value > this.p1.inPlay[0].value) {
                console.log('p2 wins: ', this.p2.inPlay[0], 'p1: ', this.p1.inPlay[0]);
                this.p2.deck.push(this.p2.inPlay.shift(), this.p1.inPlay.shift());
                this.turnWinCheck();
            }
            else {
                this.war();
            }
        }
        
        else {
            this.p1.deck.length > this.p2.deck.length ? console.log("p1 wins, p2 ran out of cards") : console.log('p2 wins, p1 ran out of cards');
            console.log("starting new game..");
            this.initialize();

        }

      }

      turnWinCheck() {
        if(this.p1.deck.length && this.p2.deck.length) {
            return;
        }
        else {
            if(!this.p1.deck.length) {
                console.log("p2 wins, p1 ran out of cards.");
                console.log("starting new game..");
                this.initialize(); 
            }
            else {
                console.log("p1 wins, p2 ran out of cards.");
                console.log("starting new game..");
                this.initialize(); 
            } 
        }
      }
      
      war() {
        if(this.p1.deck.length < 4 || this.p2.deck.length < 4)
        {
            this.p1.deck.length > this.p2.deck.length ? console.log("p1 wins, p2 ran out of cards for war") : console.log('p2 wins, p1 ran out of cards for war');
            console.log("starting new game..");
            this.initialize();
        }       
        else {
            this.playIdx += 4;

            this.p1.inPlay.push(...this.p1.deck.splice(0,4));
            this.p2.inPlay.push(...this.p2.deck.splice(0,4));

            if(this.p1.inPlay[this.playIdx].value > this.p2.inPlay[this.playIdx].value) {
                console.log(`p1[${this.playIdx}] = ${this.p1.inPlay[this.playIdx].suit}:${this.p1.inPlay[this.playIdx].value} | p2[${this.playIdx}] = ${this.p2.inPlay[this.playIdx].suit}:${this.p2.inPlay[this.playIdx].value}`);
            
                console.log("p1 wins war!");
                this.p1.deck.push(...this.p1.inPlay.splice(0));
                this.p1.deck.push(...this.p2.inPlay.splice(0));
                this.playIdx = 0;
                console.log("P1 Deck:", this.p1.deck, "P2 Deck: ", this.p2.deck);
                this.turnWinCheck();
            }
            else if(this.p2.inPlay[this.playIdx].value > this.p1.inPlay[this.playIdx].value) {
                console.log(`p1[${this.playIdx}] = ${this.p1.inPlay[this.playIdx].suit}:${this.p1.inPlay[this.playIdx].value} | p2[${this.playIdx}] = ${this.p2.inPlay[this.playIdx].suit}:${this.p2.inPlay[this.playIdx].value}`);
                console.log("p2 wins war!");
                this.p2.deck.push(...this.p2.inPlay.splice(0));
                this.p2.deck.push(...this.p1.inPlay.splice(0));
                this.playIdx = 0;
                this.turnWinCheck();
            }
            else {
                console.log(`p1[${this.playIdx}] = ${this.p1.inPlay[this.playIdx].suit}:${this.p1.inPlay[this.playIdx].value} | p2[${this.playIdx}] = ${this.p2.inPlay[this.playIdx].suit}:${this.p2.inPlay[this.playIdx].value}`);
                console.log("Recursion!");
                console.log(this.p1.inPlay[this.playIdx], this.p2.inPlay[this.playIdx]);
                this.war();
            }
        }

      }
}

let w = new WarGame();

