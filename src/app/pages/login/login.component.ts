import { Component, inject } from '@angular/core';
import { FormsModule, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  error: boolean = false;
  fb : FormBuilder = inject (FormBuilder);
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', Validators.required]
  });

  onSubmit(){
    const rawValue = this.form.getRawValue();
    this.auth.login(rawValue.email, rawValue.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (error) =>{
        this.error = true
        console.log('Error: ', error);
      }
    });
  }
  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  onGoogleSignIn() {
    this.auth.loginWithGoogle().then(
      () => {
        this.router.navigateByUrl('/home');
      },
      (error) => {
        this.error = true;
        console.error('Error en Google Sign-In: ', error);
      }
    );
  }
  
}