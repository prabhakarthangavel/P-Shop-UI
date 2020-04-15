import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AuthComponent } from './auth/auth.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminGuardService } from './shared/admin-guard.service';
import { LoginDeactivateService } from './auth/login-deactivate.service';

const routes: Routes = [
  { path: 'products/', component: ProductsComponent },
  { path: 'products-bread/:item', component: ProductsComponent },
  { path: 'products-seasonings/:item', component: ProductsComponent },
  { path: 'products-fruits/:item', component: ProductsComponent },
  { path: 'products-vegetables/:item', component: ProductsComponent },
  { path: 'login', component: AuthComponent, canActivate: [LoginDeactivateService] },
  { path: 'shopping_cart', component: ShoppingCartComponent, canActivate: [AuthGuardService] },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminGuardService] },
  { path: 'admin/products/:product', component: ProductFormComponent, canActivate: [AdminGuardService] },
  { path: '', redirectTo: 'products/', pathMatch: 'full' },
  { path: '**', redirectTo: 'products/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
