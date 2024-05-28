import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:8080/api/person';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(person: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, person);
  }

  update(id: number, person: any): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/${id}`, person);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?contains=${query}`);
  }
}
