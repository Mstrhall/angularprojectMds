import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  person: any;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPersonDetails(+id);
    }
  }

  loadPersonDetails(id: number): void {
    this.personService.getById(id).subscribe(
      data => {
        this.person = data;
      },
      error => {
        console.error('Error loading person details', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/personnes']);
  }

  editPerson(): void {
    this.router.navigate([`/personnes/${this.person.id}/edit`]);
  }

  deletePerson(): void {
    this.personService.delete(this.person.id).subscribe(
      () => {
        this.router.navigate(['/personnes']);
      },
      error => {
        console.error('Error deleting person', error);
      }
    );
  }
}
