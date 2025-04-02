import { Component, inject } from '@angular/core';
import { FormsModule, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  error: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    const rawValue = this.form.getRawValue();
    this.auth.register(rawValue.email, rawValue.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this.error = true;
        console.log('Error: ', error);
      }
    });
  }

  
}
