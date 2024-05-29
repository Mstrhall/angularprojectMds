import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BestioleService } from '../../services/bestiole.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  animals: any[] = [];
  searchQuery: string = '';

  constructor(private bestioleService: BestioleService, private router: Router) {}

  ngOnInit() {
    this.loadAnimals();
  }

  loadAnimals() {
    this.bestioleService.getAll().subscribe(data => {
      this.animals = data;

    });
  }

  search() {
    if (this.searchQuery) {
      this.bestioleService.search(this.searchQuery).subscribe(data => {
        this.animals = data;

      });
    } else {
      this.loadAnimals();
    }
  }

  viewAnimal(id: number) {
    this.router.navigate(['/animals', id]);
  }

  navigateToCreate() {
    this.router.navigate(['/animals/create']);
  }
}
