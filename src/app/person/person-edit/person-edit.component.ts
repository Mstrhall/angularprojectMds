import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  personForm: FormGroup;
  personId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private currentUserService: CurrentUserService
  ) {
    this.personForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(1)]],

    });
    this.personId = 0;
  }

  ngOnInit() {
    if (!this.currentUserService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    this.personId = Number(this.route.snapshot.paramMap.get('id'));

    this.personService.getById(this.personId).subscribe(person => {
      this.personForm.setValue({
        id: person.id, // Champ ID rempli
        firstName: person.firstName,
        lastName: person.lastName,
        age: person.age

      });
    });
  }

  get f() { return this.personForm.controls; }

  onSubmit() {
    if (this.personForm.invalid) {
      return;
    }


    const updatedPerson = {
      ...this.personForm.getRawValue(),
      id: this.personId
    };

    this.personService.update(this.personId, updatedPerson).subscribe(() => {
      this.router.navigate(['/person', this.personId]);
    });
  }

  onCancel() {
    this.router.navigate(['/person', this.personId]);
  }
}
