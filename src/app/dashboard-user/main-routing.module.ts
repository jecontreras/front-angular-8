import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthService } from './../services/auth.service';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';

const dashboardRoutes: Routes = [
 {
   path: 'dashboard',
   component: MainComponent,
   canActivate: [AuthService],
   children: [
     {path: '', redirectTo: 'publicacion', pathMatch: 'full'},
     {path: 'articulo', component: ArticuloComponent},
     {path: 'publicacion', component: PublicacionesComponent},
     {path: '**', redirectTo: 'publicacion', pathMatch: 'full'}
   ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
