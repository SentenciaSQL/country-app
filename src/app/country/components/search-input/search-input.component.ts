import {Component, input, output} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styles: ``
})
export class SearchInputComponent {

  placeholder = input<string>('Buscar');
  value = output<string>();

}
