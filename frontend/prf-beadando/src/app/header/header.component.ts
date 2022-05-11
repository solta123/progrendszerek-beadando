import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      link: '/main/orders'
    },
    {
      title: 'Add New Product',
      link: '/main/add'
    },
  ];
  activeLink = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.activeLink = this.router.url;
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }

  status(): void {
    this.loginService.status().subscribe(res => {
      console.log(res)
    });
  }
}
