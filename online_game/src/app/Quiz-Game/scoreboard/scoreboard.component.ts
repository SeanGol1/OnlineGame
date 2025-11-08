import { Component, Input } from '@angular/core';
import { Player } from '../../player';
import { SignalRService } from '../../signalr.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent {
  @Input() players: Array<Player>;




}
