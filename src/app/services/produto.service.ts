import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Produto} from '../models/produto.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:8080/produtos';
  private produto : Produto[];
  constructor(private http: HttpClient) {
    this.produto = [];
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProdutoById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }
  // createProduto(produto: Produto): void {
  //   this.http.post(this.apiUrl, produto).subscribe();
  // }

  createProduto(produto: Produto): Observable<any> {
    return this.http.post(this.apiUrl, produto);
  }

  updateProduto(produto: Produto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${produto.id}`, produto);
  }

  deleteProduto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  buscarProdutos(query: string): Observable<Produto[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('descricao', query);
    }
    return this.http.get<Produto[]>(this.apiUrl + "/busca", { params: params });
  }

}
