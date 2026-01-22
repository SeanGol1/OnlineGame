import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { SignalRService } from 'src/app/signalr.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: false,
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() seletable: boolean;
  cardpath: string;
  isSelected = false;
  @Input() selected: boolean = false;
  @Output() cardSelected = new EventEmitter<Card>();

  constructor(public signalRService: SignalRService) {
   // this.cardpath = this.card.number.toUpperCase() + this.card.suit[0].toUpperCase();
  }

  ngOnInit(): void {
    this.cardpath = this.card.number.toUpperCase() + this.card.suit[0].toUpperCase();
  }



  selectcard() {
    if (!this.seletable) return;

    this.cardSelected.emit(this.card);
    var pt; 
    var user;
    var stealchance;
    this.signalRService.playerTurn.subscribe(playerTurn=>{
      pt=playerTurn;
      this.signalRService.currentUsername.subscribe(u=>{
        user=u;
      }); 
    });

    // this.signalRService.stealChance.subscribe(sc=>{
    //   stealchance = sc;
    // });
    if (this.seletable) {
      this.isSelected = !this.isSelected;
    }

    stealchance = this.signalRService.stealChance.getValue();

    if(stealchance){
      this.signalRService.dumpCard(this.card); 
    }
    else if(pt.username == user ){
      this.card.number = this.card.number.toLowerCase();
      this.signalRService.connection
        .invoke('SelectCard', this.card.number, this.card.suit)
        .catch((error: any) => {
          console.log(` error: ${error}`);
          alert(`${error}`);
        });
    }
    else{
      alert("Not your turn yet!");
    }


  }


}
