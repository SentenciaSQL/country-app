import {Component, effect, input, linkedSignal, output, signal} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styles: ``
})
export class SearchInputComponent {

  placeholder = input<string>('Buscar');
  value = output<string>();
  debounceTime = signal(1000);
  initialValue = input<string>('');

  inputValues = linkedSignal<string>(() => this.initialValue() ?? '');

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
