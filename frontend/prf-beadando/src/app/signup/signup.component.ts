import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    accessLevel: new FormControl('user', Validators.required)
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.form.valid) {
      this.loginService.signup(this.form.value).subscribe(msg => {
        this.snackBar.open('Successfully signed up!');      
        this.router.navigateByUrl('/login');
      }, error => {
        console.log(error);
        this.snackBar.open(error, 'Close', { duration: 15000 });
      })
    }
  }
}
