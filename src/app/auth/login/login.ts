import { Component, signal } from '@angular/core';
import { LoginRequest } from '../../models/auth.model';
import { AuthService } from '../../core/services/AuthService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   credentials: LoginRequest = { email: '', motDePasse: '' };
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

   onSubmit(): void {
    this.errorMessage.set(null);
    this.isLoading.set(true);

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message ?? 'Une erreur est survenue');
      }
    });
  }
}
