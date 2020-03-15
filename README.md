<!-- <a href="http://fvcproductions.com"><img src="https://avatars1.githubusercontent.com/u/4284691?v=3&s=200" title="FVCproductions" alt="FVCproductions"></a> -->

<!-- [![FVCproductions](https://avatars1.githubusercontent.com/u/4284691?v=3&s=200)](http://fvcproductions.com) -->

<!-- ***INSERT GRAPHIC HERE (include hyperlink in image)*** -->


# Game of War
<hr>

_**War** (also known as **Battle** in the United Kingdom) is a [card game](https://en.wikipedia.org/wiki/Card_game) typically played by two players. It uses a standard playing card deck.<sup>[[2](https://en.wikipedia.org/wiki/War_(card_game)#cite_note-pagat-2)]</sup> Due to its simplicity, it is played most often by children. There are many variations, including the German 32-card variant [Tod und Leben](https://en.wikipedia.org/wiki/Tod_und_Leben) ("Life and Death")_ — [Wikipedia](https://en.wikipedia.org/wiki/War_(card_game))

- This is a JavaScript implmentation of the traditional war game, console first but with a functional (and not-yet-responsive-design front-end).

- Includes a test-case for recursive war.

- Optional automated turns every 500ms.

#### Console commands:

> `war.turn();`
&nbsp;&nbsp;&nbsp;&nbsp; Initiates the game. Draws top card from player and CPU card decks.

> `war.reset();`
&nbsp;&nbsp;&nbsp;&nbsp; Resets the game, randomly assigns 26 cards to player and CPU card decks.

> `war.autoTurns();`
&nbsp;&nbsp;&nbsp;&nbsp; applies `setInterval()` to `turn()`, running every 500ms until page is refreshed.

> `war.testCondition();`
&nbsp;&nbsp;&nbsp;&nbsp; Fixes the player and CPU decks to cause triple-layer war on turn 0.
 

<hr >

```
┌─────────────┐┌─────────────┐┌─────────────┐┌─────────────┐
│ ♠         ♥ ││ ♠         ♥ ││ ♠         ♥ ││ ♠         ♥ │
│             ││             ││             ││             │
│             ││             ││             ││             │
│     WAR     ││     WAR     ││     WAR     ││     WAR     │
│             ││             ││             ││             │
│             ││             ││             ││             │
│ ♦         ♣ ││ ♦         ♣ ││ ♦         ♣ ││ ♦         ♣ │
└─────────────┘└─────────────┘└─────────────┘└─────────────┘
```


