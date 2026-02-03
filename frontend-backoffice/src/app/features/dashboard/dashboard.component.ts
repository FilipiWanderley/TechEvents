import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EventService, Event } from '../../core/services/event.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="header">
        <h1>Event Dashboard</h1>
        <!-- In a real app, this would navigate to a create page or open a modal -->
        <button mat-raised-button color="primary">New Event</button>
      </div>

      <mat-card>
        <mat-card-content>
          <table mat-table [dataSource]="events()" class="mat-elevation-z8">
            
            <!-- Title Column -->
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef> Title </th>
              <td mat-cell *matCellDef="let element"> {{element.title}} </td>
            </ng-container>

            <!-- Date Column -->
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef> Date </th>
              <td mat-cell *matCellDef="let element"> {{element.date | date}} </td>
            </ng-container>

            <!-- Location Column -->
            <ng-container matColumnDef="location">
              <th mat-header-cell *matHeaderCellDef> Location </th>
              <td mat-cell *matCellDef="let element"> {{element.location}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    table { width: 100%; }
  `]
})
export class DashboardComponent implements OnInit {
  private eventService = inject(EventService);
  
  events = signal<Event[]>([]);
  displayedColumns: string[] = ['title', 'date', 'location'];

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error('Failed to load events', err)
    });
  }
}
