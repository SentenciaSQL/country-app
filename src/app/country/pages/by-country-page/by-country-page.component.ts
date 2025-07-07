import {Component, inject, input, resource, signal} from '@angular/core';
import {CountryListComponent} from "../../components/country-list/country-list.component";
import {SearchInputComponent} from "../../components/search-input/search-input.component";
import {RESCountry} from '../../interfaces/rest-country-response';
import {CountryService} from '../../services/country.service';
import {firstValueFrom, of} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

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

  countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCountry(params.query);
    }
  })

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async({ params }) => {
  //     if (!params.query) return [];
  //
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     )
  //   }
  // })

  //countries = input.required<RESCountry[]>();

}
