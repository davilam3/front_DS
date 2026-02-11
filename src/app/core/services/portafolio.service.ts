import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Portfolio } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/portfolios';

  getAll() {
    return this.http.get<Portfolio[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Portfolio>(`${this.apiUrl}/${id}`);
  }

  getMine() {
    return this.http.get<Portfolio>(`${this.apiUrl}/me`);
  }

  update(data: any) {
    return this.http.put(`${this.apiUrl}/me`, data);
  }
}
