import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RESCountry} from '../interfaces/rest-country-response';
import {catchError, delay, map, Observable, of, pipe, tap, throwError} from 'rxjs';
import type {CountryInterface} from '../interfaces/country.interface';
import {CountryMapper} from '../mappers/country.mapper';
import {Region} from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, CountryInterface[]>();
  private queryCacheCountry = new Map<string, CountryInterface[]>();
  private queryCacheRegion = new Map<Region, CountryInterface[]>();

  constructor() { }

  searchByCapital(query: string) : Observable<CountryInterface[]> {
    query = query.trim().toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!);
    }

    return this.http.get<RESCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.log('Error fetching countries by capital:', error);

          return throwError(() => new Error(`Error fetching countries by capital: ${error.message}`));
        })
      );
  }

  searchByCountry(query: string) : Observable<CountryInterface[]> {
    query = query.trim().toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!);
    }

    return this.http.get<RESCountry[]>(`${API_URL}/translation/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheCountry.set(query, countries)),
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

  searchByRegion(region: Region) : Observable<CountryInterface[]> {

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region)!);
    }

    return this.http.get<RESCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap(countries => this.queryCacheRegion.set(region, countries)),
        catchError(error => {
          console.log('Error fetching countries by name:', error);

          return throwError(() => new Error(`Error fetching countries by name: ${error.message}`));
        })
      );
  }
}
