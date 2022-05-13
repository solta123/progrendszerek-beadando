import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  isAdmin = localStorage.getItem('accessLevel') === 'admin';
  orders = sessionStorage.getItem('mygames') ? JSON.parse(sessionStorage.getItem('mygames')) : [];
  owned: boolean[] = []

  constructor(
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products as Product[];
      this.owned = new Array(this.products.length).fill(false);
      this.setOwned();
    });

    if (!sessionStorage.getItem('mygames')) {
      this.orderService.getOrders(localStorage.getItem('user')).subscribe(orders => {
        sessionStorage.setItem('mygames', JSON.stringify(orders));
        this.orders = orders;
        this.setOwned();
      });
    }
  }

  setOwned() {
    this.owned = [];
    this.products.map(product => {
      this.owned.push(!!this.orders.find(order => order.title === product.title))
    });
  }

  edit(product: Product) {
    this.router.navigateByUrl('/main/add', {
      state: { ...product }
    });
  }

  buy(product: Product, index: number) {
    this.orderService.addOrder({
      title: product.title,
      username: localStorage.getItem('user'),
      date: new Date(),
      price: product.price
    }).subscribe(response => {
      this.snackBar.open('If buying games in real life would be that easy...', null, { duration: 4000 });
      this.owned[index] = true;
    }, error => {
      if (error.status === 200) {
        this.owned[index] = true;
        this.snackBar.open('If buying games in real life would be that easy...', null, { duration: 4000 });
      } else {
        this.snackBar.open(error.error, null, { duration: 4000 });
      }
    });
  }
}
