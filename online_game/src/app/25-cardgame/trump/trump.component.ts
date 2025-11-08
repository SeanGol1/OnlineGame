import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-trump',
  templateUrl: './trump.component.html',
  styleUrls: ['./trump.component.css']
})
export class TrumpComponent {
@Input() trumpcard:Card; 
}
