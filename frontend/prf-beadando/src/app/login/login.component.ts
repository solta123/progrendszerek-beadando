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
    if (localStorage.getItem('user') || localStorage.getItem('accessLevel')) {
      localStorage.removeItem('user');
      localStorage.removeItem('accessLevel');
      sessionStorage.removeItem('mygames');
      this.loginService.logout().subscribe(msg => {
        console.log(msg);
      }, error => {
        console.log(error);
      })
    }
  }

  submit(): void {
    if (this.form.controls.username.valid && this.form.controls.password.valid) {
      this.loginService.login(this.form.controls.username.value, this.form.controls.password.value).subscribe(msg => {
        localStorage.setItem('accessLevel', msg.body)
        localStorage.setItem('user', this.form.controls.username.value);
        this.router.navigateByUrl('/main/store');
      }, error => {
        console.log(error);
      })
    }
  }

}
