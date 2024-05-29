import { Component, OnInit } from '@angular/core';
import { EspeceService } from '../../services/espece.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit {
  speciesList: any[] = [];
  searchQuery: string = '';

  constructor(private especeService: EspeceService, private router: Router) {}

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies(): void {
    this.especeService.getAll().subscribe(data => {
      this.speciesList = data;
    });
  }

  search(): void {
    if (this.searchQuery) {
      this.especeService.search(this.searchQuery).subscribe(data => {
        this.speciesList = data;
      });
    } else {
      this.loadSpecies();
    }
  }

  viewSpecies(id: number): void {
    this.router.navigate([`/species/${id}`]);
  }

  editSpecies(id: number): void {
    this.router.navigate([`/species/${id}/edit`]);
  }

  deleteSpecies(id: number): void {
    this.especeService.delete(id).subscribe(() => {
      this.loadSpecies();
    });
  }

  createSpecies(): void {
    this.router.navigate(['/species/create']);
  }
}
