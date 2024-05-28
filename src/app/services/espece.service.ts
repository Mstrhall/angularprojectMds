import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspeceService {
  private apiUrl = 'http://localhost:8080/api/species';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(species: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, species);
  }

  update(id: number, species: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, species);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?contains=${query}`);
  }
}
