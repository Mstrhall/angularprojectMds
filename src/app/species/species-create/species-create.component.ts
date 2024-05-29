import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EspeceService } from '../../services/espece.service';

@Component({
  selector: 'app-species-create',
  templateUrl: './species-create.component.html',
  styleUrls: ['./species-create.component.scss']
})
export class SpeciesCreateComponent implements OnInit {
  speciesForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private especeService: EspeceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.speciesForm = this.fb.group({
      commonName: ['', [Validators.required, Validators.minLength(2)]],
      latinName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  get f() {
    return this.speciesForm.controls;
  }

  onSubmit() {
    if (this.speciesForm.invalid) {
      return;
    }
    const formValue = this.speciesForm.value;
    this.especeService.create(formValue).subscribe(
      response => {
        this.router.navigate(['/species']);
      },
      error => {
        console.error('Error creating species', error);
      }
    );
  }

  onCancel() {
    this.router.navigate(['/species']);
  }
}
