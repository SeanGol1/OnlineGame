import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalRService } from 'src/app/signalr.service';
import { CHARACTERS, GuessWhoCharacter } from '../guess-who-character';
import { Player } from 'src/app/player';

@Component({
  selector: 'app-guess-who',
  templateUrl: './guess-who.component.html',
  standalone: false,
  styleUrls: ['./guess-who.component.css']
})
export class GuessWhoComponent{
  serverConnected: boolean;
  game: string;
  host: boolean;
  username: string;
  characters: any;
  selectedCharacter: GuessWhoCharacter;
  players:Array<Player>;
  constructor(private route: ActivatedRoute, private signalRService: SignalRService) {
    this.game = 'guesswho';
    this.host = false;
    this.username = '';
    this.serverConnected = false;
    this.characters = CHARACTERS;
    //this.selectedCharacter = null;
    

    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      if (this.username) {
        this.signalRService.startConnection(this.username);
      }
    });
  }

  ngOnInit(): void {
    this.signalRService.players.subscribe((players: Array<Player>) => {
      this.players = players;
    });

    this.signalRService.guesswhocharacter.subscribe((guesswhocharacter: GuessWhoCharacter) => {
      this.selectedCharacter = guesswhocharacter;
    });

    this.signalRService.serverConnected.subscribe((serverConnected: boolean) => {
      this.serverConnected = serverConnected;
    });
  }

   public joinGame(): void {
    if (this.username != '') {
      this.signalRService.startConnection(this.username);

    }
    else {
      alert("Please enter username.");
    }
  }

  startGame(){
    this.signalRService.connection
        .invoke('StartGuessWho')
        .catch((error: any) => {
          console.log(` error: ${error}`);
          alert(`${error}`);
        });
  }
 

  //Asign random character to the player (making sure its different)

  selectCharacter(){
    //
  }
}
