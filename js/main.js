

let deck = [] ;
let playerDeck = [];
let aiDeck = [];

function generateDeck()
{
    // let card = [
    //     {
    //         suit: "",
    //         num: 0
    //     }
    // ];

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
                // card.suit = "spade";
                // card.num = i+2;
                deck.push(card);

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
}

function assignDecks()
{
    // playerDeck.push(
    //     deck.slice(0, Math.ceil(deck.length / 2))
    // );

    for(let i=0;i<deck.length;i++)
    {
        i % 2 == 0 ? playerDeck.push(deck[i]) : aiDeck.push(deck[i]);
  
    }
    

    // aiDeck.push(
    //     deck.slice(Math.ceil(deck.length / 2), deck.length)
    // );

    console.log("PlayerDeck: ", playerDeck);
    console.log("aiDeck: ", aiDeck);
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }


function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}