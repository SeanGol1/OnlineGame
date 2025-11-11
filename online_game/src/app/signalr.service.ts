// app-signalr.service.ts

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AppComponent } from './app.component';
import { Question } from './Quiz-Game/question';
import { Player } from './player';
import { PowerUp } from './powerups/powerups';
import { Card, PotCard } from './models/card';
import { GuessWhoCharacter } from './GuessWho/guess-who-character';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  connection: any;
  serverConnected: BehaviorSubject<boolean>;
  toggleStopwatch: BehaviorSubject<boolean>;
  players: BehaviorSubject<Array<Player>>;
  currentPlayer: BehaviorSubject<Player>;
  currentUsername: BehaviorSubject<string>;
  answers: BehaviorSubject<Array<string>>;
  question: BehaviorSubject<Question>;
  message: BehaviorSubject<string>;
  round: BehaviorSubject<string>;
  currentRound: BehaviorSubject<string>;
  isPauseAdmin: BehaviorSubject<boolean>;

  //scoreboard: BehaviorSubject<boolean>;
  private scoreboard = new BehaviorSubject<Boolean | false>(false);
  scoreboard$ = this.scoreboard.asObservable();
  powerUps: BehaviorSubject<Array<PowerUp>>;
  seconds: BehaviorSubject<number>;

  guesswhocharacter: BehaviorSubject<GuessWhoCharacter>;

  trumpcard: BehaviorSubject<Card>;
  private _trumpcard = [];
  playerHand: BehaviorSubject<Card[]>;
  playerHandFull: BehaviorSubject<Card[]>;
  pot: BehaviorSubject<PotCard[]>;
  dealer: BehaviorSubject<string>;
  private ph = [];
  private _pot = [];
  selectedcard: BehaviorSubject<Card>;
  playerTurn: BehaviorSubject<Player>;

  hasAceHearts: BehaviorSubject<Boolean>;
  stealChance: BehaviorSubject<Boolean>;
  cardBurnt: BehaviorSubject<Boolean>;


  hubUrl = environment.hubUrl;


  constructor() {

    this.serverConnected = new BehaviorSubject<boolean>(false);
    // this.scoreboard = new BehaviorSubject<boolean>(false);
    this.toggleStopwatch = new BehaviorSubject<boolean>(false);
    this.question = new BehaviorSubject<Question>(null);
    this.answers = new BehaviorSubject<Array<string>>([]);
    this.message = new BehaviorSubject<string>("");
    this.round = new BehaviorSubject<string>("");
    this.currentRound = new BehaviorSubject<string>("");
    this.players = new BehaviorSubject<Array<Player>>([]);
    this.powerUps = new BehaviorSubject<Array<PowerUp>>([]);
    this.currentPlayer = new BehaviorSubject<Player>(null);
    this.currentUsername = new BehaviorSubject<string>(null);
    this.isPauseAdmin = new BehaviorSubject<boolean>(false);


    this.seconds = new BehaviorSubject<number>(15);


    this.trumpcard = new BehaviorSubject<Card>(null);
    this.playerHand = new BehaviorSubject<Card[]>(null);
    this.playerHandFull = new BehaviorSubject<Card[]>(null);
    this.pot = new BehaviorSubject<PotCard[]>(null);

    this.guesswhocharacter = new BehaviorSubject<GuessWhoCharacter>(null);


    this.dealer = new BehaviorSubject<string>(null);
    this.selectedcard = new BehaviorSubject<Card>(null);
    this.playerTurn = new BehaviorSubject<Player>(null);

    this.hasAceHearts = new BehaviorSubject<boolean>(false);
    this.stealChance = new BehaviorSubject<boolean>(false);
    this.cardBurnt = new BehaviorSubject<boolean>(false);

  }

  startConnection = (username: string) => {

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      //.withAutomaticReconnect()
      .build();


    this.connection
      .start()
      .then(() => {
        this.currentUsername.next(username);
        this.connection
          .invoke('OnConnected', username)
          .catch((error: any) => {
            console.log(` error: ${error}`);
            //alert(`${error}`);
          });
        this.serverConnected.next(true);
        //resolve();
      })
      .catch((error: any) => {
        console.log(`SignalR connection error: ${error}`);
        this.serverConnected.next(false);
        //alert(`${error}`)
        //reject();
      });

    this.setSignalrClientMethods();
  };

  resetHub() {
    this.connection.close();
  }


  private setSignalrClientMethods(): void {

    /* Guess Who */
    this.connection.on('ChosenCharacter', (character: GuessWhoCharacter) => {
      console.log("Character Received");
      this.guesswhocharacter.next(character);
    });

    /* Question */
    this.connection.on('DisplayQuestion', (question: Question) => {
      console.log("Question Received");
      this.question.next(question);
    });

    this.connection.on('UpdateScoreboard', () => {
      console.log("Scoreboard Received");
      this.scoreboard.next(!this.scoreboard);
    });

    this.connection.on('ToggleScoreboard', () => {
      console.log("Scoreboard Received");
      const current = this.scoreboard.getValue();
      this.scoreboard.next(!current);
      // this.scoreboard.next(!this.scoreboard);
      // if(!current){
      //   document.getElementsByClassName('scoreboard-div')[0].classList.remove('hidden');
      // }
      // else{
      //   document.getElementsByClassName('scoreboard-div')[0].classList.add('hidden');
      // }
      
    });

    this.connection.on('ToggleStopwatch', () => {
      //console.log("Stopwatch Received");
      this.toggleStopwatch.next(!this.toggleStopwatch);
    });

    this.connection.on('DisplayStopwatch', (seconds: number) => {
      console.log("Stopwatch Received");
      this.seconds.next(seconds);
    });

    this.connection.on('DisplayPowerUps', (powerUps: Array<PowerUp>) => {
      console.log("PowerUps Received");
      this.powerUps.next(powerUps);
    });

    this.connection.on('DisplayPlayers', (players: Array<Player>) => {
      console.log("players Received");
      this.players.next(players);
    });

    this.connection.on('DisplayMessage', (message: string) => {
      console.log("Message Received");
      this.message.next(message);
    });

    this.connection.on('DisplayNewRound', (round: string) => {
      console.log("Round Received");
      this.round.next(round);
      if(round != "")
        this.currentRound.next(round);
    });

    this.connection.on('DisplayAlert', (message: string) => {
      console.log("Alert Received");
      alert(message);
    });

    this.connection.on('isPauseAdmin', (isPauseAdmin: boolean) => {
      console.log("Alert Received");
      this.isPauseAdmin.next(isPauseAdmin);
    });

    this.connection.on('DisplayCorrectAnswer', (letter: string) => {
      console.log("Alert Received");
      document.getElementsByClassName(letter)[0].classList.add('correct-answer');
      document.getElementsByClassName(letter)[1].classList.add('correct-answer');
    });

    this.connection.on('RemoveAnswers', (letters: Array<string>) => {
      console.log("Alert Received");
      letters.forEach(l => {
        document.getElementsByClassName(l)[0].classList.add('incorrect-answer');
      });
    });

    this.connection.on('ResetScreen', () => {
      console.log("Reset Received");

      var classlist = ['correct-answer', 'incorrect-answer', 'selected-answer'];

      classlist.forEach(c => {
        const elems = document.querySelectorAll('.' + c);
        elems.forEach(el => {
          el.classList.remove(c);
        });
      });
    });

    this.connection.on('DisplayAnswers', (answers: Array<string>) => {
      console.log("Answer Received");
      this.answers.next(answers);
    });

    this.connection.on('RefreshScreen', () => {
      window.location.reload();
    });

    //
    // 25 card game.
    //

    this.connection.on('GetTrumpCard', (value: any, suit: any) => {
      console.log("Trump Card Received " + value + ' of ' + suit);
      var card = new Card(value, suit, false);
      this.trumpcard.next(null);
      this.trumpcard.next(card);
      if (card)
        this.validateAceDealer(card);
    });

    this.connection.on('ShowPlayerHand', (value: any, suit: any) => {
      //console.log("Hand Received ");
      var card: Card = new Card(value, suit, true);
      this.ph.push(card);
      this.playerHand.next(this.ph);
      this.playerHandFull.next(this.ph);
      if (card)
        this.validateAce(card);
    });

    this.connection.on('cleardeck', () => {
      this._pot = [];
      this.pot.next([]);

      this.ph.forEach((c: Card) => {
        c.isSelectable = true;
      });
    });

    this.connection.on('clearall', () => {
      this.ph = [];
      this._pot = [];
      this.cardBurnt.next(null);
      this.hasAceHearts.next(null);
      this.stealChance.next(null);
      this.trumpcard.next(null);
      this.playerHand.next([]);
      this.playerHandFull.next([]);
      this.pot.next([]);
    });

    this.connection.on('broadcastdealer', (dealer: string) => {
      console.log("New Dealer");
      this.dealer.next(dealer);
    });

    this.connection.on('DisplayPlayerTurn', (player: Player) => {
      console.log("New turn");
      this.playerTurn.next(player);
    });

    this.connection.on('AddPotCard', (value: any, suit: any, username: any) => {
      var pc: PotCard = new PotCard(new Card(value, suit, false), username);

      var u = this.currentUsername.getValue();
      if (username == u) {
        const index = this.ph.findIndex(x => x.number == pc.card.number && x.suit == pc.card.suit);
        if (index > -1) {
          this.ph.splice(index, 1);
        }
        this.playerHand.next(this.ph);
      }

      this._pot.push(pc);
      this.pot.next(this._pot);

      if (this._pot) {
        if (!this.stealChance.getValue()) {
          this.validateCards(this._pot);
        }

      }
    });

    this.connection.on('DisplayHandWinner', (username: any) => {
      document.getElementsByClassName(username)[0].innerHTML = "Hand Winner!";
    });

    this.connection.on('DisplayRoundWinner', (username: any) => {
      document.getElementsByClassName(username)[0].innerHTML = "Round Winner!";
    });



    this.connection.onclose(async () => {

      this.connection
        .invoke('OnDisconnect')
        .catch((error: any) => {
          console.log(` error: ${error}`);
          //alert('error!, see console for details.');
          //alert(`${error}`);
        });
      //alert("Connection closed");
      this.serverConnected.next(false);
    });
    //   this.progressPercentage.next(percentage);
    // });

    // this.connection.on('DisplayProgressMessage', (message: string) => {
    //   this.progressMessage.next(message);
    // });
  }

  public getCurrentPlayer() {

  }

  public validateAce(card: Card) {

    //Check if A Hearts
    if (card.number.toUpperCase() == "A" && card.suit.toUpperCase() == "HEARTS") {
      this.hasAceHearts.next(true);
    }

    var trump = this.trumpcard.getValue();

    //Check if A in hand. Can steal if so. 
    if (card.number.toUpperCase() == "A") {
      if (trump) {
        if (card.suit == trump.suit) {
          this.stealChance.next(true);
          alert("Steal Time Babay - select a card to dump");
        }
      }
    }

  }

  public validateAceDealer(card: Card) {
    //if Trump card is Ace and player is dealer you can steal. 
    // this.dealer.subscribe(dealer => {
    //   this.currentPlayer.subscribe(user => {

    //   });
    // });


    var user = this.currentUsername.getValue();
    var dealer = this.dealer.getValue();
    if (user) {
      if (dealer == user && card.number.toUpperCase() == "A") {
        this.stealChance.next(true);
        alert("Steal Time Babay - select a card to dump");
      }
    }
  }

  public validateCards(pot: PotCard[]) {
    var trumpsOnly = false;
    var raised: Card = pot[0].card;
    var trumpcard: Card = null;

    trumpcard = this.trumpcard.getValue();

    //if A HEARTs set trumps only true. 
    if (trumpcard.number.toUpperCase() == "A" && trumpcard.suit.toUpperCase() == "HEARTS") {
      trumpsOnly = true;
    }
    // if raised card is trumps. 
    else if (raised.suit == trumpcard.suit) {
      trumpsOnly = true;
    }



    //if trump is raised.
    if (trumpsOnly) {
      //if you have a trump in your hand.
      var trumphand = this.ph.find(e => e.suit === trumpcard.suit);
      //if you have ace card in your hand.
      var acehand = this.ph.find(c => c.number.toUpperCase() === "A" && c.suit.toUpperCase() === "HEARTS");
      if (trumphand || acehand) {


        // If raised card is 5 trump
        if (raised.number == "5") {
          //All trump cards + AH are selectable
          this.ph.forEach((c: Card) => {
            if (c.number.toUpperCase() == "A" && c.suit.toUpperCase() == "HEARTS")
              c.isSelectable = true;
            else if (c.suit == raised.suit)
              c.isSelectable = true;
            else
              c.isSelectable = false;
          });
        }


        // If J Trumps Raised.
        else if (raised.number.toUpperCase() == "J") {
          //if 5 is only trump card, then all cards are selectable. 
          var trumphandn5 = this.ph.find(e => e.suit === trumpcard.suit && e.number.toUpperCase() != "5");
          if (!trumphandn5) {
            //All Cards Selectable
          }
          else {
            //All trump cards + AH are selectable
            this.ph.forEach((c: Card) => {
              if (c.number.toUpperCase() == "A" && c.suit.toUpperCase() == "HEARTS")
                c.isSelectable = true;
              else if (c.suit == raised.suit)
                c.isSelectable = true;
              else
                c.isSelectable = false;
            });
          }
        }

        //IF A Hearts Raised.
        else if (raised.number.toUpperCase() == "A" && raised.suit.toUpperCase() == "HEARTS") {
          //if 5 and/or J is the only 
          var trumphandn5nj = this.ph.find(e => e.suit === trumpcard.suit && e.number.toUpperCase() != "5" && e.number.toUpperCase() != "J");
          if (!trumphandn5nj) {
            //All Cards Selectable
          }
          else {
            //All trump cards are selectable
            this.ph.forEach((c: Card) => {
              if (c.number.toUpperCase() == "A" && c.suit.toUpperCase() == "HEARTS")
                c.isSelectable = true;
              else if (c.suit == raised.suit)
                c.isSelectable = true;
              else
                c.isSelectable = false;
            });
          }
        }

        //if regular trump card
        else {
          //if 5 J AH only
          // trump card thats not 5 or J . 
          var smallTrump = this.ph.find(e => ( e.suit === trumpcard.suit && e.number.toUpperCase() != "5" && e.number.toUpperCase() != "J")  && (e.suit.toUpperCase() != "HEARTS" && e.number.toUpperCase()!="A"));
          if (smallTrump) {
            //All trump cards are selectable
            this.ph.forEach((c: Card) => {
              if (c.number.toUpperCase() == "A" && c.suit.toUpperCase() == "HEARTS")
                c.isSelectable = true;
              else if (c.suit == raised.suit)
                c.isSelectable = true;
              else
                c.isSelectable = false;
            });
          }
          else {
            // All cards selectable.
            var test = 0;
          }




        }




        // var trumphandn5 = this._pot.find(e => e.suit == trumpcard.suit && e.number.toUpperCase() != "5");
        // this.ph.forEach((c: Card) => {
        //   if (this.getScore(raised) < 0) {

        //   }



        //   if (c.suit == trumpcard.suit && c.number.toUpperCase() == "J") {

        //   }

        // });
      }
    }

    // this.ph.forEach((c: Card) => {
    //   if (c.number.toUpperCase() == "A" && c.suit == trumpcard.suit) {
    //     alert("Steal time");
    //   }

    //   if (trumpsOnly && c.suit != trumpcard.suit) {
    //     c.isSelectable = false;
    //   }
    //   else{
    //     c.isSelectable = true;
    //   }

    // });

    this.playerHand.next(this.ph);
  }

  getScore(card: Card): number {
    if (card.number.toUpperCase() == "A" && card.suit.toUpperCase() == "HEARTS") {
      return 2;
    }

    switch (card.number.toUpperCase()) {
      case "5": return 0;
      case "J": return 1;
      default: return 10;
    }

  }

  public dumpCard(card: Card) {
    const index = this.ph.findIndex(x => x.number == card.number && x.suit == card.suit);
    if (index > -1) {
      this.ph.splice(index, 1);
    }
    this.playerHand.next(this.ph);

    this.stealChance.next(false);

    var c = this.trumpcard.getValue();
    this.ph.push(c);
    this.playerHand.next(this.ph);

    this.validateCards(this._pot);

  }

}