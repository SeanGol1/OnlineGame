import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Player } from 'src/app/player';
import { PowerUp } from 'src/app/powerups/powerups';
import { SignalRService } from 'src/app/signalr.service';

@Component({
  selector: 'app-use-powerup-popup',
  templateUrl: './use-powerup-popup.component.html',
  styleUrls: ['./use-powerup-popup.component.css'],
})
export class UsePowerupPopupComponent implements OnInit {
  powerup:PowerUp;
  players: Array<Player>;
  @ViewChild('matSelectPowerUp') matSelectPowerup: MatSelect;
  @ViewChild('matSelectPlayer') matSelectPlayer: MatSelect;

  constructor( private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.players.subscribe((players: Array<Player>) => {
      this.players = players;
    });
  }

  onNoClick(): void {
  }

  public usePowerUp() {
    if (this.matSelectPowerup.value == null || this.matSelectPlayer.value == null) {
      alert("Make sure you fill out the values provided.");
    }
    else {
      this.signalRService.connection
        .invoke('UsePowerUp', this.matSelectPowerup.value, this.matSelectPlayer.value)
        .then(() => {
          //alert('Power Up Used.')
        })
        .catch((error: any) => {
          console.log(` error: ${error}`);
          alert(`${error}`);
        });

    }
  }
}
