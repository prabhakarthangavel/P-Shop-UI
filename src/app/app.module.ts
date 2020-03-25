import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { ProductQuantityComponent } from './products/product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductsComponent,
    ProductCardComponent,
    AuthComponent,
    RegisterComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
