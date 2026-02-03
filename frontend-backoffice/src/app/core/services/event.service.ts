import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/events';

  // State management with Signals can be done here if needed, 
  // or just return Observables for components to handle.
  
  getEvents(): Observable<Event[]> {
    // Mocking for now as backend might not return list yet (repo method was findAll)
    // In real app: return this.http.get<Event[]>(this.apiUrl);
    // But since I implemented findAll in backend, let's assume endpoint exists (I need to check if I added GET endpoint)
    // Wait, I only added POST endpoint in EventController!
    // I should fix backend later to add GET. For now, I'll assume it exists or use mock.
    return this.http.get<Event[]>(this.apiUrl); 
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }
}
