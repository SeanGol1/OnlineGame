import { Component, inject, ViewChild } from '@angular/core';
import { Player } from '../../player';
import { PowerUp } from '../../powerups/powerups';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSelect } from '@angular/material/select';
import { Card, PotCard } from '../../models/card';
import { SignalRService } from '../../signalr.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../Quiz-Game/question';

@Component({
  selector: 'app-twenty-five',
  templateUrl: './twenty-five.component.html',
  styleUrls: ['./twenty-five.component.css']
})
export class TwentyFiveComponent {
 game?: string;
  username?: string;
  host?: boolean;
  answers?: Array<string>;
  players?: Array<Player>;
  serverConnected: boolean;
  message?: string;
  currentPlayer: Player;
  powerup: any;
  powerupPlayer: any;
  scoreboard: boolean;
  toggleStopwatch: boolean;
  seconds: number;
  progBarColor: string;
  private modalService = inject(NgbModal);
  closeResult = '';
  @ViewChild('matSelectPowerUp') matSelectPowerup: MatSelect;
  @ViewChild('matSelectPlayer') matSelectPlayer: MatSelect;


  trumpcard: Card;
  trumpcardpath: string;
  playerHand: Card[];
  dealer: string;
  selectedCard: Card;
  playerTurn: Player;
  pot: PotCard[];

  constructor(private route: ActivatedRoute,private signalRService: SignalRService, public dialog: MatDialog) {
    this.game = '25';

    this.host = false;
    this.username = '';
    this.serverConnected = false;
    this.message = '';
    this.toggleStopwatch = false;
    this.seconds = 100;
    this.progBarColor = "success";
    this.trumpcard = null;
    this.playerHand = [];
    this.dealer = '';
    this.selectedCard = null;
    this.playerTurn = null;
    this.pot = [];
    // this.signalRService.trumpcard.subscribe((trumpcard: Card) => {
    //   this.trumpcard = trumpcard;
    // });
       this.route.paramMap.subscribe(params => {
    this.username = params.get('username');
    if (this.username) {
      this.signalRService.startConnection(this.username);
    }
  });

  }


  ngOnInit(): void {


    this.signalRService.message.subscribe((message: string) => {
      this.message = message;
    });


    this.signalRService.players.subscribe((players: Array<Player>) => {
      this.players = players;
    });

    // this.signalRService.answers.subscribe((answers: Array<string>) => {
    //   this.answers = answers;
    // });

    this.signalRService.serverConnected.subscribe((serverConnected: boolean) => {
      this.serverConnected = serverConnected;
    });

    // this.signalRService.toggleStopwatch.subscribe((toggleStopwatch: boolean) => {
    //   this.toggleStopwatch = toggleStopwatch;
    // });

    this.signalRService.scoreboard.subscribe((scoreboard: boolean) => {
      this.scoreboard = scoreboard;
    });

    this.signalRService.trumpcard.subscribe((trumpcard: Card) => {
      if (trumpcard) {
        this.trumpcard = null;
        this.trumpcardpath = trumpcard.number.toUpperCase() + trumpcard.suit[0].toUpperCase();
        this.trumpcard = trumpcard;
      }
    });

    this.signalRService.playerHand.subscribe((playerHand: Card[]) => {
      this.playerHand = [];
      this.playerHand = playerHand;
    });

    this.signalRService.dealer.subscribe((dealer: string) => {
      this.dealer = null;
      this.dealer = dealer;
    });

    this.signalRService.playerTurn.subscribe((player: Player) => {
      this.playerTurn = null;
      this.playerTurn = player;
    });

    this.signalRService.pot.subscribe((pot: PotCard[]) => {
      this.pot = [];
      this.pot = pot;
    });

  }

  // resetHub() {

  // }

  public joinGame(): void {
    if (this.username != '') {
      this.signalRService.startConnection(this.username);

      // this.signalRService.connection
      //   .invoke('OnConnected', this.username)
      //   .then(() => {
      //     this.players.forEach(p => {
      //       if (p.connectionIds.find(this.signalRService.connection.connectionId)) {
      //         this.currentPlayer = p;
      //       }
      //     })
      //   })
      //   .catch((error: any) => {
      //     console.log(` error: ${error}`);
      //     alert(`${error}`);
      //   });
    }
    else {
      alert("Please enter username.");
    }
  }


  /* 25 Card Game */

  public start25() {
    this.signalRService.connection
      .invoke('Start25')
      .catch((error: any) => {
        console.log(` error: ${error}`);
        alert(`${error}`);
      });
  }

  public dealCards() {
    this.signalRService.connection
      .invoke('DealCards')
      .catch((error: any) => {
        console.log(` error: ${error}`);
        alert(`${error}`);
      });
  }

  // public submitCard(){
  //   this.signalRService.connection
  //     .invoke('SelectCard',this.selectedCard)
  //     .catch((error: any) => {
  //       console.log(` error: ${error}`);
  //       alert(`${error}`);
  //     });
  // }

  public selectCard(card: Card) {
    this.selectedCard = card;
  }

  public finishTrick() {
    this.signalRService.connection
      .invoke('FinishRound')
      .catch((error: any) => {
        console.log(` error: ${error}`);
        alert(`${error}`);
      });
  }
}
