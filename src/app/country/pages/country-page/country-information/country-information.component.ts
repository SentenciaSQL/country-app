import {Component, computed, input} from '@angular/core';
import {CountryInterface} from '../../../interfaces/country.interface';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [
    DecimalPipe
  ],
  templateUrl: './country-information.component.html',
  styles: ``
})
export class CountryInformationComponent {

  country = input.required<CountryInterface>();

  currentYear = computed(() => new Date().getFullYear());

}
