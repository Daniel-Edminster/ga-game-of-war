let deck = [] ;
let playerDeck = [];
let aiDeck = [];

let playerWarCardCache = [];
let AIWarCardCache = [];
let warActive = false;
let recursiveWar = false;

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
                        num: i+2,
                        suitColor: 'black'
                    };

                deck[counter] = card;

            }
            else if(x === 1)
            {
                card = 
                    {
                        suit: "heart",
                        num: i+2,
                        suitColor: 'red'
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
                        num: i+2,
                        suitColor: 'red'
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
                        num: i+2,
                        suitColor: 'black'
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
    // nums = document.getElementsByClassName("card");
    // document.getElementById("playerScore").innerHTML="You: "+playerDeck.length;
    // document.getElementById("aiScore").innerHTML= "AI: "+aiDeck.length;
    // nums[0].innerHTML=playerCard.num;
    // nums[1].innerHTML=aiCard.num;

    renderCardsToBrowser(playerCard, aiCard);
    renderScoresToBrowser();
    return;

}

// function war(playerCard, aiCard)
function war(playerCard = '', aiCard = '')
{
    // playerWarCardCache.push(playerCard);
    // AIWarCardCache.push(aiCard);
    if(!recursiveWar)
    {
            playerWarCardCache.push(playerCard);
            AIWarCardCache.push(aiCard);

    }

    if(playerDeck.length < 4)
    {
        console.log("AI wins! You ran out of cards for war.");
        return;
    }
    else if(aiDeck.length < 4)
    {
        console.log("You win! AI ran out of cards for war.");
        return;
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
            renderCardsToBrowser(playerWarCardCache[playerWarCardCache.length-1],AIWarCardCache[AIWarCardCache.length-1]);

            for(let j=0; j < AIWarCardCache.length; j++)
            {
                console.log(AIWarCardCache[j].suit, AIWarCardCache[j].num);
                playerDeck.push(AIWarCardCache[j]);
                
            }
            for(let x=0; x < playerWarCardCache.length; x++)
            {
                playerDeck.push(playerWarCardCache[x]);
                
            }
            console.log("Your Deck: ", playerDeck.length, "AI Deck: ", aiDeck.length);
            
            recursiveWar = false;
            return;
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
            console.log("Your Deck: ", playerDeck.length, "AI Deck: ", aiDeck.length);
            recursiveWar = false;
            return;
        }
        else {
            // war(playerCard, aiCard);
            recursiveWar = true;
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

window.onload = function()
{
    this.generateDeck();
}

function reset()
{
    playerDeck = [];
    aiDeck = [];
    clearWarCardCaches();
    generateDeck();
}

function renderCardsToBrowser(playerCard, aiCard)
{

    let playerCardConvertedDisplay = '';
    let playerCardConvertedSuit = '';
    if(playerCard.num <= 10)
    {
        playerCardConvertedDisplay = playerCard.num;
    }
    else if(playerCard.num === 11)
    {
        playerCardConvertedDisplay = 'J';
    }
    else if(playerCard.num === 12)
    {
        playerCardConvertedDisplay = 'Q';
    }
    else if(playerCard.num === 13)
    {
        playerCardConvertedDisplay = 'K';
    }
    else if(playerCard.num === 14)
    {
        playerCardConvertedDisplay = 'A';
    }

    if(playerCard.suit === 'spade')
    {
        playerCardConvertedSuit = '&spades;'
    }
    else if(playerCard.suit === 'heart')
    {
        playerCardConvertedSuit = '&hearts;'
    }
    else if(playerCard.suit === 'diamond')
    {
        playerCardConvertedSuit = '&diamondsuit;'
    }
    else if(playerCard.suit === 'club')
    {
        playerCardConvertedSuit = '&clubs;'
    }

    playerDisplayNumOne = document.getElementsByClassName("card-grid-1-1")[0];
    playerDisplayNumOne.style.color = playerCard.suitColor;
    playerDisplayNumOne.innerHTML = playerCardConvertedDisplay;

    playerDisplayNumTwo = document.getElementsByClassName("card-grid-1-3")[0];
    playerDisplayNumTwo.style.color = playerCard.suitColor;
    playerDisplayNumTwo.innerHTML = playerCardConvertedDisplay;

    playerDisplayNumThree = document.getElementsByClassName("card-grid-3-1")[0];
    playerDisplayNumThree.style.color = playerCard.suitColor;
    playerDisplayNumThree.innerHTML = `<br> ${playerCardConvertedDisplay}`;

    playerDisplayNumFour = document.getElementsByClassName("card-grid-3-3")[0];
    playerDisplayNumFour.style.color = playerCard.suitColor;
    playerDisplayNumFour.innerHTML = `<br> ${playerCardConvertedDisplay}`;

    playerDisplaySuit = document.getElementsByClassName("card-grid-2-2")[0];
    playerDisplaySuit.style.color = playerCard.suitColor;
    playerDisplaySuit.innerHTML = playerCardConvertedSuit;
    
    //////////////////////////

    let aiCardConvertedDisplay = '';
    let aiCardConvertedSuit = '';
    if(aiCard.num <= 10)
    {
        aiCardConvertedDisplay = aiCard.num;
    }
    else if(aiCard.num === 11)
    {
        aiCardConvertedDisplay = 'J';
    }
    else if(aiCard.num === 12)
    {
        aiCardConvertedDisplay = 'Q';
    }
    else if(aiCard.num === 13)
    {
        aiCardConvertedDisplay = 'K';
    }
    else if(aiCard.num === 14)
    {
        aiCardConvertedDisplay = 'A';
    }

    if(aiCard.suit === 'spade')
    {
        aiCardConvertedSuit = '&spades;'
    }
    else if(aiCard.suit === 'heart')
    {
        aiCardConvertedSuit = '&hearts;'
    }
    else if(aiCard.suit === 'diamond')
    {
        aiCardConvertedSuit = '&diamondsuit;'
    }
    else if(aiCard.suit === 'club')
    {
        aiCardConvertedSuit = '&clubs;'
    }

    aiDisplayNumOne = document.getElementsByClassName("card-grid-1-1")[1];
    aiDisplayNumOne.style.color = aiCard.suitColor;
    aiDisplayNumOne.innerHTML = aiCardConvertedDisplay;

    aiDisplayNumTwo = document.getElementsByClassName("card-grid-1-3")[1];
    aiDisplayNumTwo.style.color = aiCard.suitColor;
    aiDisplayNumTwo.innerHTML = aiCardConvertedDisplay;

    aiDisplayNumThree = document.getElementsByClassName("card-grid-3-1")[1];
    aiDisplayNumThree.style.color = aiCard.suitColor;
    aiDisplayNumThree.innerHTML = `<br> ${aiCardConvertedDisplay}`;

    aiDisplayNumFour = document.getElementsByClassName("card-grid-3-3")[1];
    aiDisplayNumFour.style.color = aiCard.suitColor;
    aiDisplayNumFour.innerHTML = `<br> ${aiCardConvertedDisplay}`;

    aiDisplaySuit = document.getElementsByClassName("card-grid-2-2")[1];
    aiDisplaySuit.style.color = aiCard.suitColor;
    aiDisplaySuit.innerHTML = aiCardConvertedSuit;

    return '';
}

function renderScoresToBrowser()
{
    playerDeckLength = playerDeck.length;
    aiDeckLength = aiDeck.length;
    document.getElementsByClassName("playerDeckScore")[0].innerHTML = `You: ${playerDeckLength}`;
    document.getElementsByClassName("aiDeckScore")[0].innerHTML = `AI: ${aiDeckLength}`;
    return '';
}