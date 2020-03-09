// const deck

let spade = [];
let heart = [];
let diamond = [];
let club = [];

// let card = [
//     {
//     suit: "",
//     num: ""
//     },
// ];

// let deck = array(52);
let deck = [];

function generateDeck()
{
    let card = [
        {
            suit: "",
            num: 0
        }
    ];

    let counter = 0;

    for(let x=0;x<4;x++)
    {
        for(let i=0;i<13;i++)
        {
            if(x === 0)
            {
                card.suit = "spade";
                card.num = i+2;


            }
            else if(x === 1)
            {
                card.suit = "heart";
                card.num = i+2;


            }
            else if(x === 2)
            {
                card.suit = "diamond";
                card.num = i+2;


            }
            else if(x === 3)
            {
                card.suit = "club";
                card.num = i+2;
                

            }     
            else {
                alert('outta loop');
            }

            deck[counter] = [
                {
                    suit: card.suit, 
                    num: card.num
                } 
            
        ];
            counter++;
           

      

        }

    }

        // deck.shuffle;

        console.log(counter);
        console.log(deck);

    // let deck = [
    //     {
    //         suit: "Spade",
    //         cards: spade
    //     },
    //     {
    //         suit: "Heart",
    //         cards: heart
    //     },
    //     {
    //         suit: "Diamond",
    //         cards: diamond
    //     },
    //     {
    //         suit: "Club",
    //         cards: club
    //     }
    // ];


    // console.log(deck);

    // alert(deck);
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }


    // console.log(deck);
    
}