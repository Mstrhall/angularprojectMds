import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit {
  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private personService: PersonService,
    private currentUserService: CurrentUserService
  ) {
    this.personForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(1)]],

    });
  }

  ngOnInit() {
    if (!this.currentUserService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
  }

  get f() { return this.personForm.controls; }

  onSubmit() {
    if (this.personForm.invalid) {
      return;
    }

    this.personService.create(this.personForm.value).subscribe(person => {
      this.router.navigate(['/person', person.id]);
    });
  }

  onCancel() {
    this.router.navigate(['/personnes']);
  }
}
