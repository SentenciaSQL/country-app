import {Component, inject, input, signal} from '@angular/core';
import {CountryListComponent} from '../../components/country-list/country-list.component';
import {RESCountry} from '../../interfaces/rest-country-response';
import {Region} from '../../interfaces/region.type';
import {CountryService} from '../../services/country.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [
    CountryListComponent
  ],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region | null>(null);

  countries = input.required<RESCountry[]>();

  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);

      return this.countryService.searchByRegion(params.region);
    }
  })


  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

}
