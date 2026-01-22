import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  standalone: false,
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
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
