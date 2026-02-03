import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule
  ],
  template: `
    <div class="container">
      <h1>Create New Event</h1>
      <form [formGroup]="eventForm" (ngSubmit)="onSubmit()">
        
        <mat-form-field appearance="fill">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Event Title">
          <mat-error *ngIf="eventForm.get('title')?.hasError('required')">Title is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Event Description"></textarea>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="date">
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="eventForm.get('date')?.hasError('required')">Date is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Location</mat-label>
          <input matInput formControlName="location" placeholder="Event Location">
          <mat-error *ngIf="eventForm.get('location')?.hasError('required')">Location is required</mat-error>
        </mat-form-field>

        <div class="actions">
          <button mat-button type="button" routerLink="/events">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="eventForm.invalid">Create</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 20px auto; padding: 20px; }
    form { display: flex; flex-direction: column; gap: 16px; }
    .actions { display: flex; justify-content: flex-end; gap: 10px; }
  `]
})
export class EventCreateComponent {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  eventForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    date: [null, Validators.required],
    location: ['', Validators.required]
  });

  onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const event = {
        title: formValue.title!,
        description: formValue.description || '',
        date: new Date(formValue.date!).toISOString(),
        location: formValue.location!
      };

      this.eventService.createEvent(event).subscribe({
        next: () => {
          this.snackBar.open('Event created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Error creating event', err);
          this.snackBar.open('Failed to create event', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
