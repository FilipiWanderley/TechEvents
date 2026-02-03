
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  eventForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.maxLength(1000)]],
    date: [null, Validators.required],
    location: ['', [Validators.required, Validators.maxLength(255)]]
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
          this.snackBar.open('Evento criado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Error creating event', err);
          this.snackBar.open('Erro ao criar evento.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
