import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { EventService, Event } from '../../services/event.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private eventService = inject(EventService);
  events: Event[] = [];
  nextEventDate: Date | null = null;
  activeUsers: number = 1250; // Mock metric

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.calculateNextEvent();
    });
  }

  calculateNextEvent() {
    const now = new Date();
    const futureEvents = this.events
      .map(e => ({ ...e, dateObj: new Date(e.date) }))
      .filter(e => e.dateObj >= now)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
    
    if (futureEvents.length > 0) {
      this.nextEventDate = futureEvents[0].dateObj;
    }
  }
}
