import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'main', component: HeaderComponent, children: [
    {path: 'store', component: ListComponent, canActivate: [AuthGuard]},
    {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
    {path: 'add', component: AddProductComponent, canActivate: [AuthGuard]},
  ]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
