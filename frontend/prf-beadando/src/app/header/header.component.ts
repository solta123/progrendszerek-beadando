import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tabs = [
    {
      title: 'Store',
      link: '/main/store'
    },
    {
      title: 'My Games',
      link: '/main/my-orders'
    }
  ];
  activeLink = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.activeLink = this.router.url;
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.activeLink = val.url;
      }
    });
    
    if (localStorage.getItem('accessLevel') === 'admin') {
      this.tabs.push(
        {
          title: 'Orders',
          link: '/main/orders'
        });
      this.tabs.push(
        {
          title: 'Add New Product',
          link: '/main/add'
        });
    }
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }
}
