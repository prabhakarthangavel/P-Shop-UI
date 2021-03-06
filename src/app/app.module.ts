import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule} from 'angularfire2';
import { environment } from './../environments/environment';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { ProductQuantityComponent } from './products/product-quantity/product-quantity.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ModalComponent } from './models/modal/modal.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { AdminGuardService } from './shared/admin-guard.service';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';
import { NumericDirective } from './shared/numeric.directive';
import { FileDiffComponent } from './file-diff/file-diff.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductsComponent,
    ProductCardComponent,
    AuthComponent,
    RegisterComponent,
    ProductQuantityComponent,
    ShoppingCartComponent,
    ModalComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    ProductFormComponent,
    ForbiddenComponent,
    NumericDirective,
    FileDiffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuardService,
    AdminGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
