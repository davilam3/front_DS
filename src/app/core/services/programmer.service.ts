import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProgrammerService {

    private apiUrl = environment.apiUrl + '/api/portfolios';

    constructor(private http: HttpClient) { }

    create(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    getAll() {
        return this.http.get<any[]>(this.apiUrl);
    }


    getByUserId(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/user/${userId}`);
    }
    
}
