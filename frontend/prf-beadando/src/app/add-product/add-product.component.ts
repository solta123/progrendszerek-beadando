import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(history.state)

    if (history.state?.title) {
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
    console.log(this.form.value)
    if (history.state?.title) {
      console.log('edit')
      this.productService.editProduct(this.form.value).subscribe(msg => {
        console.log(msg)
      }, error => {
        console.log(error)
      });
    } else {
      console.log('add')
      this.productService.addProduct(this.form.value).subscribe(msg => {
        console.log(msg)
        // this.form.reset();
      }, error => {
        console.log(error)
        if (error.error === 'Product already exists') {
          console.log('Product already exists')
          this.form.controls.title.setErrors({ incorrect: 'Product already exists' });
        } 
      });
    }
    
  }
}
