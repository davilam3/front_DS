import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvisoryService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/appointments';

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getByProgrammer(programmerId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/programmer/${programmerId}`);
  }

  create(advisory: any) {
    return this.http.post(this.apiUrl, advisory);
  }

  approve(id: number, message: string) {
    return this.http.put(`${this.apiUrl}/${id}/approve`, { message });
  }

  reject(id: number, message: string) {
    return this.http.put(`${this.apiUrl}/${id}/reject`, { message });
  }
}

