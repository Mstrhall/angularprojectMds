import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BestioleService } from '../../services/bestiole.service';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.scss']
})
export class AnimalEditComponent implements OnInit {
  animalForm: FormGroup;
  animalId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bestioleService: BestioleService
  ) {
    this.animalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      species: this.fb.group({
        commonName: ['', Validators.required],
        latinName: ['', Validators.required]
      }),
      color: ['', Validators.required],
      sex: ['', Validators.required]
    });
    this.animalId = 0;
  }

  ngOnInit() {
    this.animalId = Number(this.route.snapshot.paramMap.get('id'));

    this.bestioleService.getById(this.animalId).subscribe(animal => {
      this.animalForm.setValue({
        name: animal.name,
        species: {
          commonName: animal.species.commonName,
          latinName: animal.species.latinName
        },
        color: animal.color,
        sex: animal.sex
      });
    });
  }

  get f() { return this.animalForm.controls; }

  onSubmit() {
    if (this.animalForm.invalid) {
      return;
    }

    this.bestioleService.update(this.animalId, this.animalForm.value).subscribe(() => {
      this.router.navigate(['/animal', this.animalId]);
    });
  }

  onCancel() {
    this.router.navigate(['/animal', this.animalId]);
  }
}
