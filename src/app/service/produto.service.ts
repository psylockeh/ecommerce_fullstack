import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private baseUrl = 'http://localhost:8080/api/produto';  

  constructor(private http: HttpClient) {}

  public listar(): Observable<Produto[]> {    
    return this.http.get<Produto[]>(this.baseUrl);      
  }

  public carregar(codigo: number): Observable<Produto>{
    return this.http.get<Produto>(`${this.baseUrl}/${codigo}`);
  }

  public gravar(obj: Produto): Observable<String> {
    return this.http.post<String>(this.baseUrl, obj);
  }

  public alterar(obj: Produto): Observable<String> {
    return this.http.put<String>(this.baseUrl, obj);
  }

  public remover(codigo: number): Observable<String> {
    return this.http.delete<String>(`${this.baseUrl}/${codigo}`);
  }

  public pesquisar(busca: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/busca/${busca}`);
  }
}
