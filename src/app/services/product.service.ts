import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private appUrl:string;
  private apiUrl:string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.endpoint
    this.apiUrl = 'api/products/'
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.appUrl}${this.apiUrl}`)
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.appUrl}${this.apiUrl}`,product)
  }

  getOneProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.apiUrl}${id}`, product);
  }
}
