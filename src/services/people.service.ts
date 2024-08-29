import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponsePeople } from '../interfaces/people.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private API_URL = 'https://swapi.dev/api/';
  constructor(private http: HttpClient) {

  }

  getPeople(page: number): Observable<ResponsePeople> {
    return this.http.get<ResponsePeople>(`${this.API_URL}/people/?page=${page}`)
      .pipe(
        map((response) => ({
          count: response.count,
          results: response.results,
        }))
      )

  }
}
