import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent {
@Input() playerHand: Card[];
selectedCard: Card | null = null;

  onCardSelected(card: Card) {
    // toggle selection
    this.selectedCard = this.selectedCard === card ? null : card;
  }
}
