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
                card = 
                    {
                        suit: "spade",
                        num: j+2,
                        suitColor: 'black'
                    };

                deck[counter] = card;

            }
            else if(i === 1)
            {
                card = 
                    {
                        suit: "heart",
                        num: j+2,
                        suitColor: 'red'
                    };

                deck[counter] = card;

            }
            else if(i === 2)
            {
                card = 
                    {
                        suit: "diamond",
                        num: j+2,
                        suitColor: 'red'
                    };

                deck[counter] = card;

            }
            else if(i === 3)
            {

                card = 
                    {
                        suit: "club",
                        num: j+2,
                        suitColor: 'black'
                    };

                deck[counter] = card;

            }     
            else {
                // alert('outta loop');
            }

            counter++;

		}
	}

    shuffle(deck);
    assignDecks();

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
    }
}

const war = (playerCard = '', aiCard = '') =>
{
    checkWinCondition();

    if(!recursiveWar)
    {
        playerWarCardCache.push(playerCard);
        AIWarCardCache.push(aiCard);
    }

    allocateCache(playerDeck, playerWarCardCache);
    allocateCache(aiDeck, AIWarCardCache);

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

window.onload = function()
{
    generateDeck();
}

