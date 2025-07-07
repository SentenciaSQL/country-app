import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';
import {CountryService} from '../../services/country.service';
import {CountryInterface} from '../../interfaces/country.interface';
import {NoFoundComponent} from '../../../shared/components/no-found/no-found.component';
import {CountryInformationComponent} from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [
    NoFoundComponent,
    CountryInformationComponent
  ],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({code: this.countryCode}),
    stream: ({ params }) => {
      return this.countryService.searchByCountryByAlphaCode(params.code)
    }
  })

}
