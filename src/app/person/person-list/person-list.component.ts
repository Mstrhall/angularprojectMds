import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  persons: any[] = [];
  searchQuery: string = '';

  constructor(private personService: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.getAll().subscribe(data => {
      this.persons = data;
    });
  }

  search(): void {
    if (this.searchQuery) {
      this.personService.search(this.searchQuery).subscribe(data => {
        this.persons = data;
      });
    } else {
      this.loadPersons();
    }
  }

  viewPerson(id: number): void {
    this.router.navigate([`/personnes/${id}`]);
  }

  navigateToCreate(): void {
    this.router.navigate(['/personnes/create']);
  }
}
