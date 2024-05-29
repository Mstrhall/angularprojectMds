import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BestioleService } from '../../services/bestiole.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {
  animal: any;

  constructor(
    private route: ActivatedRoute,
    private bestioleService: BestioleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAnimalDetails(+id);
    }
  }

  loadAnimalDetails(id: number): void {
    this.bestioleService.getById(id).subscribe(
      data => {
        this.animal = data;
      },
      error => {
        console.error('Error loading animal details', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/animals']);
  }

  editAnimal(): void {
    this.router.navigate([`/animals/${this.animal.id}/edit`]);
  }

  deleteAnimal(): void {
    this.bestioleService.delete(this.animal.id).subscribe(
      () => {
        this.router.navigate(['/animals']);
      },
      error => {
        console.error('Error deleting animal', error);
      }
    );
  }
}
