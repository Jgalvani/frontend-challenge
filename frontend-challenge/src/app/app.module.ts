import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { VolumesService } from './services/volumes.service';

import { AppComponent } from './app.component';
import { EvolutionGraphComponent } from './evolution-graph/evolution-graph.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { SelectVolumeComponent } from './select-volume/select-volume.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'volumes', component: SelectVolumeComponent},
  {path:'graph/:name', component: EvolutionGraphComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    EvolutionGraphComponent,
    NotFoundComponent,
    HomeComponent,
    SelectVolumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [VolumesService], //services
  bootstrap: [AppComponent]
})
export class AppModule { }
