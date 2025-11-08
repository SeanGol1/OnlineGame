import { Component } from '@angular/core';
import { SignalRService } from 'src/app/signalr.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent {
selectedCountry: string | null = null;

  // countries: string[] = [
  //   'Andorra',
  //   'Galway',
  //   'Roscommon',
  //   'Leitrim',
  //   'Mayo',
  //   'Donegal',
  // ]

  constructor(public signalRService: SignalRService) { }

  onCountryClick(country: string) {
    this.selectedCountry = country;
    console.log('Clicked country:', country);
 try{
      this.signalRService.connection
        .invoke('PlayerGuess', country)
        .catch((error: any) => {
          console.log(` error: ${error}`);
          alert(`${error}`);
        });
      }
      catch(error){
        console.log(` error: ${error}`);
          alert(`${error}`);
      }
    // later: send move or action to SignalR server
    // this.signalRService.requestMoveToCounty(county);
  }

  // getCountryColor(country: string): string {
  //   // optional dynamic colors
  //   const colors: Record<string, string> = {
  //     Sligo: '#000000ff',
  //     Galway: '#33cc66',
  //     Roscommon: '#1844d7ff',
  //     Leitrim: '#cc33c2ff',
  //     Mayo: '#cc3333ff',
  //     Donegal: '#e6e600ff',

  //   };
  //   return colors[country] ?? '#ccc';
  // }
}
