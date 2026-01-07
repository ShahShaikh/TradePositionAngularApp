import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Positions } from '../models/position.model';
export type BuySell = 'BUY' | 'SELL';
export type ActionType = 'INSERT' | 'UPDATE' | 'CANCEL';

export interface AddPositionRequest {
  securityCode: string;
  quantity: number;
  buySell: BuySell;
}
@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiUrl = 'http://localhost:5000/transactions/';  //API URL

  constructor(private http: HttpClient) { }

  getPositions(): Observable<Positions> {
    return this.http.get<Positions>(this.apiUrl+"positions");
  }

  addPosition(request: AddPositionRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, request);
  }
}