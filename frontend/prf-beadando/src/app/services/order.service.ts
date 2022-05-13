import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(username?: string) {
    let params = new HttpParams().set('username', username);
    
    return this.http.get(
      environment.serverUrl + '/order',
      username 
        ? { params, responseType: 'json', withCredentials: true }
        : { responseType: 'json', withCredentials: true });
  }

  addOrder(order: Order) {
    return this.http.post(
      environment.serverUrl + '/order',
      { ...order },
      { responseType: 'json', withCredentials: true }
    );
  }
}
