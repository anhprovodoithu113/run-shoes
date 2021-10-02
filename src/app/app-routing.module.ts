import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path: 'product-details/:productId', component: ProductDetailsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
