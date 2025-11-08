import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-twenty-five-join',
  templateUrl: './twenty-five-join.component.html',
  styleUrls: ['./twenty-five-join.component.css']
})
export class TwentyFiveJoinComponent {
 username: string = '';

  constructor(private router: Router) {}

  joinGame() {
    if (this.username.trim()) {
      this.router.navigate(['/game', this.username]);
    } else {
      alert("Please enter your name.");
    }
  }
}
