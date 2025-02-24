import { Injectable } from '@angular/core';
import {Fornecedor} from '../models/fornecedor.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private apiUrl = 'http://localhost:8080/fornecedores';
  private fornecedor : Fornecedor[];
  constructor(private http: HttpClient) {
    this.fornecedor = [];
  }

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }

  buscarFornecedores(query: string): Observable<Fornecedor[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('razaosocial', query);
    }
    return this.http.get<Fornecedor[]>(this.apiUrl + "/busca", { params: params });
  }

  getFornecedorById(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.apiUrl}/${id}`);
  }
  createFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.http.post(this.apiUrl, fornecedor);
  }

  updateFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${fornecedor.id}`, fornecedor);
  }

  deleteFornecedor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
