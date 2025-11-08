// app.component.ts

import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { SignalRService } from './signalr.service';
import { BehaviorSubject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Question } from './Quiz-Game/question';
import { Player } from './player';
import { PowerUp } from './powerups/powerups';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { UsePowerupPopupComponent } from './powerups/use-powerup-popup/use-powerup-popup.component';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Card, PotCard } from './models/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 

}