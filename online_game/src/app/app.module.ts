import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SignalRService } from './signalr.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { UsePowerupPopupComponent } from './powerups/use-powerup-popup/use-powerup-popup.component';
import { ScoreboardComponent } from './Quiz-Game/scoreboard/scoreboard.component';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { PlayerCardComponent } from './player-card/player-card.component';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleService } from './ng-idle.service';
import { CardComponent } from './25-cardgame/card/card.component';
import { HandComponent } from './25-cardgame/hand/hand.component';
import { PotComponent } from './25-cardgame/pot/pot.component';
import { CardScoreboardComponent } from './25-cardgame/card-scoreboard/card-scoreboard.component';
import { TrumpComponent } from './25-cardgame/trump/trump.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GameRoomComponent } from './game-room/game-room.component';
import { TwentyFiveComponent } from './25-cardgame/twenty-five/twenty-five.component';
import { TwentyFiveJoinComponent } from './25-cardgame/twenty-five-join/twenty-five-join.component';
import { TwentyFiveRulesComponent } from './25-cardgame/twenty-five-rules/twenty-five-rules.component';
import { QuizGameComponent } from './Quiz-Game/quiz-game/quiz-game.component';
import { GuessWhoComponent } from './GuessWho/guess-who/guess-who.component';
import { CharactersComponent } from './GuessWho/characters/characters.component';
import { CharacterCardComponent } from './GuessWho/character-card/character-card.component';
import { MapComponent } from './Risk/map/map.component';
import { CountriesComponent } from './Quiz-Game/countries/countries.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    UsePowerupPopupComponent,
    ScoreboardComponent,
    PlayerCardComponent,
    CardComponent,
    HandComponent,
    PotComponent,
    CardScoreboardComponent,
    TrumpComponent,
    LandingPageComponent,
    GameRoomComponent,
    TwentyFiveComponent,
    TwentyFiveJoinComponent,
    TwentyFiveRulesComponent,
    QuizGameComponent,
    GuessWhoComponent,
    CharactersComponent,
    CharacterCardComponent,
    MapComponent,
    CountriesComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    MatProgressBarModule, 
    FormsModule,    
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatButtonModule,  
    MatDialogModule, 
    NgbModule,  
    ReactiveFormsModule,
    NgbProgressbarModule

    
  ],
  providers: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    SignalRService,
    NgIdleService
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (signalRService: SignalRService) => () => signalRService.startConnection(),
    //   deps: [SignalRService],
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
