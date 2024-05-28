import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonDetailComponent } from './person/person-detail/person-detail.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonCreateComponent } from './person/person-create/person-create.component';
import { AnimalListComponent } from './animal/animal-list/animal-list.component';
import { AnimalDetailComponent } from './animal/animal-detail/animal-detail.component';
import { AnimalEditComponent } from './animal/animal-edit/animal-edit.component';
import { AnimalCreateComponent } from './animal/animal-create/animal-create.component';
import { SpeciesListComponent } from './species/species-list/species-list.component';
import { SpeciesDetailComponent } from './species/species-detail/species-detail.component';
import { SpeciesEditComponent } from './species/species-edit/species-edit.component';
import { SpeciesCreateComponent } from './species/species-create/species-create.component';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonListComponent,
    PersonDetailComponent,
    PersonEditComponent,
    PersonCreateComponent,
    AnimalListComponent,
    AnimalDetailComponent,
    AnimalEditComponent,
    AnimalCreateComponent,
    SpeciesListComponent,
    SpeciesDetailComponent,
    SpeciesEditComponent,
    SpeciesCreateComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
