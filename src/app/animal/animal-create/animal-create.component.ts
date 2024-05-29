import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BestioleService } from '../../services/bestiole.service';
import { EspeceService } from '../../services/espece.service';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.scss']
})
export class AnimalCreateComponent implements OnInit {
  animalForm!: FormGroup;
  speciesList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private bestioleService: BestioleService,
    private especeService: EspeceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      speciesId: [null, [Validators.required]]
    });

    this.loadSpecies();
  }

  loadSpecies(): void {
    this.especeService.getAll().subscribe(data => {
      this.speciesList = data;
    });
  }

  get f() {
    return this.animalForm.controls;
  }

  onSubmit() {
    if (this.animalForm.invalid) {
      return;
    }
    const formValue = this.animalForm.value;
    const animalPayload = {
      name: formValue.name,
      color: formValue.color,
      sex: formValue.sex,
      species: { id: formValue.speciesId }
    };

    this.bestioleService.create(animalPayload).subscribe(
      response => {

        this.router.navigate(['/animals']);
      },
      error => {
        console.error('Error creating animal', error);
      }
    );
  }

  onCancel() {
    this.router.navigate(['/animals']);
  }
}
