import {Component, input} from '@angular/core';
import {CountryInterface} from '../../interfaces/country.interface';
import {DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
  styles: ``
})
export class CountryListComponent {

  countries = input.required<CountryInterface[]>();

  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

}
