import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: false,
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  selectedCounty: string | null = null;

  counties: string[] = [
    'Sligo',
    'Galway',
    'Roscommon',
    'Leitrim',
    'Mayo',
    'Donegal',
  ]

  onCountyClick(county: string) {
    this.selectedCounty = county;
    console.log('Clicked county:', county);

    // later: send move or action to SignalR server
    // this.signalRService.requestMoveToCounty(county);
  }

  getCountyColor(county: string): string {
    // optional dynamic colors
    const colors: Record<string, string> = {
      Sligo: '#000000ff',
      Galway: '#33cc66',
      Roscommon: '#1844d7ff',
      Leitrim: '#cc33c2ff',
      Mayo: '#cc3333ff',
      Donegal: '#e6e600ff',

    };
    return colors[county] ?? '#ccc';
  }
}
