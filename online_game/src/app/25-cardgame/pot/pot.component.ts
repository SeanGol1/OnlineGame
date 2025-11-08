import { Component, Input, OnInit } from '@angular/core';
import { PotCard } from 'src/app/models/card';
import { SignalRService } from 'src/app/signalr.service';

@Component({
  selector: 'app-pot',
  templateUrl: './pot.component.html',
  styleUrls: ['./pot.component.css']
})
export class PotComponent implements OnInit{
  @Input() pot:PotCard[];
  constructor(private signalRService: SignalRService){

  }


  ngOnInit(): void {

  }
  
}
