class Deck {
     constructor() 
     {
        this.cards = [];
        this.length = 52;
        this.suits = ["spade","heart","diamond","club"];
        this.ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        this.playerDeck = [];
        this.aiDeck = [];
        this.playerCardCache = [];
        this.aiCardCache = [];
        this.turnCounter = 0;
        
        this.generateDeck();
        this.shuffle();
        this.assignDecks();
        // console.log("Player Deck: ", ...this.playerDeck);
        // console.log("AI Deck: ",...this.aiDeck);

     }

     generateDeck()
     {

        for(let x=0; x < this.suits.length; x++)
        {
            for(let i=0; i < this.ranks.length;i++)
            {
                this.cards.push(new Card(this.suits[x],this.ranks[i], i+1));
            }
        }
     }

    assignDecks() 
    {
        for(let i=0;i<this.cards.length;i++)
        {
            i % 2 == 0 ? this.playerDeck.push(this.cards[i]) : this.aiDeck.push(this.cards[i]);
        }

        console.log("type warDeck.turn(); to begin.");
        console.log("To test war recursion, type warDeck.testCondition();")
    }

    shuffle = () => this.cards.sort(() => Math.random() - 0.5);

    turn()
    {
        this.playerCardCache.push(this.playerDeck.shift());
        this.aiCardCache.push(this.aiDeck.shift());

        if(this.playerCardCache[0].score > this.aiCardCache[0].score)
        {
            console.log("Your card: ", this.playerCardCache[0]);
            console.log("AI card: ", this.aiCardCache[0]);

            this.playerDeck.push(...this.playerCardCache, ...this.aiCardCache);
            console.log("You won this round.");
            console.log("----------------------------");
            console.log("Your Deck: ", this.playerDeck.length, "AI Deck: ", this.aiDeck.length);
            console.log("----------------------------");
            this.clearCache();
            this.checkWinCondition();

        }
        else if(this.playerCardCache[0].score < this.aiCardCache[0].score)
        {
            console.log("Your card: ", this.playerCardCache[0]);
            console.log("AI card: ", this.aiCardCache[0]);

            this.aiDeck.push(...this.aiCardCache, ...this.playerCardCache);
            console.log("You lost this round.");
            console.log("----------------------------");
            console.log("Your Deck: ", this.playerDeck.length, "AI Deck: ", this.aiDeck.length);
            console.log("----------------------------");
            this.clearCache();
            this.checkWinCondition();
        }
        else {
            console.log("Your card: ", this.playerCardCache[0]);
            console.log("AI card: ", this.aiCardCache[0]);
            console.log("War!");


            for(let i=0;i<4;i++)
            {
                this.playerCardCache.push(this.playerDeck.shift());
                this.aiCardCache.push(this.aiDeck.shift());
            }

            while(this.playerDeck.length > 4 || this.aiDeck.length > 4)
            {
                if(this.playerCardCache[this.playerCardCache.length-1].score === this.aiCardCache[this.aiCardCache.length-1].score)
                {
                    for(let j=0;j<4;j++)
                    {
                        this.playerCardCache.push(this.playerDeck.shift());
                        this.aiCardCache.push(this.aiDeck.shift());
                    }
                    console.log("Recursive War! Drawing more cards..");

                    if(this.playerCardCache[this.playerCardCache.length-1].score > this.aiCardCache[this.aiCardCache.length-1].score)
                    {   
                        this.playerDeck.push(...this.playerCardCache, ...this.aiCardCache);
                        console.log("----------------------------");
                        console.log("You won war! Cards won: ", ...this.aiCardCache);
                        console.log("----------------------------");
                        console.log("Your Deck: ", this.playerDeck.length, "AI Deck: ", this.aiDeck.length);
                        console.log("----------------------------");

                        this.clearCache();
                        this.checkWinCondition();
                        break;
                    }
                    else if(this.playerCardCache[this.playerCardCache.length-1].score < this.aiCardCache[this.aiCardCache.length-1].score)
                    {
                        this.aiDeck.push(...this.aiCardCache, ...this.playerCardCache);
                        console.log("----------------------------");
                        console.log("You lost war! Cards lost: ", ...this.playerCardCache);
                        console.log("----------------------------");
                        console.log("Your Deck: ", this.playerDeck.length, "AI Deck: ", this.aiDeck.length);
                        console.log("----------------------------");

                        this.clearCache();
                        this.checkWinCondition();
                        break;         
                    }

                }
                else if(this.playerCardCache[this.playerCardCache.length-1].score > this.aiCardCache[this.aiCardCache.length-1].score)
                {
                    this.playerDeck.push(...this.playerCardCache, ...this.aiCardCache);
                    console.log("----------------------------");
                    console.log("You won war! Cards won: ", ...this.aiCardCache);
                    console.log("----------------------------");
                    console.log("Your Deck: ", this.playerDeck.length, "AI Deck: ", this.aiDeck.length);
                    console.log("----------------------------");

                    this.clearCache();
                    this.checkWinCondition();
                    break;
                }
                else if(this.playerCardCache[this.playerCardCache.length-1].score < this.aiCardCache[this.aiCardCache.length-1].score)
                {
                    this.aiDeck.push(...this.aiCardCache, ...this.playerCardCache);
                    console.log("----------------------------");
                    console.log("You lost war! Cards lost: ", ...this.playerCardCache);
                    console.log("----------------------------");
                    console.log("Your Deck: ", this.playerDeck.length, "AI Deck: ", this.aiDeck.length);
                    console.log("----------------------------");

                    this.clearCache();
                    this.checkWinCondition();
                    break;                   
                }
            }

        }

        console.log("Turn: ", this.turnCounter);
        console.log("----------------------------");
        this.checkWinCondition();
        this.turnCounter++;

    }

    clearCache()
    {
        this.playerCardCache = [];
        this.aiCardCache = [];
    }

    checkWinCondition()
    {
        if(this.playerDeck.length === 0)
        {
            console.log("You lost this game. Resetting deck..");
            alert("You lost this game. Resetting deck..")
            this.reset();
        }
        else if(this.aiDeck.length === 0)
        {
            console.log("You won this game! Resetting deck..");
            alert("You won this game! Resetting deck..");
            this.reset();
        }
    }

    reset()
    {
        this.cards = [];
        this.clearCache();
        this.turnCounter = 0;
        this.generateDeck();
        this.shuffle();
        this.assignDecks();
        console.log("Player Deck: ", ...this.playerDeck);
        console.log("AI Deck: ",...this.aiDeck);

    }

    testCondition()
    {
        this.cards = [];
        this.playerDeck = [];
        this.aiDeck = [];

        for(let x=0; x < this.suits.length; x++)
        {
            for(let i=0; i < this.ranks.length;i++)
            {
                this.cards.push(new Card(this.suits[x],this.ranks[i], i+1));
            }
        }

        for(let x=0; x < 26; x++)
        {
            
            this.playerDeck.push(this.cards.shift());

            if(x < 13)
            {
                this.playerCardCache.push(this.playerDeck.shift());
            }
            

        }

        for(let y=0; y < 26; y++)
        {
            this.aiDeck.push(this.cards.shift());
            if(y < 13)
            {
                this.aiCardCache.push(this.aiDeck.shift());
            }
        }
        
        this.playerDeck.sort(() => Math.random() - 0.5);
        this.aiDeck.sort(() => Math.random() - 0.5);

        this.playerDeck.unshift(...this.playerCardCache);
        this.aiDeck.unshift(...this.aiCardCache);
        
        this.clearCache();

        console.log(this.playerDeck);
        console.log(this.aiDeck);

        this.turn();

    }
 }