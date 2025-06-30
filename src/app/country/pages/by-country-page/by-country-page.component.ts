import {Component, input} from '@angular/core';
import {CountryListComponent} from "../../components/country-list/country-list.component";
import {SearchInputComponent} from "../../components/search-input/search-input.component";
import {RESCountry} from '../../interfaces/rest-country-response';

@Component({
  selector: 'app-by-country-page',
    imports: [
        CountryListComponent,
        SearchInputComponent
    ],
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  countries = input.required<RESCountry[]>();

}
