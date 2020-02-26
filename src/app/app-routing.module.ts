import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'products/:item', component: ProductsComponent },
  { path: 'products-bread/:item', component: ProductsComponent },
  { path: 'products-seasoning/:item', component: ProductsComponent },
  { path: 'products-fruits/:item', component: ProductsComponent },
  { path: 'products-vegetables/:item', component: ProductsComponent },
  { path: '', redirectTo: 'products/all', pathMatch: 'full' },
  { path: '**', redirectTo: 'products/all' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
