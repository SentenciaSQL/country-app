import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RESCountry} from '../interfaces/rest-country-response';
import {catchError, delay, map, Observable, of, pipe, throwError} from 'rxjs';
import type {CountryInterface} from '../interfaces/country.interface';
import {CountryMapper} from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  constructor() { }

  searchByCapital(query: string) : Observable<CountryInterface[]> {
    query = query.trim().toLowerCase();
    console.log(`Emitiendo valor ${query}`);
    return of([]);

    return this.http.get<RESCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        catchError(error => {
          console.log('Error fetching countries by capital:', error);

          return throwError(() => new Error(`Error fetching countries by capital: ${error.message}`));
        })
      );
  }

  searchByCountry(query: string) : Observable<CountryInterface[]> {
    query = query.trim().toLowerCase();

    return this.http.get<RESCountry[]>(`${API_URL}/translation/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        delay(2000),
        catchError(error => {
          console.log('Error fetching countries by name:', error);

          return throwError(() => new Error(`Error fetching countries by name: ${error.message}`));
        })
      );
  }

  searchByCountryByAlphaCode(code: string) : Observable<CountryInterface[]> {
    return this.http.get<RESCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        map(countries => countries.at(0) ? [countries[0]] : []),
        catchError(error => {
          console.log('Error fetching countries by code:', error);

          return throwError(() => new Error(`Error fetching countries by code: ${code}`));
        })
      );
  }
}
