import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EspeceService } from '../../services/espece.service';

@Component({
  selector: 'app-species-edit',
  templateUrl: './species-edit.component.html',
  styleUrls: ['./species-edit.component.scss']
})
export class SpeciesEditComponent implements OnInit {
  speciesForm!: FormGroup;
  speciesId!: number;

  constructor(
    private fb: FormBuilder,
    private especeService: EspeceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.speciesId = +this.route.snapshot.paramMap.get('id')!;
    this.speciesForm = this.fb.group({
      id: [this.speciesId], // Ajoutez l'ID ici
      commonName: ['', [Validators.required, Validators.minLength(2)]],
      latinName: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.loadSpeciesDetails(this.speciesId);
  }

  loadSpeciesDetails(id: number): void {
    this.especeService.getById(id).subscribe(
      data => {
        this.speciesForm.patchValue(data);
      },
      error => {
        console.error('Error loading species details', error);
      }
    );
  }

  get f() {
    return this.speciesForm.controls;
  }

  onSubmit() {
    if (this.speciesForm.invalid) {
      return;
    }
    const formValue = this.speciesForm.value;
    this.especeService.update(this.speciesId, formValue).subscribe(
      response => {

        this.router.navigate(['/species']);
      },
      error => {
        console.error('Error updating species', error);
      }
    );
  }

  onCancel() {
    this.router.navigate(['/species']);
  }
}
