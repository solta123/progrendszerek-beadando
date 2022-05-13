import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ErrorComponent } from './error/error.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'main', component: HeaderComponent, children: [
    {path: 'store', component: ListComponent, canActivate: [AuthGuard]},
    {path: 'add', component: AddProductComponent, canActivate: [AdminGuard]},
    {path: 'orders', component: OrdersComponent, canActivate: [AdminGuard]},
    {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
  ]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
