import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'animals/create', component: AnimalCreateComponent, canActivate: [AuthGuard] },
  { path: 'animals/create', component: AnimalCreateComponent, canActivate: [AuthGuard] },
  { path: 'species/create', component: SpeciesCreateComponent, canActivate: [AuthGuard] },
  { path: 'personnes/create', component: PersonCreateComponent, canActivate: [AuthGuard] },
  { path: 'personnes', component: PersonListComponent, canActivate: [AuthGuard] },
  { path: 'personnes/:id', component: PersonDetailComponent, canActivate: [AuthGuard] },
  { path: 'personnes/:id/edit', component: PersonEditComponent, canActivate: [AuthGuard] },
  { path: 'animals', component: AnimalListComponent, canActivate: [AuthGuard] },
  { path: 'animals/:id', component: AnimalDetailComponent, canActivate: [AuthGuard] },
  { path: 'animals/:id/edit', component: AnimalEditComponent, canActivate: [AuthGuard] },
  { path: 'animals/create', component: AnimalCreateComponent, canActivate: [AuthGuard] },
  { path: 'species', component: SpeciesListComponent, canActivate: [AuthGuard] },
  { path: 'species/:id', component: SpeciesDetailComponent, canActivate: [AuthGuard] },
  { path: 'species/:id/edit', component: SpeciesEditComponent, canActivate: [AuthGuard] },
  { path: 'species/create', component: SpeciesCreateComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
