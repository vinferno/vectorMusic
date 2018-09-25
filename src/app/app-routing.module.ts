import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DrawerComponent} from './feature/drawer/drawer.component';

const routes: Routes = [
  { component: DrawerComponent, path: 'drawer'},
  { path: '**', redirectTo: 'drawer'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
