import { Player } from "../player";

export class Card {
    number:string;
    suit:string;
    isSelectable:boolean;
    constructor(number: string, suit: string,isSelectable:boolean) {
        this.number = number;
        this.suit = suit;
        this.isSelectable = isSelectable ? isSelectable : true;
      }

}

// export class Deck{
//     cards: Card[];
// }

export class PotCard{
  card:Card;
  player:string;

  constructor(card:Card, player:string) {
    this.card = card;
    this.player = player;
  }
}