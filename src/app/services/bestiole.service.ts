import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BestioleService {
  private apiUrl = 'http://localhost:8080/api/animal';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(animal: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, animal);
  }

  update(id: number, animal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, animal);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?contains=${query}`);
  }
}
