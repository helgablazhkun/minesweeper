import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Settings, InitResponse, Cell, RevealResponse } from './game-field.component';

@Injectable({
  providedIn: 'root'
})
export class MinesweeperApiService {

  constructor(private http: HttpClient) {
  }

  async init(): Promise<InitResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return await this.http.post<InitResponse>('http://fathomless-peak-55967.herokuapp.com/init', null, httpOptions).toPromise();
  }

  async reveal(cell: Cell): Promise<RevealResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return await this.http.post<RevealResponse>('http://fathomless-peak-55967.herokuapp.com/reveal', cell, httpOptions).toPromise();
  }
}

