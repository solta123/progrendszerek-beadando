import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(environment.serverUrl + '/product', { responseType: 'json', withCredentials: true });
  }

  addProduct(product: Product) {
    return this.http.post(
      environment.serverUrl + '/product',
      { ...product },
      { responseType: 'text', withCredentials: true }
    );
  }
}
