import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

type Data = { title: string; message: string; confirmText?: string; cancelText?: string };

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
  <h2 mat-dialog-title>{{data.title}}</h2>
  <div mat-dialog-content><p>{{data.message}}</p></div>
  <div mat-dialog-actions align="end">
    <button mat-button (click)="close(false)">{{data.cancelText || 'Cancelar'}}</button>
    <button mat-raised-button color="primary" (click)="close(true)">{{data.confirmText || 'Aceptar'}}</button>
  </div>
  `
})
export class ConfirmDialogComponent {
  constructor(private ref: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Data) {}
  close(val: boolean) { this.ref.close(val); }
}
