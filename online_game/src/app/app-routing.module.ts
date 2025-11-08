import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TwentyFiveComponent } from './25-cardgame/twenty-five/twenty-five.component';
import { TwentyFiveJoinComponent } from './25-cardgame/twenty-five-join/twenty-five-join.component';
import { TwentyFiveRulesComponent } from './25-cardgame/twenty-five-rules/twenty-five-rules.component';
import { QuizGameComponent } from './Quiz-Game/quiz-game/quiz-game.component';
import { GuessWhoComponent } from './GuessWho/guess-who/guess-who.component';
import { MapComponent } from './Risk/map/map.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }, 
{  path: 'tictactoe',  component: GameComponent},
{ path: 'twentyfivejoin', component: TwentyFiveJoinComponent }, 
{ path: 'twentyfive', component: TwentyFiveComponent }, 
{ path: 'twentyfiverules', component: TwentyFiveRulesComponent }, 
{ path: 'quizgame', component: QuizGameComponent }, 
{ path: 'guesswho', component: GuessWhoComponent }, 
{ path: 'risk', component: MapComponent }, 

{ path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
