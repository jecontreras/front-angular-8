import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule,  FormsModule }from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
// Componentes

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    ArticuloComponent,
    PublicacionesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MainRoutingModule,
    FormsModule,
    MomentModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [MainComponent]
})
export class DashboardModule { }
