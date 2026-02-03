
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { EventService, Event } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    RouterModule,
    DatePipe
  ],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  private eventService = inject(EventService);
  private snackBar = inject(MatSnackBar);
  
  events: Event[] = [];
  displayedColumns: string[] = ['id', 'title', 'date', 'actions'];

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  deleteEvent(id: string) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.snackBar.open('Evento excluído com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          this.loadEvents();
        },
        error: (err) => {
          console.error('Error deleting event', err);
          this.snackBar.open('Erro ao excluir evento.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
