import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/projects';

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getByProgrammer(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/programmer/${id}`);
  }


  create(project: any) {
    return this.http.post(this.apiUrl, project);
  }

  update(id: number, project: any) {
    return this.http.put(`${this.apiUrl}/${id}`, project);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}

