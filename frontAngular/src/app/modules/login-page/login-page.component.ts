import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatProgressSpinnerModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  private auth  = inject(AuthService)
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  sending = false;
  emailErrorId = 'emailError';
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });

  submit() {
    if (this.form.invalid) {
      const invalid = document.querySelector<HTMLElement>('[aria-invalid="true"]');
    invalid?.focus();
    return;
    }
    const email = this.form.value.email!;
    this.sending = true;
    this.api.getUserByEmail(email).subscribe({
      next: user => {
        this.auth.login(user.email);
        this.router.navigateByUrl('/tasks');
        this.sending = false;
      },
      error: _ => {
        this.sending = false;
        const ref = this.dialog.open(ConfirmDialogComponent, {
          data: { title: 'Usuario no encontrado', message: `¿Crear usuario ${email}?`, confirmText: 'Crear', cancelText: 'Cancelar' }
        });
        ref.afterClosed().subscribe(ok => {
          if (ok) {
            this.sending = true;
            this.api.createUser(email).subscribe(u => {
              this.auth.login(email);
              this.router.navigateByUrl('/tasks');
              this.sending = false;
            }, () => this.sending = false);
          }
        });
      }
    });
  }
}
