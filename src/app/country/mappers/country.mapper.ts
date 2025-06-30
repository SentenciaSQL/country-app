import {CountryInterface} from '../interfaces/country.interface';

export class CountryMapper {
  static mapCountryResponseToInterface(country: any): CountryInterface {
    return {
      cca2: country.cca2,
      flag: country.flags.png,
      flagSvg: country.flags.svg,
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'No capital',
      population: country.population
    };
  }

  static mapCountriesResponseToInterface(countries: any[]): CountryInterface[] {
    return countries.map(this.mapCountryResponseToInterface);
  }
}
