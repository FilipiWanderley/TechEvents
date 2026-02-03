
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    RouterModule,
    DatePipe
  ],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  private eventService = inject(EventService);
  events: Event[] = [];
  displayedColumns: string[] = ['id', 'title', 'date'];
  nextEventDate: Date | null = null;

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.calculateNextEvent();
    });
  }

  calculateNextEvent() {
    const now = new Date();
    // Filter future events and sort by date
    const futureEvents = this.events
      .map(e => ({ ...e, dateObj: new Date(e.date) }))
      .filter(e => e.dateObj >= now)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
    
    if (futureEvents.length > 0) {
      this.nextEventDate = futureEvents[0].dateObj;
    }
  }
}
