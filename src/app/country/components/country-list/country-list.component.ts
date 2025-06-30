import {Component, input} from '@angular/core';
import {RESCountry} from '../../interfaces/rest-country-response';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
  styles: ``
})
export class CountryListComponent {

  countries = input.required<RESCountry[]>();

}
