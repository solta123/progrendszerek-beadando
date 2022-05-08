import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.logout().subscribe(msg => {
        console.log(msg);
      }, error => {
        console.log(error);
      })
    }
  }

  submit(): void {
    console.log('submit called')
    if (this.form.controls.username.valid && this.form.controls.password.valid) {
      console.log('na login happening')
      this.loginService.login(this.form.controls.username.value, this.form.controls.password.value).subscribe(msg => {
        console.log(msg);
        localStorage.setItem('user', this.form.controls.username.value);
        this.router.navigate(['/list']);
      }, error => {
        console.log(error);
      })
    }
  }

}
