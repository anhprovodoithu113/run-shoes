import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { FixedCartComponent } from './Components/fixed-cart/fixed-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PreviewsProductComponent } from './Modals/previews-product/previews-product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './Components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FixedCartComponent,
    PreviewsProductComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
