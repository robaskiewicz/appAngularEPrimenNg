import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notafiscal} from '../models/notafiscal.model';

@Injectable({
  providedIn: 'root'
})
export class NotafiscalService {

  private apiUrl = 'http://localhost:8080/notasfiscais';
  private nota : Notafiscal[];
  constructor(private http: HttpClient) {
    this.nota = [];
  }

  getNotasFiscais(): Observable<Notafiscal[]> {
    return this.http.get<Notafiscal[]>(this.apiUrl);
  }

  getNotafiscalById(id: string): Observable<Notafiscal> {
    return this.http.get<Notafiscal>(`${this.apiUrl}/${id}`);
  }
  createNotafiscal(notafiscal: Notafiscal): Observable<any> {
    return this.http.post(this.apiUrl, notafiscal);
  }

  updateNotafiscal(notafiscal: Notafiscal): Observable<any> {
    return this.http.put(`${this.apiUrl}/${notafiscal.id}`, notafiscal);
  }

  deleteNotafiscal(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
