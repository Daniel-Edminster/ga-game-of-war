// const deck

let spade = [];
let heart = [];
let diamond = [];
let club = [];



function generateDeck()
{
    for(let x=0;x<4;x++)
    {
        for(let i=0;i<13;i++)
        {
            if(x === 0)
            {
                spade.push(i+2);
            }
            else if(x === 1)
            {
                heart.push(i+2);
            }
            else if(x === 2)
            {
                diamond.push(i+2);
            }
            else if(x === 3)
            {
                club.push(i+2);
            }     
        }
    }
    const deck = [spade, heart, diamond, club];

    console.log(deck);
    
}