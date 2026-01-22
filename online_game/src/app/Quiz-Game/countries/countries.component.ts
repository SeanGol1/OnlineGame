import { Component } from '@angular/core';
import { SignalRService } from 'src/app/signalr.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  standalone: false,
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {
  selectedCountry: string | null = null;


  constructor(public signalRService: SignalRService) { }

  onCountryClick(country: string) {
    this.selectedCountry = country;
    console.log('Clicked country:', country);
    try {
      this.signalRService.connection
        .invoke('PlayerGuess', country)
        .catch((error: any) => {
          console.log(` error: ${error}`);
          alert(`${error}`);
        });
    }
    catch (error) {
      console.log(` error: ${error}`);
      alert(`${error}`);
    }
  }

}
