import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatSnackBarModule
  ],
  template: `
    <form [formGroup]="eventForm" (ngSubmit)="onSubmit()" class="event-form">
      <h2>Create Event</h2>
      
      <mat-form-field appearance="fill">
        <mat-label>Title</mat-label>
        <input matInput formControlName="title">
        <mat-error *ngIf="eventForm.get('title')?.hasError('required')">Title is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description"></textarea>
        <mat-error *ngIf="eventForm.get('description')?.hasError('required')">Description is required</mat-error>
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
        <input matInput formControlName="location">
        <mat-error *ngIf="eventForm.get('location')?.hasError('required')">Location is required</mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="eventForm.invalid">Create</button>
    </form>
  `,
  styles: [`
    .event-form { display: flex; flex-direction: column; gap: 16px; max-width: 500px; margin: 0 auto; }
  `]
})
export class EventFormComponent {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private snackBar = inject(MatSnackBar);

  eventForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: [null, Validators.required],
    location: ['', Validators.required]
  });

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: () => {
          this.snackBar.open('Event created successfully', 'Close', { duration: 3000 });
          this.eventForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error creating event', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
