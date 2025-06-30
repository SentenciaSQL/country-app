import {Component, input} from '@angular/core';
import {CountryListComponent} from '../../components/country-list/country-list.component';
import {RESCountry} from '../../interfaces/rest-country-response';

@Component({
  selector: 'app-by-region-page',
  imports: [
    CountryListComponent
  ],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  countries = input.required<RESCountry[]>();

}
