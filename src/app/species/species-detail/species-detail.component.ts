import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EspeceService } from '../../services/espece.service';

@Component({
  selector: 'app-species-detail',
  templateUrl: './species-detail.component.html',
  styleUrls: ['./species-detail.component.scss']
})
export class SpeciesDetailComponent implements OnInit {
  species: any;

  constructor(
    private route: ActivatedRoute,
    private especeService: EspeceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSpeciesDetails(+id);
    }
  }

  loadSpeciesDetails(id: number): void {
    this.especeService.getById(id).subscribe(
      data => {
        this.species = data;
      },
      error => {
        console.error('Error loading species details', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/species']);
  }

  editSpecies(): void {
    this.router.navigate([`/species/${this.species.id}/edit`]);
  }

  deleteSpecies(): void {
    this.especeService.delete(this.species.id).subscribe(
      () => {
        this.router.navigate(['/species']);
      },
      error => {
        console.error('Error deleting species', error);
      }
    );
  }
}
