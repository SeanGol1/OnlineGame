import { AfterViewInit, Component, Input,SimpleChanges } from '@angular/core';
import { Player } from 'src/app/player';
import { SignalRService } from 'src/app/signalr.service';

@Component({
  selector: 'app-card-scoreboard',
  templateUrl: './card-scoreboard.component.html',
  standalone: false,
  styleUrls: ['./card-scoreboard.component.css']
})
export class CardScoreboardComponent implements AfterViewInit{
  @Input() players: Array<Player>;
  dealer: string;
  dealerChanged = false;

  // Map to track which player's score changed
  scoreChanged: { [username: string]: boolean } = {};
  previousScores: Map<string, number> = new Map();

  constructor(private signalRService:SignalRService){

  }
  
  ngAfterViewInit(): void {
 this.signalRService.dealer.subscribe((deal: string) => {
    if (this.dealer && this.dealer !== deal) {
      this.dealerChanged = true;

      setTimeout(() => {
        this.dealerChanged = false;
      }, 1000); // Match animation duration
    }

    this.dealer = deal;
  });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['players'] && this.players) {
      this.players.forEach(player => {
        const prevScore = this.previousScores.get(player.username);

        if (prevScore !== undefined && prevScore !== Number(player.score)) {
          this.scoreChanged[player.username] = true;

          setTimeout(() => {
            this.scoreChanged[player.username] = false;
          }, 1000); // animation duration

          this.previousScores.set(player.username, Number(player.score));
        } else if (prevScore === undefined) {
          this.previousScores.set(player.username, Number(player.score));
        }
      });
    }
  }
}
