let deck = [] ;
let playerDeck = [];
let aiDeck = [];
let playerCard = {};
let aiCard = {};

let playerWarCardCache = [];
let AIWarCardCache = [];
let warActive = false;
let recursiveWar = false;
let turnNumber = 0;
let parentFunctionName = '';


const generateDeck = () => {

	let counter = 0;

	for(let i=0;i<4;i++)
	{
		for(let j=0;j<13;j++)
		{

			if(i === 0)
            {

                deck[counter] = generateCard("spade", j, "black");

            }
            else if(i === 1)
            {

                deck[counter] = generateCard("heart", j, "red");

            }
            else if(i === 2)
            {

                deck[counter] = generateCard("diamond", j, "red");

            }
            else if(i === 3)
            {

                deck[counter] = generateCard("club", j, "black");

            }     
            else {
                // alert('outta loop');
            }

            counter++;

		}
	}

    shuffle(deck);
    assignDecks();
    console.log("type turn() to begin");

}

const assignDecks = () =>
{
	for(let i=0;i<deck.length;i++)
    {
        i % 2 == 0 ? playerDeck.push(deck[i]) : aiDeck.push(deck[i]);
    }
}

const clearWarCardCaches = () =>
{
    playerWarCardCache = [];
    AIWarCardCache = [];
}

const reset = () =>
{
    playerDeck = [];
    aiDeck = [];
    clearWarCardCaches();
    generateDeck();
}

const turn = () =>
{
	playerCard = playerDeck.shift();
	aiCard = aiDeck.shift();

    console.log("Your Card: ", playerCard.suit, playerCard.num);
    console.log("AI Card: ", aiCard.suit , aiCard.num);

    if(playerCard.num > aiCard.num)
    {

        console.log("You won this round.");
        playerDeck.push(playerCard);
        playerDeck.push(aiCard);
        console.log("Your Deck: ", playerDeck.length, "AI Deck: ", aiDeck.length);
        
        parentFunctionName = 'turn() playerWin';

    }
    else if(playerCard.num < aiCard.num)
    {

    	console.log("You lost this round.");
        aiDeck.push(playerCard);
        aiDeck.push(aiCard);
        console.log("Your Deck: ", playerDeck.length, "AI Deck: ", aiDeck.length);

        parentFunctionName = 'turn() aiWin';

    }
    else {
        console.log("War!");
        war(playerCard, aiCard);
    }
}

const war = (playerCard = '', aiCard = '') =>
{
    checkWinCondition();
    warActive = true;

    if(!recursiveWar)
    {
        playerWarCardCache.push(playerCard);
        AIWarCardCache.push(aiCard);
        playerCard = {};
        aiCard = {};
        console.log("Cards in play added to cache.");
    }

    allocateCache(playerDeck, playerWarCardCache);
    allocateCache(aiDeck, AIWarCardCache);
    console.log("Player wager:", ...playerWarCardCache);
    console.log(playerWarCardCache.length);
    console.log("AI wager: ", ...AIWarCardCache);
    console.log(AIWarCardCache.length);

    if(playerWarCardCache[playerWarCardCache.length-1].num > AIWarCardCache[AIWarCardCache.length-1].num)
    {
        console.log("Your war play: ", playerWarCardCache[playerWarCardCache.length-1]);
        console.log("AI war play: ", AIWarCardCache[AIWarCardCache.length-1]);
        console.log("You won war! --")
        console.log("Retaining cards: ", ...playerWarCardCache);
        console.log(playerWarCardCache.length);
        console.log("Cards won: ", ...AIWarCardCache);
        console.log(AIWarCardCache.length);
        playerDeck.push(...playerWarCardCache, ...AIWarCardCache);
        clearWarCardCaches();
        recursiveWar = false;
        warActive = false;
        console.log("Your Deck: ", playerDeck.length, "AI Deck: ", aiDeck.length);

    }
    else if(playerWarCardCache[playerWarCardCache.length-1].num < AIWarCardCache[AIWarCardCache.length-1].num)
    {
        console.log("Your war play: ", playerWarCardCache[playerWarCardCache.length-1]);
        console.log("AI war play: ", AIWarCardCache[AIWarCardCache.length-1]);
        console.log("You lost war! --")
        console.log("AI Retaining cards: ", ...AIWarCardCache);
        console.log(AIWarCardCache.length);
        console.log("AI Cards won: ", ...playerWarCardCache);
        console.log(playerWarCardCache.length);
        aiDeck.push(...AIWarCardCache, ...playerWarCardCache);
        clearWarCardCaches();
        recursiveWar = false;
        warActive = false;
        console.log("Your Deck: ", playerDeck.length, "AI Deck: ", aiDeck.length);

    }
    else {
        console.log("Your war play: ", playerWarCardCache[playerWarCardCache.length-1]);
        console.log("AI war play: ", AIWarCardCache[AIWarCardCache.length-1]);
        console.log("Recursive War!");
        checkWinCondition();
        recursiveWar = true;
        console.log("Your Deck: ", playerDeck.length, "AI Deck: ", aiDeck.length);
        war();
    }

}

const allocateCache = (deck, cache) => 
{
    for(let i=0;i<4;i++)
    {
        cache.push(deck.shift());
    }
}


const shuffle = array => array.sort(() => Math.random() - 0.5);

const assignWinner = (string, condition) =>
{

    console.log(`${string} wins!`);
    console.log(condition);
    console.log("Resetting game...");
    reset();

}

const checkWinCondition = () =>
{
    if(warActive)
    {
        if(playerDeck.length < 4)
        {
            assignWinner("AI", "You ran out of cards for war.");
        }
        else if(aiDeck.length < 4)
        {
            assignWinner("Player", "AI ran out of cards for war.");
        }
    }
    else {

        if(playerDeck.length === 0)
        {
            assignWinner("AI", "You have no deck left.");
        }
        else if(aiDeck.length === 0)
        {
            assignWinner("Player","AI has no deck left.");
        }
    }
}

const generateCard = (suit, num, color) =>
{
    return { 
        suit: suit,
        num: num+2,
        suitColor: color
    }
} 

window.onload = function()
{
    generateDeck();
}

const recursiveWarTest = () =>
{

    let testPlayerCard =
    {
            suit: "spade",
            num: 14,
            suitColor: "black"
    };

    let testAICard =
    {
            suit: "heart",
            num: 14,
            suitColor: "red"
    };

    let playerTestObj = 
    [

        {
            suit: "spade",
            num: 13,
            suitColor: "black"
        },
        {
            suit: "spade",
            num: 12,
            suitColor: "black"
        },
        {
            suit: "spade",
            num: 11,
            suitColor: "black"
        },
        {
            suit: "spade",
            num: 10,
            suitColor: "black"
        },
        {
            suit: "spade",
            num: 9,
            suitColor: "black"
        },
        {
            suit: "spade",
            num: 8,
            suitColor: "black"
        },
        {
            suit: "spade",
            num: 7,
            suitColor: "black"
        },
        {
            suit: "spade",
            num: 6,
            suitColor: "black"
        },
    ];
    

    let aiTestObj = [

        {
            suit: "heart",
            num: 13,
            suitColor: "red"
        },
        {
            suit: "heart",
            num: 12,
            suitColor: "red"
        },
        {
            suit: "heart",
            num: 11,
            suitColor: "red"
        },
        {
            suit: "heart",
            num: 10,
            suitColor: "red"
        },
        {
            suit: "heart",
            num: 9,
            suitColor: "red"
        },
        {
            suit: "heart",
            num: 8,
            suitColor: "red"
        },
        {
            suit: "heart",
            num: 7,
            suitColor: "red"
        },
        {
            suit: "heart",
            num: 2,
            suitColor: "red"
        },
    ];

    for(let i=0;i<8;i++)
    {
        playerDeck.shift();
        aiDeck.shift();
    }
    // playerDeck = playerDeck.splice(0,8);
    playerDeck.unshift(...playerTestObj);
    // aiDeck = aiDeck.splice(0, 8);
    aiDeck.unshift(...aiTestObj);
    console.log("PlayerDeck: ", playerDeck);
    console.log("aiDeck: ", aiDeck);
    war(testPlayerCard, testAICard);

}
