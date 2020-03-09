let deck = [] ;
let playerDeck = [];
let aiDeck = [];

let playerWarCardCache = [];
let AIWarCardCache = [];
let warActive = false;

function generateDeck()
{


    let counter = 0;

    for(let x=0;x<4;x++)
    {
        for(let i=0;i<13;i++)
        {
            if(x === 0)
            {
                card = 
                    {
                        suit: "spade",
                        num: i+2
                    };

                deck[counter] = card;

            }
            else if(x === 1)
            {
                card = 
                    {
                        suit: "heart",
                        num: i+2
                    };
                // card.suit = "heart";
                // card.num = i+2;
                // deck.push(card);
                deck[counter] = card;

            }
            else if(x === 2)
            {
                card = 
                    {
                        suit: "diamond",
                        num: i+2
                    };
                // card.suit = "diamond";
                // card.num = i+2;
                // deck.push(card);
                deck[counter] = card;

            }
            else if(x === 3)
            {
                // card.suit = "club";
                // card.num = i+2;
                card = 
                    {
                        suit: "club",
                        num: i+2
                    };
                deck[counter] = card;

            }     
            else {
                alert('outta loop');
            }
            

            counter++;

        }

    }
        shuffle(deck);
        assignDecks();
        console.log("Type turn(); to play.")
        // turn();
}

function assignDecks()
{

    //split the shuffled deck in two
    for(let i=0;i<deck.length;i++)
    {
        i % 2 == 0 ? playerDeck.push(deck[i]) : aiDeck.push(deck[i]);
  
    }
    
    // console.log("PlayerDeck: ", playerDeck);
    // console.log("aiDeck: ", aiDeck);
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }


function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}

function turn()
{
    // console.log("aiDeck: ", aiDeck);
    // console.log("playerDeck: ", playerDeck);
    
    let aiCard = aiDeck.shift();
    // aiDeck.unshift(aiCard0);
    let playerCard = playerDeck.shift();
    // playerDeck.unshift(playerCard0)
    // let aiCard = aiDeck.pop();
    // let playerCard = playerDeck.pop(); 

    nums = document.getElementsByClassName("card");
    document.getElementById("playerScore").innerHTML="You: "+playerDeck.length;
    document.getElementById("aiScore").innerHTML= "AI: "+aiDeck.length;
    nums[0].innerHTML=playerCard.num;
    nums[1].innerHTML=aiCard.num;
    

    console.log("Your Card: ", playerCard.suit, playerCard.num);
    console.log("AI Card: ", aiCard.suit , aiCard.num);

    if(playerCard.num > aiCard.num)
    {
        console.log("You won this round.");
        playerDeck.push(playerCard);
        playerDeck.push(aiCard);
        console.log("Your Deck: ", playerDeck.length, "AI Deck: ", aiDeck.length);
    }
    else if(playerCard.num < aiCard.num)
    {
        console.log("You lost this round.");
        aiDeck.push(playerCard);
        aiDeck.push(aiCard);
        console.log("Your Deck: ", playerDeck.length, "AI Deck: ", aiDeck.length);
    }
    else {
        console.log("War!");
        // war(playerCard, aiCard);
        war();
        clearWarCardCaches();
    }

}

// function war(playerCard, aiCard)
function war()
{
    // playerWarCardCache.push(playerCard);
    // AIWarCardCache.push(aiCard);

    if(playerDeck.length < 4)
    {
        console.log("AI wins! You ran out of cards for war.");
    }
    else if(aiDeck.length < 4)
    {
        console.log("You win! AI ran out of cards for war.");
    }
    else 
    {
        
        for (let i = 0;i < 4;i++)
        {
            playerWarCardCache.push(playerDeck.shift());
            AIWarCardCache.push(aiDeck.shift());
        }

        if(playerWarCardCache[(playerWarCardCache.length-1)].num > AIWarCardCache[(AIWarCardCache.length-1)].num)
        {
            console.log("Your play: ", playerWarCardCache[(playerWarCardCache.length-1)].suit, playerWarCardCache[(playerWarCardCache.length-1)].num);
            console.log("AI play: ", AIWarCardCache[(AIWarCardCache.length-1)].suit, AIWarCardCache[(AIWarCardCache.length-1)].num);
            console.log("You won war!");
            console.log("Cards won:");

            for(let j=0; j < AIWarCardCache.length; j++)
            {
                console.log(AIWarCardCache[j].suit, AIWarCardCache[j].num);
                playerDeck.push(AIWarCardCache[j]);
            }
            for(let x=0; x < playerWarCardCache.length; x++)
            {
                playerDeck.push(playerWarCardCache[x]);
            }
            

        }
        else if(playerWarCardCache[(playerWarCardCache.length-1)].num < AIWarCardCache[(AIWarCardCache.length-1)].num)
        {
            console.log("Your play: ", playerWarCardCache[(playerWarCardCache.length-1)].suit, playerWarCardCache[(playerWarCardCache.length-1)].num);
            console.log("AI play: ", AIWarCardCache[(AIWarCardCache.length-1)].suit, AIWarCardCache[(AIWarCardCache.length-1)].num);
            console.log("You lost war!");
            console.log("Cards lost:");
            for(let k=0; k < AIWarCardCache.length; k++)
            {
                console.log(playerWarCardCache[k].suit, playerWarCardCache[k].num);
                aiDeck.push(playerWarCardCache[k]);
            }
            for(let y=0; y < playerWarCardCache.length; y++)
            {
                aiDeck.push(AIWarCardCache[y]);
            }
        }
        else {
            // war(playerCard, aiCard);
            war();
        }

    }
}

function checkWinner()
{
    if(playerDeck.length === 0)
    {
        console.log("AI wins!");
    }
    else if(aiDeck.length === 0)
    {
        console.log("You Win!");
    }
}

function clearWarCardCaches()
{
    playerWarCardCache = [];
    AIWarCardCache = [];
}