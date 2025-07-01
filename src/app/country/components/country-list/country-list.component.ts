import {Component, input} from '@angular/core';
import {CountryInterface} from '../../interfaces/country.interface';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.component.html',
  styles: ``
})
export class CountryListComponent {

  countries = input.required<CountryInterface[]>();

}
