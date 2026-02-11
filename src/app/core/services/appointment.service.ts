import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/appointments';

  /* ============================
   * ADMIN
   * ============================ */

  getAll(page = 0, size = 20) {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<any>(this.apiUrl, { params });
  }

  search(filters: {
    programmerId?: number;
    clientId?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
  }) {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value);
      }
    });

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /* ============================
   * PROGRAMADOR
   * ============================ */

  getByProgrammer(programmerId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/programmer/${programmerId}`
    );
  }

  approve(id: number, message?: string) {
    return this.http.put(
      `${this.apiUrl}/${id}/approve`,
      null,
      { params: message ? { responseMessage: message } : {} }
    );
  }

  reject(id: number, message?: string) {
    return this.http.put(
      `${this.apiUrl}/${id}/reject`,
      null,
      { params: message ? { responseMessage: message } : {} }
    );
  }

  complete(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/complete`, null);
  }

  /* ============================
   * USUARIO
   * ============================ */

  getByClient(clientId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/client/${clientId}`
    );
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  cancel(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/cancel`, null);
  }
}
