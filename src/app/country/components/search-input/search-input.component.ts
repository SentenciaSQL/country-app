import {Component, effect, input, output, signal} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styles: ``
})
export class SearchInputComponent {

  placeholder = input<string>('Buscar');
  value = output<string>();
  debounceTime = signal(300);
  inputValues = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const inputValue = this.inputValues();

    const timeout = setTimeout(() => {
      this.value.emit(inputValue);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });


}
