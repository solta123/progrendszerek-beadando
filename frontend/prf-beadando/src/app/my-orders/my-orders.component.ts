import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  displayedColumns: string[] = ['date', 'title', 'price'];
  orders = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders(localStorage.getItem('user')).subscribe(orders => {
      this.orders = orders as any[];
      sessionStorage.setItem('mygames', JSON.stringify(orders));
    });
  }

}
