import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl(0.99, Validators.min(0.99)),
    description: new FormControl(''),
    releaseDate: new FormControl(new Date()),
    image: new FormControl(''),
    developer: new FormControl(''),
    publisher: new FormControl('')
  });
  isEdit = false;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (history.state?.title) {
      this.isEdit = true
      const { title, price, description, releaseDate, image, developer, publisher } = history.state;
      this.form.setValue({
        title,
        price,
        description,
        releaseDate,
        image,
        developer,
        publisher
      });
    }
  }

  submit(): void {
    if (history.state?.title) {
      this.productService.editProduct(this.form.value).subscribe(msg => {
        this.snackBar.open(msg, 'Thanks!', { duration: 3000 });
        this.router.navigateByUrl('/main/store');
        this.form.reset();
        this.isEdit = false;
      }, error => {
        console.log(error)
      });
    } else {
      this.productService.addProduct(this.form.value).subscribe(msg => {
        this.snackBar.open(msg, 'Thanks!', { duration: 3000 });
        this.form.reset();
      }, error => {
        console.log(error)
        if (error.error === 'Product already exists') {
          this.form.controls.title.setErrors({ incorrect: 'Product already exists' });
        } 
      });
    }
    
  }
}
