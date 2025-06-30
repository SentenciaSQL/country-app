import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RESCountry} from '../interfaces/rest-country-response';
import {Observable} from 'rxjs';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  constructor() { }

  searchByCapital(query: string) : Observable<RESCountry[]> {
    query = query.trim().toLowerCase();

    return this.http.get<RESCountry[]>(`${API_URL}/capital/${query}`);
  }
}
