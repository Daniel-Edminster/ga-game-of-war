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
        this.warActive = false;
        
        this.generateDeck();
        this.shuffle();
        this.assignDecks();

     }

     generateDeck()
     {
        if(this.cards.length > 0) 
        {
            this.cards = [];
        }

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

        console.log("-------------------------------------------------------");
        console.log("|| Type war.turn(); to begin.                        ||");
        console.log("|| To automate turns, type war.autoTurns();          ||");       
        console.log("|| To test war recursion, type war.testCondition();  ||");
        console.log("-------------------------------------------------------");

        console.log("┌─────────────┐");
        console.log("│ ♠         ♥ │");
        console.log("│             │");
        console.log("│             │");
        console.log("│     WAR     │");
        console.log("│             │");
        console.log("│             │");
        console.log("│ ♦         ♣ │");
        console.log("└─────────────┘");
    }

    shuffle = () => this.cards.sort(() => Math.random() - 0.5);

    turn()
    {
        this.playerCardCache.push(this.playerDeck.shift());
        this.aiCardCache.push(this.aiDeck.shift());

        this.renderCardsToBrowser();

        if(this.playerCardCache[0].score > this.aiCardCache[0].score)
        {
            console.log("Your card: ", this.playerCardCache[0]);
            console.log("AI card: ", this.aiCardCache[0]);

            this.playerDeck.push(...this.playerCardCache, ...this.aiCardCache);
            console.log("You won this round.");
            console.log("----------------------------");
            console.log("Your Deck: ", this.playerDeck.length, "AI Deck: ", this.aiDeck.length);
            console.log("----------------------------");
            
            this.renderDecksToBrowser();
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

            this.renderDecksToBrowser();
            this.clearCache();
            this.checkWinCondition();
        }
        else {
            console.log("Your card: ", this.playerCardCache[0]);
            console.log("AI card: ", this.aiCardCache[0]);
            console.log("War!");

            this.warActive = true;
            this.checkWinCondition();

            for(let i=0;i<4;i++)
            {
                this.playerCardCache.push(this.playerDeck.shift());
                this.aiCardCache.push(this.aiDeck.shift());
                this.renderDecksToBrowser();
            }


            while(this.playerDeck.length > 4 || this.aiDeck.length > 4)
            {
                if(this.playerCardCache[this.playerCardCache.length-1].score === this.aiCardCache[this.aiCardCache.length-1].score)
                {
                    this.checkWarWinCondition();

                    for(let j=0;j<4;j++)
                    {
                        this.playerCardCache.push(this.playerDeck.shift());
                        this.aiCardCache.push(this.aiDeck.shift());
                        this.renderDecksToBrowser();
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

                        this.renderDecksToBrowser();

                        this.clearCache();

                        // this.checkWinCondition();
                        // this.warActive = false;

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


                        this.renderDecksToBrowser();
                        this.clearCache();

                        this.checkWinCondition();
                        this.warActive = false;
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

                    this.renderDecksToBrowser();
                    this.clearCache();
                    this.checkWinCondition();
                    this.warActive = false;
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

                    this.renderDecksToBrowser();
                    this.clearCache();
                    this.checkWinCondition();
                    this.warActive = false;
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

    checkWarWinCondition()
    {
        if(this.playerDeck.length < 4)
        {
            console.log("You lost this game. Resetting deck..");
            alert("You lost this game. Resetting deck..")
            this.reset();
        }
        else if(this.aiDeck.length < 4)
        {
            console.log("You won this game! Resetting deck..");
            alert("You won this game! Resetting deck..");
            this.reset();
        }

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
        this.warActive = false;
        this.cards = [];
        this.playerDeck = [];
        this.aiDeck = [];
        this.clearCache();
        this.turnCounter = 0;
        this.length = 52;
        this.generateDeck();
        this.shuffle();
        this.assignDecks();
        this.renderDecksToBrowser();
        this.clearActiveCards();
        console.log("Player Deck: ", ...this.playerDeck);
        console.log("AI Deck: ",...this.aiDeck);

    }

    clearActiveCards()
    {
        let cardGridElement = "";
        let cardGridArray = "";

        for(let x=1;x<4;x++)
        {
            for(let y=1;y<4;y++)
            {
                cardGridElement = `card-grid-${x}-${y}`;
                cardGridArray = document.getElementsByClassName(cardGridElement);
               
               for(let z=0;z<cardGridArray.length;z++)
               {
                   cardGridArray[z].innerHTML = "";

               }

            }
        }
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

    renderDecksToBrowser()
    {
        let playerDeckCount = document.getElementsByClassName("playerDeck")[0];
        playerDeckCount.innerHTML = `You: ${this.playerDeck.length}`;

        let aiDeckCount = document.getElementsByClassName("aiDeck")[0];
        aiDeckCount.innerHTML = `AI: ${this.aiDeck.length}`;
    }

    renderCardsToBrowser()
    {

        let playerDisplayNumOne = document.getElementsByClassName("card-grid-1-1")[0];
        playerDisplayNumOne.style.color = this.playerCardCache[0].suitColor;
        playerDisplayNumOne.innerHTML = this.playerCardCache[0].rank;

        let playerDisplayNumTwo = document.getElementsByClassName("card-grid-1-3")[0];
        playerDisplayNumTwo.style.color = this.playerCardCache[0].suitColor;
        playerDisplayNumTwo.innerHTML = this.playerCardCache[0].rank;

        let playerDisplaySuit = document.getElementsByClassName("card-grid-2-2")[0];
        playerDisplaySuit.style.color = this.playerCardCache[0].suitColor;
        playerDisplaySuit.innerHTML = this.playerCardCache[0].suitHTMLEntity;

        let playerDisplayNumThree = document.getElementsByClassName("card-grid-3-1")[0];
        playerDisplayNumThree.style.color = this.playerCardCache[0].suitColor;
        playerDisplayNumThree.innerHTML = `<br />${this.playerCardCache[0].rank}`;

        let playerDisplayNumFour = document.getElementsByClassName("card-grid-3-3")[0];
        playerDisplayNumFour.style.color = this.playerCardCache[0].suitColor;
        playerDisplayNumFour.innerHTML = `<br />${this.playerCardCache[0].rank}`;

        let aiDisplayNumOne = document.getElementsByClassName("card-grid-1-1")[1];
        aiDisplayNumOne.style.color = this.aiCardCache[0].suitColor;
        aiDisplayNumOne.innerHTML = this.aiCardCache[0].rank;

        let aiDisplayNumTwo = document.getElementsByClassName("card-grid-1-3")[1];
        aiDisplayNumTwo.style.color = this.aiCardCache[0].suitColor;
        aiDisplayNumTwo.innerHTML = this.aiCardCache[0].rank;

        let aiDisplaySuit = document.getElementsByClassName("card-grid-2-2")[1];
        aiDisplaySuit.style.color = this.aiCardCache[0].suitColor;
        aiDisplaySuit.innerHTML = this.aiCardCache[0].suitHTMLEntity;

        let aiDisplayNumThree = document.getElementsByClassName("card-grid-3-1")[1];
        aiDisplayNumThree.style.color = this.aiCardCache[0].suitColor;
        aiDisplayNumThree.innerHTML = `<br />${this.aiCardCache[0].rank}`;

        let aiDisplayNumFour = document.getElementsByClassName("card-grid-3-3")[1];
        aiDisplayNumFour.style.color = this.aiCardCache[0].suitColor;
        aiDisplayNumFour.innerHTML = `<br />${this.aiCardCache[0].rank}`;

    }



    autoTurns()
    {
        setInterval( () =>
        {
            this.turn();
        }, 500);
    }
 }