import {CountryInterface} from '../interfaces/country.interface';
import {RESCountry} from '../interfaces/rest-country-response';

export class CountryMapper {
  static mapRestCountryToCountry(country: RESCountry): CountryInterface {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.translations['spa'].common ?? 'No Spanish Translation',
      capital: country.capital.join(', '),
      population: country.population,
      region: country.region,
      subRegion: country.subregion
    };
  }

  static mapRestCountryArrayToCountryArray(countries: RESCountry[]): CountryInterface[] {
    return countries.map(this.mapRestCountryToCountry);
  }
}
